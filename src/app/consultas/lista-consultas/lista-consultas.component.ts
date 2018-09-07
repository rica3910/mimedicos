/******************************************************************|
|NOMBRE: ListaConsultasComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de las consultas.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 28/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTypeahead, NgbModal, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { OrganizacionesService } from '../../organizaciones.service';
import { ClinicasService } from '../../clinicas.service';
import { UsuariosService } from '../../usuarios.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DialogoConfirmacionComponent } from './../../dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { ConsultasService } from '../../consultas.service';


@Component({
  selector: 'app-lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrls: ['./lista-consultas.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]
})
export class ListaConsultasComponent implements OnInit {

  //Propiedad que indica si el usuario puede dar de alta consultas.
  altaConsultas: boolean = false;
  //Propiedad que indica si el usuario puede editar consultas.
  editarConsultas: boolean = false;
  //Propiedad que indica si el usuario puede eliminar consultas.
  eliminarConsultas: boolean = false;
  //Registros de organizaciones que se verán en la vista en el campo de búsqueda de organizaciones.
  organizaciones: Array<JSON>;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes: { id: string, nombres_paciente: string }[];
  //Objeto que contendrá el formulario de búsqueda de las consultas.
  formBusquedaConsultas: FormGroup;
  //Objeto del formulario que contendrá a la organización.
  organizacionControl: AbstractControl;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Objeto del formulario que contendrá al estatus.
  estatusControl: AbstractControl;
  //Objeto del formulario que contendrá a la actividad.
  actividadControl: AbstractControl;
  //Objeto del formulario que contendrá a la fecha desde.
  fechaDesdeControl: AbstractControl;
  //Objeto del formulario que contendrá a la fecha hasta.
  fechaHastaControl: AbstractControl;
  //Objeto del formulario que contendrá al paciente.
  pacienteControl: AbstractControl;
  //Objeto del formulario que contendrá al usuario.
  usuarioControl: AbstractControl;

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
  //Variable que almacena el control del formulario de la fechaDesde.
  @ViewChild('fechaDesdeHTML') fechaDesdeHTML: ElementRef;
  //Variable que almacena el calendario de la fecha desde (popup).
  @ViewChild('calendarioDesdeHTML') calendarioDesdeHTML: NgbInputDatepicker
  //Variable que almacena el control del formulario de la fechaHasta.
  @ViewChild('fechaHastaHTML') fechaHastaHTML: ElementRef;
  //Variable que almacena el calendario de la fecha hasta (popup).
  @ViewChild('calendarioHastaHTML') calendarioHastaHTML: NgbInputDatepicker
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;

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
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si el filtro de organizaciones ya se cargó.
  organizacionesInicioListas: boolean = false;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si la información de consultas ya se obtuvo.
  consultaslistas: boolean = false;
  //Fecha inicial del campo fecha desde.  
  fechaDesdeInicial: NgbDateStruct;
  //Fecha desde seleccionada.
  fechaDesdeSeleccionada: NgbDateStruct;
  //Fecha mínima que puede tener el campo fechaHasta. Debe de ser por lo mínimo igual a la fecha desde.
  fechaHastaMinima: NgbDateStruct;
  //Fecha hasta seleccionada.
  fechaHastaSeleccionada: NgbDateStruct;

  //Almacena las consultas de la base de datos pero su información se puede filtrar.
  consultas: JSON[] = [];
  //Almacena las consultas de la base de datos original sin que se filtre su información.
  consultasServidor: JSON[] = [];

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
  |  autenticarService = contiene los métodos de autenticación,           |
  |  organizacionesService = contiene los métodos de base de datos de las |
  |  organizaciones,                                                      |
  |  clinicasService = contiene los métodos de la bd de las clínicas,     |
  |  consultasService = contiene los métodos de la bd de las consultas,   |
  |  usuariosService = contiene los métodos de la bd de los usuarios,     |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  rutaNavegacion   = para navegar a otras url´s                        |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private pacientesService: PacientesService,
    private esperarService: EsperarService,
    private modalService: NgbModal,
    private autenticarService: AutenticarService,
    private organizacionesService: OrganizacionesService,
    private clinicasService: ClinicasService,
    private consultasService: ConsultasService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private rutaNavegacion: Router) {


    //Se agregan las validaciones al formulario de búsqueda de consultas.
    this.formBusquedaConsultas = fb.group({
      'organizacion': ['0'],
      'clinica': ['0'],
      'fechaDesde': [''],
      'fechaHasta': [''],
      'paciente': [''],
      'usuario': ['']
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.organizacionControl = this.formBusquedaConsultas.controls['organizacion'];
    this.clinicaControl = this.formBusquedaConsultas.controls['clinica'];
    this.fechaDesdeControl = this.formBusquedaConsultas.controls['fechaDesde'];
    this.fechaHastaControl = this.formBusquedaConsultas.controls['fechaHasta'];
    this.pacienteControl = this.formBusquedaConsultas.controls['paciente'];
    this.usuarioControl = this.formBusquedaConsultas.controls['usuario'];

    //Al calendario del campo fecha desde y hasta se les establece la fecha actual.
    let fechaActual = new Date();
    this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
    this.fechaHastaMinima = this.fechaDesdeInicial;
    //Se selecciona en el calendario de fecha desde y fecha hasta la fecha actual.
    this.fechaDesdeControl.setValue("");
    this.fechaHastaControl.setValue("");
    this.fechaDesdeSeleccionada = this.fechaDesdeInicial;

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan las organizaciones en su filtro.
    this.filtroOrganizaciones();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas(0);
    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan los usuarios en su filtro.
    this.filtroUsuarios();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.organizacionesInicioListas &&
        this.clinicasInicioListas &&
        this.usuariosListos &&
        this.pacientesInicioListo) {
        //Se detiene la espera.
        this.esperarService.noEsperar();
        //Se busca la información según los filtros iniciales.
        this.buscar();
      }


    });


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.consultasServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.consultas = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarInfoHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });
  }

  ngAfterViewInit() {

    //El botón de dar de alta consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneMenu('alta-consulta').subscribe((respuesta: boolean) => {
      this.altaConsultas = respuesta["value"];
    });

    //El botón de editar consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('EDITAR CONSULTA').subscribe((respuesta: boolean) => {
      this.editarConsultas = respuesta["value"];
    });

    //El botón de eliminar consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR CONSULTA').subscribe((respuesta: boolean) => {
      this.eliminarConsultas = respuesta["value"];
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
    |  FECHA: 28/08/2018.                                                   |    
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
  |  FECHA: 28/08/2018.                                                   |    
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
  |  NOMBRE: filtroOrganizaciones.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de organizaciones.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroOrganizaciones() {

    this.organizacionesService.filtroOrganizaciones().subscribe((respuesta) => {

      this.organizacionesInicioListas = true;
      this.cargaInicialLista$.next(this.organizacionesInicioListas);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se almacenan las organizaciones en el arreglo de organizaciones.
        this.organizaciones = respuesta["datos"];
      }
    });

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
  |  FECHA: 28/08/2018.                                                   |    
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
        //Se inicializa el select.
        this.clinicaControl.setValue(0);
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroUsuarios.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
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
  |  FECHA: 28/08/2018.                                                   |    
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
  |  NOMBRE: fechaDesdeSeleccion.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Cuando la fecha desde es seleccionada, la fecha hasta   |
  |  se resetea.                                                          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  fechaDesdeSeleccion(fechaSeleccionada: NgbDateStruct) {

    //Se limpia la fecha hasta.
    this.fechaHastaHTML.nativeElement.value = "";
    //Se cierra el popup de fecha hasta en caso de que esté abierta.
    this.calendarioHastaHTML.close();

    //Se establece la fecha desde seleccionada.
    this.fechaDesdeSeleccionada = fechaSeleccionada;

    /*La fecha mínima a seleccionar en el campo hasta es la fecha desde,
    ya que no puede ser menor.*/
    this.fechaHastaMinima = fechaSeleccionada;
    //Se selecciona la fecha mínima a seleccionar en la fecha hasta.
    this.fechaHastaControl.setValue(fechaSeleccionada);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoFechaDesde.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo fecha desde y sus dependientes.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoFechaDesde() {

    //Se limpia la fecha desde y hasta.
    this.fechaDesdeHTML.nativeElement.value = "";
    this.fechaHastaHTML.nativeElement.value = "";
    //Se cierran los popups del fecha desde y hasta en caso que estén abiertos.
    this.calendarioDesdeHTML.close();
    this.calendarioHastaHTML.close();

    //Se obtiene la fecha actual.
    let fechaActual = new Date();
    //Se establece la fecha actual en el calendario de las fechas desde y hasta.
    this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
    this.fechaHastaMinima = this.fechaDesdeInicial;
    this.fechaDesdeControl.setValue("");
    this.fechaHastaControl.setValue("");

  }
  /*----------------------------------------------------------------------|
  |  NOMBRE: mostrarPopUpFechaDesde.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Muestra el calendario de la fecha desde.                | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  mostrarPopUpFechaDesde() {
    /*Se cierra el calendario de fecha hasta, para que cuando se vuelva a abrir,
    se abra con la fecha mínima, que es la fecha desde.*/
    this.calendarioHastaHTML.close();
    //Se abre el el popup del calendario fecha desde.
    this.calendarioDesdeHTML.toggle();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: fechaHastaSeleccion.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Se le asigna a la fecha hasta la fecha seleccionada.    |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  fechaHastaSeleccion(fechaSeleccionada: NgbDateStruct) {
    //Se establece la fecha desde seleccionada.
    this.fechaHastaSeleccionada = fechaSeleccionada;
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoFechaHasta.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo fecha hasta.                            | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoFechaHasta() {

    //Se limpia la fecha hasta.    
    this.fechaHastaHTML.nativeElement.value = "";
    //Se cierran el popup del fecha hasta en caso que esté abierto.
    this.calendarioHastaHTML.close();

    //La fecha mínima de la fecha desde será la fecha desde seleccionada.
    this.fechaHastaMinima = this.fechaDesdeSeleccionada;
    this.fechaHastaControl.setValue("");

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoPaciente.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo paciente.                               |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/08/2018.                                                   |    
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
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoUsuario() {
    //Se limpia la caja de texto y su valor.
    this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
    this.usuarioControl.setValue("");
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {


    //Si algunas de las fechas está seleccionada, la otra también debe de estarlo.
    let fechaDesde: NgbDateStruct = this.fechaDesdeControl.value;
    let fechaHasta: NgbDateStruct = this.fechaHastaControl.value;
    if (fechaDesde && !fechaHasta) {
      //Muestra una alerta indicando que se deben de llenar las dos fechas.      
      this.utilidadesService.alerta("Fecha inválida", "La fecha final debe ser completada.").subscribe(() => {
        this.fechaHastaHTML.nativeElement.focus();
      });
      return;
    }
    else if (!fechaDesde && fechaHasta) {
      //Muestra una alerta indicando que se deben de llenar las dos fechas.      
      this.utilidadesService.alerta("Fecha inválida", "La fecha inicial debe ser completada.").subscribe(() => {
        this.fechaDesdeHTML.nativeElement.focus();
      });
      return;
    }
    //Si la fecha inicial es mayor a la fecha final.
    else if (fechaDesde && fechaHasta &&
      (fechaDesde.year >= fechaHasta.year &&
        fechaDesde.month >= fechaHasta.month &&
        fechaDesde.day > fechaHasta.day)) {
      this.utilidadesService.alerta("Fecha inválida","La fecha inicial debe ser menor o igual a la fecha final.").subscribe(() => {
        this.fechaDesdeHTML.nativeElement.focus();
      });
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
      this.utilidadesService.alerta("Paciente inválido","Seleccione un paciente válido.").subscribe(() => {
        this.pacienteHTML.nativeElement.focus();
      });
      return
    }

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Busca las consultas según los filtros aplicados.
    this.consultasService.listaConsultas(
      this.organizacionControl.value,
      this.clinicaControl.value,
      fechaDesde ? this.utilidadesService.formatearFecha(fechaDesde, false) : " ",
      fechaHasta ? this.utilidadesService.formatearFecha(fechaHasta, false) : " ",
      paciente ? paciente.id : "0",
      usuario ? usuario.id : "0").subscribe((respuesta) => {

        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          
        }
        //Si todo salió bien.
        else {

          //Se almacenan las consultas en el arreglo de consultas.
          this.consultas = respuesta["datos"];
          this.consultasServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

        }

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.consultas = this.consultasServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }



  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarConsulta.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una consulta.                      |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarConsulta(consultaId: string) {

    //Abre el modal.
    const modalRef = this.modalService.open(DialogoConfirmacionComponent, { centered: true });
    //Define el título del modal.
    modalRef.componentInstance.titulo = "Confirmación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información de la consulta. "
      + "¿Está seguro de eliminar la consulta?";
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
    //Define la etiqueta del botón de Cancelar.
    modalRef.componentInstance.etiquetaBotonCancelar = "No";
    //Se retorna el botón pulsado.
    modalRef.result.then((result) => {
      //Si la respuesta es eliminar al paciente.
      if (result === "Sí") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarConsulta(consultaId).subscribe(respuesta => {
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
            this.utilidadesService.alerta("Eliminación exitosa","La cita se eliminó permanentemente.");
            this.buscar();
          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaConsulta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear consulta.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaConsulta() {

    this.rutaNavegacion.navigate(['consultas', 'alta-consulta']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarConsulta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar consulta.      |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarConsulta(consultaId) {
    this.rutaNavegacion.navigateByUrl('consultas/editar-consulta/' + consultaId);
  }

}
