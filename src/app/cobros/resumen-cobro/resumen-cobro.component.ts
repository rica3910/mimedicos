/******************************************************************|
|NOMBRE: ResumenCobroComponent.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene una tabla con la información |
|del resumen del cobro.                                            |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 07/04/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CobrosService } from './../../cobros.service';

@Component({
  selector: 'app-resumen-cobro',
  templateUrl: './resumen-cobro.component.html',
  styleUrls: ['./resumen-cobro.component.css']
})
export class ResumenCobroComponent implements OnInit {

  //Variable que se  utilizará como entrada para utilizarse en otro componentes.
  @Input() cobroId: string;
  //Método que se disparará cuando la información del cobro esté lista.
  @Output() informacionLista: EventEmitter<boolean>;
  //Método que obtiene la información recolectada del cobro.
  @Output() informacionCobro: EventEmitter<object>;
  //Variable que almacenará el estatus del cobro.
  estatus: string;
  //Variable que almacenará el subtotal del cobro.
  subtotal: string;
  //Variable que almacenará el descuento del cobro.
  descuento: string;
  //Variable que almacenará el iva del cobro.
  iva: string;
  //Variable que almacenará el porcentaje del iva del cobro.
  porcentajeIva: string;
  //Variable que almacenará el total del cobro.
  total: string;
  //Variable que almacenará los abonos del cobro.
  abonos: string;
  //Variable que almacenará el saldo del cobro.
  saldo: string;


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobrosService = contiene los métodos de la bd de los cobros.         |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private cobrosService: CobrosService) {
    //Se inicializa el emisor de información lista.
    this.informacionLista = new EventEmitter(false);
    this.informacionCobro = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {    
    this.buscar();
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que busca la información del cobro.              |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/04/2020.                                                  |    
  |----------------------------------------------------------------------*/
  private buscar() {

    //Se obtiene la información del resumen del cobro.
    this.cobrosService.verResumenCobro(this.cobroId).subscribe(respuesta => {

      //Se emite el evento de la información lista.
      this.informacionLista.emit(true);
      this.informacionCobro.emit(respuesta);

      //Si NO hubo un error en la obtención de información.
      if (respuesta["estado"] === "OK") {
        this.estatus = respuesta["datos"][0]["estado_cobro"];
        this.subtotal = respuesta["datos"][0]["subtotal_cobro_formato"];
        this.descuento = respuesta["datos"][0]["descuento_formato"];
        this.iva = respuesta["datos"][0]["iva_formato"];
        this.porcentajeIva = respuesta["datos"][0]["parametro_iva"];
        this.total = respuesta["datos"][0]["total_cobro_formato"];
        this.abonos = respuesta["datos"][0]["abonos_formato"];
        this.saldo = respuesta["datos"][0]["saldo_formato"];
      }

    });
  }

}
