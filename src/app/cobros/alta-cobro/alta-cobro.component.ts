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
import { Router } from '@angular/router';
import { NgbTypeahead, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, fromEvent } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { ProductosService } from '../../productos.service';
import { AutenticarService } from '../../autenticar.service';
import { CobrosService } from '../../cobros.service';
import { AgregarCantidadProductoComponent } from '../agregar-cantidad-producto/agregar-cantidad-producto.component';
import { ParametrosService } from '../../parametros.service';
import { CobroReciboService } from './../../cobro-recibo.service';
import { AgregarAbonoComponent } from '../../agregar-abono/agregar-abono.component';
import { CurrencyPipe } from '@angular/common';


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
  productos: { id: string, nombre_producto: string, descripcion: string, precio_neto: string, precio_neto_formato: string, precio_bruto: string, precio_bruto_formato: string, cantidad: string, stock: string }[] = [];
  //Registros de los productos.
  productosACobrar: { id: string, nombre_producto: string, descripcion: string, precio_neto: string, precio_neto_formato: string, precio_bruto: string, precio_bruto_formato: string, cantidad: string, stock: string }[] = new Array();
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
  //Variable que almacena el control del formulario del tipo de cobro.
  @ViewChild('tipoCobroHTML') tipoCobroHTML: ElementRef;
  //Variable que almacena el control del formulario del descuento.
  @ViewChild('porcentajeDescuentoHTML') porcentajeDescuentoHTML: ElementRef;
  //Variable que almacena el control del formulario de los comentarios.
  @ViewChild('comentariosHTML') comentariosHTML: ElementRef;
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
  formatoProductos = (value: any) => value.nombre_producto ? value.nombre_producto + " - " + value.precio_neto_formato + " - " + value.descripcion : "";
  //Indica si el valor del IVA ya fue obtenido.
  ivaInicioListo: boolean = false;
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si  ya se verificó que el usuario pueda dar descuentos.
  verificarUsuarioPuedeDarDescuentos: boolean = false;
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
  //Objeto del formulario que contendrá los comentarios.
  comentariosControl: AbstractControl;
  //Subtotal del cobro (sin impuestos).
  subtotal: number = 0;
  //Iva.
  iva: number = 0;
  //Total del cobro.
  total: number = 0;
  //Registros de tipo de cobros que se verán en la vista en el campo tipos de cobro.
  tipoCobros: Array<JSON> = new Array();
  //Indica si el filtro de tipos de cobros está listo.
  tiposCobrosListo: boolean = false;
  //Objeto del formulario que contendrá al tipo de cobro.
  tipoCobroControl: AbstractControl;
  //Indica si el usuario logueado puede dar descuentos.
  usuarioPuedeDarDescuentos: boolean = false;
  //Indica si los inputs de descuento son válidos.
  verificarInputsDescuentos: boolean = false;

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
  |  parametrosService = contiene los métodos para la obtención de params,|
  |  cobrosReciboService = contiene los métodos para el recibo del cobro. |                              
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
    private cobrosService: CobrosService,
    private productosService: ProductosService,
    private autenticarService: AutenticarService,
    private parametrosService: ParametrosService,
    private cobroReciboService: CobroReciboService) {


    //Se agregan las validaciones al formulario de alta de cobros.
    this.formAltaCobros = fb.group({
      'usuario': ['', Validators.required],
      'paciente': [''],
      'clinica': ['', [Validators.required]],
      'producto': ['', Validators.required],
      'descuento': ['', [this.utilidadesService.decimalValidator, Validators.max(this.subtotal), Validators.min(0)]],
      'porcentajeDescuento': ['', [this.utilidadesService.decimalValidator, Validators.max(100), Validators.min(0)]],
      'tipoCobro': ['', [Validators.required]],
      'comentarios': ['']
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formAltaCobros.controls['usuario'];
    this.pacienteControl = this.formAltaCobros.controls['paciente'];
    this.clinicaControl = this.formAltaCobros.controls['clinica'];
    this.productoControl = this.formAltaCobros.controls['producto'];
    this.descuentoControl = this.formAltaCobros.controls['descuento'];
    this.porcentajeDescuentoControl = this.formAltaCobros.controls['porcentajeDescuento'];
    this.tipoCobroControl = this.formAltaCobros.controls['tipoCobro'];
    this.comentariosControl = this.formAltaCobros.controls['comentarios'];


    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar();
    //Se obtiene el IVA de la  base de datos.
    this.obtenerIva();
    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas();
    //Se cargan los usuarios.
    this.filtroUsuarios();
    //Se verifica que el usuario logueado pueda dar descuentos.
    this.usuarioPuedeDarDescuento();
    //Se cargan los tipos de cobros.
    this.filtroTiposCobros();

  }

  ngOnInit() {

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
    this.descuentoControl.statusChanges.subscribe(() => {
      this.activarValidacionesDescuentos();
    });

    //Cuando se cambia el porcentaje de descuento.
    this.porcentajeDescuentoControl.statusChanges.subscribe(() => {
      this.activarValidacionesDescuentos();
    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.ivaInicioListo &&
        this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas &&
        this.verificarUsuarioPuedeDarDescuentos &&
        this.tiposCobrosListo) {

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
   |  NOMBRE: filtroTiposCobros.                                           |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para llenar el filtro de tipos cobros.           | 
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 06/03/2020.                                                   |    
   |----------------------------------------------------------------------*/
  filtroTiposCobros() {

    //Intenta obtener los tipos de los cobros.
    this.cobrosService.filtroTiposCobros()
      .subscribe((respuesta) => {


        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los tipos de cobros.
          this.tipoCobros = respuesta["datos"];
          //Se inicializa el select con el primer valor encontrado.
          this.tipoCobroControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
        }

        //Indica que el filtro de tipos cobros ya se cargó.
        this.tiposCobrosListo = true;
        this.cargaInicialLista$.next(this.tiposCobrosListo);
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
    this.subtotal = 0;

    //Valor que trae el componente del usuario.
    let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
    let valorUsuario: string = this.usuarioControl.value;

    //Si hay un usuario válido en el campo usuario.    
    if (usuario.id) {

      //Valor que trae el componente del paciente.
      let paciente: { id: string, nombres_paciente: string } = this.pacienteControl.value;

      //Si el paciente no es válido. Se borra.
      if (this.pacienteControl.value.length != 0 && !paciente.id) {
        //Se limpia el campo del paciente.
        this.pacienteControl.setValue("");
      }


      //Se inicializan los pacientes.
      this.pacientes = new Array();
      //Pacientes a filtrar.
      let pacientesAFiltrar: Array<any> = new Array();

      //Se inicia la espera.
      this.esperarService.esperar();

      //Se obtienen los productos del usuario seleccionado.
      this.filtroProductos(usuario.id);

      //Se obtienen los pacientes que tienen asignado al usario seleccionado.
      this.pacientesTienenUsuarioSeleccionado(this.pacientesServidor, usuario.id).
        pipe(map(paciente => {
          pacientesAFiltrar.push(paciente);
          return pacientesAFiltrar;
        })).
        toPromise().then(pacientes => {

          this.pacientes = pacientes;
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
    this.productosService.filtroProductos(usuarioId, "ACTIVO", this.clinicaControl.value)
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
  |  NOMBRE: obtenerIva.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener el iva de la base de datos.         |      
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerIva() {
    this.parametrosService.obtenerIva().subscribe((respuesta) => {

      this.ivaInicioListo = true;
      this.cargaInicialLista$.next(this.ivaInicioListo);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se establece el IVA.
        this.iva = respuesta["IVA"];

      }
    });
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

    //Se vacía el descuento.
    this.porcentajeDescuentoControl.setValue("");
    this.descuentoControl.setValue("");

    //Se obtiene el producto seleccionado.
    let producto: { id: string, nombre_producto: string, descripcion: string, precio_neto: string, precio_neto_formato: string, precio_bruto: string, precio_bruto_formato: string, cantidad: string, stock: string } = this.productoControl.value;

    //Si viene algo escrito en el producto pero no es un registro de  base de datos.
    if (!producto.id) {
      this.utilidadesService.alerta("Producto inválido", "Seleccione un producto válido.").subscribe(() => {
        this.productoHTML.nativeElement.focus();
      });
      return;
    }

    //Si el producto ya existe.
    if (this.productosACobrar.filter(productoACobrar => productoACobrar.id == producto.id).length > 0) {
      this.productoControl.setValue("");
      this.utilidadesService.alerta("Producto existente.", "El producto ya existe en la lista de productos.");
    }
    //Si el producto no existe.
    else {

      //Si no hay stock del producto
      if (Number(producto.stock) <= 0) {
        this.utilidadesService.alerta("Producto agotado.", "No hay producto disponible en el inventario.");
      }
      //Si sí hay stock.
      else {

        this.cobrosService.agregarCantidadProducto(AgregarCantidadProductoComponent, producto).subscribe((procucto) => {

          //Si se agregó un producto.
          if (producto) {
            //Se almacena el registro en el arreglo de productos a cobrar.
            this.productosACobrar.push(producto);
            //Se limpia el campo.
            this.productoControl.setValue("");
            //Se le suma el precio del cobro al total.      
            this.subtotal = this.subtotal + (Number(producto.precio_bruto) * Number(producto.cantidad));
          }

        });

      }

    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: quitarProducto.                                              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: index = posición de arreglo a quitar,         |
  |  precioNeto = precio que se le quitará al total.                      |    
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para quitar un producto al arreglo de productos  |
  |  a cobrar.                                                            | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  quitarProducto(index, precioNeto) {

    //Se vacía el descuento.
    this.porcentajeDescuentoControl.setValue("");
    this.descuentoControl.setValue("");

    //Se elimina  el producto seleccionado.
    this.productosACobrar.splice(index, 1);
    //Se le quita el precio del producto al total.    
    this.subtotal = this.subtotal - Number(precioNeto);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeDarDescuento.                                    |  
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Verifica que un usuario pueda dar descuentos.           | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeDarDescuento() {

    this.autenticarService.usuarioPuedeDarDescuentos().subscribe((respuesta) => {
      this.usuarioPuedeDarDescuentos = respuesta["value"];
      this.verificarUsuarioPuedeDarDescuentos = true;
      this.cargaInicialLista$.next(this.verificarUsuarioPuedeDarDescuentos);
    });


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
  |  NOMBRE: cobrar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cobrar.                                     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: estatus = COBRADO o PENDIENTE (abono).        |  
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cobrar(estatus: string) {

    //El mensaje cambiará dependiendo del estatus del cobro (COBRADO o PENDIENTE).
    let tituloConfirmacion: string;
    let mensajeConfirmacion: string;

    if (estatus == 'COBRADO') {
      tituloConfirmacion = "Confirmación de cobro";
      mensajeConfirmacion = "¿Está seguro de realizar el cobro?";
    }
    //Si es un abono.
    else {
      tituloConfirmacion = "Confirmación de abono";
      mensajeConfirmacion = "¿Está seguro de realizar el abono?";
    }

    this.utilidadesService.confirmacion(tituloConfirmacion, mensajeConfirmacion).subscribe(respuesta => {
      //Si se acepta.
      if (respuesta == "Aceptar") {

        //Se pulsa el botón  de dar de alta cobro o abonar.
        this.pulsarCrear = true;

        /*Si los elementos del formulario estáticos requeridos no están llenos, 
        se hace un focus para que se ingrese texto.*/
        if (this.usuarioControl.invalid) {
          this.usuarioHTML.nativeElement.focus();
          return;
        } else if (this.clinicaControl.invalid) {
          this.clinicaHTML.nativeElement.focus();
          return;
        } else if (this.tipoCobroControl.invalid) {
          this.tipoCobroHTML.nativeElement.focus();
          return;
        }

        let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
        //Si viene algo escrito en el usuario pero no es un registro de base de datos.
        if (usuario && !usuario.id) {
          this.utilidadesService.alerta("Médico inválido", "Seleccione un médico válido.").subscribe(() => {
            this.usuarioHTML.nativeElement.focus();
          });
          return
        }

        let paciente: { id: string, nombres_usuario: string } = this.pacienteControl.value;
        //Si viene algo escrito en el paciente pero no es un registro de base de datos.
        if (paciente && !paciente.id) {
          this.utilidadesService.alerta("Paciente inválido", "Seleccione un paciente válido.").subscribe(() => {
            this.pacienteHTML.nativeElement.focus();
          });
          return
        }

        //Si no se agregó ningún producto.
        if (this.productosACobrar.length == 0) {
          this.utilidadesService.alerta("Sin productos", "Agregue por lo menos un producto.").subscribe(() => {
            this.productoHTML.nativeElement.focus();
          });
          return
        }

        //Se utiliza para distinguir entre un abono y un cobrado total.
        let procesoCobrado: Subject<any> = new Subject<any>();

        //Si es un cobro total.
        if (estatus == 'COBRADO') {
          //No hay más procesos que realizar.
          procesoCobrado.next(null);
          procesoCobrado.complete();
        }
        //Si es un abono.
        else {

          //Se establece la información del cobro para poder abonar.
          let abono: { total: string, totalFormato: string, abono: string, tiposCobros: Array<any>, tipoCobro: string, observaciones: string  } = {total: "", totalFormato: "", abono: "", tiposCobros: new Array(), tipoCobro: "", observaciones: ""};
          
          abono.total = (this.subtotal - this.descuentoControl.value) + ((this.subtotal - this.descuentoControl.value) * (this.iva / 100)) + "";
          abono.totalFormato = new CurrencyPipe("EN").transform(abono.total, "$");
          abono.tiposCobros = this.tipoCobros.filter(tipoCobro => tipoCobro["id"] == this.tipoCobroControl.value);

          //Se muestra un caja de diálogo donde el usuario escribirá el abono que se le dará al cobro.
          this.cobrosService.agregarAbono(AgregarAbonoComponent, abono).subscribe((abono) => {
            //Si se agregó un abono
            if (abono) {
              procesoCobrado.next(abono);
              procesoCobrado.complete();
            }
            //Si se cerró el modal sin aplicar el abono.         
            else {
              //No hay más procesos que realizar.
              return false;            
            }
          });

        }

        procesoCobrado.toPromise().then((abono) => {            
                                
          //Se abre el modal de espera.
          this.esperarService.esperar();

          let listadoProductos: string = "";

          //Se forma la lista de productos.
          this.productosACobrar.forEach(producto => {

            listadoProductos = listadoProductos + producto.id + ":" + producto.cantidad + ",";

          });

          //Se obtiene el descuento.
          let descuento: string = this.descuentoControl.value && this.descuentoControl.value.trim().length > 0 ? this.descuentoControl.value : "0";
          //Se obtiene el identificador del paciente.
          let pacienteId: string = paciente && paciente.id ? paciente.id : "0";

          this.cobrosService.altaCobro(this.clinicaControl.value, this.tipoCobroControl.value, listadoProductos, this.comentariosControl.value, descuento, pacienteId, abono ? abono.abono : '0', abono ? abono.observaciones : '').subscribe(respuestaAltaCobro => {
            //Si hubo un error en el alta de cobro.
            if (respuestaAltaCobro["estado"] === "ERROR") {
              //Se detiene la espera.
              this.esperarService.noEsperar();
              //Se muestra la alerta.
              this.utilidadesService.alerta("Error alta de cobro", respuestaAltaCobro["mensaje"]);
            }
            else {

              //Se detiene la espera.
              this.esperarService.noEsperar();

              //Se obtiene el identificador del cobro.
              let cobroId = respuestaAltaCobro["mensaje"];

              this.utilidadesService.alerta("Alta de cobro satisfactoria.", "El cobro se dio de alta satisfactoriamente.").subscribe(() => {

                //Se intenta imprimir el recibo.
                this.cobroReciboService.imprimirRecibo(cobroId).subscribe(respuestaImprimirRecibo => {

                  //Si No hubo error al imprimir el recibo.
                  if (respuestaImprimirRecibo) {
                    //Se retorna al listado de cobros.
                    this.regresar();
                  }
                });

              });

            }
          });

        });

      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: activarValidacionesDescuentos.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para activar las validaciones de los decuentos.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 21/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  activarValidacionesDescuentos() {

    //Solo se disparará el evento cuando los elementos del descuento estén inválidos.
    if (!this.descuentoHTML || !this.porcentajeDescuentoHTML) {
      this.verificarInputsDescuentos = false;
    }

    //Si el usuario puede dar descuentos, entonces se activan los campos corresponmdientes.
    if (!this.verificarInputsDescuentos && this.usuarioPuedeDarDescuentos && this.productosACobrar.length > 0 && this.descuentoHTML && this.porcentajeDescuentoHTML) {

      //Se utiliza para que no se dispare tantas veces el evento.
      this.verificarInputsDescuentos = true;

      //this.descuentoControl.setValue("");

      //El descuento solo aceptará números.
      this.utilidadesService.inputNumerico(this.descuentoHTML, true, this.descuentoControl);
      //El porcentaje del descuento solo aceptará números.
      this.utilidadesService.inputNumerico(this.porcentajeDescuentoHTML, true, this.porcentajeDescuentoControl);

      //Cuando se cambia el descuento.    
      fromEvent(this.descuentoHTML.nativeElement, 'keyup').subscribe(() => {
        //Si el descuento es mayor que el subtotal.
        if (Number(this.descuentoControl.value) > Number(this.subtotal)) {
          this.utilidadesService.alerta("Descuento no permitido", "El descuento debe ser menor o igual al subtotal.").subscribe(() => {
            this.descuentoControl.setValue("");
            this.porcentajeDescuentoControl.setValue("");
            this.descuentoHTML.nativeElement.focus();
          });
        }
        //Si el descuento es válido.
        else {
          //Se actualiza el porcentaje del descuento.
          this.porcentajeDescuentoControl.setValue(this.descuentoControl.value / this.subtotal * 100 + "");
        }
      });

      //Cuando se cambia el porcentaje del descuento.    
      fromEvent(this.porcentajeDescuentoHTML.nativeElement, 'keyup').subscribe(() => {
        //Si el porcentaje del descuento es mayor a 100.
        if (Number(this.porcentajeDescuentoControl.value) > 100) {
          this.utilidadesService.alerta("Descuento no permitido", "El porcentaje del descuento debe ser menor o igual a 100.").subscribe(() => {
            this.porcentajeDescuentoControl.setValue("");
            this.descuentoControl.setValue("");
            this.porcentajeDescuentoHTML.nativeElement.focus();
          });
        }
        else {
          //Se actualiza el descuento.
          this.descuentoControl.setValue(this.porcentajeDescuentoControl.value / 100 * this.subtotal + "");
        }
      });

    }

  }

}

