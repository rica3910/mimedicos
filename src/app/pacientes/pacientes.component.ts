/******************************************************************|
|NOMBRE: PacientesComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los pacientes    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 01/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../dialogo-alerta/dialogo-alerta.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacientesService = contiene los métodos para  |
  |                                        manipular a los pacientes.     |
  |                         modalService = contiene los métodos para      |  
  |                                        manipular modals.              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private pacientesService: PacientesService,
    private modalService: NgbModal) { }

  ngOnInit() {

    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.obtenerPacientes().subscribe((respuesta) => {
      if (respuesta["estado"] === "ERROR") {

        this._alerta(respuesta["mensaje"]);

      }
    });

  }

/*----------------------------------------------------------------------|
|  NOMBRE: _alerta.                                                     |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
|               de la base de datos en forma de alerta.                 | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 30/05/2018.                                                   |    
|----------------------------------------------------------------------*/
  private _alerta(mensaje: String) {

    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, { centered: true });

    //Define el título del modal.
    modalRef.componentInstance.titulo = "Notificación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

  }

}
