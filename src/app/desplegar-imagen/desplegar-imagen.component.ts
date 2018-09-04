import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-desplegar-imagen',
  templateUrl: './desplegar-imagen.component.html',
  styleUrls: ['./desplegar-imagen.component.css']
})
export class DesplegarImagenComponent implements OnInit {

  //Imagen que se mostrará.
  public imagen: string = "";

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
