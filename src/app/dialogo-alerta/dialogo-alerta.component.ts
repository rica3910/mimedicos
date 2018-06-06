/******************************************************************|
|NOMBRE: DialogoAlertaComponent                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo alerta, es decir, con un botón      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogo-alerta',
  templateUrl: './dialogo-alerta.component.html',
  styleUrls: ['./dialogo-alerta.component.css']
})
export class DialogoAlertaComponent implements OnInit {

  //Propiedad para mostrar el título que llevará el cuadro de diálogo.
  @Input() titulo: String;
  //Propiedad para mostrar el mensaje que llevará el cuadro de diálogo.
  @Input() mensaje: String;
  //Etiqueta que tendrá el botón de aceptar o confirmación.
  @Input() etiquetaBotonAceptar: String;  

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: activeModal = contiene los métodos para       |
  |                                       manipular un modal.             |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/    
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {}
}
