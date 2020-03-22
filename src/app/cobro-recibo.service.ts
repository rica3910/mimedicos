/******************************************************************|
|NOMBRE: CobroReciboService.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para generar       |
| generar un recibo de pago o cobro.                               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 19/03/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import { UtilidadesService } from './utilidades.service';
import { EsperarService } from './esperar.service';
import { UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable';
import { Subject, Observable } from 'rxjs';
import { CobrosService } from './cobros.service';

interface jsPDFWithPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}

@Injectable()
export class CobroReciboService {

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
|  métodos genéricos.
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 19/03/2020.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private cobrosService: CobrosService) { }

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
    |  FECHA: 20/03/2020.                                                   |    
    |----------------------------------------------------------------------*/
  private formato(pFormato: object) {

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
      this.pdf.text("RECIBO DE PAGO", this.pdf.internal.pageSize.width / 2, posicionYActual, null, null, 'center');

      //Fecha.            
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.text(pFormato["fecha"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Dirección del consultorio.      
      this.pdf.text(pFormato["direccion"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;
      //Entidad federativa.      
      this.pdf.text(pFormato["entidad"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;
      //Teléfonos      
      this.pdf.text(pFormato["telefonos"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Línea superior.
      this.pdf.setLineWidth(0.5);
      posicionXActual = 10;
      this.pdf.line(posicionXActual, posicionYActual, this.margenDocumento["ancho"], posicionYActual);
      posicionYActual = posicionYActual + 5;

    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: imprimirRecibo.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método presenta el recibo en PDF.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: cobroId = identificador del cobro.            |      
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/3/2020.                                                   |    
  |----------------------------------------------------------------------*/
  public imprimirRecibo(pCobroId: string): Observable<boolean> {

    //Se utiliza para saber si la petición fue correcta o no.
    let subject: Subject<boolean> = new Subject<false>();

    //Se inicia la espera en respuesta del servidor.
    this.esperarService.esperar();

    //Se obtiene la información de la consulta.
    this.cobrosService.verResumenCobro(pCobroId).subscribe(infoResumenCobro => {

      console.log(infoResumenCobro);

      //Si NO hubo un error en la obtención de información.
      if (infoResumenCobro["estado"] === "OK") {

        //Se crea un PDF.
        let pdf = new jspdf('p', 'mm', 'letter') as jsPDFWithPlugin;
        //El pdf del servicio es igual al pdf recién creado.
        this.pdf = pdf;

        //Se arma la información del encabezado.    
        let formato: Object = {
          "imagen": infoResumenCobro["datos"][0]["imagen"],
          "direccion": infoResumenCobro["datos"][0]["direccion"],
          "entidad": infoResumenCobro["datos"][0]["estado"] + "," + infoResumenCobro["datos"][0]["municipio"] + ", MÉXICO",
          "telefonos":  "TELÉFONO: " + infoResumenCobro["datos"][0]["telefono"],
          "fecha": infoResumenCobro["datos"][0]["ultima_fecha_cobro"]
        }

        //Se escriben el header y el footer.
        this.formato(formato);

        //Se despliega el reporte.
        pdf.save('recibo_pago.pdf');

      }

    });



    //Se retorna el observable.
    return subject.asObservable();
  }

}

//Constante que se utilizará para inyectar el servicio.
export const COBRO_RECIBO_PROVIDERS: Array<any> = [
  { provide: CobroReciboService, useClass: CobroReciboService }
];
