/******************************************************************|
|NOMBRE: ListaDiagnosticosComponent.                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de diagnósticos.    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 09/11/2018.                                                |
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
  selector: 'app-lista-diagnosticos',
  templateUrl: './lista-diagnosticos.component.html',
  styleUrls: ['./lista-diagnosticos.component.css']
})
export class ListaDiagnosticosComponent implements OnInit {

  //Identificador de la consulta. Tomada de la url.
  consultaId: string;
  //Propiedad que indica si el usuario puede dar de alta diagnósticos.
  altaDiagnosticos: boolean = false;
  //Propiedad que indica si el usuario puede eliminar diagnósticos.
  eliminarDiagnosticos: boolean = false;
  //Propiedad que indica si el usuario puede editar diagnósticos.
  editarDiagnosticos: boolean = false;
  //Propiedad que indica si el usuario puede ver diagnósticos.
  verDiagnosticos: boolean = false;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los diagnósticos de la base de datos pero su información se puede filtrar.
  diagnosticos: JSON[] = [];
  //Almacena los diagnósticos de la base de datos original sin que se filtre su información.
  diagnosticosServidor: JSON[] = [];
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica que ya se verificó que se pueda eliminar diagnósticos.
  verificarEliminarDiagnosticos: boolean = false;
  //Indica que ya se verificó que se pueda dar de alta diagnósticos.
  verificarAltaDiagnosticos: boolean = false;
  //Indica que ya se verificó que se pueda editar diagnósticos.
  verificarEditarDiagnosticos: boolean = false;
  //Indica que ya se verificó que se pueda ver diagnósticos.
  verificarVerDiagnosticos: boolean = false;
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
      this.verificarAltaDiagnosticos = false;
      this.verificarEliminarDiagnosticos = false;
      this.verificarEditarDiagnosticos = false;
      this.verificarVerDiagnosticos = false;
      this.verificarInfoConsulta = false;

      //Obtiene el identificador de la consulta de la url.
      this.consultaId = params.get("id");

      //Se inicia la espera.
      this.esperarService.esperar();      

      //Verificar que consulta está en diagnóstico y el usuario puede crear o eliminar diagnósticos en ella.
      this.autenticarService.usuarioPuedeCrearDiagnosticos(this.consultaId).subscribe(respuesta => {

        //Si la consulta está en diagnóstico.
        if (respuesta["value"]) {
          
          //El botón de dar de alta diagnósticos se hará visible solamente si el usuario tiene el privilegio.
          this.autenticarService.usuarioTieneDetModulo('ALTA DIAGNOSTICO').subscribe(respuesta => {

            this.altaDiagnosticos = respuesta["value"];
            this.verificarAltaDiagnosticos = true;
            this.cargaInicialLista$.next(this.verificarAltaDiagnosticos);

          });

          //El botón de eliminar diagnósticos se hará visible solamente si el usuario tiene el privilegio.
          this.autenticarService.usuarioTieneDetModulo('ELIMINAR DIAGNOSTICO').subscribe(respuesta => {

            this.eliminarDiagnosticos = respuesta["value"];
            this.verificarEliminarDiagnosticos = true;
            this.cargaInicialLista$.next(this.verificarEliminarDiagnosticos);

          });

          //El botón de editar diagnósticos se hará visible solamente si el usuario tiene el privilegio.
          this.autenticarService.usuarioTieneDetModulo('EDITAR DIAGNOSTICO').subscribe(respuesta => {

            this.editarDiagnosticos = respuesta["value"];
            this.verificarEditarDiagnosticos = true;
            this.cargaInicialLista$.next(this.verificarEditarDiagnosticos);

          });

        }
        //Si la consulta no está en diagnóstico.
        else {

          this.altaDiagnosticos = respuesta["value"];
          this.verificarAltaDiagnosticos = true;
          this.cargaInicialLista$.next(this.verificarAltaDiagnosticos);
          this.eliminarDiagnosticos = respuesta["value"];
          this.verificarEliminarDiagnosticos = true;
          this.cargaInicialLista$.next(this.verificarEliminarDiagnosticos);
          this.editarDiagnosticos = respuesta["value"];
          this.verificarEditarDiagnosticos = true;
          this.cargaInicialLista$.next(this.verificarEditarDiagnosticos);
        }

      });

      //El botón de ver diagnósticos se hará visible solamente si el usuario tiene el privilegio.
      this.autenticarService.usuarioTieneDetModulo('VER INFORMACION DIAGNOSTICO').subscribe(respuesta => {

        this.verDiagnosticos = respuesta["value"];
        this.verificarVerDiagnosticos = true;
        this.cargaInicialLista$.next(this.verificarVerDiagnosticos);

      });


    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarAltaDiagnosticos &&
        this.verificarEliminarDiagnosticos &&
        this.verificarEditarDiagnosticos &&
        this.verificarVerDiagnosticos &&
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
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.diagnosticosServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.diagnosticos = resultados;
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
  |  NOMBRE: altaDiagnostico.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear diagnóstico.    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDiagnostico() {
    //Se abre la pantalla de alta de diagnósticos
    this.rutaNavegacion.navigateByUrl('consultas/alta-diagnostico/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.diagnosticos = this.diagnosticosServidor;
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
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Busca los diagnósticos de la consulta.
    this.consultasService.listaDiagnosticos(this.consultaId).subscribe(respuesta => {
      
      //Detiene la espera, signo de que ya se obtuvo la información.
      this.esperarService.noEsperar();
      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);

      }
      //Si todo salió bien.
      else {

        //Se almacenan los diagnósticos.
        this.diagnosticos = respuesta["datos"];
        this.diagnosticosServidor = respuesta["datos"];
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
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {    
    this.rutaNavegacion.navigateByUrl('consultas/lista-consultas/DIAGNOSTICO');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarDiagnostico.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un diagnóstico.                    |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId = identificador del diagnóstico.|
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarDiagnostico(diagnosticoId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar diagnóstico.", "¿Está seguro de eliminar el diagnóstico?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarDiagnostico(diagnosticoId).subscribe(respuesta => {
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
            this.utilidadesService.alerta("Eliminación exitosa", "El diagnóstico se eliminó permanentemente.");
            this.buscar();
          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verDiagnostico.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de ver diagnóstico.      |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId = identificador del diagnóstico.|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  verDiagnostico(diagnosticoId: string) {    
    //Se abre la pantalla de ver diagnóstico.
    this.rutaNavegacion.navigateByUrl('consultas/ver-diagnostico/' + this.consultaId + "/" + diagnosticoId);
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarDiagnostico.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar diagnóstico.   |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId = identificador del diagnóstico.|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarDiagnostico(diagnosticoId: string) {
    //Se abre la pantalla de alta de diagnósticos
    this.rutaNavegacion.navigateByUrl('consultas/editar-diagnostico/' + this.consultaId + "/" + diagnosticoId);
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
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsultaLista(infoLista: boolean) {    
    this.verificarInfoConsulta = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

}
