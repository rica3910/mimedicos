/******************************************************************|
|NOMBRE: EditarConsultaComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar editar consultas.                |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 26/10/2018.                                                |
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
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]

})
export class EditarConsultaComponent implements OnInit {

  //Fecha actual. Se uitilizará para establecer como fecha mínima la fecha de consultas.
  fechaActual: NgbDateStruct;

  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes: { id: string, nombres_paciente: string }[];
  //Registros de estudios que se verán en la vista en el campo de búsqueda de estudios.
  estudios: { id: string, nombre_estudio: string, precio_neto: string, precio_neto_formato: string }[];
  //Registros de los estudios que se programarán al paciente.
  estudiosAProgramar: { id: string, nombre_estudio: string, precio_neto: string, precio_neto_formato: string }[] = new Array();
  //Precio total de los estudios.
  totalEstudios: number = 0;

  /*Variable que sirve para cuando se le de clic o focus al usuario
  se ejecute el método buscar usuario.*/
  @ViewChild('usuarioNG') usuarioNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del usuario.
  @ViewChild('usuarioHTML') usuarioHTML: ElementRef;
  /*Variable que sirve para cuando se le de clic o focus al paciente
  se ejecute el método buscar paciente.*/
  @ViewChild('pacienteNG') pacienteNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del paciente.
  @ViewChild('pacienteHTML') pacienteHTML: ElementRef;
  /*Variable que sirve para cuando se le de clic o focus al estudio
  se ejecute el método buscar estudio.*/
  @ViewChild('estudioNG') estudioNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del estudio.
  @ViewChild('estudioHTML') estudioHTML: ElementRef;

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
  //Variable que reacciona al focus del campo buscar estudio.
  focusBuscarEstudio$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar estudio.
  clickBuscarEstudio$ = new Subject<string>();
  //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
  formatoUsuarios = (value: any) => value.nombres_usuario;
  //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
  formatoPacientes = (value: any) => value.nombres_paciente;
  //Formato que se utilizará para presentar la información en el cuadro de texto de estudios.
  formatoEstudios = (value: any) => value.nombre_estudio ? value.nombre_estudio + " - " + value.precio_neto_formato : "";
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si el filtro de estudios ya se cargó.
  estudiosInicioListos: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de edición de las consultas.
  formEditarConsultas: FormGroup;
  //Objeto del formulario que contendrá al paciente.
  pacienteControl: AbstractControl;
  //Objeto del formulario que contendrá al usuario.
  usuarioControl: AbstractControl;
  //Objeto del formulario que contendrá al estudio.
  estudioControl: AbstractControl;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Propiedad para cuando se oprime el botón de editar consulta.
  pulsarEditar: boolean = false;
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
    |  consultasService = contiene los métodos de la bd de las consultas,   |
    |  productosService = contiene los métodos de la bd de los productos.   |                                
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
    private consultasService: ConsultasService,
    private productosService: ProductosService) {

    //Al calendario se le establece la fecha actual.
    let fechaActual = new Date();
    this.fechaActual = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };

    //Se agregan las validaciones al formulario de edición de consultas.
    this.formEditarConsultas = fb.group({
      'usuario': ['', Validators.required],
      'paciente': ['', Validators.required],
      'clinica': ['', [Validators.required]],
      'tipoConsulta': ['', [Validators.required]],
      'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
      'horaInicio': [{ hour: fechaActual.getHours(), minute: 0 }],
      'horaFin': [{ hour: fechaActual.getHours(), minute: 0 }],
      'estudio': ['', Validators.required]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formEditarConsultas.controls['usuario'];
    this.pacienteControl = this.formEditarConsultas.controls['paciente'];
    this.clinicaControl = this.formEditarConsultas.controls['clinica'];
    this.fechaControl = this.formEditarConsultas.controls['fecha'];
    this.horaInicioControl = this.formEditarConsultas.controls['horaInicio'];
    this.horaFinControl = this.formEditarConsultas.controls['horaFin'];
    this.tipoConsultaControl = this.formEditarConsultas.controls['tipoConsulta'];
    this.estudioControl = this.formEditarConsultas.controls['estudio'];

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
    //Se cargan los estudios.
    this.filtroEstudios();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas &&
        this.tiposConsultasInicioListos &&
        this.estudiosInicioListos) {
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
  |  NOMBRE: filtroEstudios.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de estudios.               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroEstudios() {

    //Intenta obtener los servicios/estudios del usuario ingresado.
    this.productosService.filtroServicios()
      .subscribe((respuesta) => {

        this.estudiosInicioListos = true;
        this.cargaInicialLista$.next(this.estudiosInicioListos);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los pacientes en el arreglo de estudios.
          this.estudios = respuesta["datos"];

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
  |  NOMBRE: buscarEstudio.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para buscar un estudio.                          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscarEstudio = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.
    const clicksWithClosedPopup$ = this.clickBuscarEstudio$.pipe(filter(() => !this.estudioNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarEstudio$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === '' ? this.estudios
          : this.estudios.filter(estudio =>
            estudio.nombre_estudio.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoEstudio.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo estudio.                                |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoEstudio() {

    //Se limpia la caja de texto y su valor.
    this.utilidadesService.limpiarCampoTexto(this.estudioHTML.nativeElement);
    this.estudioControl.setValue("");
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
  |  NOMBRE: agregarEstudio.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar un estudio al arreglo de estudios   |
  |  a realizar.                                                          | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  agregarEstudio() {

    //Se obtiene el estudio seleccionado.
    let estudio: { id: string, nombre_estudio: string, precio_neto: string, precio_neto_formato: string } = this.estudioControl.value;

    //Si viene algo escrito en el estudio pero no es un registro de  base de datos.
    if (!estudio.id) {
      this.utilidadesService.alerta("Estudio inválido", "Seleccione un estudio válido.").subscribe(() => {
        this.estudioHTML.nativeElement.focus();
      });
      return;
    }

    if (this.estudiosAProgramar.filter(estudioAProgramar => estudioAProgramar.id == estudio.id).length > 0) {
      this.utilidadesService.confirmacion("Estudio existente.", "El estudio ya existe. ¿Desea agregarlo de nuevo?").subscribe(respuesta => {
        if (respuesta == "Aceptar") {
          //Se almacena el registro en el arreglo de estudios a programar.
          this.estudiosAProgramar.push(estudio);
          //Se limpia el campo.
          this.estudioControl.setValue("");
          //Se le suma el precio del estudio al total.
          this.totalEstudios = this.totalEstudios + Number(estudio.precio_neto);
        }
      });
    } else {
      //Se almacena el registro en el arreglo de estudios a programar.
      this.estudiosAProgramar.push(estudio);
      //Se limpia el campo.
      this.estudioControl.setValue("");
      //Se le suma el precio del estudio al total.
      this.totalEstudios = this.totalEstudios + Number(estudio.precio_neto);
    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: quitarEstudio.                                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: index = posición de arreglo a quitar,         |
  |  precioBurto = precio que se le quitará al total.                     |    
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para quitar un estudio al arreglo de estudios    |
  |  a realizar.                                                          | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  quitarEstudio(index, precioneto) {

    //Se elimina  el estudio seleccionado.
    this.estudiosAProgramar.splice(index, 1);
    //Se le quita el precio del estudio al total.
    this.totalEstudios = this.totalEstudios - Number(precioneto);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: editarConsulta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar una consulta.                        | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarConsulta() {

    //Se pulsa el botón de modificar consulta.
    this.pulsarEditar = true;

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
      this.utilidadesService.alerta("Fecha inválida", "La fecha debe ser mayor o igual a la fecha de hoy.");
      return;
    }
    else if (!horaInicio) {
      this.utilidadesService.alerta("Hora de comienzo inválida", "Seleccione una hora de comienzo válida.");
      return
    } else if (!horaFin) {
      this.utilidadesService.alerta("Hora de finalización inválida", "Seleccione una hora de finalización válida.");
      return
    } else if (horaInicio.hour > horaFin.hour || (horaInicio.hour == horaFin.hour && horaInicio.minute > horaFin.minute)) {
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

    //Si no se agregó ningún estudio.
    if (this.estudiosAProgramar.length == 0) {
      this.utilidadesService.alerta("Sin estudios", "Agregue por lo menos un estudio.").subscribe(() => {
        this.estudioHTML.nativeElement.focus();
      });
      return
    }

    //Se abre el modal de espera.
    this.esperarService.esperar();

    this.consultasService.usuarioConsultaFechaOcupada(this.usuarioControl.value.id, this.utilidadesService.formatearFecha(fechaConsulta, false), this.utilidadesService.formatearFechaHora(fechaConsulta, horaInicio, false), this.utilidadesService.formatearFechaHora(fechaConsulta, horaFin, false)).subscribe(respuesta => {

      //Se cierra el  modal de espera.
      this.esperarService.noEsperar();

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Si tiene una o más consultas a esa misma hora.
        if (respuesta["mensaje"] !== "OK") {
          this.utilidadesService.confirmacion("Agenda ocupada.", respuesta["mensaje"]).subscribe(respuesta => {

            //Si desea continuar.
            if (respuesta == "Aceptar") {

              //Se abre el modal de espera.
              this.esperarService.esperar();

              //Se modifica la consulta.
              /*this.consultasService.altaConsulta(
                this.utilidadesService.formatearFecha(fechaConsulta, false),
                this.utilidadesService.formatearFechaHora(fechaConsulta, horaInicio, false),
                this.utilidadesService.formatearFechaHora(fechaConsulta, horaFin, false),
                this.usuarioControl.value.id,
                this.pacienteControl.value.id,
                this.clinicaControl.value,
                this.tipoConsultaControl.value).
                subscribe(respuesta => {

                  //Si hubo un error en la obtención de información.
                  if (respuesta["estado"] === "ERROR") {
                    //Muestra una alerta con el porqué del error.
                    this.utilidadesService.alerta("Error", respuesta["mensaje"]);
                  }
                  else {

                    //Se obtiene el identificador de la consulta recién creado.
                    let consultaId: string = respuesta["mensaje"];

                    //Se dan de alta los estudios.
                    this._altaEstudioConsulta(consultaId, this.estudiosAProgramar, 0);

                  }

                });*/

            }
          });

        }
        else {

          //Se abre el modal de espera.
          this.esperarService.esperar();

          //Se da de alta la consulta.
          /*this.consultasService.altaConsulta(
            this.utilidadesService.formatearFecha(fechaConsulta, false),
            this.utilidadesService.formatearFechaHora(fechaConsulta, horaInicio, false),
            this.utilidadesService.formatearFechaHora(fechaConsulta, horaFin, false),
            this.usuarioControl.value.id,
            this.pacienteControl.value.id,
            this.clinicaControl.value,
            this.tipoConsultaControl.value).
            subscribe(respuesta => {

              //Si hubo un error en la obtención de información.
              if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                this.utilidadesService.alerta("Error", respuesta["mensaje"]);
              }
              else {

                //Se obtiene el identificador de la consulta recién creado.
                let consultaId: string = respuesta["mensaje"];

                //Se dan de alta los estudios.
                this._altaEstudioConsulta(consultaId, this.estudiosAProgramar, 0);

              }

            });*/
        }

      }

    });


  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _altaEstudioConsulta.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un estudio en una consulta.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           |
  |  campos = campos que se insertarán,                                   |
  |  iteracion = iteración o registro que sigue para insertar.            |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _altaEstudioConsulta(consultaId: string, campos: any[], iteracion: number) {

    let detProductoId: string = campos[iteracion].id;

    //Se intenta dar de alta el detalle de la consulta.
    this.consultasService.altaConsultaEstudio(consultaId, detProductoId)
      .subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Si hubo un error en alguno de los detalles, se borra toda la información de la consulta.
          this.esperarService.noEsperar();
          this.utilidadesService.alerta("Error", respuesta["mensaje"]).subscribe(() => {
            //Se retorna a la lista de consultas.
            this.regresar();
            return;
          });
        }
        //Si la inserción fue correcta.
        else {
          //Si no es el último registro.
          if (iteracion < campos.length - 1) {
            this._altaEstudioConsulta(consultaId, campos, iteracion + 1);
          }
          //Si ya es el último registro, se despliega alerta de éxito.
          else {
            this.esperarService.noEsperar();
            this.utilidadesService.alerta("Consulta creada", "La consulta se dio de alta satisfactoriamente.").subscribe(() => {
              //Se retorna a la lista de consultas.
              this.regresar();
            });
          }
        }
      });
  }

}
