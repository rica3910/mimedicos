/******************************************************************|
|NOMBRE: infoConsultaComponent.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene una tabla con la información |
|de la consulta.                                                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/11/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ConsultasService } from '../../consultas.service';

@Component({
  selector: 'app-info-consulta',
  templateUrl: './info-consulta.component.html',
  styleUrls: ['./info-consulta.component.css']
})
export class InfoConsultaComponent implements OnInit {

  //Variable que se  utilizará como entrada para utilizarse en otro componentes.
  @Input() consultaId: string;
  //Método que se disparará cuando la información de la consulta esté lista.
  @Output() informacionLista: EventEmitter<boolean>;
  //Método que obtiene la información recolectada de la consulta.
  @Output() informacionConsulta: EventEmitter<object>;
  //Variable que almacenará el nombre del usuario.
  nombresUsuario: string;
  //Variable que almacenará el nombre del paciente.
  nombresPaciente: string;
  //Variable que almacenará el nombre de la clínica.
  nombreClinica: string;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultasService = contiene los métodos de la bd de las consultas.   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private consultasService: ConsultasService) {
    //Se inicializa el emisor de información lista.
    this.informacionLista = new EventEmitter(false);
    this.informacionConsulta = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {    
    this.buscar();
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que busca la información de la consulta.         |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 002/08/2019.                                                  |    
  |----------------------------------------------------------------------*/
  private buscar() {

    //Se obtiene la información de la consulta.
    this.consultasService.verConsulta(this.consultaId).subscribe(respuesta => {

      //Se emite el evento de la información lista.
      this.informacionLista.emit(true);
      this.informacionConsulta.emit(respuesta);

      //Si NO hubo un error en la obtención de información.
      if (respuesta["estado"] === "OK") {
        this.nombresUsuario = respuesta["datos"][0]["nombres_usuario"];
        this.nombresPaciente = respuesta["datos"][0]["nombres_paciente"];
        this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];
      }

    });
  }

}
