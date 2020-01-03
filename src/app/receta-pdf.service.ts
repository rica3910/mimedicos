
/******************************************************************|
|NOMBRE: RecetaPDFService.                                         | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para generar       |
| una receta PDF.                                                  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 23/12/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import { UtilidadesService } from './utilidades.service';

@Injectable()
export class RecetaPDFService {

  //Tamaño de la fuente regular.
  private tamanoLetraNormal: number = 10;
  //Posicion inicial y final donde se escribe el contenido.
  private posicionContenido: object = {
    inicio: {
      x: 10,
      y: 55
    },
    fin: {
      x: 10,
      y: 110
    }
  };

  //Propiedad para establecer los margenes del documento.
  private margenDocumento: object = {
    ancho: 204,
    alto: 125
  }

  //Variable que se utilizará para manipular el reporte o documento.
  public pdf: jspdf;

  /*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      |          
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: utilidadesService = se utiliza para utilizar  |
|  métodos genéricos.                                                   |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 29/01/2019.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: formato.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dibujar o poner el formato de la receta.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  pFormato = información que llevará el formato de la receta.          |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/12/2019.                                                   |    
  |----------------------------------------------------------------------*/
  public formato(pFormato: object) {

    //Indica la posición en Y actual.
    let posicionYActual: number = 15;
    //Indica la posición en X actual.
    let posicionXActual: number = 10;

    //Imagen.
    let imagen: string = pFormato["imagen"] ? pFormato["imagen"] : "";

    //Se realiza un ciclo para escribir en cada página el formaeto de la receta. (imagen, domicilio, etc).
    for (let i: number = 1; i <= this.pdf.internal.getNumberOfPages(); i++) {

      //Se establece la página a la que hay que plancharle el encabezado.
      this.pdf.setPage(i);
      //Se resetean los valores de posiciones.
      posicionYActual = 15;
      posicionXActual = 10;
      
      //Se agrea el logo a cada página.   
      imagen.length > 0 ? this.pdf.addImage(imagen, 'PNG', posicionXActual, posicionYActual, 20, 20) : null;      

      //Título de la receta en el centro.
      this.pdf.setFontStyle("bold");
      this.pdf.setFontSize(14);
      this.pdf.text("RECETA MÉDICA", this.pdf.internal.pageSize.width / 2, posicionYActual, null, null, 'center');      
      
      //Fecha.      
      //Se obtiene la fecha acual que irá en el encabezado.
      let fechaActual = new Date();
      //Se formatea para su lectura más cómoda.
      let fechaFormateada: String = this.utilidadesService.formatearFecha({ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }, true);
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.text(fechaFormateada, this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 10;

      //Nombre del médico.
      this.pdf.setFontSize(12);
      this.pdf.setFontStyle("bold");            
      this.pdf.text(pFormato["nombreDoctor"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      this.pdf.setFontSize(this.tamanoLetraNormal);
      //especialidad del médico.
      this.pdf.setFontStyle("normal");      
      this.pdf.text(pFormato["especialidad"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Cédula profesional del médico.                
      this.pdf.text(pFormato["cedulaProfesional"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Escuela del médico.                
      this.pdf.text(pFormato["escuela"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Línea superior.
      this.pdf.setLineWidth(0.5);
      posicionXActual = 10;
      this.pdf.line(posicionXActual, posicionYActual, this.margenDocumento["ancho"], posicionYActual);      
      posicionYActual = posicionYActual + 5;
      
      //Paciente.            
      this.pdf.setFontStyle("bold");      
      this.pdf.text(pFormato["nombrePaciente"], posicionXActual, posicionYActual);
      posicionYActual = posicionYActual + 5;   
                
      //Línea inferior.
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.setLineWidth(0.5);      
      posicionXActual = 10;
      posicionYActual = this.margenDocumento["alto"] - 15;
      this.pdf.line(posicionXActual, posicionYActual, this.margenDocumento["ancho"], posicionYActual);
      posicionYActual = posicionYActual + 5;

      //Dirección del consultorio.      
      this.pdf.text(pFormato["direccion"], posicionXActual, posicionYActual);
      posicionYActual = posicionYActual + 5;
      //Entidad federativa.      
      this.pdf.text(pFormato["entidad"], posicionXActual, posicionYActual);
      posicionYActual = posicionYActual + 5;
      //Teléfonos      
      this.pdf.text(pFormato["telefonos"], posicionXActual, posicionYActual);

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
  

}

//Constante que se utilizará para inyectar el servicio.
export const PDF_RECETA_PROVIDERS: Array<any> = [
  { provide: RecetaPDFService, useClass: RecetaPDFService }
];

