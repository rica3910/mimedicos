/******************************************************************|
|NOMBRE: AltaCobroComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta cobros.                  |
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
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter, NgbTimeStruct, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, pipe, fromEvent } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { ProductosService } from '../../productos.service';
import { AutenticarService } from '../../autenticar.service';
import { CobrosService } from '../../cobros.service';
import { EventEmitter } from 'protractor';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-alta-cobro',
  templateUrl: './alta-cobro.component.html',
  styleUrls: ['./alta-cobro.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]

})
export class AltaCobroComponent implements OnInit {

  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Registros de usuarios que provienen del servidor que no se filtrarán.
  usuariosServidor: { id: string, nombres_usuario: string }[];
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes: { id: string, nombres_paciente: string }[];
  //Registros de pacientes que provienen del servidor que no se filtrarán.
  pacientesServidor: { id: string, nombres_paciente: string }[];
  //Registros de productos  que se verán en la vista en el campo de búsqueda de productos.
  productos: { id: string, nombre_producto: string, precio_neto: string, precio_neto_formato: string }[];
  //Registros de productos que están almacenados en el servidor y que no serán filtrados.
  productosServidor: { id: string, nombre_producto: string, precio_neto: string, precio_neto_formato: string }[];
  //Registros de los productos.
  productosACobrar: { id: string, nombre_producto: string, precio_neto: string, precio_neto_formato: string }[] = new Array();
  //Precio total de los productos a cobrar.
  totalProductosACobrar: number = 0;

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
  /*Variable que sirve para cuando se le de clic o focus al producto
  se ejecute el método buscar producto.*/
  @ViewChild('productoNG') productoNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del producto.
  @ViewChild('productoHTML') productoHTML: ElementRef;
  //Variable que almacena el control del formulario de la clínica.
  @ViewChild('clinicaHTML') clinicaHTML: ElementRef;
  //Variable que almacena el control del formulario del descuento.
  @ViewChild('descuentoHTML') descuentoHTML: ElementRef;
  //Variable que almacena el control del formulario del descuento.
  @ViewChild('porcentajeDescuentoHTML') porcentajeDescuentoHTML: ElementRef;
  //Variable que reacciona al focus del campo buscar usuario.
  focusBuscarUsuario$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar usuario.
  clickBuscarUsuario$ = new Subject<string>();
  //Variable que reacciona al focus del campo buscar paciente.
  focusBuscarPaciente$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar paciente.
  clickBuscarPaciente$ = new Subject<string>();
  //Variable que reacciona al focus del campo buscar producto.
  focusBuscarProducto$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar producto.
  clickBuscarProducto$ = new Subject<string>();
  //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
  formatoUsuarios = (value: any) => value.nombres_usuario;
  //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
  formatoPacientes = (value: any) => value.nombres_paciente;
  //Formato que se utilizará para presentar la información en el cuadro de texto de productos.
  formatoProductos = (value: any) => value.nombre_producto ? value.nombre_producto + " - " + value.precio_neto_formato : "";
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de alta de los cobros.
  formAltaCobros: FormGroup;
  //Objeto del formulario que contendrá al paciente.
  pacienteControl: AbstractControl;
  //Objeto del formulario que contendrá al usuario.
  usuarioControl: AbstractControl;
  //Objeto del formulario que contendrá al producto.
  productoControl: AbstractControl;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Propiedad para cuando se oprime el botón de crear cobro.
  pulsarCrear: boolean = false;
  //Objeto del formulario que contendrá el descuento.
  descuentoControl: AbstractControl;
  //Objeto del formulario que contendrá el porcentaje de descuento.
  porcentajeDescuentoControl: AbstractControl;
  //Subtotal del cobro (sin impuestos).
  subtotal: number = 1000;
  //Iva.
  iva: number = 16;
  //Total del cobro.
  total: number = 1116;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  usuariosService = contiene los métodos de la bd de los usuarios,     | 
  |  pacientesService = Contiene los métodos de mto. de pacientes,        |
  |  modalService = contiene los métodos para manipular modals,           |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  clinicasService = contiene los métodos de la bd de las clínicas,     |
  |  cobrosServicce = contiene los métodos de la bd de los cobros,        |
  |  productosService = contiene los métodos de la bd de los productos,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  rutaActual= Para obtener los parámetros de la url.                   |                                
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
    private cobrosServicce: CobrosService,
    private productosService: ProductosService,
    private autenticarService: AutenticarService,
    private rutaActual: ActivatedRoute) {

    //Se agregan las validaciones al formulario de alta de cobros.
    this.formAltaCobros = fb.group({
      'usuario': ['', Validators.required],
      'paciente': [''],
      'clinica': ['', [Validators.required]],
      'producto': ['', Validators.required],
      'descuento': ['', [this.utilidadesService.decimalValidator, Validators.max(this.subtotal), Validators.min(0)]],
      'porcentajeDescuento': ['', [this.utilidadesService.decimalValidator, Validators.max(100), Validators.min(0)]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formAltaCobros.controls['usuario'];
    this.pacienteControl = this.formAltaCobros.controls['paciente'];
    this.clinicaControl = this.formAltaCobros.controls['clinica'];
    this.productoControl = this.formAltaCobros.controls['producto'];
    this.descuentoControl = this.formAltaCobros.controls['descuento'];
    this.porcentajeDescuentoControl = this.formAltaCobros.controls['porcentajeDescuento'];


    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas();
    //Se cargan los usuarios.
    this.filtroUsuarios();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas) {

        //Se actualizan los usuarios pertenecientes a la clínica seleccionada.   
        let usuariosConClinicaSeleccionada: Array<any> = new Array();
        this.usuariosTienenClinicaSeleccionada(this.usuariosServidor, this.clinicaControl.value).
          pipe(map(usuario => {
            usuariosConClinicaSeleccionada.push(usuario);
            return usuariosConClinicaSeleccionada;
          }))
          .toPromise().then(usuarios => {
            //Se guardan los usuarios con la clínica seleccionada.
            this.usuarios = usuarios;
            //Se detiene la espera.    
            this.esperarService.noEsperar();
          });
      }

    });

  }

  ngOnInit() {


    //El descuento solo aceptará números.
    this.utilidadesService.inputNumerico(this.descuentoHTML, true, this.descuentoControl);
    //El porcentaje del descuento solo aceptará números.
    this.utilidadesService.inputNumerico(this.porcentajeDescuentoHTML, true, this.porcentajeDescuentoControl);

    //Cuando se cambia el usuario.
    this.usuarioControl.valueChanges.subscribe(() => {
      //Se actualiza la información del paciente.
      this.cambiarUsuario();
    });


    //Cuando se cambia el paciente.
    this.pacienteControl.valueChanges.subscribe(() => {
      //Se actualiza la información del usuario.
      this.cambiarPaciente();
    });

    //Cuando se cambia el descuento.    
    fromEvent(this.descuentoHTML.nativeElement, 'keyup').subscribe(() => {
      //Si el descuento es mayor que el subtotal.
      if (this.descuentoControl.value > this.subtotal) {
        this.utilidadesService.alerta("Descuento no permitido", "El descuento debe ser menor o igual al subtotal.").subscribe(() => {
          this.descuentoControl.setValue("");
          this.porcentajeDescuentoControl.setValue("");
          this.descuentoHTML.nativeElement.focus();
        });
      }
      //Si el descuento es válido.
      else {
        //Se actualiza el porcentaje del descuento.
        this.porcentajeDescuentoControl.setValue(Math.round(this.descuentoControl.value / this.subtotal * 100) + "");
      }
    });

    //Cuando se cambia el porcentaje del descuento.    
    fromEvent(this.porcentajeDescuentoHTML.nativeElement, 'keyup').subscribe(() => {
      //Si el porcentaje del descuento es mayor a 100.
      if (this.porcentajeDescuentoControl.value > 100) {
        this.utilidadesService.alerta("Descuento no permitido", "El porcentaje del descuento debe ser menor o igual a 100.").subscribe(() => {
          this.porcentajeDescuentoControl.setValue("");
          this.descuentoControl.setValue("");
          this.porcentajeDescuentoHTML.nativeElement.focus();
        });
      }
      else {
        //Se actualiza el descuento.
        this.descuentoControl.setValue(Math.round(this.porcentajeDescuentoControl.value / 100 * this.subtotal) + "");
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
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroUsuarios() {

    //Intenta obtener los usuarios del usuario ingresado.
    this.usuariosService.filtroUsuarios()
      .subscribe((respuesta) => {


        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios en el arreglo de usuarios servidor para no tener que volver a llamar a la base de datos.                      
          this.usuariosServidor = respuesta["datos"];
        }

        //Indica que el filtro de usuarios ya se cargó.
        this.usuariosListos = true;
        this.cargaInicialLista$.next(this.usuariosListos);
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarPaciente.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando cambia el paciente.        | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 25/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarPaciente() {

    //Valor que trae el paciente.
    let paciente: { id: string, nombres_paciente: string } = this.pacienteControl.value;

    let valorPaciente: string = this.pacienteControl.value;

    //Si el paciente es válido.
    if (paciente.id) {

      //Valor que trae el control del  usuario.
      let usuarioControl: { id: string, nombres_usuario: string } = this.usuarioControl.value;

      //Si el usuario No es válido.
      if (!usuarioControl.id) {
        //Se limpia el campo del usuario.
        this.usuarioControl.setValue("");

      }
      //Se inicia la espera.
      this.esperarService.esperar();

      //Arreglo temporal para almacenar los usuarios con los pacientes y clínicas seleccionadas.
      let usuariosFiltrados: any[] = [];

      //Se subscribe al evento.
      this.usuariosTienenPacienteSeleccionado(this.usuariosServidor, paciente.id).
        //Se recorren los usuarios con el paciente seleccionado y se van guardando en su arreglo.
        pipe(map(usuario => {
          usuariosFiltrados.push(usuario);
          return usuariosFiltrados;
        })).
        //Se obtiene el arreglo listo con los usuarios que tienen al paciente seleccionado.
        toPromise().then(usuariosConPacienteSeleccionado => {

          //Si hay usuarios resultantes.
          if (usuariosConPacienteSeleccionado && usuariosConPacienteSeleccionado.length > 0) {

            usuariosFiltrados = new Array();
            //Se filtran los usuarios con la clínica seleccionada.
            this.usuariosTienenClinicaSeleccionada(usuariosConPacienteSeleccionado, this.clinicaControl.value).
              pipe(map(usuario => {
                usuariosFiltrados.push(usuario);
                return usuariosFiltrados;
              })).
              toPromise().then(usuariosConClinicaSeleccionada => {
                //Se obtienen los usuarios a mostrar en la lista de usuarios o médicos.
                this.usuarios = usuariosConClinicaSeleccionada;
                //Se termina la espera.
                this.esperarService.noEsperar();
              });

          }
          //Si no hay usuarios resultantes.
          else {
            //Se termina la espera.
            this.esperarService.noEsperar();
          }
        });

    }
    //Si el paciente está vacío.
    else if (valorPaciente.trim().length == 0 || valorPaciente.trim() == "") {

      //Se inicia la espera.
      this.esperarService.esperar();

      //Se obtienen los usuarios con la clínica seleccionada.
      let usuariosFiltrados = new Array();
      //Se filtran los usuarios con la clínica seleccionada.
      this.usuariosTienenClinicaSeleccionada(this.usuariosServidor, this.clinicaControl.value).
        pipe(map(usuario => {
          usuariosFiltrados.push(usuario);
          return usuariosFiltrados;
        })).
        toPromise().then(usuariosConClinicaSeleccionada => {
          //Se obtienen los usuarios a mostrar en la lista de usuarios o médicos.
          this.usuarios = usuariosConClinicaSeleccionada;
          //Se termina la espera.
          this.esperarService.noEsperar();
        });

    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: pacientesTienenUsuarioSeleccionado.                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para verificar que los pacientes tengan al       |
  |  usuario seleccionado.                                                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacientes = pacientes para verificar,         |
  |                         usuarioId = identificador del usuario.        |        
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA: pacientes = pacientes que tienen al usuario.   |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 25/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  pacientesTienenUsuarioSeleccionado(pacientes: Array<any>, usuarioId: string): Observable<any[]> {

    //Almacena los pacientes resultantes después del filtro.
    let pacientesResultantes: Subject<any[]> = new Subject<any[]>();

    //Se manda a llamar recursivamente cada uno de los pacientes del arreglo si es que existen.
    pacientes && pacientes.length > 0 ? siguientePaciente(this.autenticarService, 0) : null;

    //Se retornan los pacientes que tienen al usuario seleccionado.
    return pacientesResultantes;

    //Función recursiva.
    function siguientePaciente(pAutenticarService: AutenticarService, indice: number): any {
      if (indice < pacientes.length) {

        pAutenticarService.usuarioTienePaciente(pacientes[indice]["id"], usuarioId).subscribe(respuesta => {
          if (respuesta["value"]) {
            pacientesResultantes.next(pacientes[indice]);
          }
          siguientePaciente(pAutenticarService, indice + 1);
        });
      } else {
        pacientesResultantes.complete();
      }
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuariosTienenPacienteSeleccionado.                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para verificar que los usuarios tengan al        |
  |  paciente seleccionado.                                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarios = usuarios para verificar,           |
  |                         pacienteId = identificador del paciente.      |        
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA: usuarios = usuarios que tienen al paciente.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuariosTienenPacienteSeleccionado(usuarios: Array<any>, pacienteId: string): Observable<any[]> {

    //Almacena los usuarios resultantes después del filtro.
    let usuariosResultantes: Subject<any[]> = new Subject<any[]>();

    //Se manda a llamar recursivamente cada uno de los usuarios del arreglo si es que existen.
    usuarios && usuarios.length > 0 ? siguienteUsuario(this.autenticarService, 0) : null;

    //Se retornan los usuarios que tienen al paciente seleccionado.
    return usuariosResultantes;

    //Función recursiva.
    function siguienteUsuario(pAutenticarService: AutenticarService, indice: number): any {
      if (indice < usuarios.length) {

        pAutenticarService.usuarioTienePaciente(pacienteId, usuarios[indice]["id"]).subscribe(respuesta => {
          if (respuesta["value"]) {
            usuariosResultantes.next(usuarios[indice]);
          }
          siguienteUsuario(pAutenticarService, indice + 1);
        });
      } else {
        usuariosResultantes.complete();
      }
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuariosTienenClinicaSeleccionada.                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para verificar que los usuarios tengan al        |
  |  paciente seleccionado.                                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarios = usuarios para verificar,           |
  |                         clinicaId = identificador de la clínica.      |      
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA: usuarios = usuarios que tienen la clínica.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuariosTienenClinicaSeleccionada(usuarios: any[], clinicaId: string): Observable<any[]> {

    //Almacena los usuarios resultantes después del filtro.
    let usuariosResultantes: Subject<any[]> = new Subject<any[]>();
    //Se manda a llamar recursivamente cada uno de los usuarios del arreglo si es que existen.
    usuarios && usuarios.length > 0 ? siguienteUsuario(this.autenticarService, 0) : null;

    //Se retornan los usuarios que tienen a la clínica seleccionada.
    return usuariosResultantes;

    //Función recursiva.
    function siguienteUsuario(pAutenticarService: AutenticarService, indice: number): any {
      if (indice < usuarios.length) {

        pAutenticarService.usuarioTieneClinica(clinicaId, usuarios[indice]["id"]).subscribe(respuesta => {
          if (respuesta["value"]) {
            usuariosResultantes.next(usuarios[indice]);
          }
          siguienteUsuario(pAutenticarService, indice + 1);
        });
      } else {
        usuariosResultantes.complete();
      }
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarUsuario.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando se cambia al usuario.      | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarUsuario() {

    //Se limpian los productos.
    this.productoControl.setValue("");
    this.productos = new Array();
    this.productosACobrar = new Array();

    //Valor que trae el componente del usuario.
    let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
    let valorUsuario: string = this.usuarioControl.value;

    //Si hay un usuario válido en el campo usuario.    
    if (usuario.id) {

      //Valor que trae el componente del paciente.
      let paciente: { id: string, nombres_paciente: string } = this.pacienteControl.value;

      //Si el paciente no es válido. Se borra.
      if (!paciente.id) {
        //Se limpia el campo del paciente.
        this.pacienteControl.setValue("");
      }

      //Se inicializan los pacientes.
      this.pacientes = new Array();
      //Pacientes a filtrar.
      let pacientesAFiltrar: Array<any> = new Array();

      //Se inicia la espera.
      this.esperarService.esperar();

      //Se obtienen los productos o servicios del usuario seleccionado.
      this.filtroProductos(usuario.id);

      //Se obtienen los pacientes que tienen asignado al usario seleccionado.
      this.pacientesTienenUsuarioSeleccionado(this.pacientesServidor, usuario.id).
        pipe(map(paciente => {
          pacientesAFiltrar.push(paciente);
          return pacientesAFiltrar;
        })).
        toPromise().then(pacientes => {
          this.pacientes = pacientes;
          //Se detiene la espera.
          this.esperarService.noEsperar();
        });

    }
    //Si el usuario está vacío.     
    else if (valorUsuario.trim().length == 0 || valorUsuario.trim() == "") {
      this.pacientes = this.pacientesServidor;
    }

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
          this.pacientesServidor = respuesta["datos"];
          this.pacientes = respuesta["datos"];

        }

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroProductos.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de productos.              | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioId = identificador del usuario.        |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroProductos(usuarioId: string) {

    //Intenta obtener los productos del usuario ingresado.
    this.productosService.filtroServicios(usuarioId, "ACTIVO")
      .subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los productos en el arreglo de productos.
          this.productos = respuesta["datos"];

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
      map(term => {
        if (term === '') {
          return this.usuarios;
        }
        else {
          if (this.usuarios && this.usuarios.length > 0) {
            return this.usuarios.filter(usuario => usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          }
        }
      })
    ).pipe();

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
      map(term => {
        if (term === '') {
          return this.pacientes;
        }
        else {
          if (this.pacientes && this.pacientes.length > 0) {
            return this.pacientes.filter(paciente => paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          }
        }
      })
    ).pipe();

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscarProducto.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para buscar un producto.                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscarProducto = (text$: Observable<string>) => {

    //Tiempo que durará en buscar en el arreglo mientras se teclea.
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //Se abre o se cierra el popup con la lista según sea el caso.    
    const clicksWithClosedPopup$ = this.clickBuscarProducto$.pipe(filter(() => !this.productoNG.isPopupOpen()));

    //Realiza la búsqueda dentro del arreglo.  
    return merge(debouncedText$, this.focusBuscarProducto$, clicksWithClosedPopup$).pipe(
      map(term => {
        if (term === '') {
          return this.productos;
        }
        else {
          if (this.productos && this.productos.length > 0) {
            return this.productos.filter(producto => producto.nombre_producto.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          }
        }
      })
    ).pipe();

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoProducto.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo estudio.                                |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoProducto() {

    //Se limpia la caja de texto y su valor.
    this.utilidadesService.limpiarCampoTexto(this.productoHTML.nativeElement);
    this.productoControl.setValue("");
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
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroClinicas() {

    //Se limpia el control de las clínicas.
    this.clinicaControl.setValue("");

    this.clinicasService.filtroClinicas("0", "ACTIVO", "0").subscribe((respuesta) => {

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

      this.clinicasInicioListas = true;
      this.cargaInicialLista$.next(this.clinicasInicioListas);
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
    this.rutaNavegacion.navigate(['cobros', 'lista-cobros']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarProducto.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar un producto al arreglo de productos |
  |  a cobrar.                                                          | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  agregarProducto() {

    //Se obtiene el producto seleccionado.
    let producto: { id: string, nombre_producto: string, precio_neto: string, precio_neto_formato: string } = this.productoControl.value;

    //Si viene algo escrito en el estudio pero no es un registro de  base de datos.
    if (!producto.id) {
      this.utilidadesService.alerta("Producto inválido", "Seleccione un producto válido.").subscribe(() => {
        this.productoHTML.nativeElement.focus();
      });
      return;
    }

    if (this.productosACobrar.filter(productoACobrar => productoACobrar.id == producto.id).length > 0) {
      this.utilidadesService.confirmacion("Producto existente.", "El producto ya existe. ¿Desea agregarlo de nuevo?").subscribe(respuesta => {
        if (respuesta == "Aceptar") {
          //Se almacena el registro en el arreglo de productos a cobrar.
          this.productosACobrar.push(producto);
          //Se limpia el campo.
          this.productoControl.setValue("");
          //Se le suma el precio del producto al total.
          this.totalProductosACobrar = this.totalProductosACobrar + Number(producto.precio_neto);
        }
      });
    } else {
      //Se almacena el registro en el arreglo de productos a cobrar.
      this.productosACobrar.push(producto);
      //Se limpia el campo.
      this.productoControl.setValue("");
      //Se le suma el precio del cobro al total.
      this.totalProductosACobrar = this.totalProductosACobrar + Number(producto.precio_neto);
    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: quitarProducto.                                                 |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: index = posición de arreglo a quitar,         |
  |  precioBurto = precio que se le quitará al total.                     |    
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para quitar un producto al arreglo de productos  |
  |  a cobrar.                                                            | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  quitarProducto(index, precioneto) {

    //Se elimina  el producto seleccionado.
    this.productosACobrar.splice(index, 1);
    //Se le quita el precio del producto al total.
    this.totalProductosACobrar = this.totalProductosACobrar - Number(precioneto);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarClinica.                                              |  
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando se cambia de clínica.      | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 25/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarClinica() {

    //Inicia el servicio de espera.
    this.clinicaHTML.nativeElement.blur();
    this.esperarService.esperar();

    //Se limpia el valor del usuario.
    this.usuarioControl.setValue("");

    //Se inicializan los usuarios.
    let usuariosAFiltrar = new Array();
    this.usuarios = new Array();

    //Se obtienen los usuarios que tienen asignada la clínica seleccionada.
    this.usuariosTienenClinicaSeleccionada(this.usuariosServidor, this.clinicaControl.value).
      pipe(map(usuario => {
        usuariosAFiltrar.push(usuario);
        return usuariosAFiltrar;
      })).
      toPromise().then(usuarios => {

        //Si hay usuarios resultantes.
        if (usuarios && usuarios.length > 0) {

          //Se inicializan los usuarios a filtrar.
          usuariosAFiltrar = new Array();

          //Valor que trae el componente del paciente.
          let paciente: { id: string, nombres_paciente: string } = this.pacienteControl.value;

          //Si es un paciente válido.
          if (paciente.id) {
            this.usuariosTienenPacienteSeleccionado(usuarios, paciente.id).
              pipe(map(usuario => {
                usuariosAFiltrar.push(usuario);
                return usuariosAFiltrar;
              })).
              toPromise().then(usuarios => {
                this.usuarios = usuarios;
                //Se detiene la espera.                    
                this.esperarService.noEsperar();
              });
          }
          //Si el paciente no es válido.
          else {

            //Se obtienen solo los usuarios con la clínica seleccionada.
            this.usuarios = usuarios;
            //Se limpia el paciente.
            this.pacienteControl.setValue("");
            //Se detiene la espera.                    
            this.esperarService.noEsperar();
          }

        }
        //Si no hay usuarios.
        else {
          //Se detiene la espera.                    
          this.esperarService.noEsperar();
        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaCobro.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un cobro.                       | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaCobro(evento: EventEmitter) {

    console.log(evento);

    //Se pulsa el botón  de dar de alta cobro.
    this.pulsarCrear = true;

    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.usuarioControl.invalid) {
      this.usuarioHTML.nativeElement.focus();
      return;
    } else if (this.clinicaControl.invalid) {
      this.clinicaHTML.nativeElement.focus();
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
    if (this.productosACobrar.length == 0) {
      this.utilidadesService.alerta("Sin productos", "Agregue por lo menos un producto.").subscribe(() => {
        this.productoHTML.nativeElement.focus();
      });
      return
    }

    //Se abre el modal de espera.
    this.esperarService.esperar();

    /*this.consultasService.usuarioConsultaFechaOcupada("0", this.usuarioControl.value.id, this.utilidadesService.formatearFecha(fechaConsulta, false), this.utilidadesService.formatearFechaHora(fechaConsulta, horaInicio, false), this.utilidadesService.formatearFechaHora(fechaConsulta, horaFin, false)).subscribe(respuesta => {

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

              //Se da de alta la consulta.
              this.consultasService.altaConsulta(
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
                    //Se cierra el  modal de espera.
                    this.esperarService.noEsperar();
                  }
                  else {

                    //Se obtiene el identificador de la consulta recién creado.
                    let consultaId: string = respuesta["mensaje"];

                    //Se dan de alta los estudios.
                    this._altaEstudioConsulta(consultaId, this.estudiosAProgramar, 0);

                  }

                });

            }
          });

        }
        //Si no tiene consultas en la fecha y hora dadas.
        else {

          //Se abre el modal de espera.
          this.esperarService.esperar();

          //Se da de alta la consulta.
          this.consultasService.altaConsulta(
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
                //Se cierra el  modal de espera.
                this.esperarService.noEsperar();
              }
              else {

                //Se obtiene el identificador de la consulta recién creado.
                let consultaId: string = respuesta["mensaje"];

                //Se dan de alta los estudios.
                this._altaEstudioConsulta(consultaId, this.estudiosAProgramar, 0);

              }

            });
        }

      }

    });*/


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

    /*let detProductoId: string = campos[iteracion].id;

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
      });*/
  }

}

