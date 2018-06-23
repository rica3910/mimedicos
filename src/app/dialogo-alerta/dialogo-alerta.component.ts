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

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogo-alerta',
  templateUrl: './dialogo-alerta.component.html',
  styleUrls: ['./dialogo-alerta.component.css']
})
export class DialogoAlertaComponent implements OnInit {

  //Propiedad para mostrar el título que llevará el cuadro de diálogo.
  public titulo: String;
  //Propiedad para mostrar el mensaje que llevará el cuadro de diálogo.
  public mensaje: String;
  //Etiqueta que tendrá el botón de aceptar o confirmación.
  public etiquetaBotonAceptar: String;
  //Botón HTML aceptar de la alerta.
  @ViewChild("botonAceptar") botonAceptar: ElementRef;

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
  constructor(private activeModal: NgbActiveModal) {}           

  ngOnInit() {
    //Cada vez que se inicie la alerta, se establece el focus en el botón de aceptar.
    this.botonAceptar.nativeElement.focus();
  }
}
