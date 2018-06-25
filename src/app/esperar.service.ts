/******************************************************************|
|NOMBRE: Esperar   .                                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio para mostrar un modal cuando se hagan       |
              peticiones al servidor                               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 31/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable } from '@angular/core';
import { NgbModal,NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DialogoEsperaComponent } from './dialogo-espera/dialogo-espera.component';

@Injectable()
export class EsperarService {

  //Propiedad que almacena el modal activo.
  modalRef: NgbModalRef;

  
  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: modalService = contiene los métodos para      |  
  |                                        manipular modals.              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/    
  constructor(private modalService: NgbModal) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: esperar.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal cuando se hace una petición al servidor   |
  |               en signo de espera.                                     |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 31/05/2018.                                                   |    
  |----------------------------------------------------------------------*/ 
  esperar() {

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};

    //No se cierra cuando se pulsa esc.
    modalOption.keyboard = false;
    //No se cierra cuando pulsamos fuera del cuadro de diálogo.
    modalOption.backdrop = 'static';
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal.    
    this.modalRef = this.modalService.open(DialogoEsperaComponent, modalOption);
  }     

  /*----------------------------------------------------------------------|
  |  NOMBRE: noEsperar.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Cierra el modal activo de espera                        |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/ 
  noEsperar(){
    this.modalRef.close();
  }

}

//Constante que se utilizará para inyectar el servicio.
export const WAIT_MODAL_PROVIDERS: Array<any> = [
  { provide: EsperarService, useClass: EsperarService }
];