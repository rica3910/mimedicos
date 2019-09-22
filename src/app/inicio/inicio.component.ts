/******************************************************************|
|NOMBRE: inicioComponent.                                          | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente de inicio de la aplicación.               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 19/08/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticarService } from '../autenticar.service';
import { EsperarService } from '../esperar.service';
import { UtilidadesService } from '../utilidades.service';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  //Opciones iniciales del calendario.
  calendarOptions: object;
  //Objeto HTML del calendario.
  @ViewChild(CalendarComponent) calendario: CalendarComponent;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  |
  |               esperar      = contiene los métodos para,               |
  |               utilidadesService = Contiene métodos genéricos y útiles,|
  |               rutaNavegacion   = para navegar a otras url's,          |
  |consultasService = contiene los métodos de la bd de las consultas.     |       
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private esperar: EsperarService,
    private utilidadesService: UtilidadesService,
    private rutaNavegacion: Router,
    private consultasService: ConsultasService) { }

  ngOnInit() {

    //Se configura el calendario.
    this.calendarOptions = {
      locale: 'es',
      editable: false,
      eventLimit: false,
      buttonIcons: false,
      allDay: false,
      eventColor: '#00a2e8',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    };

  }


  /*----------------------------------------------------------------------|
 |  NOMBRE: calendarioCargado.                                           |
 |-----------------------------------------------------------------------|
 |  DESCRIPCIÓN: Evento que se lanza cuando el calendario se carga.      |   
 |-----------------------------------------------------------------------|
 |  AUTOR: Ricardo Luna.                                                 |
 |-----------------------------------------------------------------------|
 |  FECHA: 20/08/2019.                                                   |    
 |----------------------------------------------------------------------*/
  calendarioCargado() {

    //Obtiene las consultas.
    this.obtenerConsultas();

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerConsultas.                                            |
  |----------------------------------------------------- -----------------|
  |  DESCRIPCIÓN: Evento que carga las consultas según las fechas.        |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerConsultas() {

    //Se inicia la espera de info.
    this.esperar.esperar();

    //Obtiene la vista del calendario.
    let vista = this.calendario.fullCalendar('getView');
    //Primera fecha visible.
    let fechaInicio = vista.start.format('DDMMYYYY');
    //Última fecha visible.
    let fechaFin = vista.end.format('DDMMYYYY');

    //Se obtienen las consultas para las fechas cargadas.
    this.consultasService.listaConsultas(
      "0",
      "0",
      fechaInicio,
      fechaFin,
      "0",
      "0",
      "0",
      "0").subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Si hay datos.
          if (respuesta["datos"].length > 0) {

            respuesta["datos"].forEach((element, index) => {

              //Titulo que llevará el evento en el calendario.
              let titulo: string = element["nombre_tipo_consulta"] + 
                                  "\nPACIENTE:" + element["nombres_paciente"] + 
                                  "\nMÉDICO:" + element["nombres_usuario"] +
                                  "\nESTATUS:" + element["nombre_estado_consulta"];
              //Descripción que se mostrará al acercar el mouse al evento.
              let descripcion: string = "TIPO DE CONSULTA: " + element["nombre_tipo_consulta"] +
                "\nFECHA Y HORA: " + element["fecha_cita"] + " " + element["hora_inicio_cita"] + " - " + element["hora_fin_cita"] +
                "\nPACIENTE: " + element["nombres_paciente"] +
                "\nMÉDICO: " + element["nombres_usuario"] + 
                "\nESTATUS: " + element["nombre_estado_consulta"]

              //Se crea el evento en el calendario.
              let el = {
                title: titulo,
                start: element["fecha_cita_calendario"] + " " + element["hora_inicio_cita"],
                end: element["fecha_cita_calendario"] + " " + element["hora_fin_cita"],
                description: descripcion,
                consultaId: element["id"]
              }
              //Se carga el evento al calendario.
              this.calendario.fullCalendar('renderEvent', el);

              //Si es la última fecha encontrada.
              if (index + 1 >= respuesta["datos"].length) {
                //Se detiene la espera de info.
                this.esperar.noEsperar();
              }

            });

          }
          //Si no hay consultas.
          else {
            //Se detiene la espera de info.
            this.esperar.noEsperar();
          }

        }

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: eventrender.                                                 |
  |----------------------------------------------------- -----------------|
  |  DESCRIPCIÓN: Evento que carga los tooltips a los días.               |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eventrender(event, element) {
    event.element[0].querySelectorAll(".fc-content")[0].setAttribute("title", event.event.description);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: dayClick.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se ejecuta cuando se le pulsa a un día.      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  dayClick(model: any) {

    //Se obtiene la fecha pulsada.
    /*const clickedDate = new Date(model["date"]).toLocaleString('en-US', { timeZone: 'UTC' }).split(', ');
    //la cadena fecha se convierte a fecha.
    let fechaObtenida = new Date(clickedDate[0]);
    console.log(fechaObtenida.getDate() + "/" + (fechaObtenida.getMonth() + 1) + "/" + fechaObtenida.getFullYear());*/

    //Se obtiene la fecha actual.
    const fechaActual: Date = new Date();

    //Si la fecha es anterior al día actual no se va a la alta de consulta.
    if (fechaActual.getFullYear() >= Number(model["date"].format("YYYY")) &&
      fechaActual.getMonth() + 1 >= Number(model["date"].format("MM")) &&
      fechaActual.getDate() > Number(model["date"].format("DD"))) {
      return;
    }

    //Podrá redirigirse al alta de consulta solamente si el usuario tiene el privilegio.
    this.autorizacion.usuarioTieneDetModulo('ALTA CONSULTA').subscribe((respuesta: boolean) => {
      if (respuesta["value"]) {

        //Se obtiene el tipo de vista (mes, semana o día).
        let tipoVista: string = model["view"]["type"];

        //Hora pulsada.
        let hora = model["date"].format("hhmm");
        //Fecha pulsada.
        let fecha = model["date"].format("DDMMYYYY");

        //Si la vista es mes.
        if (tipoVista == "month") {
          hora = "-1"
          //Se va a la página de alta consulta.
          this.rutaNavegacion.navigateByUrl('consultas/alta-consulta/' + fecha + "/" + hora);
        } else {
          //Se va a la página de alta consulta.
          this.rutaNavegacion.navigateByUrl('consultas/alta-consulta/' + fecha + "/" + hora);
        }
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: clickButton.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se lanza cuando se pulsa cualquier botón.    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  clickButton(model: any) {
    //Se obtienen las consultas según las fechas presentadas.
    this.obtenerConsultas();
  }

  /*----------------------------------------------------------------------|
   |  NOMBRE: eventClick.                                                  |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Evento que se lanza cuando se pulsa a una consulta.     |   
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 19/08/2019.                                                   |    
   |----------------------------------------------------------------------*/
  eventClick(model: any) {
    //Se va al detalle de la consulta.    
    this.rutaNavegacion.navigateByUrl('consultas/ver-consulta/' + model["event"]["consultaId"]);
  }

}
