/******************************************************************|
|NOMBRE: infoFichaClinicaComponent.                                 | 
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
import { PacientesService } from '../../pacientes.service';


@Component({
  selector: 'app-info-ficha-clinica',
  templateUrl: './info-ficha-clinica.component.html',
  styleUrls: ['./info-ficha-clinica.component.css']
})
export class InfoFichaClinicaComponent implements OnInit {

  //Variable que se  utilizará como entrada para utilizarse en otro componentes.
  @Input() fichaClinicaId: string;
  //Método que se disparará cuando la información de la ficha clínica esté lista.
  @Output() informacionLista: EventEmitter<boolean>;
  //Método que obtiene la información recolectada de la ficha clínica.
  @Output() informacionFichaClinica: EventEmitter<object>;
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
  |  pacientesService = contiene los métodos de la bd de los pacientes.   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private pacientesService: PacientesService) {
    //Se inicializa el emisor de información lista.
    this.informacionLista = new EventEmitter(false);
    this.informacionFichaClinica = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {    
    this.obtenerInfo();
  }

  ngOnInit() {      
    //this.obtenerInfo();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerInfo.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la información de la ficha clínica. |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  private obtenerInfo() {

    //Se obtiene la información de la ficha clínica.
    this.pacientesService.verFichaClinica(this.fichaClinicaId).subscribe(respuesta => {

      //Se emite el evento de la información lista.
      this.informacionLista.emit(true);
      this.informacionFichaClinica.emit(respuesta);

      //Si NO hubo un error en la obtención de información.
      if (respuesta["estado"] === "OK") {
        this.nombresUsuario = respuesta["datos"][0]["nombres_usuario"];
        this.nombresPaciente = respuesta["datos"][0]["nombres_paciente"];
        this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];
      }

    });
  }


}
