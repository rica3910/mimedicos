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
import { providerDef } from '@angular/core/src/view';
import { PDFCartaService } from '../../pdfcarta.service';

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
  //Variable que almacenará el nombre del usuario.
  nombresUsuario: string;
  //Variable que almacenará el nombre del paciente.
  nombresPaciente: string;
  //Variable que almacenará el nombre de la organización.
  nombreOrganizacion: string;  
  //Variable que almacenará la imagen o logo de la organización.
  imagenOrganizacion: string;
  //Variable que almacenará la imagen de la firma digitalizada del médico.
  firmaMedico: string;
  //Variable que almacenará el nombre de la entidad federativa de la clínica.
  entidadFederativaClinica: string;
  //Variable que almacenará el municipio de la clínica.
  municipioClinica: string;
  //Variable que almacenará el teléfono.
  telefonoClinica: string;
  //Variable que almacenará la dirección de la clínica.
  direccionClinica: string;
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
    private utilidadesService: UtilidadesService,
    private pdfCartaService: PDFCartaService) {

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

    //Se crea un PDF.
    let pdf = new jspdf('p', 'mm', 'letter');
    //El pdf del servicio se igual al pdf recién creado.
    this.pdfCartaService.pdf = pdf;

    //Posición horizontal inicial del documento.
    let posicionX: number = this.pdfCartaService.getPosicionContenido()["inicio"]["x"];
    //Posición vertical inicial del documento.
    let posicionY: number = this.pdfCartaService.getPosicionContenido()["inicio"]["y"];
    //Ancho del contenido de la página.
    let anchoPagina: number = this.pdfCartaService.getPosicionContenido()["fin"]["x"];
    //Alto del contenido de la página.
    let altoPagina: number = this.pdfCartaService.getPosicionContenido()["fin"]["y"] - posicionY;

    //Se recorren los campos.
    this.campos.forEach(campo => {

      //Si la posición actual en Y rebasa el alto máximo permitido  del contenido.
      if (posicionY >= this.pdfCartaService.getPosicionContenido()["fin"]["y"]) {
        pdf.addPage();
        posicionY = this.pdfCartaService.getPosicionContenido()["inicio"]["y"];
      }

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
        let lineas: Array<string> = pdf.splitTextToSize(campo["valor"], anchoPagina);

        lineas.forEach(linea => {

          pdf.text(linea, this.pdfCartaService.getPosicionContenido()["inicio"]["x"], posicionY);
          posicionY = posicionY + this.pdfCartaService.getEspacioEntreRenglones();

          if (posicionY >= this.pdfCartaService.getPosicionContenido()["fin"]["y"]) {
            posicionY = this.pdfCartaService.getPosicionContenido()["inicio"]["y"];
            pdf.addPage();
          }

        });

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

        posicionY = this.pdfCartaService.getPosicionContenido()["inicio"]["y"];
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        posicionY = posicionY + 5;

        //Se añaden los margenes debidos al PDF para que solo se escriba el HTML en el espacio del contenido.
        let margins = {
          top: posicionY,
          bottom: pdf.internal.pageSize.getHeight() - this.pdfCartaService.getPosicionContenido()["fin"]["y"],
          left: posicionX,
          width: anchoPagina
        };

        //Se añade el HTML al PDF.
        pdf.fromHTML
          (
            campo["valor"] // HTML string or DOM elem ref.
            , posicionX// x coord
            , posicionY // y coord
            , {
              'width': anchoPagina
            }
            , function (medidas) { }
            , margins
          )

      }
      else if (campo["tipo_campo"] == "IMAGEN" ||
        campo["tipo_campo"] == "DIBUJO") {

        posicionY = this.pdfCartaService.getPosicionContenido()["inicio"]["y"];
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(campo["etiqueta"] + ": ", posicionX, posicionY);
        posicionY = posicionY + 5;
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.addImage(campo["archivo"], 'PNG', this.pdfCartaService.getPosicionContenido()["inicio"]["x"], posicionY, anchoPagina, altoPagina - 10);
        posicionY = this.pdfCartaService.getPosicionContenido()["fin"]["y"];

      }

    });

    //Se arma la información del encabezado.
    let imagen: string = "data:image/png;base64,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";
    let infoEncabezado: Object = {
      imagen: this.imagenOrganizacion,
      organizacion: this.nombreOrganizacion,
      direccion: this.direccionClinica,
      estado: this.entidadFederativaClinica + ", " + this.municipioClinica + ". MÉXICO.",
      telefono: this.telefonoClinica,
      nombreFormulario: this.nombreFormulario,
      descripcionFormulario: this.descripcionFormulario,
      paciente: "PACIENTE: "+ this.nombresPaciente
    }

    //Se arma la  información del footer.
    let infoPiePagina: Object = {
      imagen: this.firmaMedico,
      nombre: "DR. " + this.nombresUsuario
    }

    //Se escriben el header y el footer.
    this.pdfCartaService.header(infoEncabezado);
    this.pdfCartaService.footer(infoPiePagina);

    //Se despliega el reporte.
    pdf.save('diagnostico.pdf')

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
  |  NOMBRE: informacionConsulta.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la información de la consulta.       |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoConsulta= contiene la info de la consulta.|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/02/2019.                                                   |    
  |----------------------------------------------------------------------*/
  informacionConsulta(infoConsulta: object) {
    this.nombresUsuario = infoConsulta["datos"][0]["nombres_usuario"];
    this.nombresPaciente = infoConsulta["datos"][0]["nombres_paciente"];
    this.nombreOrganizacion = infoConsulta["datos"][0]["nombre_organizacion"];
    this.entidadFederativaClinica = infoConsulta["datos"][0]["nombre_entidad_federativa"];
    this.municipioClinica = infoConsulta["datos"][0]["nombre_municipio"];
    this.telefonoClinica =  infoConsulta["datos"][0]["telefono"] ? infoConsulta["datos"][0]["telefono"]  : "";
    this.direccionClinica = infoConsulta["datos"][0]["direccion"];
    this.imagenOrganizacion = infoConsulta["datos"][0]["imagen"];
    this.firmaMedico = infoConsulta["datos"][0]["firma"];
    
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
