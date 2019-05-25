/******************************************************************|
|NOMBRE: AltaFichaClinicaPacienteComponent.                        | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que inserta un diagnóstico a la consulta. |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/04/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { UtilidadesService } from './../../utilidades.service';
import { FormBuilder } from '@angular/forms';
import { EsperarService } from './../../esperar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormulariosService } from './../../formularios.service';
import { Subject } from 'rxjs';
import { PacientesService } from '../../pacientes.service';


@Component({
  selector: 'app-alta-ficha-clinica-paciente',
  templateUrl: './alta-ficha-clinica-paciente.component.html',
  styleUrls: ['./alta-ficha-clinica-paciente.component.css']
})
export class AltaFichaClinicaPacienteComponent implements OnInit {

  //Identificador del paciente. Tomado de la url.
  pacienteId: string;
  //Objeto que contendrá el formulario de alta de las fichas clínicas.
  formAltaFichasClinicas: FormGroup;
  //Objeto del formulario que contendrá al formulario.
  formularioControl: AbstractControl;
  //Variable que almacena el control del formulario del formulario.
  @ViewChild('formularioHTML') formularioHTML: ElementRef;
  //Propiedad para cuando se oprime el botón de crear ficha clínica.
  pulsarCrear: boolean = false;
  //Indica si el filtro de formularios ya se cargó.
  filtroFormulariosListo: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Registros de formularios.
  formularios: Array<JSON>;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  consultasService = contiene los métodos de la bd de las consultas,   |
  |  rutaActual = para obtener los parámetros de la url,                  |
  |  formulariosService = contiene métodos de la bd. de formularios,      |
  |  pacientesService = contiene los métodos de bd. de los pacientes.     |                          
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private rutaActual: ActivatedRoute,
    private formularioService: FormulariosService,
    private pacientesService: PacientesService) {

    //Obtiene el identificador del paciente de la url.
    this.rutaActual.paramMap.subscribe(params => {
      this.pacienteId = params.get("id");
    });

    //Se agregan las validaciones al formulario de alta de fichas clínicas.
    this.formAltaFichasClinicas = fb.group({
      'formulario': ['', Validators.required]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.formularioControl = this.formAltaFichasClinicas.controls['formulario'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los formularios.
    this.filtroFormularios();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.filtroFormulariosListo) {
        //Se detiene la espera.
        this.esperarService.noEsperar();
      }

    });

  }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de fichas clínicas.          |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/04/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de fichas clínicas.
    this.rutaNavegacion.navigateByUrl('pacientes/lista-fichas-clinicas-paciente/' + this.pacienteId);
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroFormularios.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de formularios.            | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroFormularios() {

    //Intenta obtener los formularios del usuario logueado.
    this.formularioService.filtroFormularios("ACTIVO", "0")
      .subscribe((respuesta) => {

        this.filtroFormulariosListo = true;
        this.cargaInicialLista$.next(this.filtroFormulariosListo);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los formularios en su select.
          this.formularios = respuesta["datos"];

          //Si los formularios no vienen vacíos.
          if (this.formularios.length > 0) {
            //Se inicializa el select con el primer valor encontrado.
            this.formularioControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
          }

        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaFichaClinica.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una ficha clínica.              | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/04/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaFichaClinica() {

    //Se pulsa el botón  de dar de alta la ficha clínica.
    this.pulsarCrear = true;

    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.formularioControl.invalid) {
      this.formularioHTML.nativeElement.focus();
      return;
    }

    //Se abre el modal de espera.
    this.esperarService.esperar();

    //Se intenta dar de alta la ficha clínica del paciente.
    this.pacientesService.altaFichaClinicaPaciente(this.pacienteId, this.formularioControl.value).subscribe(respuesta => {

       //Se detiene la espera.
       this.esperarService.noEsperar();

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      else {
   
        //Se obtiene el identificador de la ficha clínica recién creado.
        let fichaClinicaId: string = respuesta["mensaje"];        
        this.rutaNavegacion.navigateByUrl('pacientes/editar-ficha-clinica-paciente/' + this.pacienteId + '/' + fichaClinicaId);

      }

    });

  }

}
