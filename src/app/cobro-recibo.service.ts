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

@Injectable({
  providedIn: 'root'
})
export class CobroReciboService {

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
  constructor(private utilidadesService: UtilidadesService) { }
}

//Constante que se utilizará para inyectar el servicio.
export const COBRO_RECIBO_PROVIDERS: Array<any> = [
  { provide: CobroReciboService, useClass: CobroReciboService }
];
