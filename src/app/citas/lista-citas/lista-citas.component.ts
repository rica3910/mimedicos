/******************************************************************|
|NOMBRE: ListaCitasComponent.                                      | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de las citas.       |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTypeahead, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { PacientesService } from '../../pacientes/pacientes.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import {NgbDateStruct, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatePicker, FormatDatePicker } from './../../custom-date-picker';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css'],
  providers: [I18n, 
              {provide: NgbDatepickerI18n, useClass: CustomDatePicker},
              {provide: NgbDateParserFormatter, useClass: FormatDatePicker}]
})
export class ListaCitasComponent  implements OnInit {


  /*Variable que sirve para cuando se le de clic o focus al paciente
  se ejecute el método buscar paciente.*/
  @ViewChild('buscarPacienteNG') buscarPacienteNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del paciente.
  @ViewChild('buscarPacienteHTML') buscarInfoHTML: ElementRef;

  //Variable que reacciona al focus del campo buscar paciente.
  focusBuscarPaciente$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar paciente.
  clickBuscarPaciente$ = new Subject<string>();
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes:  {id: string, nombres_paciente: string}[];  
  //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
  formatoPacientes = (value: any) => value.nombres_paciente;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  pacientesService = Contiene los métodos de mto. de pacientes,        |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  modalService = contiene los métodos para manipular modals,           |
  |  autenticarService = contiene los métodos de autenticación.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private pacientesService: PacientesService,
    private esperarService: EsperarService,
    private modalService: NgbModal,
    private autenticarService: AutenticarService) {


    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()
    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.filtroPacientes()
      .subscribe((respuesta) => {

        //Se termina la espera.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this._alerta(respuesta["mensaje"]);      
        }
        //Si todo salió bien.
        else {

          //Se almacenan los pacientes en el arreglo de pacientes.
          this.pacientes =  respuesta["datos"];
             
        }
      });


  }

  ngOnInit() {
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: buscarPaciente.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para buscar un paciente.                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscarPaciente = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.
    const clicksWithClosedPopup$ = this.clickBuscarPaciente$.pipe(filter(() => !this.buscarPacienteNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ?  this.pacientes
        : this.pacientes.filter(paciente => paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

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
  |  FECHA: 03/08/2018.                                                   |    
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
