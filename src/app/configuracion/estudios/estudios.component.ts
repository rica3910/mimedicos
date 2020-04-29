/******************************************************************|
|NOMBRE: estudiosComponent.                                        | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los estudios.    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 24/04/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { OrganizacionesService } from '../../organizaciones.service';
import { ClinicasService } from '../../clinicas.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiosService } from './../../estudios.service';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  //Propiedad que indica si el usuario puede dar de alta estudios.
  altaEstudios: boolean = false;
  //Propiedad que indica si el usuario puede editar estudios.
  editarEstudios: boolean = false;
  //Propiedad que indica si el usuario puede eliminar estudios.
  eliminarEstudios: boolean = false;
  //Registros de organizaciones que se verán en la vista en el campo de búsqueda de organizaciones.
  organizaciones: Array<JSON>;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Objeto que contendrá el formulario de búsqueda de los estudios.
  formBusquedaEstudios: FormGroup;
  //Objeto del formulario que contendrá a la organización.
  organizacionControl: AbstractControl;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Objeto del formulario que contendrá al estatus del estudio.
  estatusEstudio: AbstractControl;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;

  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si el filtro de organizaciones ya se cargó.
  organizacionesInicioListas: boolean = false;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Indica si la información de estudios ya se obtuvo.
  estudiosListos: boolean = false;
  //Almacena los estudios de la base de datos pero su información se puede filtrar.
  estudios: JSON[] = [];
  //Almacena los estudios de la base de datos original sin que se filtre su información.
  estudiosServidor: JSON[] = [];
  //Almacena el porcentaje del iva.
  porcentajeIva: string;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  organizacionesService = contiene los métodos de base de datos de las |
  |  organizaciones,                                                      |
  |  clinicasService = contiene los métodos de la bd de las clínicas,     |
  |  estudiosService = contiene los métodos de la bd de los estudios,     |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  rutaNavegacion   = para navegar a otras url´s.                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private autenticarService: AutenticarService,
    private organizacionesService: OrganizacionesService,
    private clinicasService: ClinicasService,
    private estudiosService: EstudiosService,
    private fb: FormBuilder,
    private rutaNavegacion: Router) {

    //Se agregan las validaciones al formulario de búsqueda de estudios.
    this.formBusquedaEstudios = fb.group({
      'organizacion': ['', Validators.required],
      'clinica': ['', Validators.required],
      'estatusEstudio': ['ACTIVO', Validators.required]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.organizacionControl = this.formBusquedaEstudios.controls['organizacion'];
    this.clinicaControl = this.formBusquedaEstudios.controls['clinica'];
    this.estatusEstudio = this.formBusquedaEstudios.controls['estatusEstudio'];


    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan las organizaciones y las clínicas en sus filtros.
    this.filtroOrganizaciones();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe(() => {

      //Si las organizaciones están listas.
      if (this.organizacionesInicioListas) {

        //Si las clínicas están listas.
        if (this.clinicasInicioListas) {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Se busca la información según los filtros iniciales.
          this.buscar();

        }
      }

    });


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.estudiosServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.estudios = resultados;
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


    //Cuando se cambia la organización.
    this.organizacionControl.valueChanges.subscribe(() => {

      //Si no es la carga inicial se hace la espera.
      if (this.clinicasInicioListas) {
        this.esperarService.esperar();
      }

      //Se actualiza la información de las clínicas.
      this.clinicasService.filtroClinicas(null, null, this.organizacionControl.value).subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan las clínicas en el arreglo de clínicas.
          this.clinicas = respuesta["datos"];

          //Se le asigna el primer valor encontrado al control de clínicas.
          this.clinicaControl.setValue(this.clinicas[0] ? this.clinicas[0]["id"] : "");

        }
        //Si no es la carga inicial se detiene la espera.
        if (this.clinicasInicioListas) {
          this.esperarService.noEsperar();
        }
        //Si se está iniciando la página.
        else{
          this.clinicasInicioListas = true;
          this.cargaInicialLista$.next(this.clinicasInicioListas);
        }

       
      });

    });
  }

  ngAfterViewInit() {

    //El botón de dar de alta estudios se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA ESTUDIO').subscribe((respuesta: boolean) => {
      this.altaEstudios = respuesta["value"];
    });

    //El botón de editar estudios se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('MODIFICAR ESTUDIO').subscribe((respuesta: boolean) => {
      this.editarEstudios = respuesta["value"];
    });

    //El botón de eliminar estudios se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR ESTUDIO').subscribe((respuesta: boolean) => {
      this.eliminarEstudios = respuesta["value"];
    });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroOrganizaciones.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de organizaciones.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroOrganizaciones() {

    this.organizacionesService.filtroOrganizaciones("TODOS").subscribe((respuesta) => {

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se almacenan las organizaciones en el arreglo de organizaciones.
        this.organizaciones = respuesta["datos"];

        //Se le asigna el primer valor encontrado al control de organizaciones.
        this.organizacionControl.setValue(this.organizaciones[0] ? this.organizaciones[0]["id"] : "");
      }

      this.organizacionesInicioListas = true;
      this.cargaInicialLista$.next(this.organizacionesInicioListas);
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

  
    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.organizacionControl.invalid) {
      return;
    } else if (this.clinicaControl.invalid) {
      return;
    } else if (this.estatusEstudio.invalid) {
      return;
    }
    //Inicia la espera de respuesta.
    this.esperarService.esperar();
    //Busca las estudios según los filtros aplicados.
    this.estudiosService.filtroEstudios(
      '0',
      this.estatusEstudio.value,
      this.clinicaControl.value).subscribe((respuesta) => {

        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los estudios en el arreglo de estudios.
          this.estudios = respuesta["datos"];
          this.porcentajeIva = this.estudios[0] ? this.estudios[0]["porcentaje_iva"] : "";
          this.estudiosServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

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
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.estudios = this.estudiosServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarEstatusEstudio.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ACTIVAR o INACTIVAR un estudio.             |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: estudioId = identificador del estudio,        |
  |                         estatus = estatus del estudio.                |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarEstatusEstudio(estudioId: string, estatus: string) {

    //Mensaje que tedrá la confirmación dependiendo del estatus.
    let tituloMensaje: string = estatus == "ACTIVO" ? "Activar estudio." : "Inactivar estudio.";
    let mensaje: string = estatus == "ACTIVO" ? "¿Está seguro de activar el estudio?" : "¿Está seguro de inactivar el estudio?";

    this.utilidadesService.confirmacion(tituloMensaje, mensaje).subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.estudiosService.modificarEstudio(estudioId, "", "", "", "", estatus).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Modificación exitosa.", "El estatus del estudio se modificó satisfactoriamente.");
            this.buscar();
          }

        });
      }
    });
    
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarEstudio.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un estudio.                        |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: estudioId = identificador del estudio.        |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarEstudio(estudioId: string) {

    /*

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar consulta.", "¿Está seguro de eliminar la consulta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarConsulta(consultaId).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Eliminación exitosa", "La consulta se eliminó permanentemente.");
            this.buscar();
          }
        });
      }
    });

    */
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaEstudio.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear estudio.        |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaEstudio() {

    this.rutaNavegacion.navigate(['configuracion', 'alta-estudio']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarEstudio.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar estudio.       |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:  estudioId = identificador del estudio.       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  editarEstudio(estudioId) {
    this.rutaNavegacion.navigateByUrl('configuracion/editar-estudio/' + estudioId);
  }
}
