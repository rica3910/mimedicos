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
import { error } from 'util';

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
      y: 50
    },
    fin: {
      x: 10,
      y: 205
    }
  };

  //Propiedad para establecer los margenes del documento.
  private margenDocumento: object = {
    ancho: 204,
    alto: 125
  }

  //Variable que se utilizará para manipular el reporte o documento.
  private pdf: jsPDFWithPlugin;

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

      //Número de página.
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.text(this.pdf.internal.getCurrentPageInfo().pageNumber + "/" + this.pdf.internal.getNumberOfPages(), this.margenDocumento["ancho"], posicionYActual, null, null, "right");
      posicionYActual = posicionYActual + 5;

      //Fecha.                 
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
      posicionYActual = posicionYActual + 10;

      //Títulos de la tabla de totales.
      const totales: Array<any> = new Array();
      totales.push(new Array("Estatus", pFormato["estatus"]));
      totales.push(new Array("Subtotal", pFormato["subtotal"]));
      totales.push(new Array("Descuento", pFormato["descuento"]));
      totales.push(new Array("IVA (" + pFormato["porcentajeIva"] + "%)", pFormato["iva"]));
      totales.push(new Array("Total", pFormato["total"]));
      totales.push(new Array("Abonos", pFormato["abonos"]));
      totales.push(new Array("Saldo", pFormato["saldo"]));


      //Totales
      this.pdf.autoTable({
        theme: 'grid',
        styles: { fontSize: 10, halign: 'center' },
        body: totales,
        startY: this.getPosicionContenido()["fin"]["y"] + 5,
        //tableWidth: 30,
        margin: { bottom: 0, left: 100 },
        //Se utiliza este evento ya que se dispara antes de que se escriba sobre el documento.
        didParseCell: data => {
          //Si es la primera columna.
          if (data.column.index == 0) {
            data.cell.styles.fontSize = 12;
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = 'black';
            data.cell.styles.textColor = 'white';
          }
        }

      });

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
  private getPosicionContenido(): any {
    return this.posicionContenido;
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

      //Si NO hubo un error en la obtención de información.
      if (infoResumenCobro["estado"] === "OK") {

        this.cobrosService.verHistorialCobrosReciboCobro(pCobroId).subscribe(infoHistorialCobros => {

          //Si la obtención del historial de cobros fue correcta.
          if (infoHistorialCobros["estado"] === "OK") {

            this.cobrosService.verProductosReciboCobro(pCobroId).subscribe(infoProductos => {

              if (infoProductos["estado"] === "ERROR") {

                //Se finaliza la espera.
                this.esperarService.noEsperar();
                this.utilidadesService.alerta("Error productos.", infoProductos["mensaje"]);
                subject.next(false);

              }
              else {
                //Se crea un PDF.
                let pdf = new jspdf('p', 'mm', 'letter') as jsPDFWithPlugin;
                //El pdf del servicio es igual al pdf recién creado.
                this.pdf = pdf;
                //Arreglo que dividirá los productos del cobro por si no caben en una sola hoja.
                let productosPorRecibo: Array<any> = new Array(Array());
                //Arreglo que dividirá el historial de cobros por si no caben en una sola hoja.
                let historialCobrosPorRecibo: Array<any> = new Array(Array());
                //índice de los productos por recibo.
                let indiceProductosPorRecibo: number = 0;
                //índice del hisstorial de cobros por recibo.
                let indiceHistorialCobroPorRecibo: number = 0;
                //Se utiliza para guardar la última posición en Y de escritura del historial de cobros.
                let posicionUltimoHistorialCobro: number = 0;
                //Se utiliza para almacenar la posición del título de la tabla de historial de cobros.
                let posicionTituloHistorialCobro: number = this.getPosicionContenido()["inicio"]["y"] + 5;
                //Altura del contenido actual del recibo.
                let alturaActualContenidoRecibo: number = posicionTituloHistorialCobro;
                //Altura de las columnas títulos de la tabla.
                let alturaHeader: number = 0;
                //Títulos de la tabla de productos.
                const titulosTablaProductos: Array<any> = new Array(['Producto', 'Cantidad', 'Precio bruto', 'Precio neto']);
                //Títulos de la tabla del historial de cobros.
                const titulosTablaHistorialCobros: Array<any> = new Array(['Fecha', 'Total']);

                //Primero se va a calcular cuántos recibos van a salir a partir del historial de cobros.
                pdf.autoTable({
                  theme: 'grid',
                  styles: { fontSize: 8 },
                  headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                  head: titulosTablaHistorialCobros,
                  body: infoHistorialCobros["datos"],
                  //La tabla se escribirá en el espacio designado para el contenido en la receta.
                  startY: posicionTituloHistorialCobro,
                  margin: { bottom: 0 },
                  //Se utiliza este evento ya que se dispara antes de que se escriba sobre el documento.
                  willDrawCell: data => {

                    //Si es el primer renglón, o sea los títulos.
                    if (data.section == "head") {
                      //Si es la primera columna.
                      if (data.column.index == 0) {
                        //Se obtiene la altura de los títulos de la tabla.
                        alturaHeader = data.row.height;
                        //Se acumula la altura que hasta el momento tiene el contenido del recibo.
                        alturaActualContenidoRecibo = alturaActualContenidoRecibo + alturaHeader;
                      }
                    }
                    //Si la sección no incluye los títulos de las columnas.
                    else if (data.section == "body") {
                      //Si es la primera columna de cada renglón.
                      if (data.column.index == 0) {

                        //Se obtiene el índice del cobro.
                        let indiceCobro: number = data.row.index;
                        //Se actualiza la altura del contenido del cobro.
                        alturaActualContenidoRecibo = alturaActualContenidoRecibo + data.row.height;

                        //Si ya no hay espacio en el recibo.            
                        if (alturaActualContenidoRecibo > this.getPosicionContenido()["fin"]["y"]) {
                          //Se reinicializa la altura. Asignando nada más la altura de los títulos de la tabla.                       
                          alturaActualContenidoRecibo = posicionTituloHistorialCobro + alturaHeader + data.row.height;
                          //Se establece el próximo índice, es decir, el próximo recibo.
                          indiceHistorialCobroPorRecibo = indiceHistorialCobroPorRecibo + 1;
                        }

                        //Si no existe el índice en los recibos guardados, se crea.
                        if (!historialCobrosPorRecibo[indiceHistorialCobroPorRecibo]) {
                          historialCobrosPorRecibo[indiceHistorialCobroPorRecibo] = new Array();
                        }

                        //Se añade el cobro al recibo.
                        historialCobrosPorRecibo[indiceHistorialCobroPorRecibo].push(new Array(infoHistorialCobros["datos"][indiceCobro]["fecha"], infoHistorialCobros["datos"][indiceCobro]["total_formato"]));

                        //Si es el último cobro por recorrer.
                        if (indiceCobro >= infoHistorialCobros["datos"].length - 1) {

                          posicionUltimoHistorialCobro = alturaActualContenidoRecibo + 15;

                          //Si ya no hay espacio en el recibo.            
                          if (posicionUltimoHistorialCobro > this.getPosicionContenido()["fin"]["y"]) {

                            //Se reinicializa la posición donde se escribirá el titulo de PRODUCTOS.
                            posicionUltimoHistorialCobro = posicionTituloHistorialCobro;

                          }

                          alturaActualContenidoRecibo = posicionUltimoHistorialCobro;

                          //Ya se tiene el historial de cobros, ahora se calcularán cuántos recibos saldrían con los productos del cobro.
                          pdf.autoTable({
                            theme: 'grid',
                            styles: { fontSize: 8 },
                            headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                            head: titulosTablaProductos,
                            body: infoProductos["datos"],
                            //La tabla se escribirá en donde se dejó el historial de cobros.
                            startY: posicionUltimoHistorialCobro,
                            margin: { bottom: 0 },
                            //Se utiliza este evento ya que se dispara antes de que se escriba sobre el documento.
                            willDrawCell: data => {

                              //Si es el primer renglón, o sea los títulos.
                              if (data.section == "head") {
                                //Si es la primera columna.
                                if (data.column.index == 0) {
                                  //Se obtiene la altura de los títulos de la tabla.
                                  alturaHeader = data.row.height;
                                  //Se acumula la altura que hasta el momento tiene el contenido del recibo, más la altura de título de "PRODUCTOS".
                                  alturaActualContenidoRecibo = alturaActualContenidoRecibo + alturaHeader + 5;
                                }
                              }
                              //Si la sección no incluye los títulos de las columnas.
                              else if (data.section == "body") {
                                //Si es la primera columna de cada renglón.
                                if (data.column.index == 0) {

                                  //Se obtiene el índice del producto.
                                  let indiceProducto: number = data.row.index;
                                  //Se actualiza la altura del contenido del cobro.
                                  alturaActualContenidoRecibo = alturaActualContenidoRecibo + data.row.height;

                                  //Si ya no hay espacio en el recibo.            
                                  if (alturaActualContenidoRecibo > this.getPosicionContenido()["fin"]["y"]) {

                                    //Se reinicializa la altura. Asignando nada más la altura de los títulos de la tabla.                       
                                    alturaActualContenidoRecibo = posicionTituloHistorialCobro + alturaHeader + data.row.height;
                                    //Se establece el próximo índice, es decir, el próximo recibo.
                                    indiceProductosPorRecibo = indiceProductosPorRecibo + 1;
                                  }

                                  //Si no existe el índice en los recibos guardados, se crea.
                                  if (!productosPorRecibo[indiceProductosPorRecibo]) {
                                    productosPorRecibo[indiceProductosPorRecibo] = new Array();
                                  }

                                  //Se añade el producto al recibo.
                                  productosPorRecibo[indiceProductosPorRecibo].push(new Array(infoProductos["datos"][indiceProducto]["nombre"], infoProductos["datos"][indiceProducto]["cantidad"], infoProductos["datos"][indiceProducto]["precio_bruto_formato"], infoProductos["datos"][indiceProducto]["precio_neto_formato"]));

                                  //Si es el último producto por recorrer.
                                  if (indiceProducto >= infoProductos["datos"].length - 1) {

                                    //Se recorren los cobros       
                                    historialCobrosPorRecibo.forEach((cobro, index) => {
                                      //Al primer elemento no se le agrega página, ya que ya se cuenta con una.
                                      if (index != 0) {
                                        pdf.addPage();
                                      }

                                      //Se escribe el título de la tabla.
                                      this.pdf.setFontStyle("bold");
                                      this.pdf.setFontSize(12);
                                      this.pdf.text("HISTORIAL DE PAGOS", this.pdf.internal.pageSize.width / 2, this.getPosicionContenido()["inicio"]["y"], null, null, 'center');
                                      this.pdf.setFontStyle("normal");
                                      this.pdf.setFontSize(this.tamanoLetraNormal);
                                      //Ahora sí. Se crean los recibos correspondientes.
                                      pdf.autoTable({
                                        theme: 'grid',
                                        styles: { fontSize: 8, halign: 'center' },
                                        headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                                        head: titulosTablaHistorialCobros,
                                        body: cobro,
                                        startY: posicionTituloHistorialCobro,
                                        margin: { bottom: 0 }
                                      });

                                      //Si es el último cobro.
                                      if (index >= historialCobrosPorRecibo.length - 1) {

                                        alturaActualContenidoRecibo = posicionUltimoHistorialCobro;

                                        //Se recorren los productos       
                                        productosPorRecibo.forEach((producto, indiceProducto) => {

                                          //Al primer elemento no se le agrega página, ya que ya se cuenta con una.
                                          if (indiceProducto != 0) {
                                            pdf.addPage();
                                          }

                                          //Se escriben los productos, considerando la última posición de escritura del historial de cobros.
                                          //Se escribe el título de la tabla.
                                          this.pdf.setFontStyle("bold");
                                          this.pdf.setFontSize(12);
                                          this.pdf.text("PRODUCTOS / ESTUDIOS", this.pdf.internal.pageSize.width / 2, alturaActualContenidoRecibo - 5, null, null, 'center');
                                          this.pdf.setFontStyle("normal");
                                          this.pdf.setFontSize(this.tamanoLetraNormal);
                                          pdf.autoTable({
                                            theme: 'grid',
                                            styles: { fontSize: 8, halign: 'center' },
                                            headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                                            head: titulosTablaProductos,
                                            body: producto,
                                            startY: alturaActualContenidoRecibo,
                                            margin: { bottom: 0 }
                                          });

                                          //Se reinicia la altura.
                                          alturaActualContenidoRecibo = posicionTituloHistorialCobro;
                                        });
                                      }

                                    });

                                  }

                                }
                              }
                              //Como la primera llamada es solo para calcular el número de recetas,
                              //se retorna falso para que no se escriba nada en el documento.
                              return false;
                            }
                          });

                        }

                      }
                    }
                    //Como la primera llamada es solo para calcular el número de recetas,
                    //se retorna falso para que no se escriba nada en el documento.
                    return false;
                  }
                });


                //Se arma la información del encabezado.    
                let formato: Object = {
                  "imagen": infoResumenCobro["datos"][0]["imagen"],
                  "direccion": infoResumenCobro["datos"][0]["direccion"],
                  "entidad": infoResumenCobro["datos"][0]["estado"] + "," + infoResumenCobro["datos"][0]["municipio"] + ", MÉXICO",
                  "telefonos": "TELÉFONO: " + infoResumenCobro["datos"][0]["telefono"],
                  "fecha": infoResumenCobro["datos"][0]["ultima_fecha_cobro"],
                  "estatus": infoResumenCobro["datos"][0]["estado_cobro"],
                  "subtotal": infoResumenCobro["datos"][0]["subtotal_cobro_formato"],
                  "porcentajeIva": infoResumenCobro["datos"][0]["parametro_iva"],
                  "iva": infoResumenCobro["datos"][0]["iva_formato"],
                  "total": infoResumenCobro["datos"][0]["total_cobro_formato"],
                  "abonos": infoResumenCobro["datos"][0]["abonos_formato"],
                  "saldo": infoResumenCobro["datos"][0]["saldo_formato"],
                  "descuento": infoResumenCobro["datos"][0]["descuento"]
                }

                //Se escriben el header y el footer.
                this.formato(formato);

                //Se despliega el reporte.
                pdf.save('recibo_pago.pdf');

                //Se finaliza la espera.
                this.esperarService.noEsperar();
                subject.next(true);
              }

            });

          }
          //Si la obtención del historial de cobros fue incorrecta.
          else {
            //Se finaliza la espera.
            this.esperarService.noEsperar();
            this.utilidadesService.alerta("Error historial cobros.", infoHistorialCobros["mensaje"]);
            subject.error(false);
          }

        });
      }
      //Si hubo un error en el resumen del cobro.
      else {

        //Se finaliza la espera.
        this.esperarService.noEsperar();
        this.utilidadesService.alerta("Error resumen cobro.", infoResumenCobro["mensaje"]);
        subject.next(false);

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
