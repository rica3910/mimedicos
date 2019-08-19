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
  //Variable que almacenará la cédula profesional del médico.
  cedula: string;  
  //Variable que almacenará la especialidad del médico.
  especialidad: string;    
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

      //Si es la misma consulta no es necesario volver a buscar la información de la misma.
      if (this.consultaId == params.get("id")) {
        this.verificarInfoConsulta = true;
      }
      else {
        this.consultaId = params.get("id");
      }

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
      firma: this.firmaMedico,
      nombre: this.nombresUsuario,
      cedula: "Ced. Prof. " +  this.cedula
    }

    //Se escriben el header y el footer.
    this.pdfCartaService.header(infoEncabezado);
    this.pdfCartaService.footer(infoPiePagina);
        
    //Se despliega el reporte.
    pdf.save('diagnostico.pdf');

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
    //Abreviatura que llevará el médico antes de su nombre. Ej: Dr, Dra.
    let prefijo = infoConsulta["datos"][0]["prefijo"] === null ? "" : infoConsulta["datos"][0]["prefijo"] + " ";
    this.nombresUsuario = prefijo + infoConsulta["datos"][0]["nombres_usuario"];
    this.nombresPaciente = infoConsulta["datos"][0]["nombres_paciente"];
    this.nombreOrganizacion = infoConsulta["datos"][0]["nombre_organizacion"];
    this.entidadFederativaClinica = infoConsulta["datos"][0]["nombre_entidad_federativa"];
    this.municipioClinica = infoConsulta["datos"][0]["nombre_municipio"];
    this.telefonoClinica = infoConsulta["datos"][0]["telefono"] ? infoConsulta["datos"][0]["telefono"] : "";
    this.direccionClinica = infoConsulta["datos"][0]["direccion"];
    this.imagenOrganizacion = infoConsulta["datos"][0]["imagen"];
    this.firmaMedico = infoConsulta["datos"][0]["firma"];
    this.cedula =  infoConsulta["datos"][0]["cedula"] === null ? "" : infoConsulta["datos"][0]["cedula"] + " ";
    this.especialidad =  infoConsulta["datos"][0]["especialidad"] === null ? "" : infoConsulta["datos"][0]["especialidad"] + " ";

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
