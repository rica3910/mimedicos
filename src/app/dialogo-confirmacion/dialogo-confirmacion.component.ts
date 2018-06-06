/******************************************************************|
|NOMBRE: DialogoConfirmacionComponent.                             | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo confirmación, es decir, con dos     |
|             botones.                                             |
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
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit {

  //Propiedad para mostrar el título que llevará el cuadro de diálogo.
  @Input() titulo: String;
  //Etiqueta que tendrá el botón de aceptar o confirmación.
  @Input() etiquetaBotonAceptar: String;
  //Etiqueta que tendrá el botón de cancelar.
  @Input() etiquetaBotonCancelar: String;  

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
