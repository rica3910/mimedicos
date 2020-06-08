

/******************************************************************|
|NOMBRE: inventarioProducto.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene el inventario de un producto.|
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 18/05/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTypeahead, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { UsuariosService } from '../../usuarios.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from './../../productos.service';


@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]
})
export class InventarioProductoComponent implements OnInit {

  //Variable que almacena el identificador del producto, obtenido de la url.
  productoId: string;
  //Propiedad que indica si el usuario puede ver el inventario del producto,
  verInventarioProducto: boolean = false;
  //Propiedad que indica si el usuario puede actualizar el inventario.
  actualizarInventario: boolean = false;
  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Objeto que contendrá el formulario de búsqueda del inventario.
  formBusqueda: FormGroup;
  //Objeto que contendrá el formulario de añadir producto.
  formAgregar: FormGroup;
  //Objeto que contendrá el formulario de restar producto.
  formRestar: FormGroup;
  //Objeto del formulario que contendrá a la fecha desde.
  fechaDesdeControl: AbstractControl;
  //Objeto del formulario que contendrá a la fecha hasta.
  fechaHastaControl: AbstractControl;
  //Objeto del formulario que contendrá al usuario.
  usuarioControl: AbstractControl;
  //Objeto del formulario que contendrá al tipo del cobro.
  tipoControl: AbstractControl;
  //Objeto del formulario que contendrá al cuadro de texto de agregar producto.
  agregarProductoControl: AbstractControl;
  //Objeto del formulario que contendrá al cuadro de texto de restar producto.
  restarProductoControl: AbstractControl;
  //Almacena el nombre de la clínica.
  nombreClinica: string = "";
  //Almacena el nombre del producto
  nombreProducto: string = "";
  //Almacena la descripción del producto.
  descripcion: string = "";
  //Almacena el stock del producto.
  stock: string = "";
  //Indica si la info del producto ya se cargó.
  productoListo: boolean = false;

  /*Variable que sirve para cuando se le de clic o focus al usuario
  se ejecute el método buscar usuario.*/
  @ViewChild('usuarioNG') usuarioNG: NgbTypeahead;
  //Variable que almacena el control del formulario de la búsqueda del paciente.
  @ViewChild('usuarioHTML') usuarioHTML: ElementRef;
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
  //Cuadro de texto de agregar producto.
  @ViewChild('agregarProductoHTML') agregarProductoHTML: ElementRef;
  //Cuadro de texto de restar producto.
  @ViewChild('restarProductoHTML') restarProductoHTML: ElementRef;

  //Variable que reacciona al focus del campo buscar usuario.
  focusBuscarUsuario$ = new Subject<string>();
  //Variable que reacciona al darle clic al campo buscar usuario.
  clickBuscarUsuario$ = new Subject<string>();
  //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
  formatoUsuarios = (value: any) => value.nombres_usuario;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si la información del inventario ya se obtuvo.
  inventarioListo: boolean = false;
  //Fecha inicial del campo fecha desde.  
  fechaDesdeInicial: NgbDateStruct;
  //Fecha desde seleccionada.
  fechaDesdeSeleccionada: NgbDateStruct;
  //Fecha mínima que puede tener el campo fechaHasta. Debe de ser por lo mínimo igual a la fecha desde.
  fechaHastaMinima: NgbDateStruct;
  //Fecha hasta seleccionada.
  fechaHastaSeleccionada: NgbDateStruct;
  //Almacena el inventario del producto de la base de datos pero su información se puede filtrar.
  inventario: JSON[] = [];
  //Almacena el inventario del producto de la base de datos original sin que se filtre su información.
  inventarioServidor: JSON[] = [];
  //Empezará por la página 1 en la paginación.
  page: number = 1;
  //Almacena el número de registros máximos por página.
  registrosPorPagina: number = 100;
  //Indica el número de registros que arrojó la búsqueda.
  numeroRegistros: number = 0;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |                                    |
  |  usuariosService = contiene los métodos de la bd de los usuarios,     |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  rutaNavegacion   = para navegar a otras url´s,                       |
  |  rutaActual = obtiene los parámetros de la url actual,                |
  |  productosService = contiene los métodos de los productos.            |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private autenticarService: AutenticarService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private productosService: ProductosService
  ) {

    //Obtiene el identificador del producto de la url.
    this.rutaActual.paramMap.subscribe(params => {
      //Se inicia la espera.
      this.esperarService.esperar();
      //Se obtiene el identificador del producto.
      this.productoId = params.get("id");
      //Se obtiene la info del producto.
      this.infoProducto();
      //Se cargan los usuarios en su filtro.
      this.filtroUsuarios();
    });

    //Se agregan las validaciones al formulario de búsqueda.
    this.formBusqueda = fb.group({
      'fechaDesde': [''],
      'fechaHasta': [''],
      'usuario': [''],
      'tipo': ['TODOS']
    });

    //Se agregan las validaciones al formulario de agregar producto.
    this.formAgregar = fb.group({
      'agregarProducto': ['', [this.utilidadesService.numberValidator, Validators.min(1)]]
    });

    //Se agregan las validaciones al formulario de restar producto.
    this.formRestar = fb.group({
      'restarProducto': ['', [this.utilidadesService.numberValidator, Validators.min(1)]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.fechaDesdeControl = this.formBusqueda.controls['fechaDesde'];
    this.fechaHastaControl = this.formBusqueda.controls['fechaHasta'];
    this.usuarioControl = this.formBusqueda.controls['usuario'];
    this.tipoControl = this.formBusqueda.controls['tipo'];
    this.agregarProductoControl = this.formAgregar.controls['agregarProducto'];
    this.restarProductoControl = this.formRestar.controls['restarProducto'];


    //Al calendario del campo fecha desde y hasta se les establece la fecha actual.
    let fechaActual = new Date();
    this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
    this.fechaHastaMinima = this.fechaDesdeInicial;
    //Se selecciona en el calendario de fecha desde y fecha hasta la fecha actual.
    this.fechaDesdeControl.setValue("");
    this.fechaHastaControl.setValue("");
    this.fechaDesdeSeleccionada = this.fechaDesdeInicial;

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.productoListo) {

        this.usuariosListos = false;
        this.productoListo = false;

        this.restarProductoControl.setValidators([this.utilidadesService.numberValidator, Validators.min(1), Validators.max(Number(this.stock))]);

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
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.inventarioServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.inventario = resultados;
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

    //Agregar y restar producto solo aceptarán números.
    this.utilidadesService.inputNumerico(this.agregarProductoHTML, false, this.agregarProductoControl);
    this.utilidadesService.inputNumerico(this.restarProductoHTML, false, this.restarProductoControl);

    //Cuando se cambia el agregar producto.
    this.agregarProductoControl.valueChanges.subscribe(() => {

      //No puede ser menor 1.
      if (this.agregarProductoControl.value != "" && Number(this.agregarProductoControl.value) < 1) {
        this.agregarProductoControl.setValue("");
      }

    });

    //Cuando se cambia el restar producto.
    this.restarProductoControl.valueChanges.subscribe(() => {

      //No puede ser menor 1 y no puede ser mayor al stock.
      if (this.restarProductoControl.value != "" && (Number(this.restarProductoControl.value) < 1 || Number(this.restarProductoControl.value) > Number(this.stock))) {
        this.restarProductoControl.setValue("");
      }

    });
  }

  ngAfterViewInit() {

    //Los botones de actualizar inventario se harán visibles solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ACTUALIZAR INVENTARIO PRODUCTO').subscribe((respuesta: boolean) => {
      this.actualizarInventario = respuesta["value"];
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
    |  FECHA: 18/05/2020.                                                   |    
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
  |  NOMBRE: filtroUsuarios.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroUsuarios() {

    //Intenta obtener los usuarios del usuario ingresado.
    this.usuariosService.filtroUsuarios("TODOS")
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
  |  NOMBRE: fechaDesdeSeleccion.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Cuando la fecha desde es seleccionada, la fecha hasta   |
  |  se resetea.                                                          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
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
  |  PARÁMETROS DE ENTRADA: numeroPagina = Número de paginación.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar(numeroPagina: number = 1) {

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
      this.utilidadesService.alerta("Fecha inválida", "La fecha inicial debe ser menor o igual a la fecha final.").subscribe(() => {
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

    //Inicia la espera de respuesta.
    this.esperarService.esperar();

    //Se utiliza para saber cuáles registros obtener según el número de página.
    let siguientesRegistros: number = (numeroPagina - 1) * this.registrosPorPagina;

    //Busca el iventario del producto.
    this.productosService.inventarioProducto(
      this.productoId,
      fechaDesde ? this.utilidadesService.formatearFecha(fechaDesde, false) : " ",
      fechaHasta ? this.utilidadesService.formatearFecha(fechaHasta, false) : " ",
      siguientesRegistros + "",
      this.tipoControl.value,
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

          //Se almacenan los registros.
          this.inventario = respuesta["datos"];
          this.inventarioServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

          //Si hay resultados en la consulta.
          if (this.inventario.length > 0) {
            //Se actualiza la paginación.
            this.numeroRegistros = Number(respuesta["datos"][0]["numero_registros"]);
          }
          else {
            //No hay paginación.
            this.numeroRegistros = 0;
          }

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
  |  FECHA: 18/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.inventario = this.inventarioServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoProducto.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: obtiene la información del producto.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoProducto() {

    //Busca las usuarios sin el producto.
    this.productosService.verProducto(
      this.productoId).subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];
          this.nombreProducto = respuesta["datos"][0]["nombre"];
          this.descripcion = respuesta["datos"][0]["descripcion"];
          this.stock = respuesta["datos"][0]["cantidad"];

        }

        this.productoListo = true;
        this.cargaInicialLista$.next(this.productoListo);

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de productos.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['configuracion', 'productos']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarPagina.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Obtiene los registros según el número de página.        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pagina = Número de página.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarPagina(pagina) {

    this.buscar(pagina);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarProducto.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar inventario de un producto.          |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  agregarProducto() {

    this.utilidadesService.confirmacion("Agregar producto", "¿Está seguro de agregar al inventario la cantidad de producto específicada?").subscribe(respuesta => {
      //Si se acepta.
      if (respuesta == "Aceptar") {

        /*Si los elementos del formulario estáticos requeridos no están llenos, 
        se hace un focus para que se ingrese texto.*/
        if (this.agregarProductoControl.invalid) {
          this.agregarProductoHTML.nativeElement.focus();
          return;
        }

        if (Number(this.agregarProductoControl.value) < 1) {
          this.utilidadesService.alerta("Cantidad de producto incorrecta", "La cantidad de producto debe ser mayor a 0");
          return;
        }

        //Se inicia la espera.
        this.esperarService.esperar();

        //Se intenta modificar el producto.
        this.productosService.actualizarInventarioProducto(this.productoId, this.agregarProductoControl.value, 'ENTRADA').subscribe((respuesta) => {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Si hubo un error en la obtención de información.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {

            this.utilidadesService.alerta("Actualizción de inventario satisfactoria.", "La cantidad de  producto se agregó satisfactoriamente.").subscribe(() => {
              //Se actualiza la información.
              location.reload();
            });

          }

        });

      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: restarProducto.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para restar inventario de un producto.           |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  restarProducto() {

    this.utilidadesService.confirmacion("Restar producto", "¿Está seguro de restar al inventario la cantidad de producto específicada?").subscribe(respuesta => {
      //Si se acepta.
      if (respuesta == "Aceptar") {

        /*Si los elementos del formulario estáticos requeridos no están llenos, 
        se hace un focus para que se ingrese texto.*/
        if (this.restarProductoControl.invalid) {
          this.restarProductoHTML.nativeElement.focus();
          return;
        }

        if (Number(this.restarProductoControl.value) < 1) {
          this.utilidadesService.alerta("Cantidad de producto incorrecta", "La cantidad de producto debe ser mayor a 0");
          return;
        }
        else if (Number(this.restarProductoControl.value) > Number(this.stock)) {
          this.utilidadesService.alerta("Cantidad de producto incorrecta", "La cantidad de producto debe ser menor o igual al stock.");
          return;
        }

        //Se inicia la espera.
        this.esperarService.esperar();

        //Se intenta modificar el producto.
        this.productosService.actualizarInventarioProducto(this.productoId, this.restarProductoControl.value, 'SALIDA').subscribe((respuesta) => {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Si hubo un error en la obtención de información.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {

            this.utilidadesService.alerta("Actualizción de inventario satisfactoria.", "La cantidad de  producto se restó satisfactoriamente.").subscribe(() => {
              //Se actualiza la información.
              location.reload();
            });

          }

        });

      }
    });

  }

}
