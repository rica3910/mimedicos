
/******************************************************************|
|NOMBRE: PDFCarta.                                                 | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para generar       |
| un reporte PDF de tamaño carta en vertical.                      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/01/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import { UtilidadesService } from './utilidades.service';

@Injectable()
export class PDFCartaService {

  //Espacio (altura) que habrá entre renglones.
  private espacioEntreRenglones: number = 5;
  //Tamaño de la fuente regular.
  private tamanoLetraNormal: number = 12;
  //Tamaño de un carácter con letra regular o normal. (Pixel por el tamano letra normal).
  private tamanoCaracterNormal: number = this.tamanoLetraNormal * 0.185;
  //Posicion inicial y final donde se escribe el contenido.
  private posicionContenido: object = {
    inicio: {
      x: 15,
      y: 70
    },
    fin: {
      x: 185,
      y: 225
    }
  };

  //Variable que se utilizará para manipular el reporte o documento.
  public pdf: jspdf;

/*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      |          
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: utilidadesService = se utiliza para utilizar  |
|  métodos genéricos.
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 29/01/2019.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService) {}

  /*----------------------------------------------------------------------|
  |  NOMBRE: header.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dibujar o poner un encabezado en el PDF.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  pInfoEncabezado = Contiene la información que llevará el encabezado. |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/01/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public header(pInfoEncabezado: object) {

    //Se obtiene la fecha acual que irá en el encabezado.
    let fechaActual = new Date();
    //Se formatea para su lectura más cómoda.
    let fechaFormateada: String = this.utilidadesService.formatearFecha({ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }, true);

    //Indica la posición en Y actual.
    let posicionYActual: number = 15;
    //Indica la posición en X actual.
    let posicionXActual: number = 10;

    this.pdf.setFontSize(this.tamanoLetraNormal);

    //Imagen.
    let imagen: string= pInfoEncabezado["imagen"]? pInfoEncabezado["imagen"] : "";

    //Se realiza un ciclo para escribir en cada página el número de página actual.
    for (let i: number = 1; i <= this.pdf.internal.getNumberOfPages(); i++) {
      //Se establece la página a la que hay que plancharle el encabezado.
      this.pdf.setPage(i);
      //Se resetean los valores de posiciones.
      posicionYActual = 15;
      posicionXActual = 10;
      //Se agrea el logo a cada página.
      //Se agrega la firma digitalizada en caso de que exista.      
      imagen.length > 0 ? this.pdf.addImage(imagen, 'PNG', posicionXActual, posicionYActual, 20, 20) : null;
      //this.pdf.addImage(pInfoEncabezado["imagen"], 'PNG', posicionXActual, posicionYActual, 20, 20);
      //Se establecen las posiciones de X y Y.
      posicionYActual = 20;
      posicionXActual = 35;
      //Se pondrá en negritas el nombre de la organización.
      this.pdf.setFontStyle("bold");
      this.pdf.text(posicionXActual, posicionYActual, pInfoEncabezado["organizacion"]);
      posicionYActual = posicionYActual + 5;
      //La información restante se pondrá en letra regular o normal.
      this.pdf.setFontStyle("normal");
      //Dirección.
      this.pdf.text(posicionXActual, posicionYActual, pInfoEncabezado["direccion"]);
      posicionYActual = posicionYActual + 5;
      //Ciudad, estado y país.            
      this.pdf.text(posicionXActual, posicionYActual, pInfoEncabezado["estado"]);
      posicionYActual = posicionYActual + 5;
      //Teléfono.
      this.pdf.text(posicionXActual, posicionYActual, pInfoEncabezado["telefono"]);
      posicionYActual = posicionYActual + 5;
      //Línea.
      this.pdf.setLineWidth(0.5);
      posicionXActual = 10;
      this.pdf.line(posicionXActual, posicionYActual, 205, posicionYActual);
      posicionYActual = posicionYActual + 10;
      //Formulario.      
      this.pdf.setFontStyle("bold");
      this.pdf.setFontSize(16);
      this.pdf.text(this.pdf.internal.pageSize.width / 2, posicionYActual, pInfoEncabezado["nombreFormulario"], null, null, 'center');
      posicionYActual = posicionYActual + 5;
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(14);
      this.pdf.text(this.pdf.internal.pageSize.width / 2, posicionYActual, pInfoEncabezado["descripcionFormulario"], null, null, 'center');      
      posicionYActual = posicionYActual + 5;      
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.text(this.pdf.internal.pageSize.width / 2, posicionYActual, pInfoEncabezado["paciente"], null, null, 'center');      
      //Número de página.
      posicionXActual = 193;
      posicionYActual = 20;
      this.pdf.text(posicionXActual, posicionYActual, this.pdf.internal.getCurrentPageInfo().pageNumber + "/" + this.pdf.internal.getNumberOfPages());
      //Fecha.
      posicionXActual = 180;
      posicionYActual = posicionYActual + 5;
      this.pdf.text(posicionXActual, posicionYActual, fechaFormateada);
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: getPosicionContenido.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las posiciones en X y Y que se      |
  |  utilizarán para escribir contenido en el reporte o PDF.              |                        
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:                                                |  
  |  Se retornan las posiciones del contenido.                            |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/01/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public getPosicionContenido() {
    return this.posicionContenido;
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: header.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dibujar o poner un pie de página en el PDF. |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  pInfoFooter = Contiene la información que llevará el pie de página.  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/01/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public footer(pInfoFooter: object) {

    //Nombre del médico.
    let nombre: string = pInfoFooter["nombre"];
    //Cédula profesional del médico.
    let cedula: string = pInfoFooter["cedula"];
    //Imagen.
    let firma: string= pInfoFooter["firma"];
    //Se obtiene la posición en X del centro de la hoja.
    let centroXHoja: number = (this.pdf.internal.pageSize.width / 2);

    //Se realiza un ciclo para escribir en cada página el número de página actual.
    for (let i: number = 1; i <= this.pdf.internal.getNumberOfPages(); i++) {
      //Se establece la página a la que hay que plancharle el encabezado.
      this.pdf.setPage(i);
      //Se agrega la firma digitalizada en caso de que exista.      
      firma.length > 0 ? this.pdf.addImage(firma, 'PNG', centroXHoja - 15, 220, 30, 30) : null;
      //Se agrega la línea.
      this.pdf.setLineWidth(0.5);
      this.pdf.line(centroXHoja - ((nombre.length / 2) * (this.tamanoCaracterNormal)), 250, centroXHoja + ((nombre.length / 2) * (this.tamanoCaracterNormal)), 250);
      //Se agrega el nombre del médico
      this.pdf.text(nombre, this.pdf.internal.pageSize.width / 2, 255, null, null, 'center');
      this.pdf.text(cedula, this.pdf.internal.pageSize.width / 2, 260, null, null, 'center');      

    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: getEspacioEntreRenglones.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener el ancho que ocupa cada renglón.    |                        
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:                                                |  
  |  Se retorna el ancho del renglón.                                     |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/01/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public getEspacioEntreRenglones() {
    return this.espacioEntreRenglones;
  }  

}

//Constante que se utilizará para inyectar el servicio.
export const PDFCARTA_PROVIDERS: Array<any> = [
  { provide: PDFCartaService, useClass: PDFCartaService }
];
