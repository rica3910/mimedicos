/******************************************************************|
|NOMBRE: VerPacienteComponent.                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver un paciente en específico.       |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 25/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';

@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent implements OnInit {

  //Identificador del paciente obtenido de la url.
  pacienteId: string;
  //Imagen del paciente.
  imagen: string = "../../../assets/img/pacientes/paciente_default.png";
  //Nombres del paciente.
  nombres: string = "";
  //Apellido paterno del paciente.
  apellidoPaterno: string = "";
  //Apellido materno del paciente.
  apellidoMaterno: string = "";
  //Email del paciente.
  email: string = "";
  //Teléfono fijo del pacientre.
  telefono: string = "";
  //Celular del paciente.
  celular: string = "";
  //Estatus del paciente.
  estatus: string = "";

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaActual   = para obtener los parámetros de la url,                |  
  |  rutaNavegacion = para navegar a otras url´s,                         |
  |  utilidadesService = métodos genéricos y útiles,                      |
  |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
  |  esperarService = contiene los métodos para el diálogo de espera.     |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaActual: ActivatedRoute,
    private rutaNavegacion: Router,
    private pacientesService: PacientesService,
    private esperarService: EsperarService) {
  }

  ngOnInit() {


    //Abre el modal de espera.
    this.esperarService.esperar();
    //Obtiene el identificador del paciente de la url.
    this.rutaActual.paramMap.subscribe(params => {
      this.pacienteId = params.get("id");
      //Obtiene la información del indentificador dado.
      this.pacientesService.verPaciente(this.pacienteId).subscribe(resultado => {

        //Se inicializan todas las variables.
        this.nombres = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        this.email = "";
        this.telefono = "";
        this.celular = "";
        this.estatus = "";
        this.imagen = "../../../assets/img/pacientes/paciente_default.png";

        //Detiene la espera.
        this.esperarService.noEsperar();
        //Si la imagen es válida, se despliega en pantalla.
        if (resultado["datos"][0]["imagen"]) {
          this.imagen = resultado["datos"][0]["imagen"];          
        }     
        //Si el nombre del paciente es válido, se despliega en pantalla.
        if (resultado["datos"][0]["nombres"]) {
          this.nombres = resultado["datos"][0]["nombres"];
        }
        //Si el apellido paterno es válido, se despliega en pantalla.
        if (resultado["datos"][0]["apellido_paterno"]) {
          this.apellidoPaterno = resultado["datos"][0]["apellido_paterno"];
        }
        //Si el apellido materno es válido, se despliega en pantalla.
        if (resultado["datos"][0]["apellido_materno"]) {
          this.apellidoMaterno = resultado["datos"][0]["apellido_materno"];
        }
        //Si el email es válido, se despliega en pantalla.
        if (resultado["datos"][0]["email"]) {
          this.email = resultado["datos"][0]["email"];
        }
        //Si el teléfono es válido, se despliega en pantalla.
        if (resultado["datos"][0]["telefono"]) {
          this.telefono = resultado["datos"][0]["telefono"];
        }
        //Si el celular es válido, se despliega en pantalla.
        if (resultado["datos"][0]["celular"]) {
          this.celular = resultado["datos"][0]["celular"];
        }
        //Si el celular es válido, se despliega en pantalla.
        if (resultado["datos"][0]["estatus"]) {
          this.estatus = resultado["datos"][0]["estatus"];
        }
        
      })
    })
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 25/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
  }

}
