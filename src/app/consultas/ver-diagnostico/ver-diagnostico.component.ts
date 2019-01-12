/******************************************************************|
|NOMBRE: VerDiagnosticoComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver un diagnóstico a la consulta.    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 10/12/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { ConsultasService } from '../../consultas.service';
import { UtilidadesService } from '../../utilidades.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ver-diagnostico',
  templateUrl: './ver-diagnostico.component.html',
  styleUrls: ['./ver-diagnostico.component.css']
})
export class VerDiagnosticoComponent implements OnInit {

  //Identificador de la consulta. Tomado de la url.
  consultaId: string;
  //Identificador del diagnóstico. Tomado de la url.
  diagnosticoId: string;
  //Identificador del formulario.
  formularioId: string;
  //Nombre del formulario que se desplegará en el título.
  nombreFormulario: string;
  //Descripción del formulario.
  descripcionFormulario: string;
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;
  //Indica que ya se verificó que la información del formulario ya está lista.
  verificarInfoFormulario: boolean = false;
  //Indica que ya se cargó la información de los campos del diagnóstico.
  verificarInfoDiagnostico: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Almacena los campos del diagnóstico de la base de datos pero su información se puede filtrar.
  campos: JSON[] = [];
  //Propiedad para la configuración del editor de textos.
  editorConfig: any = {
    "editable": false,
    "showToolbar": false,
    "placeholder": ""
  }
  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  rutaActual = para obtener los parámetros de la url,                  |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |  
  |  consultasService = contiene los métodos de la bd de las consultas,   |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private consultasService: ConsultasService,
    private utilidadesService: UtilidadesService) {

    //Obtiene el identificador de la consulta y del diagnóstico de la url.
    this.rutaActual.paramMap.subscribe(params => {

      this.consultaId = params.get("id");
      this.diagnosticoId = params.get("diagnosticoId");
      //Se inicia la espera de respuesta de información.
      this.esperarService.esperar();
      //Se obtiene la información del formulario.
      this.infoFormulario();
    });


    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarInfoConsulta &&
        this.verificarInfoFormulario &&
        this.verificarInfoDiagnostico) {

        //Se resetean los valores de información inicial.
        this.verificarInfoConsulta = false;
        this.verificarInfoFormulario = false;
        this.verificarInfoDiagnostico = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();

      }

    });

  }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: reporte.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que convierte la pantalla actual a un pdf.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/01/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public reporte() {

    //Contenedor del PDF (Será toda la pantalla).
    /*var container = document.getElementById('container');
    html2canvas(container).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 180;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 15;
      pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });*/

    /*var doc = new jspdf('p', 'in', 'letter')
    var loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.'

    // This line works. Try generating PDF.
    let lines = doc.splitTextToSize(loremipsum, 7.5)

    doc.text(0.5, 0.5, lines)
    doc.save('Test.pdf')*/

    let pdf = new jspdf('p', 'mm', 'letter');
    let posicionX: number = 15;
    let posicionY: number = 15;

    this.campos.forEach(campo => {

      if (campo["tipo_campo"] == "ENTERO" ||
        campo["tipo_campo"] == "DECIMAL" ||
        campo["tipo_campo"] == "FECHA" ||
        campo["tipo_campo"] == "HORA") {

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");

        posicionY = posicionY + 5;
        pdf.text(campo["valor"], posicionX, posicionY);
        posicionY = posicionY + 10;

      }
      else if (campo["tipo_campo"] == "TEXTO") {

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");

        posicionY = posicionY + 5;
        let lineas = pdf.splitTextToSize(campo["valor"], 180);
        pdf.text(lineas, posicionX, posicionY);
        posicionY = posicionY + (lineas.length * 5) + 10;

      }
      else if (campo["tipo_campo"] == "LISTA") {

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");

        posicionY = posicionY + 5;
        pdf.text(campo["valor_completo"], posicionX, posicionY);
        posicionY = posicionY + 10;

      }
      else if (campo["tipo_campo"] == "COMENTARIO") {

        var specialElementHandlers = {
          '#bypassme': function (element, renderer) {
            return true;
          }
        };

        posicionY = 15;
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");

        pdf.fromHTML(
          campo["valor"], // HTML string or DOM elem ref.
          0.5, // x coord
          0.5, // y coord
          {
          'width': 180, // max width of content on PDF
          'elementHandlers': specialElementHandlers
          });
       

      }
      else if (campo["tipo_campo"] == "IMAGEN" ||
        campo["tipo_campo"] == "DIBUJO") {

        posicionY = 15;
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.addImage(campo["archivo"], 'PNG', posicionX, posicionY, 180, 180);
        pdf.addPage();
      }

    });

    pdf.save('Test.pdf')


  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoFormulario.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la información del formulario.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoFormulario() {

    this.consultasService.infoFormularioDiagnostico(this.diagnosticoId).subscribe(respuesta => {

      //Indica que ya se cargó la info del formulario.
      this.verificarInfoFormulario = true;
      this.cargaInicialLista$.next(this.verificarInfoFormulario);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se le asigna el valor obtenido en la BD del nombre del formulario y de la descripción.
        this.formularioId = respuesta["datos"][0]["formulario_id"];
        this.nombreFormulario = respuesta["datos"][0]["nombre"];
        this.descripcionFormulario = respuesta["datos"][0]["descripcion"];

        //Se obtiene la información del diagnóstico, si es que existe.
        this.consultasService.informacionDiagnostico(this.diagnosticoId).subscribe(respuestaInfoDiagnostico => {

          //Indica que ya se cargó la info del diagnóstico.
          this.verificarInfoDiagnostico = true;
          this.cargaInicialLista$.next(this.verificarInfoDiagnostico);

          //Si hubo un error en la obtención de información.
          if (respuestaInfoDiagnostico["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuestaInfoDiagnostico["mensaje"]);
          }
          else {
            //Se almacena la información del diagnóstico.
            this.campos = respuestaInfoDiagnostico["datos"];
            this.campos.forEach(campo => {
              //Se decodifica las imágenes para que puedan ser visualizadas.
              if (campo["tipo_campo"] == "IMAGEN" || campo["tipo_campo"] == "DIBUJO") {
                campo["archivo"] = atob(campo["archivo"]);
              }
            });
          }

        });

      }

    });
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
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsultaLista(infoLista: boolean) {
    this.verificarInfoConsulta = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de diagnósticos.             |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de diagnósticos.
    this.rutaNavegacion.navigateByUrl('consultas/lista-diagnosticos/' + this.consultaId);
  }

}
