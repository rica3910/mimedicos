
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
import { EsperarService } from './esperar.service';
import { UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable';
import { Subject, Observable } from 'rxjs';
import { ConsultasService } from './consultas.service';

interface jsPDFWithPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}

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
|  métodos genéricos,                                                   |
|  esperarService = contiene los métodos para mostrar o no la espera,   |
|  consultasService = contiene los métodos de bd. de las consultas.     |                                                   |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 29/01/2019.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private consultasService: ConsultasService) { }

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
      this.pdf.setFontStyle("normal");
      this.pdf.setFontSize(this.tamanoLetraNormal);
      this.pdf.text(pFormato["fecha"], this.margenDocumento["ancho"], posicionYActual, null, null, "right");
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

  /*----------------------------------------------------------------------|
  |  NOMBRE: imprimirReceta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método presenta la receta en PDF.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    | 
  |  pFechaExpedicion = fecha de expedición de la  |                      |
  |  receta.                                                              |     
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/01/2020.                                                   |    
  |----------------------------------------------------------------------*/
  public imprimirReceta(pConsultaId: string, pRecetaId: string, pFechaExpedicion: string = "" ): Observable<boolean> {

    //Se utiliza para saber si la petición fue correcta o no.
    let subject: Subject<boolean> = new Subject<false>();

    //Se inicia la espera en respuesta del servidor.
    this.esperarService.esperar();
    //Se obtiene la información de la consulta.
    this.consultasService.verConsulta(pConsultaId).subscribe(infoConsulta => {

      //Si NO hubo un error en la obtención de información.
      if (infoConsulta["estado"] === "OK") {

        //Arreglo que contendrá los medicamentos de la receta.
        let medicamentos: Array<any> = new Array();

        //Se obtiene la información de la receta y sus medicamentos
        this.consultasService.verReceta(pRecetaId).subscribe(infoMedicamento => {
          if (infoMedicamento["estado"] === "OK") {

            //Se utiliza este arreglo para alamcenar los medicamentos de la receta.
            let medicamentosSinFormatear: Array<any> = new Array();
            medicamentosSinFormatear = infoMedicamento["datos"];
            medicamentosSinFormatear.forEach(medicamentoSinFormatear => {

              //Lista de los nombres genéricos que conforman el medicamento comercial.
              let nombresMedicamentosGenericos: string = "";

              //Se recorren los medicamentos genéricos.
              medicamentoSinFormatear["nombre_generico"].forEach(medicamentoGenerico => {
                nombresMedicamentosGenericos = nombresMedicamentosGenericos + medicamentoGenerico + ", ";
              });

              //Se le quita la última coma.
              nombresMedicamentosGenericos = nombresMedicamentosGenericos.substring(0, nombresMedicamentosGenericos.length - 2);

              //Se le agregan unos corchetes para diferenciar los medicamentos genéricos del medicamento comercial.
              nombresMedicamentosGenericos = "[" + nombresMedicamentosGenericos + "]";

              //Se almacenan los medicamentos.
              medicamentos.push([medicamentoSinFormatear["nombre_medicamento"] + " " + nombresMedicamentosGenericos, medicamentoSinFormatear["presentacion"], medicamentoSinFormatear["nombre_via_administracion"], medicamentoSinFormatear["dosis"], medicamentoSinFormatear["frecuencia"] + " " + medicamentoSinFormatear["frecuencia_unidad_tiempo_abreviatura"], medicamentoSinFormatear["duracion"] + " " + medicamentoSinFormatear["duracion_unidad_tiempo_abreviatura"], medicamentoSinFormatear["indicaciones_uso"]]);
            });

          }

        },
          error => { },
          () => {

            if (medicamentos.length == 0) {
              //Se finaliza la espera.
              this.esperarService.noEsperar();
              this.utilidadesService.alerta("Receta sin medicamentos", "La receta no contiene medicamentos.");
              subject.next(false);

            }
            else {

              //Se crea un PDF.
              let pdf = new jspdf('p', 'mm', 'letter') as jsPDFWithPlugin;
              //El pdf del servicio es igual al pdf recién creado.
              this.pdf = pdf;
              //Arreglo que dividirá los medicamentos en recetas, de tal forma que quepan en la receta.
              let medicamentosPorReceta: Array<any> = new Array(Array());
              //índice de la receta actual.
              let indiceRecetas: number = 0;
              //Altura del contenido actual de la receta.
              let alturaActualContenidoReceta: number = 0;
              //Altura de las columnas títulos de la tabla.
              let alturaHeader: number = 0;
              //Altura total de donde se puede escribir contenido en la receta.
              const alturaTotalContenidoReceta: number = this.getPosicionContenido()["fin"]["y"] - this.getPosicionContenido()["inicio"]["y"];
              //Títulos de la tabla.
              const titulosTabla: Array<any> = new Array(['Med', 'Presentación', 'V.Admon', 'Dósis', 'Frec', 'Dur', 'Indicaciones']);

              //Primero se va a calcular cuántas recetas van a salir.
              pdf.autoTable({
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                head: titulosTabla,
                body: medicamentos,
                //La tabla se escribirá en el espacio designado para el contenido en la receta.
                startY: this.getPosicionContenido()["inicio"]["y"],
                margin: { bottom: 0 },
                //Se utiliza este evento ya que se dispara antes de que se escriba sobre el documento.
                willDrawCell: data => {

                  //Si es el primer renglón, o sea los títulos.
                  if (data.section == "head") {
                    //Si es la primera columna.
                    if (data.column.index == 0) {
                      //Se obtiene la altura de los títulos de la tabla.
                      alturaHeader = data.row.height;
                      //Se acumula la altura que hasta el momento tiene el contenido de la receta.
                      alturaActualContenidoReceta = alturaHeader;
                    }
                  }
                  //Si la sección no incluye los títulos de las columnas.
                  else if (data.section == "body") {
                    //Si es la primera columna de cada renglón.
                    if (data.column.index == 0) {

                      //Se obtiene el índice del medicamento.
                      let indiceMedicamento: number = data.row.index;
                      //Se actualiza la altura del contenido de la receta.
                      alturaActualContenidoReceta = alturaActualContenidoReceta + data.row.height;

                      //Si ya no hay espacio en la receta.            
                      if (alturaActualContenidoReceta > alturaTotalContenidoReceta) {
                        //Se reinicializa la altura. Asignando nada más la altura de los títulos de la tabla.                       
                        alturaActualContenidoReceta = alturaHeader + data.row.height;
                        //Se establece el próximo índice, es decir, la próxima receta.
                        indiceRecetas = indiceRecetas + 1;
                      }

                      //Si no existe el índice en las recetas guardadas, se crea.
                      if (!medicamentosPorReceta[indiceRecetas]) {
                        medicamentosPorReceta[indiceRecetas] = new Array();
                      }

                      //Se añade el medicamento a la receta.
                      medicamentosPorReceta[indiceRecetas].push(medicamentos[indiceMedicamento]);

                      //Si es el último medicamento por recorrer.
                      if (indiceMedicamento >= medicamentos.length - 1) {
                        //Se recorren las recetas.        
                        medicamentosPorReceta.forEach((receta, index) => {
                          //Al primer elemento no se le agrega página, ya que ya se cuenta con una.
                          if (index != 0) {
                            pdf.addPage();
                          }
                          //Ahora sí. Se crean las recetas correspondientes.
                          pdf.autoTable({
                            theme: 'grid',
                            styles: { fontSize: 8 },
                            headStyles: { halign: 'center', fillColor: [0, 0, 0] },
                            head: titulosTabla,
                            body: receta,
                            startY: this.getPosicionContenido()["inicio"]["y"],
                            margin: { bottom: 0 }
                          });
                        });
                      }

                    }
                  }
                  /*Como la primera llamada es solo para calcular el número de recetas,
                  se retorna falso para que no se escriba nada en el documento.*/
                  return false;
                }
              });

              //Se arma la información del encabezado.    
              let formato: Object = {
                "imagen": infoConsulta["datos"][0]["imagen"],
                "nombreDoctor": "DR." + infoConsulta["datos"][0]["nombres_usuario"],
                "especialidad": "" + infoConsulta["datos"][0]["especialidad"],
                "cedulaProfesional": "CÉDULA PROFESIONAL: " + infoConsulta["datos"][0]["cedula"],
                "escuela": "" + infoConsulta["datos"][0]["institucion"],
                "nombrePaciente": "PACIENTE: " + infoConsulta["datos"][0]["nombres_paciente"],
                "direccion": "" + infoConsulta["datos"][0]["direccion"],
                "entidad": infoConsulta["datos"][0]["nombre_entidad_federativa"] + "," + infoConsulta["datos"][0]["nombre_municipio"] + ", MÉXICO",
                "telefonos": "TELÉFONO: " + infoConsulta["datos"][0]["telefono"],
                "fecha": pFechaExpedicion
              }

              //Se escriben el header y el footer.
              this.formato(formato);

              //Se despliega el reporte.
              pdf.save('receta.pdf');

              //Se termina la espera;
              this.esperarService.noEsperar();

              subject.next(true);
            }
          });
      }
    });

    //Se retorna el observable.
    return subject.asObservable();
  }


}

//Constante que se utilizará para inyectar el servicio.
export const PDF_RECETA_PROVIDERS: Array<any> = [
  { provide: RecetaPDFService, useClass: RecetaPDFService }
];

