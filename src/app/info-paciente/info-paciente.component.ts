/******************************************************************|
|NOMBRE: InfoPacienteComponent.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene una tabla con la información |
|del paciente.                                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 27/05/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PacientesService } from '../pacientes.service';

@Component({
  selector: 'app-info-paciente',
  templateUrl: './info-paciente.component.html',
  styleUrls: ['./info-paciente.component.css']
})
export class InfoPacienteComponent implements OnInit {

  //Variable que se  utilizará como entrada para utilizarse en otro componentes.
  @Input() pacienteId: string;
  //Método que se disparará cuando la información de la consulta esté lista.
  @Output() informacionLista: EventEmitter<boolean>;
  //Método que obtiene la información recolectada del paciente.
  @Output() informacionPaciente: EventEmitter<object>;
  //Variable que almacenará el nombre del paciente.
  nombrePaciente: string;
  //Variable que almacenará el correo del paciente.
  email: string;
  //Variable que almacenará el teléfono del paciente.
  telefono: string;
  //Variable que almacenará el celular del paciente.
  celular: string;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  pacientesService = contiene los métodos de la bd de los pacientes.   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 27/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private pacientesService: PacientesService) {
    //Se inicializa el emisor de información lista.
    this.informacionLista = new EventEmitter(false);
    this.informacionPaciente = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {    
    this.buscar();
  }

  ngOnInit() {
    this.buscar();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que busca la información del paciente.           |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 16/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  private buscar() {
    //Se obtiene la información del paciente.
    this.pacientesService.verPaciente(this.pacienteId).subscribe(respuesta => {

      //Se emite el evento de la información lista.
      this.informacionLista.emit(true);
      this.informacionPaciente.emit(respuesta);

      //Si NO hubo un error en la obtención de información.
      if (respuesta["estado"] === "OK") {
        this.nombrePaciente = respuesta["datos"][0]["nombres"] + " " + respuesta["datos"][0]["apellido_paterno"] + " " + respuesta["datos"][0]["apellido_materno"];
        this.email = respuesta["datos"][0]["email"];
        this.telefono = respuesta["datos"][0]["telefono"];
        this.celular = respuesta["datos"][0]["celular"];
      }

    });
  }

}
