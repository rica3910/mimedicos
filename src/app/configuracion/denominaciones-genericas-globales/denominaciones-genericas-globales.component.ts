import { AltaDenominacionGenericaGlobalComponent } from './../alta-denominacion-generica-global/alta-denominacion-generica-global.component';
/******************************************************************|
|NOMBRE: denominacionesGenericasGlobales.                          | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Contiene las denominaciones genéricas globales.      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/06/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { Router } from '@angular/router';
import { MedicamentosService } from '../../medicamentos.service';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-denominaciones-genericas-globales',
  templateUrl: './denominaciones-genericas-globales.component.html',
  styleUrls: ['./denominaciones-genericas-globales.component.css']
})
export class DenominacionesGenericasGlobalesComponent implements OnInit {

  //Objeto del formulario que contendrá al estatus.
  estatusControl: AbstractControl;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Almacena las denominaciones genéricas.
  denominacionesGenericas: JSON[] = [];
  //Empezará por la página 1 en la paginación.
  page: number = 1;
  //Almacena el número de registros máximos por página.
  registrosPorPagina: number = 100;
  //Indica el número de registros que arrojó la búsqueda.
  numeroRegistros: number = 0;
  //Indica si la información de las denominaciones genéricas.
  denominacionesGenericasListas: boolean = false;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Objeto del formulario que contendrá a la búsqueda.
  busquedaControl: AbstractControl;
  //Objeto que contendrá el formulario de búsqueda.
  formBusqueda: FormGroup;
  //Validará si el usuario puede dar de alta ingredientes activos.
  alta: boolean = false;
  //Validará si el usuario puede editar ingredientes activos.
  editar: boolean = false;
  //Validará si el usuario puede eliminar ingredientes activos.
  eliminar: boolean = false;  

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  rutaNavegacion   = para navegar a otras url´s,                       |
  |  medicamentosService = contiene los métodos de los medicamentos.      |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private autenticarService: AutenticarService,
    private fb: FormBuilder,
    private rutaNavegacion: Router,
    private medicamentosService: MedicamentosService
  ) {

    //Se agregan las validaciones al formulario de búsqueda.
    this.formBusqueda = fb.group({
      'estatus': ['TODOS'],
      'busqueda': ['']
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.estatusControl = this.formBusqueda.controls['estatus'];
    this.busquedaControl = this.formBusqueda.controls['busqueda'];

    this.buscar();
  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se espera a que tarde 1.5 segundos.
      .pipe(debounceTime(1000))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => query))
      //Se subscribe al evento.
      .subscribe((query) => {
        this.buscar();
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarInfoHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });

    //Cuando se cambia el estatus.
    this.estatusControl.valueChanges.subscribe(estatus => {
      this.buscar();
    });
  }

  ngAfterViewInit() {

    //El botón de alta de denominación genérica global se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA DENOMINACION GENERICA GLOBAL').subscribe((respuesta: boolean) => {
      this.alta = respuesta["value"];
    });

    //El botón de editar denominación genérica global se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('EDITAR DENOMINACION GENERICA GLOBAL').subscribe((respuesta: boolean) => {
      this.editar = respuesta["value"];
    });

    this.autenticarService.usuarioTieneDetModulo('ELIMINAR DENOMINACION GENERICA GLOBAL').subscribe((respuesta: boolean) => {
      this.eliminar = respuesta["value"];
    });    

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: numeroPagina = Número de paginación.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar(numeroPagina: number = 1) {

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Se utiliza para saber cuáles registros obtener según el número de página.
    let siguientesRegistros: number = (numeroPagina - 1) * this.registrosPorPagina;

    //Busca el iventario del producto.
    this.medicamentosService.denominacionesGenericasGlobales(
      this.busquedaControl.value,
      siguientesRegistros + "",
      this.estatusControl.value).subscribe((respuesta) => {

        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los registros.
          this.denominacionesGenericas = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

          //Si hay resultados en la consulta.
          if (this.denominacionesGenericas.length > 0) {
            //Se actualiza la paginación.
            this.numeroRegistros = Number(respuesta["datos"][0]["numero_registros"]);
          }
          else {
            //No hay paginación.
            this.numeroRegistros = 0;
          }

        }

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      this.busquedaControl.setValue("");
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();

    //Actualiza la información.
    this.buscar();
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarPagina.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Obtiene los registros según el número de página.        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pagina = Número de página.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarPagina(pagina) {

    this.buscar(pagina);

  }

  /*----------------------------------------------------------------------|
   |  NOMBRE: altaDenominacionGenerica.                                    |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Llama al formulario de crear ingrediente activo.        |  
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 05/06/2020.                                                   |    
   |----------------------------------------------------------------------*/
  altaDenominacionGenerica() {

    this.medicamentosService.altaDenominacionGenericaModal(AltaDenominacionGenericaGlobalComponent, null).subscribe((respuesta) => {
      if (respuesta) {
        //Se llenan los controles del formulario para que encuentre el registro recién creado.
        this.estatusControl.setValue("ACTIVO");
        this.busquedaControl.setValue(respuesta);
        this.buscar();
      }
    })
  }

  /*----------------------------------------------------------------------|
   |  NOMBRE: editarIngredienteActivo.                                     |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Llama al formulario de editdar ingrediente activo.      |
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE ENTRADA:                                               |
   |  denominacionGenerica =  registro del ingrediente activo.             |    
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 05/06/2020.                                                   |    
   |----------------------------------------------------------------------*/
   editarIngredienteActivo(denominacionGenerica) {

    this.medicamentosService.altaDenominacionGenericaModal(AltaDenominacionGenericaGlobalComponent, denominacionGenerica).subscribe((respuesta) => {
      if (respuesta) {
        //Se llenan los controles del formulario para que encuentre el registro recién creado.
        this.estatusControl.setValue("TODOS");
        this.busquedaControl.setValue(respuesta);
        this.buscar();
      }
    })
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarEstatus.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ACTIVAR o INACTIVAR un igrediente.          |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: denominacion = objeto del ingrediente,        |
  |  estatus = estatus al que se cambiará.                                |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarEstatus(denominacion, estatus) {

    //Mensaje que tedrá la confirmación dependiendo del estatus.
    let tituloMensaje: string = estatus == "ACTIVO" ? "Activar ingrediente." : "Inactivar ingrediente.";
    let mensaje: string = estatus == "ACTIVO" ? "¿Está seguro de activar el ingrediente?" : "¿Está seguro de inactivar el ingrediente?";

    this.utilidadesService.confirmacion(tituloMensaje, mensaje).subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.medicamentosService.editarDenominacionGenericaGlobal(denominacion["id"], "", estatus).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se llenan los controles del formulario para que encuentre el registro recién modificado.
            this.estatusControl.setValue(estatus);
            this.busquedaControl.setValue(denominacion["nombre"]);
            this.buscar();
          }

        });
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarIngredienteActivo.                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un igrediente.                     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: id = id del ingrediente.                      |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarIngredienteActivo(id: string) {

    //Mensaje que tedrá la confirmación.
    let tituloMensaje: string =  "Eliminar ingrediente.";
    let mensaje: string = "¿Está seguro de eliminar el ingrediente?";

    this.utilidadesService.confirmacion(tituloMensaje, mensaje).subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.medicamentosService.eliminarDenominacionGenericaGlobal(id).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los controles del formulario.
            this.estatusControl.setValue("ACTIVO");
            this.busquedaControl.setValue("");
            this.buscar();
          }

        });
      }
    });

  }


}
