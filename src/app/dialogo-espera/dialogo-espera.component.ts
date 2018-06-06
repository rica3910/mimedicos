/******************************************************************|
|NOMBRE: DialogoEsperaComponent                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo espera.                             |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 31/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogo-espera',
  templateUrl: './dialogo-espera.component.html',
  styleUrls: ['./dialogo-espera.component.css']
})
export class DialogoEsperaComponent implements OnInit {
  
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
  |  FECHA: 31/05/2018.                                                   |    
  |----------------------------------------------------------------------*/    
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
