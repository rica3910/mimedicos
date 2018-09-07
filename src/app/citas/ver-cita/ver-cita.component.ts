/******************************************************************|
|NOMBRE: VerCitaComponent.                                         | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver citas.                           |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 05/09/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { UtilidadesService } from '../../utilidades.service';
import { CitasService } from '../../citas.service';
import { fromEvent } from 'rxjs';
import { map, switchAll, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ver-cita',
  templateUrl: './ver-cita.component.html',
  styleUrls: ['./ver-cita.component.css']
})
export class VerCitaComponent implements OnInit {

  //Identificador de la cita tomado de la url.
  citaId: string;
  //Nombre del usuario.
  nombreUsuario: string;
  //Nombre del paciente.
  nombrePaciente: string;
  //Nombre de la clínica.
  nombreClinica: string;
  //Estatus de la cita.
  estatus: string;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los eventos o detalle de las citas de la base de datos pero su información se puede filtrar.
  detCitas: JSON[] = [];
  //Almacena los eventos o detalle de las cita de la base de datos original sin que se filtre su información.
  detCitasServidor: JSON[] = [];

  /*----------------------------------------------------------------------|
 |  NOMBRE: constructor.                                                 |
 |-----------------------------------------------------------------------|
 |  DESCRIPCIÓN: Método constructor del componente.                      | 
 |-----------------------------------------------------------------------|
 |  PARÁMETROS DE ENTRADA:                                               |
 |  rutaNavegacion = para navegar a otras url's,                         |
 |  esperarService = contiene los métodos para mostrar o no la espera,   |
 |  utilidadesService = Contiene métodos genéricos y útiles,             |
 |  citasService = contiene los métodos de la bd de los estados de citas,|
 |  rutaActual: Para obtener los parámetros de la url,                   |                         
 |-----------------------------------------------------------------------|
 |  AUTOR: Ricardo Luna.                                                 |
 |-----------------------------------------------------------------------|
 |  FECHA: 05/09/2018.                                                   |    
 |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private citasService: CitasService,
    private rutaActual: ActivatedRoute) {

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar();

    //Obtiene el identificador de la cita de la url.
    this.rutaActual.paramMap.subscribe(params => {

      this.citaId = params.get("id");

      //Se obtiene la información de la cita.
      this.citasService.verCita(this.citaId, "1").subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]).subscribe(() => {
            //Se retorna al listado de citas.
            this.rutaNavegacion.navigate(['citas', 'lista-citas']);
          })
        }
        //Si todo salió bien.
        else {

          //Se establece el valor del usuario de atención de la cita.
          this.nombreUsuario = respuesta["datos"][0]["nombres_usuario"];

          //Se establece el valor del paciente de la cita.
          this.nombrePaciente = respuesta["datos"][0]["nombres_paciente"];

          //Se establece el valor de la clínica de la cita.             
          this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];

          //Se establece el estatus de la cita.
          this.estatus = respuesta["datos"][0]["estatus"];

          // Se obtienen los eventos o detalle de las citas.
          this.citasService.listaDetCitas(this.citaId, "1").subscribe(respuesta => {

            //Detiene la espera.
            this.esperarService.noEsperar();

            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this.utilidadesService.alerta("Error", respuesta["mensaje"]);
            }
            //Si todo salió bien.
            else {

              this.detCitas = respuesta["datos"];
              this.detCitasServidor = respuesta["datos"];
              //Le da un focus al elemento de búsqueda.
              this.buscarInfoHTML.nativeElement.focus();

            }            
          });

        }

      });


    });
  }

  ngOnInit() {
    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.detCitasServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.detCitas = resultados;
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
  |  DESCRIPCIÓN: Regresa al menú de listado de citas.                    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['citas', 'lista-citas']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.detCitas = this.detCitasServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();

  }




}
