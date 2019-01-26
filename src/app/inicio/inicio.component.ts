import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticarService } from '../autenticar.service';
import { EsperarService } from '../esperar.service';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from 'ng-fullcalendar';
import * as jspdf from 'jspdf';
import { strictEqual } from 'assert';
import { UtilidadesService } from '../utilidades.service';

//import { Options } from 'fullcalendar';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  calendarOptions: Object;
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
    private modal: NgbModal,
    private utilidadesService: UtilidadesService) { }

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
      start: '2018-09-16'
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

  dayClick(model: any) {
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

  public reporte() {


    let imagen: string = "data:image/png;base64,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";


    let pdf = new jspdf('p', 'mm', 'letter');

    let propiedadesHoja = {
      ancho: pdf.internal.pageSize.width,
      alto: pdf.internal.pageSize.height,
      alturaRenglon: 5,
      tamanoLetraNormal: 15,
      tamanoCaracter: 15 * 0.185,            
      header: {
        imagen: {
          x: 10,
          y: 15,
          ancho: 20,
          alto: 20
        },
        info: {
          x: 35,
          y: 20
        },
        fecha: {
          x: 180,
          y: 25
        },
        pagina: {
          x: 195,
          y: 20
        },
        linea: {
          xInicio: 10,
          xFin: 205,
          y: 45,          
          ancho: 1
        },        
      },
      footer: {
        y: 250
      },
      contenido: {
        x: 35,
        y: {inicio: 55, fin: 245}
      }
    }

    let fechaActual = new Date();
    let fechaFormateada: String = this.utilidadesService.formatearFecha({ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }, true);

    let numeroPaginas: number = 0;

    pdf.setFontSize(propiedadesHoja.tamanoLetraNormal);
    /*pdf.addPage();
    pdf.addPage();*/
    let textit: string = "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    let lineas: string = pdf.splitTextToSize(textit, 100);
    let tamanoContenido = propiedadesHoja.contenido.y.fin- propiedadesHoja.contenido.y.inicio;
    console.log(pdf.getTextDimensions(lineas));
    
    pdf.text(lineas, 35, 55);
    numeroPaginas = pdf.internal.getNumberOfPages();

    let posicionYActualHeader: number = propiedadesHoja.header.info.y;

    let centroXHoja: number = (propiedadesHoja.ancho / 2);

    for (let i: number = 0; i < numeroPaginas; i++) {

      pdf.setPage(i);
      pdf.addImage(imagen, 'PNG', propiedadesHoja.header.imagen.x, propiedadesHoja.header.imagen.y, propiedadesHoja.header.imagen.ancho, propiedadesHoja.header.imagen.alto);
      pdf.setFontStyle("bold");
      pdf.text(propiedadesHoja.header.info.x, posicionYActualHeader, "Centro Vascular");
      posicionYActualHeader= posicionYActualHeader + propiedadesHoja.alturaRenglon;
      pdf.setFontStyle("normal");
      pdf.text(propiedadesHoja.header.info.x, posicionYActualHeader, "Calle 2a y ojinaga 800");
      posicionYActualHeader= posicionYActualHeader + propiedadesHoja.alturaRenglon;
      pdf.text(propiedadesHoja.header.info.x, posicionYActualHeader, "Col. Centro");
      posicionYActualHeader= posicionYActualHeader + propiedadesHoja.alturaRenglon;
      pdf.text(propiedadesHoja.header.info.x, posicionYActualHeader, "Chihuahua, Chih. México");
      posicionYActualHeader= posicionYActualHeader + propiedadesHoja.alturaRenglon;
      pdf.text(propiedadesHoja.header.info.x, posicionYActualHeader, "Tel: 614-2399668");      
      pdf.text(propiedadesHoja.header.pagina.x, propiedadesHoja.header.pagina.y, pdf.internal.getCurrentPageInfo().pageNumber + "/" + numeroPaginas);    
      pdf.text(propiedadesHoja.header.fecha.x, propiedadesHoja.header.fecha.y, fechaFormateada); 
      pdf.setLineWidth(propiedadesHoja.header.linea.ancho);
      pdf.line(propiedadesHoja.header.linea.xInicio, propiedadesHoja.header.linea.y, propiedadesHoja.header.linea.xFin, propiedadesHoja.header.linea.y);
      posicionYActualHeader = propiedadesHoja.header.info.y;

      let nombre: string = "RICARDO SALVADOR LUNA LOZOYA Y JASDASDas dasd asdas d";      
                           
      let firma = {
        x: {
          inicio: centroXHoja - ((nombre.length / 2) * (propiedadesHoja.tamanoCaracter)),
          fin: centroXHoja + ((nombre.length / 2) * (propiedadesHoja.tamanoCaracter)) 
        },
        linea: {
          ancho: 0.5,
          y: propiedadesHoja.footer.y
        },
        texto: { y: propiedadesHoja.footer.y + 5 },
        imagen: {
          y: propiedadesHoja.footer.y - 40,
          ancho: 40,
          altura: 40
        },
      }
  
      pdf.addImage(imagen, 'PNG', centroXHoja - (firma.imagen.ancho / 2), firma.imagen.y, firma.imagen.ancho, firma.imagen.altura);
      pdf.setLineWidth(firma.linea.ancho);
      pdf.line(firma.x.inicio, firma.linea.y, firma.x.fin, firma.linea.y);            
      pdf.text(nombre, propiedadesHoja.ancho / 2, firma.texto.y, null, null, 'center');
      
    }




    pdf.save('ejemplo.pdf');

  }

}
