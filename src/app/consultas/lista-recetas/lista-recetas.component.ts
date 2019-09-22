/******************************************************************|
|NOMBRE: ListaRecetasComponent.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de diagnósticos.    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 14/09/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { EsperarService } from './../../esperar.service';
import { UtilidadesService } from './../../utilidades.service';
import { ConsultasService } from './../../consultas.service';
import { AutenticarService } from './../../autenticar.service';
import { fromEvent, Subject } from 'rxjs';
import { switchAll, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {

  //Identificador de la consulta. Tomada de la url.
  consultaId: string;
  //Propiedad que indica si el usuario puede dar de alta recetas.
  altaRecetas: boolean = false;
  //Propiedad que indica si el usuario puede eliminar recetas.
  eliminarRecetas: boolean = false;
  //Propiedad que indica si el usuario puede editar recetas.
  editarRecetas: boolean = false;
  //Propiedad que indica si el usuario puede ver recetas.
  verRecetas: boolean = false;
  //Propiedad que indica si el usuario puede expedir recetas.
  expedirRecetas: boolean = false;
  //Propiedad que indica si el usuario puede cancelar recetas.
  cancelarRecetas: boolean = false;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena las recetas de la base de datos pero su información se puede filtrar.
  recetas: JSON[] = [];
  //Almacena las recetas de la base de datos original sin que se filtre su información.
  recetasServidor: JSON[] = [];
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica que ya se verificó que se pueda eliminar recetas.
  verificarEliminarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda dar de alta recetas.
  verificarAltaRecetas: boolean = false;
  //Indica que ya se verificó que se pueda editar recetas.
  verificarEditarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda ver recetas.
  verificarVerRecetas: boolean = false;
  //Indica que ya se verificó que se pueda cancelar recetas.
  verificarCancelarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda expedir recetas.
  verificarExpedirRecetas: boolean = false;
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url´s,                       |
  |  rutaActual = obtiene los parámetros de la url actual,                |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |            
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  consultasService = contiene los métodos de la bd de las consultas,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private consultasService: ConsultasService,
    private autenticarService: AutenticarService) {

    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {

      //Se resetean los valores de verificación.
      this.verificarAltaRecetas = false;
      this.verificarEliminarRecetas = false;
      this.verificarEditarRecetas = false;
      this.verificarVerRecetas = false;
      this.verificarCancelarRecetas = false;
      this.verificarExpedirRecetas = false;
      this.verificarInfoConsulta = false;

      //Obtiene el identificador de la consulta de la url.
      this.consultaId = params.get("id");

      //Se inicia la espera.
      this.esperarService.esperar();

      //El botón de dar de alta recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('ALTA RECETA').subscribe(respuesta => {
        this.altaRecetas = respuesta["value"];
        this.verificarAltaRecetas = true;
        this.cargaInicialLista$.next(this.verificarAltaRecetas);
      });

      //El botón de eliminar recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('ELIMINAR RECETA').subscribe(respuesta => {

        this.eliminarRecetas = respuesta["value"];
        this.verificarEliminarRecetas = true;
        this.cargaInicialLista$.next(this.verificarEliminarRecetas);

      });

      //El botón de editar recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('EDITAR RECETA').subscribe(respuesta => {

        this.editarRecetas = respuesta["value"];
        this.verificarEditarRecetas = true;
        this.cargaInicialLista$.next(this.verificarEditarRecetas);

      });


      //El botón de ver recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('VER RECETA').subscribe(respuesta => {

        this.verRecetas = respuesta["value"];
        this.verificarVerRecetas = true;
        this.cargaInicialLista$.next(this.verificarVerRecetas);

      });

      //El botón de expedir recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('EXPEDIR RECETA').subscribe(respuesta => {

        this.expedirRecetas = respuesta["value"];
        this.verificarExpedirRecetas = true;
        this.cargaInicialLista$.next(this.verificarExpedirRecetas);

      });

      //El botón de cancelar recetas se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('CANCELAR RECETA').subscribe(respuesta => {

        this.cancelarRecetas = respuesta["value"];
        this.verificarCancelarRecetas = true;
        this.cargaInicialLista$.next(this.verificarCancelarRecetas);

      });


    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarAltaRecetas &&
        this.verificarEliminarRecetas &&
        this.verificarEditarRecetas &&
        this.verificarVerRecetas &&
        this.verificarExpedirRecetas &&
        this.verificarCancelarRecetas &&
        this.verificarInfoConsulta) {
        //Inicia la búsqueda de información.
        this.buscar();
      }

    });


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.recetasServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.recetas = resultados;
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

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaReceta.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear receta.         |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaReceta() {    
    //Se abre la pantalla de alta de recetas.
    this.rutaNavegacion.navigateByUrl('consultas/alta-receta/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.recetas = this.recetasServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Busca las recetas de la consulta.
    this.consultasService.listaRecetas(this.consultaId).subscribe(respuesta => {
      
      //Detiene la espera, signo de que ya se obtuvo la información.
      this.esperarService.noEsperar();
      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);

      }
      //Si todo salió bien.
      else {

        //Se almacenan las recetas.
        this.recetas = respuesta["datos"];
        this.recetasServidor = respuesta["datos"];
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();

      }

    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de consultas.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {    
    this.rutaNavegacion.navigateByUrl('consultas/lista-consultas/FINALIZADA');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarReceta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una receta.                        |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: recetaId = identificador de la receta.        |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarReceta(recetaId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar receta.", "¿Está seguro de eliminar la receta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarDiagnostico(recetaId).subscribe(respuesta => {
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
            this.utilidadesService.alerta("Eliminación exitosa", "La receta se eliminó permanentemente.");
            this.buscar();
          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verReceta.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de ver receta.           |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: recetaId = identificador de la receta.        |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  verReceta(recetaId: string) {    
    //Se abre la pantalla de ver receta.
    this.rutaNavegacion.navigateByUrl('consultas/ver-receta/' + this.consultaId + "/" + recetaId);
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarReceta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar receta.        |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: recetaId = identificador de la receta.        |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  editarReceta(recetaId: string) {
    //Se abre la pantalla de editar recetas.
    this.rutaNavegacion.navigateByUrl('consultas/editar-receta/' + this.consultaId + "/" + recetaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsultaLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que avisa que ya se obtuvo la info de la consulta|   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoLista = indica que la info está lista.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsultaLista(infoLista: boolean) {    
    this.verificarInfoConsulta = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }  

}
