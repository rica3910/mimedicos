/******************************************************************|
|NOMBRE: VerRecetaComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver una receta.                      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 21/10/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { UtilidadesService } from '../../utilidades.service';
import { ConsultasService } from '../../consultas.service';
import { map, switchAll, debounceTime } from 'rxjs/operators';
import { AutenticarService } from '../../autenticar.service';
import * as jspdf from 'jspdf';
import { RecetaPDFService } from '../../receta-pdf.service';
import { UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable';

interface jsPDFWithPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css']
})
export class VerRecetaComponent implements OnInit {

  //Identificador de la consulta. Tomada de la url.
  consultaId: string;
  //Identificador de la receta. Tomada de la url.
  recetaId: string;
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
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;
  //Indica que ya se verificó que se pueda eliminar recetas.
  verificarEliminarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda editar recetas.
  verificarEditarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda cancelar recetas.
  verificarCancelarRecetas: boolean = false;
  //Indica que ya se verificó que se pueda expedir recetas.
  verificarExpedirRecetas: boolean = false;
  //Indica que ya se verificó que el usuario pueda manipularRecetas.
  verificarUsuarioPuedeEditarReceta: boolean = false;
  //Indica si el usuario puede editar o manipular la receta.
  usuarioPuedeEditarReceta: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Variable que contendrá las referencias.
  referencias: string;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los medicamentos y sus indicaciones (se utiliza para filtrar).
  medicamentos: Array<any> = [];
  //Almacena los medicamentos de la base de datos.
  medicamentosServidor: Array<any> = [];
  //Variable para almacenar el estatus de la receta.
  estatusReceta: string;
  //Variable para almacenar la fecha de expedición de la receta.
  fechaExpedicion: string;

  /*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA:                                               |
|  rutaNavegacion   = para navegar a otras url's,                       |
|  esperarService = contiene los métodos para mostrar o no la espera,   |
|  utilidadesService = Contiene métodos genéricos y útiles,             |  
|  rutaActual = para obtener los parámetros de la url,                  |
|  consultasService = contiene los métodos de bd. de las consultas,     |                          
|  autenticarService = contiene los métodos de autenticación,           |
|  recetaPDFService = contiene los métodos para generar la receta pdf.  |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 21/10/2019.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private rutaActual: ActivatedRoute,
    private consultasService: ConsultasService,
    private autenticarService: AutenticarService,
    private recetaPDFService: RecetaPDFService) {

    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {
      this.consultaId = params.get("id");
      this.recetaId = params.get("recetaId");

      //Se resetean los valores de verificación.
      this.verificarEliminarRecetas = false;
      this.verificarEditarRecetas = false;
      this.verificarCancelarRecetas = false;
      this.verificarExpedirRecetas = false;
      this.verificarInfoConsulta = false;
      this.verificarUsuarioPuedeEditarReceta = false;

      //Inicia la espera.
      this.esperarService.esperar();

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

      this.autenticarService.usuarioPuedeEditarReceta(this.recetaId).subscribe(respuesta => {
        this.usuarioPuedeEditarReceta = respuesta["value"];
        this.verificarUsuarioPuedeEditarReceta = true;
        this.cargaInicialLista$.next(this.verificarUsuarioPuedeEditarReceta);
      });

      this.consultasService.verReceta(this.recetaId).subscribe(respuesta => {
        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();
        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Se retorna a la lista de recetas.
          this.regresar();
        }
        //Si todo salió bien.
        else {

          //Se almacena la referencia y el estatus (como es la misma en todos los registros, solo se toma la primera).
          if (respuesta["datos"]["length"] > 0) {
            this.referencias = respuesta["datos"][0]["referencias"];
            this.estatusReceta = respuesta["datos"][0]["estatus"];
            //Solo se llenará la fecha de expedición cuando el estatus de la receta sea EXPEDIDO.
            if (this.estatusReceta == "EXPEDIDO") {
              this.fechaExpedicion = respuesta["datos"][0]["fecha_expedicion"];
            }

          }


          //Se almacenan las recetas.
          this.medicamentos = respuesta["datos"];
          this.medicamentosServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

        }
      });

    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarEliminarRecetas &&
        this.verificarEditarRecetas &&
        this.verificarExpedirRecetas &&
        this.verificarCancelarRecetas &&
        this.verificarInfoConsulta &&
        this.verificarUsuarioPuedeEditarReceta) {
        //Finaliza la espera de información.
        this.esperarService.noEsperar();
      }

    });
  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.medicamentosServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.medicamentos = resultados;
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
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de recetas.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de diagnósticos.
    this.rutaNavegacion.navigateByUrl('consultas/lista-recetas/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsultaLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la info de la consulta.              |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: info = información de la consulta.            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsulta(info) {
    this.verificarInfoConsulta = true;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

  /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/09/2019.                                                   |    
    |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.medicamentos = this.medicamentosServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: editarReceta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar receta.        |     
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  editarReceta() {
    //Se abre la pantalla de editar recetas.
    this.rutaNavegacion.navigateByUrl('consultas/editar-receta/' + this.consultaId + "/" + this.recetaId);
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: imprimirReceta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método presenta la receta en PDF.                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/01/2020.                                                   |    
  |----------------------------------------------------------------------*/
  public imprimirReceta() {
    this.recetaPDFService.imprimirReceta(this.consultaId, this.recetaId, this.fechaExpedicion);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: expedirReceta.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que expide una receta y la presenta en PDF.      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/12/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public expedirReceta() {

    //Abre el modal.
    this.utilidadesService.confirmacion("Expedir receta.", "¿Está seguro de expedir la receta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {

        //Se obtiene la fecha acual que irá en el encabezado.
        let fechaActual = new Date();
        //Se formatea para su lectura más cómoda.
        let fechaFormateada: string = this.utilidadesService.formatearFecha({ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }, true);

        //Se intenta imprimir la receta.
        this.recetaPDFService.imprimirReceta(this.consultaId, this.recetaId, fechaFormateada).subscribe(resultadoImprimirReceta => {

          //Se inicia la espera.
          this.esperarService.esperar();
          //Si se imprime la receta.
          if (resultadoImprimirReceta) {
            //Se procede a expedir la receta.
            this.consultasService.editarReceta(this.recetaId, "", "EXPEDIDO").subscribe(respuesta => {
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
                this.utilidadesService.alerta("Expedición exitosa", "La receta se expidió exitosamente.").subscribe(() => {
                  //Se recarga la página para ver los cambios.
                  location.reload();
                });

              }
            });
          }

        });


      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cancelarReceta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que cancela una receta.                          |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/11/2019.                                                   |    
  |----------------------------------------------------------------------*/
  cancelarReceta() {
    //Abre el modal.
    this.utilidadesService.confirmacion("Cancelar receta.", "¿Está seguro de cancelar la receta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.editarReceta(this.recetaId, "", "CANCELADO").subscribe(respuesta => {
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
            this.utilidadesService.alerta("Cancelación exitosa", "La receta se canceló exitosamente.").subscribe(() => {
              location.reload();
            });
          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarReceta.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar una receta.                        |   
    |-----------------------------------------------------------------------|  
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 17/09/2019.                                                   |    
    |----------------------------------------------------------------------*/
  eliminarReceta() {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar receta.", "¿Está seguro de eliminar la receta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarReceta(this.recetaId).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se regresa al listado de recetas.         
            this.utilidadesService.alerta("Eliminación exitosa", "La receta se eliminó permanentemente.").subscribe(() => {
              this.regresar();
            })
          }
        });
      }
    });
  }


}
