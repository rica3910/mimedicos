/******************************************************************|
|NOMBRE: AltaConsultaComponent.                                        | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta citas.                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeahead, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter, NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, Subscription, fromEvent } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { ConsultasService } from '../../consultas.service';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';

@Component({
  selector: 'app-alta-consulta',
  templateUrl: './alta-consulta.component.html',
  styleUrls: ['./alta-consulta.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]

})
export class AltaConsultaComponent implements OnInit {

  //Fecha actual. Se uitilizará para establecer como fecha mínima la fecha de consultas.
  fechaActual: NgbDateStruct;

  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes: { id: string, nombres_paciente: string }[];

  /*Variable que sirve para cuando se le de clic o focus al usuario
  se ejecute el método buscar usuario.*/
  @ViewChild('usuarioNG') usuarioNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del paciente.
  @ViewChild('usuarioHTML') usuarioHTML: ElementRef;
  /*Variable que sirve para cuando se le de clic o focus al paciente
  se ejecute el método buscar paciente.*/
  @ViewChild('pacienteNG') pacienteNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del paciente.
  @ViewChild('pacienteHTML') pacienteHTML: ElementRef;
  //Variable que almacena el control del formulario de la clínica.
  @ViewChild('clinicaHTML') clinicaHTML: ElementRef;
  //Variable que almacena el control del formulario del tipo de consulta.
  @ViewChild('tipoConsultaHTML') tipoConsultaHTML: ElementRef;
  //Variable que reacciona al focus del campo buscar usuario.
  focusBuscarUsuario$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar usuario.
  clickBuscarUsuario$ = new Subject<string>();
  //Variable que reacciona al focus del campo buscar paciente.
  focusBuscarPaciente$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar paciente.
  clickBuscarPaciente$ = new Subject<string>();
  //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
  formatoUsuarios = (value: any) => value.nombres_usuario;
  //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
  formatoPacientes = (value: any) => value.nombres_paciente;
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de alta de las consultas.
  formAltaConsultas: FormGroup;
  //Objeto del formulario que contendrá al paciente.
  pacienteControl: AbstractControl;
  //Objeto del formulario que contendrá al usuario.
  usuarioControl: AbstractControl;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Propiedad para cuando se oprime el botón de crear consulta.
  pulsarCrear: boolean = false;
  //Objeto del formulario que contendrá a la fecha.
  fechaControl: AbstractControl;
  //Objeto del formulario que contendrá a la hora de inicio de la consulta.
  horaInicioControl: AbstractControl;
  //Objeto del formulario que contendrá a la hora de finalización de la consulta.
  horaFinControl: AbstractControl;
  //Objeto del formulario que contendrá el tipo de consulta.
  tipoConsultaControl: AbstractControl;
  //Indica si el filtro de tipos de consultas ya se cargó.
  tiposConsultasInicioListos: boolean = false;
  //Registros de tipos de las consultas que se verán en la vista en el campo de búsqueda de tipos consultas.
  tiposConsultas: Array<JSON>;

  /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      | 
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para navegar a otras url's,                           |
    |  usuariosService = contiene los métodos de la bd de los usuarios,     | 
    |  pacientesService = Contiene los métodos de mto. de pacientes,        |
    |  modalService = contiene los métodos para manipular modals,           |
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  utilidadesService = Contiene métodos genéricos y útiles,             |
    |  clinicasService = contiene los métodos de la bd de las clínicas,     |
    |  consultasService = contiene los métodos de la bd de las consultas.   |                                
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |    
    |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private clinicasService: ClinicasService,
    private consultasService: ConsultasService) {

    //Al calendario se le establece la fecha actual.
    let fechaActual = new Date();  
    this.fechaActual = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };  

    //Se agregan las validaciones al formulario de alta de consultas.
    this.formAltaConsultas = fb.group({
      'usuario': ['', Validators.required],
      'paciente': ['', Validators.required],
      'clinica': ['', [Validators.required]],
      'tipoConsulta': ['', [Validators.required]],
      'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
      'horaInicio': [{ hour: fechaActual.getHours(), minute: 0 }],
      'horaFin': [{ hour: fechaActual.getHours(), minute: 0 }]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formAltaConsultas.controls['usuario'];
    this.pacienteControl = this.formAltaConsultas.controls['paciente'];
    this.clinicaControl = this.formAltaConsultas.controls['clinica'];
    this.fechaControl = this.formAltaConsultas.controls['fecha'];
    this.horaInicioControl = this.formAltaConsultas.controls['horaInicio'];
    this.horaFinControl = this.formAltaConsultas.controls['horaFin'];
    this.tipoConsultaControl = this.formAltaConsultas.controls['tipoConsulta'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan los usuarios en su filtro.
    this.filtroUsuarios();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas(0);
    //Se cargan los tipos de consultas.
    this.filtroTiposConsultas();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas &&
        this.tiposConsultasInicioListos) {
        //Se detiene la espera.
        this.esperarService.noEsperar();
      }

    });




  }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroUsuarios.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroUsuarios() {

    //Intenta obtener los usuarios del usuario ingresado.
    this.usuariosService.filtroUsuarios()
      .subscribe((respuesta) => {

        //Indica que el filtro de usuarios ya se cargó.
        this.usuariosListos = true;
        this.cargaInicialLista$.next(this.usuariosListos);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los uusuarios en el arreglo de usuarios.
          this.usuarios = respuesta["datos"];

        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroPacientes.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroPacientes() {

    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.filtroPacientes()
      .subscribe((respuesta) => {

        this.pacientesInicioListo = true;
        this.cargaInicialLista$.next(this.pacientesInicioListo);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los pacientes en el arreglo de pacientes.
          this.pacientes = respuesta["datos"];

        }
      });


  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroTiposConsultas.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de tipos consultas.        | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroTiposConsultas() {

    //Intenta obtener los registros.
    this.consultasService.filtroTiposConsultas()
      .subscribe((respuesta) => {

        //Indica que el filtro ya se cargó.
        this.tiposConsultasInicioListos = true;
        this.cargaInicialLista$.next(this.tiposConsultasInicioListos);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los tipos de las consultas en el arreglo de tipos consultas.
          this.tiposConsultas = respuesta["datos"];
          //Se inicializa el select con el primer valor encontrado.
          this.tipoConsultaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
        }
      });

  }

  /*----------------------------------------------------------------------|
    |  NOMBRE: buscarUsuario.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para buscar un usuario.                          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |   
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |    
    |----------------------------------------------------------------------*/
  buscarUsuario = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.
    const clicksWithClosedPopup$ = this.clickBuscarUsuario$.pipe(filter(() => !this.usuarioNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.usuarios
        : this.usuarios.filter(usuario => usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

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
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscarPaciente = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.
    const clicksWithClosedPopup$ = this.clickBuscarPaciente$.pipe(filter(() => !this.pacienteNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === '' ? this.pacientes
          : this.pacientes.filter(paciente =>
            paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoPaciente.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo paciente.                               |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoPaciente() {

    //Se limpia la caja de texto y su valor.
    this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
    this.pacienteControl.setValue("");
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoUsuario.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo usuario.                                |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoUsuario() {
    //Se limpia la caja de texto y su valor.
    this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
    this.usuarioControl.setValue("");
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroClinicas.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
  |  esperar = para saber si se despliega el modal de espera.             |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroClinicas(organizacionId: number, esperar: boolean = false) {

    //Si esperar es verdadero, entonces se abre el modal de espera.
    esperar ? this.esperarService.esperar() : null;

    this.clinicasService.filtroClinicas(organizacionId).subscribe((respuesta) => {

      //Solo se realiza al recargar la página.
      if (!esperar) {
        this.clinicasInicioListas = true;
        this.cargaInicialLista$.next(this.clinicasInicioListas);
      }

      //Si esperar es verdadero, entonces se cierra el modal de espera.
      esperar ? this.esperarService.noEsperar() : null;

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se almacenan las clínicas en el arreglo de clínicas.
        this.clinicas = respuesta["datos"];
        //Se inicializa el select con el primer valor encontrado.
        this.clinicaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de consultas.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaConsulta.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una consulta.                   | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaConsulta() {

    //Se pulsa el botón  de dar de alta consulta.
    this.pulsarCrear = true;

    //Se almacena las horas y la fecha.
    let horaInicio: NgbTimeStruct = this.horaInicioControl.value;
    let horaFin: NgbTimeStruct = this.horaFinControl.value;
    let fechaConsulta: NgbDateStruct = this.fechaControl.value;

    const fechaActual: Date = new Date();

    //Si la fecha y  las horas son inválidas.
    if (
      fechaActual.getFullYear() >= fechaConsulta.year &&
      fechaActual.getMonth() >= fechaConsulta.month &&
      fechaActual.getDay() > fechaConsulta.day) {
      this.utilidadesService.alerta("Fecha inválida","La fecha debe ser mayor o igual a la fecha de hoy.");
      return;
    }
    else if (!horaInicio) {      
      this.utilidadesService.alerta("Hora de comienzo inválida", "Seleccione una hora de comienzo válida.");
      return
    }else if(!horaFin){
      this.utilidadesService.alerta("Hora de finalización inválida", "Seleccione una hora de finalización válida.");
      return
    }else if(horaInicio.hour > horaFin.hour || (horaInicio.hour == horaFin.hour && horaInicio.minute > horaFin.minute)){
      this.utilidadesService.alerta("Horas inválidas", "La hora de comienzo debe ser menor o igual a la hora de finalización.");
      return;
    }

    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.usuarioControl.invalid) {
      this.usuarioHTML.nativeElement.focus();
      return;
    } else if (this.pacienteControl.invalid) {
      this.pacienteHTML.nativeElement.focus();
      return;
    } else if (this.clinicaControl.invalid) {
      this.clinicaHTML.nativeElement.focus();
      return;
    } else if (this.tipoConsultaControl.invalid) {
      this.tipoConsultaHTML.nativeElement.focus();
      return;
    }

    let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
    //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
    if (usuario && !usuario.id) {
      this.utilidadesService.alerta("Usuario inválido", "Seleccione un usuario válido.").subscribe(() => {
        this.usuarioHTML.nativeElement.focus();
      });
      return
    }

    let paciente: { id: string, nombres_usuario: string } = this.pacienteControl.value;
    //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
    if (paciente && !paciente.id) {
      this.utilidadesService.alerta("Paciente inválido", "Seleccione un paciente válido.").subscribe(() => {
        this.pacienteHTML.nativeElement.focus();
      });
      return
    }

    /*Si los elementos del formulario dinámicos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.formAltaConsultas.invalid) {
      return;
    }

    //Se abre el modal de espera.
    this.esperarService.esperar();

  }


}
