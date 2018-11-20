import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticarService } from '../autenticar.service';
import { EsperarService } from '../esperar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  displayEvent: any;


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  |
  |                         esperar      = contiene los métodos para      |  
  |                                        abrir modals de espera,        |  
  |                         modal        = contiene los métodos para      |
  |                                        manipular los modals,          |            
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private esperar: EsperarService,
    private modal: NgbModal) { }

  ngOnInit() {

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    let data: any = [{
      title: 'All Day Event',
      start: yearMonth + '-01'
    },
    {
      title: 'Long Event',
      start: yearMonth + '-07',
      end: yearMonth + '-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: yearMonth + '-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: yearMonth + '-16T16:00:00'
    },
    {
      title: 'Conference',
      start: yearMonth + '-11',
      end: yearMonth + '-13'
    },
    {
      title: 'Meeting',
      start: yearMonth + '-12T10:30:00',
      end: yearMonth + '-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: yearMonth + '-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: yearMonth + '-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: yearMonth + '-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: yearMonth + '-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: yearMonth + '-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: yearMonth + '-28'
    },
    {
      title: '16 de septiembre',
      start:  '2018-09-16'
    }];

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: data
    };




  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    /*setTimeout(() => {

      let el = {
        title: 'New event',
        start: '2018-09-16'
      }
      this.ucCalendar.fullCalendar('renderEvent', el);
      this.ucCalendar.fullCalendar('rerenderEvents');
      
    }, 5000);*/


    
  }

  dayClick(model:any){
    console.log(model.date);
  }
  clickButton(model: any) {
    console.log("click ok");
    this.displayEvent = model;
  }
  eventClick(model: any) {
    console.log("click");
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}
