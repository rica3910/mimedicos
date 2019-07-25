/******************************************************************|
|NOMBRE: VerFichaClinicaComponent.                                 | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver una ficha clínica.               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { UtilidadesService } from '../../utilidades.service';
import * as jspdf from 'jspdf';
import { PDFCartaService } from '../../pdfcarta.service';
import { PacientesService } from '../../pacientes.service';

@Component({
  selector: 'app-ver-ficha-clinica',
  templateUrl: './ver-ficha-clinica.component.html',
  styleUrls: ['./ver-ficha-clinica.component.css']
})
export class VerFichaClinicaComponent implements OnInit {

  //Identificador del paciente. Tomado de la url.
  pacienteId: string;
  //Identificador de la ficha clínica. Tomado de la url.
  fichaClinicaId: string;
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
  //Variable que almacenará el nombre de la entidad federativa de la clínica.
  entidadFederativaClinica: string;
  //Variable que almacenará el municipio de la clínica.
  municipioClinica: string;
  //Variable que almacenará el teléfono.
  telefonoClinica: string;
  //Variable que almacenará la dirección de la clínica.
  direccionClinica: string;  
  //Indica que ya se verificó que la información de la ficha clínica está lista.
  verificarInfoFichaClinica: boolean = false;
  //Indica que ya se verificó que la información del formulario ya está lista.
  verificarInfoFormulario: boolean = false;
  //Indica que ya se cargó la información de los campos del diagnóstico.
  verificarInfoCamposFichaClinica: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Almacena los campos de la ficha clínica de la base de datos pero su información se puede filtrar.
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
  |  pacientesService = contiene los métodos de la bd de los pacientes,   |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  pdfCartaService = Contiene los métodos para  generar un PDF.         |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private pacientesService: PacientesService,
    private utilidadesService: UtilidadesService,
    private pdfCartaService: PDFCartaService) {
    
    this.rutaActual.paramMap.subscribe(params => {
      
      //Obtiene el identificador del paciente de la url.
      this.pacienteId = params.get("pacienteId");
      //Obtiene el identificador de la ficha clínica de la url.
      this.fichaClinicaId = params.get("fichaClinicaId");
      //Se inicia la espera de respuesta de información.
      this.esperarService.esperar();
      //Se obtiene la información del formulario.
      this.infoFormulario();
    });    

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {      

      //Si todos los filtros e información están listos.
      if (this.verificarInfoFichaClinica &&
        this.verificarInfoFormulario &&
        this.verificarInfoCamposFichaClinica) {          

        //Se resetean los valores de información inicial.
        this.verificarInfoFichaClinica = false;
        this.verificarInfoFormulario = false;
        this.verificarInfoCamposFichaClinica = false;

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
    pdf.save('ficha_clinica.pdf')

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

    this.pacientesService.infoFormularioFichaClinica(this.fichaClinicaId).subscribe(respuesta => {

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

        //Se obtiene la información de la ficha clínica, si es que existe.
        this.pacientesService.informacionFichaClinica(this.fichaClinicaId).subscribe(respuestaInfoFichaClinica => {
          
          //Indica que ya se cargó la info de la ficha clínica.
          this.verificarInfoCamposFichaClinica = true;
          this.cargaInicialLista$.next(this.verificarInfoCamposFichaClinica);

          //Si hubo un error en la obtención de información.
          if (respuestaInfoFichaClinica["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuestaInfoFichaClinica["mensaje"]);
          }
          else {
            //Se almacena la información del diagnóstico.
            this.campos = respuestaInfoFichaClinica["datos"];

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
  |  NOMBRE: infoFichaClinicaLista.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que avisa que ya se obtuvo la info de la ficha.  |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoLista = indica que la info está lista.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoFichaClinicaLista(infoLista: boolean) {
    this.verificarInfoFichaClinica = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoFichaClinica);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: informacionFichaClinica.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la información de la ficha clínica.  |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:infoFichaClinica = contiene la info de la ficha|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/02/2019.                                                   |    
  |----------------------------------------------------------------------*/
  informacionFichaClinica(infoFichaClinica: object) {
    //Abreviatura que llevará el médico antes de su nombre. Ej: Dr, Dra.
    let prefijo = infoFichaClinica["datos"][0]["prefijo"] === null ? "" : infoFichaClinica["datos"][0]["prefijo"] + " ";
    this.nombresUsuario =  prefijo + infoFichaClinica["datos"][0]["nombres_usuario"];
    this.nombresPaciente = infoFichaClinica["datos"][0]["nombres_paciente"];
    this.nombreOrganizacion = infoFichaClinica["datos"][0]["nombre_organizacion"];
    this.entidadFederativaClinica = infoFichaClinica["datos"][0]["nombre_entidad_federativa"];
    this.municipioClinica = infoFichaClinica["datos"][0]["nombre_municipio"];
    this.telefonoClinica =  infoFichaClinica["datos"][0]["telefono"] ? infoFichaClinica["datos"][0]["telefono"]  : "";
    this.direccionClinica = infoFichaClinica["datos"][0]["direccion"];
    this.imagenOrganizacion = infoFichaClinica["datos"][0]["imagen"];
    this.firmaMedico = infoFichaClinica["datos"][0]["firma"];    
    this.cedula =  infoFichaClinica["datos"][0]["cedula"] === null ? "" : infoFichaClinica["datos"][0]["cedula"] + " ";
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de fichas clínicas.          |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de fichas clínicas.
    this.rutaNavegacion.navigateByUrl('pacientes/lista-fichas-clinicas-paciente/' + this.pacienteId);
  }

}
