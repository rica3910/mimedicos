/******************************************************************|
|NOMBRE: AltaCitaComponent.                                        | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta citas.                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 13/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeahead, NgbModalOptions, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter, NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { CitasService } from '../../citas.service';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-alta-cita',
  templateUrl: './alta-cita.component.html',
  styleUrls: ['./alta-cita.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]
})
export class AltaCitaComponent implements OnInit {

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
  @ViewChild('clincaHTML') clincaHTML: ElementRef;
  //Variable que almacena el control del formulario de la actividad.
  @ViewChild('actividadHTML') actividadHTML: ElementRef;

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
  //Objeto que contendrá el formulario de alta de las citas.
  formAltaCitas: FormGroup;
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
  /*Registros de los estados de las citas que se verán en la vista en el campo de búsqueda de
  estados citas.*/
  estadosCitas: Array<JSON>;
  //Objeto del formulario que contendrá a la actividad.
  actividadControl: AbstractControl;
  //Indica si el filtro de estados citas ya cargó.
  estadosCitasListos: boolean = false;
  //Objeto del formulario que contendrá a la fecha.
  fechaControl: AbstractControl;
  //Objeto del formulario que contendrá a la hora.
  horaControl: AbstractControl;
  //Propiedad para cuando se oprime el botón de crear cita.
  pulsarCrear: boolean = false;

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
  |  citasService = contiene los métodos de la bd de los estados de citas |                                
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private clinicasService: ClinicasService,
    private citasService: CitasService) {

    //Al calendario se le establece la fecha actual.
    let fechaActual = new Date();

    //Se agregan las validaciones al formulario de alta de citas.
    this.formAltaCitas = fb.group({
      'usuario': ['', Validators.required],
      'paciente': ['', Validators.required],
      'clinica': ['', [Validators.required]],
      'actividad': ['', Validators.required],
      'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
      'hora': [{ hour: 12, minute: 0 }]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formAltaCitas.controls['usuario'];
    this.pacienteControl = this.formAltaCitas.controls['paciente'];
    this.clinicaControl = this.formAltaCitas.controls['clinica'];
    this.actividadControl = this.formAltaCitas.controls['actividad'];
    this.fechaControl = this.formAltaCitas.controls['fecha'];
    this.horaControl = this.formAltaCitas.controls['hora'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan los usuarios en su filtro.
    this.filtroUsuarios();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas(0);
    //Se cargan los estados de las citas.
    this.filtroEstadosCitas();


    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas &&
        this.estadosCitasListos) {
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
  |  DESCRIPCIÓN: Regresa al menú de listado de citas.                    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['citas', 'lista-citas']);
  }

  /*----------------------------------------------------------------------|
 |  NOMBRE: filtroUsuarios.                                              |
 |-----------------------------------------------------------------------|
 |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               | 
 |-----------------------------------------------------------------------|
 |  AUTOR: Ricardo Luna.                                                 |
 |-----------------------------------------------------------------------|
 |  FECHA: 06/08/2018.                                                   |    
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
          this._alerta(respuesta["mensaje"]);
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
  |  FECHA: 06/08/2018.                                                   |    
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
          this._alerta(respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los pacientes en el arreglo de pacientes.
          this.pacientes = respuesta["datos"];

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
    |  FECHA: 03/08/2018.                                                   |    
    |----------------------------------------------------------------------*/

  private _alerta(mensaje: string): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};

    //No se cierra cuando se pulsa esc.
    modalOption.keyboard = false;
    //No se cierra cuando pulsamos fuera del cuadro de diálogo.
    modalOption.backdrop = 'static';
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, modalOption);
    //Define el título del modal.
    modalRef.componentInstance.titulo = "Notificación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    //Se retorna el botón pulsado.
    modalRef.result.then(() => {
      //Se retorna un nulo, ya que no se espera un resultado.         
      subject.next(null);
    });

    //Se retorna el observable.
    return subject.asObservable();
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
  |  FECHA: 13/08/2018.                                                   |    
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
  |  FECHA: 13/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscarPaciente = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.
    const clicksWithClosedPopup$ = this.clickBuscarPaciente$.pipe(filter(() => !this.pacienteNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.pacientes
        : this.pacientes.filter(paciente => paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoPaciente.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo paciente.                               |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/08/2018.                                                   |    
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
  |  FECHA: 13/08/2018.                                                   |    
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
    |  FECHA: 13/08/2018.                                                   |    
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
        this._alerta(respuesta["mensaje"]);
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
   |  NOMBRE: filtroEstadosCitas.                                          |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para llenar el filtro de estados citas.          | 
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 13/08/2018.                                                   |    
   |----------------------------------------------------------------------*/
  filtroEstadosCitas() {

    this.citasService.filtroEstadosCitas().subscribe((respuesta) => {

      this.estadosCitasListos = true;
      this.cargaInicialLista$.next(this.estadosCitasListos);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this._alerta(respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se almacenan los estados de las citas en el arreglo de estados citas.
        this.estadosCitas = respuesta["datos"];
        //Se inicializa el select con el primer valor encontrado.
        this.actividadControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaCita.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que da de alta una cita.                         |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaCita() {

    //Se pulsa el botón  de dar de alta cita.
    this.pulsarCrear = true;

    //Se almacena la hora y la fecha.
    let hora: NgbTimeStruct = this.horaControl.value;
    let fecha: NgbDateStruct = this.fechaControl.value;

    //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
    if (!hora) {
      this._alerta("Seleccione una hora válida.").subscribe(() => { });
      return
    }

    let paciente: { id: string, nombres_usuario: string } = this.pacienteControl.value;
    //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
    if (paciente && !paciente.id) {
      this._alerta("Seleccione un paciente válido.").subscribe(() => {
        this.pacienteHTML.nativeElement.focus();
      });
      return
    }

    let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
    //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
    if (usuario && !usuario.id) {
      this._alerta("Seleccione un usuario válido.").subscribe(() => {
        this.usuarioHTML.nativeElement.focus();
      });
      return
    }

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (this.usuarioControl.invalid) {
      this.usuarioHTML.nativeElement.focus();
      return;
    } else if (this.pacienteControl.invalid) {
      this.pacienteHTML.nativeElement.focus();
      return;
    } else if (this.clinicaControl.invalid) {
      this.clincaHTML.nativeElement.focus();
      return;
    } else if (this.actividadControl.invalid) {
      this.actividadHTML.nativeElement.focus();
      return;
    }

    let fechaHora: string = this.utilidadesService.formatearFechaHora(fecha, hora, false);

    //Se abre el  modal de espera.
    this.esperarService.esperar();

    this.citasService.usuarioCitaFechaOcupada(this.usuarioControl.value.id, fechaHora).subscribe(respuesta => {

      //Se cierra el  modal de espera.
      this.esperarService.noEsperar();

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this._alerta(respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Si tiene una o más citas a esa misma hora.
        if (respuesta["mensaje"] !== "OK") {

          //Abre el modal.
          const modalRef = this.modalService.open(DialogoConfirmacionComponent, { centered: true });
          //Define el título del modal.
          modalRef.componentInstance.titulo = "Confirmación";
          //Define el mensaje del modal.
          modalRef.componentInstance.mensaje = respuesta["mensaje"];
          //Define la etiqueta del botón de Aceptar.
          modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
          //Define la etiqueta del botón de Cancelar.
          modalRef.componentInstance.etiquetaBotonCancelar = "No";
          //Se retorna el botón pulsado.
          modalRef.result.then((result) => {

            //Si no se desea continuar, se detiene la ejecución del programa.
            if (result === "No") {
              return;
            }
            else {
              this._altaCita(fechaHora);
            }
          });

        }
        else {
          this._altaCita(fechaHora);
        }

      }

    });


  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaCita.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que da de alta una cita.                         |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _altaCita(fechaHora: string) {

    //Se abre el  modal de espera.
    this.esperarService.esperar();
    //Se da de alta la cita.
    this.citasService.altaCita(this.usuarioControl.value.id,
      this.pacienteControl.value.id,
      this.clinicaControl.value,
      fechaHora,
      this.actividadControl.value).
      subscribe(respuesta => {

        //Se cierra el  modal de espera.
        this.esperarService.noEsperar();
        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this._alerta(respuesta["mensaje"]);
        }
        else {
          //Muestra una alerta con el mensaje satisfactorio.
          this._alerta("Se dio de alta satisfactoriamente la cita.");
        }

      });

  }



}
