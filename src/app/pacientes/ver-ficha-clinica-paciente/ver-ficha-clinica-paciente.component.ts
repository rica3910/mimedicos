/******************************************************************|
|NOMBRE: verFichaClinicaPaciente.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de fichas clínicas  | 
|             del paciente.                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 05/03/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { EsperarService } from './../../esperar.service';
import { UtilidadesService } from './../../utilidades.service';
import { PacientesService } from './../../pacientes.service';
import { AutenticarService } from './../../autenticar.service';
import { fromEvent, Subject } from 'rxjs';
import { switchAll, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-ver-ficha-clinica-paciente',
  templateUrl: './ver-ficha-clinica-paciente.component.html',
  styleUrls: ['./ver-ficha-clinica-paciente.component.css']
})
export class VerFichaClinicaPacienteComponent implements OnInit {

  //Identificador del paciente. Tomada de la url.
  pacienteId: string;
  //Propiedad que indica si el usuario puede dar de alta fichas clínicas.
  altaFichasClinicas: boolean = false;
  //Propiedad que indica si el usuario puede eliminar fichas clínicas.
  eliminarFichasClinicas: boolean = false;
  //Propiedad que indica si el usuario puede editar fichas clínicas.
  editarFichasClinicas: boolean = false;
  //Propiedad que indica si el usuario puede ver fichas clínicas.
  verFichasClinicas: boolean = false;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los diagnósticos de la base de datos pero su información se puede filtrar.
  fichasClinicas: JSON[] = [];
  //Almacena los diagnósticos de la base de datos original sin que se filtre su información.
  fichasClinicasServidor: JSON[] = [];
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica que ya se verificó que se pueda eliminar fichas clínicas.
  verificarFichasClinicas: boolean = false;
  //Indica que ya se verificó que se pueda dar de alta fichas clínicas.
  verificarAltaFichasClinicas: boolean = false;
  //Indica que ya se verificó que se pueda editar fichas clínicas.
  verificarEditarFichasClinicas: boolean = false;
  //Indica que ya se verificó que se pueda ver fichas clínicas.
  verificarVerFichasClinicas: boolean = false;
  //Indica que ya se verificó que la información del paciente ya está lista.
  verificarInfoPaciente: boolean = false;


  /*----------------------------------------------------------------------|
   |  NOMBRE: constructor.                                                 |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método constructor del componente.                      | 
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE ENTRADA:                                               |
   |  rutaNavegacion   = para navegar a otras url´s,                       |
   |  rutaActual = obtiene los parámetros de la url actual,                |
   |  esperarService = contiene los métodos para mostrar o no la espera,   |            
   |  utilidadesService = Contiene métodos genéricos y útiles,             |
   |  pacientesService = contiene los métodos de la bd de los pacientes,   |
   |  autenticarService = contiene los métodos de autenticación,           |
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 05/03/2018.                                                   |    
   |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private pacientesService: PacientesService,
    private autenticarService: AutenticarService) { }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaFichaClinica.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear ficha clínica.  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaFichaClinica() {
    //Se abre la pantalla de alta de fichas clínicas.
    this.rutaNavegacion.navigateByUrl('pacientes/alta-ficha-clinica/' + this.pacienteId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.fichasClinicas = this.fichasClinicasServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Busca las fichas clínicas del paciente.
    /*this.pacientesService.verFichaClinicaPaciente(this.pacienteId).subscribe(respuesta => {

      //Detiene la espera, signo de que ya se obtuvo la información.
      this.esperarService.noEsperar();
      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);

      }
      //Si todo salió bien.
      else {

        //Se almacenan las fichas clínicas.
        this.fichasClinicas = respuesta["datos"];
        this.fichasClinicasServidor = respuesta["datos"];
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();

      }

    });*/

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarFichaClinica.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una ficha clínica.                 |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fichaClinicaId = identificador                |
  |                                          de la ficha clínica.         | 
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarFichaClinica(fichaClinicaId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar ficha clínica.", "¿Está seguro de eliminar la ficha clínica del paciente?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        /*this.consultasService.eliminarDiagnostico(diagnosticoId).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Eliminación exitosa", "El diagnóstico se eliminó permanentemente.");
            this.buscar();
          }
        });*/
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verFichaClinica                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de ver ficha clínica.    |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacienteId = identificador del paciente,      |
  |                         fichaClinicaId = id de la ficha clínica.      |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  verFichaClinica(fichaClinicaId: string) {    
    //Se abre la pantalla de ver ficha clínica.
    this.rutaNavegacion.navigateByUrl('pacientes/ver-ficha-clinica/' + this.pacienteId + "/" + fichaClinicaId);
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarFichaClinica.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar ficha clínica. |   
  |-----------------------------------------------------------------------|    
  |  PARÁMETROS DE ENTRADA: pacienteId = identificador del paciente,      |
  |                         fichaClinicaId = id de la ficha clínica.      |    
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  editarFichaClinica(fichaClinicaId: string) {
    //Se abre la pantalla de alta de diagnósticos
    this.rutaNavegacion.navigateByUrl('consultas/editar-diagnostico/' + this.pacienteId + "/" + fichaClinicaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoPacienteLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que avisa que ya se obtuvo la info del paciente. |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoLista = indica que la info está lista.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  infoPacienteLista(infoLista: boolean) {
    this.verificarInfoPaciente = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoPaciente);
  }


}