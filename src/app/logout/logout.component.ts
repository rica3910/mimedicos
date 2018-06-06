/******************************************************************|
|NOMBRE: LogoutComponent.                                          | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene el modal para salirse        |
|             del sistema.                                         |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component'
import { AutenticarService } from '../autenticar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  //Variable que emitirá cuando se pulse al elemento salir del menú.
  @Output() emitirSalir: EventEmitter<string> = new EventEmitter();

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: modalService = contiene los métodos para      |  
  |                                        manipular modals,              |
  |                         autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private modalService: NgbModal,
              private autorizacion: AutenticarService) { }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: salir.                                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que implementa la funcionalidad de abrir modal.  | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  salir() {

    //Si aún no está deslogueado
    if (this.autorizacion.estaConectado()) {

      //Abre el modal de tamaño chico.
      const modalRef = this.modalService.open(DialogoConfirmacionComponent, { size: 'sm' });

      //Define el título del modal.
      modalRef.componentInstance.titulo = "¿Desea salir?";
      //Define la etiqueta del botón de Aceptar.
      modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
      //Define la etiqueta del botón de Cancelar.
      modalRef.componentInstance.etiquetaBotonCancelar = "No";
      //Se retorna el botón pulsado.
      modalRef.result.then((result) => {
        this.emitirSalir.emit(result);
      }, (reason) => { });
    }

  }

}
