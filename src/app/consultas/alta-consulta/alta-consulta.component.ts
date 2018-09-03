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

import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeahead, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, of } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormControlName } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { ConsultasService } from '../../consultas.service';

@Component({
  selector: 'app-alta-consulta',
  templateUrl: './alta-consulta.component.html',
  styleUrls: ['./alta-consulta.component.css']
})
export class AltaConsultaComponent implements OnInit {

  //Registros de usuarios que se verán en la vista en el campo de búsqueda de usuarios.
  usuarios: { id: string, nombres_usuario: string }[];
  //Registros de pacientes que se verán en la vista en el campo de búsqueda de pacientes.
  pacientes: { id: string, nombres_paciente: string }[];
  //Variable para almacenar los campos.
  campos: JSON[] = new Array();

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
  //Variable que almacena los campos dinámicos del formulario.
  @ViewChildren('campoHTML') campoHTML: QueryList<any>;

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
  //Indica si los campos ya se obtuvieron.
  camposListos: boolean = false;
  //Propiedad para cuando se oprime el botón de crear consulta.
  pulsarCrear: boolean = false;
  //Propiedad para almacenar las imágenes que pudiera tener el formulario.
  imagenes: any[] = new Array();

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
    private consultaService: ConsultasService) {

    //Al calendario se le establece la fecha actual.
    let fechaActual = new Date();

    //Se agregan las validaciones al formulario de alta de consultas.
    this.formAltaConsultas = fb.group({
      'usuario': ['', Validators.required],
      'paciente': ['', Validators.required],
      'clinica': ['', [Validators.required]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formAltaConsultas.controls['usuario'];
    this.pacienteControl = this.formAltaConsultas.controls['paciente'];
    this.clinicaControl = this.formAltaConsultas.controls['clinica'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan los usuarios en su filtro.
    this.filtroUsuarios();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas(0);
    //Se obtienen los campos configurados para el usuario logueado.
    this.obtenerCampos();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas &&
        this.camposListos) {
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
  |  NOMBRE: obtenerCampos.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los campos del usuario logueado.    | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerCampos() {

    //Intenta obtener los campos del usuario logueado.
    this.consultaService.camposConsultaUsuario("1")
      .subscribe((respuesta) => {

        //Indica que los campos del usuario ya se cargaron.
        this.camposListos = true;
        this.cargaInicialLista$.next(this.camposListos);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this._alerta(respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los campos en forma de JSON.        
          this.campos = respuesta["datos"];

          //Se empiezan a crear los campos del formulario.
          this.campos.forEach(campo => {
            //Se crea el control dinámico.
            let control: FormControl;
            //Se crean las validaciones que tendrá cada campo.
            let validaciones: Array<any> = new Array();

            //Si el campo es requerido.
            campo["requerido"] == "1" ? validaciones.push(Validators.required) : null;
            campo["tipo_campo"] == "ENTERO" ? validaciones.push(this.utilidadesService.numberValidator) : null;
            campo["tipo_campo"] == "DECIMAL" ? validaciones.push(this.utilidadesService.decimalValidator) : null;

            //Se agrega el campo control al formulario.
            control = new FormControl(campo["valor"], validaciones);
            this.formAltaConsultas.addControl('control' + campo["id"], control);

          });

          //Se obtienen los campos HTML creados dinámicamente.
          this.campoHTML.changes.subscribe(() => {
            this.campoHTML.forEach((campo: ElementRef) => {
              //Se obtiene solo el identificador del campo.
              let campoId: string = campo.nativeElement["id"];
              campoId = campoId.replace("control", "");
              /*Se recorren de nuevo los campos obtenidos de la BD
               para aplicarles la máscara si es que necesitan.*/
              this.campos.forEach(campoBD => {
                //Si se encuentra el campo.
                if (campoBD["id"] == campoId) {
                  switch (campoBD["tipo_campo"]) {
                    //Si el campo es numérico.
                    case 'ENTERO': {
                      this.utilidadesService.inputNumerico(campo);
                      break;
                    }
                    //Si el campo es decimal.
                    case 'DECIMAL': {
                      this.utilidadesService.inputNumerico(campo, true);
                      break;
                    }
                  }
                }
              });

            });
          });

        }
      });

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
    }

    let usuario: { id: string, nombres_usuario: string } = this.usuarioControl.value;
    //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
    if (usuario && !usuario.id) {
      this._alerta("Seleccione un usuario válido.").subscribe(() => {
        this.usuarioHTML.nativeElement.focus();
      });
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

    /*Si los elementos del formulario dinámicos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.formAltaConsultas.invalid) {
      return;
    }


    /*Se recorren los campos obtenidos de la BD
    para verificar que los datos introducidos sean válidos.*/
    this.campos.forEach(campo => {

      switch (campo["tipo_campo"]) {
        case "FECHA": {
          //Se obtiene el valor escrito en el campo de fecha.
          let fecha = new Date(this.formAltaConsultas.controls["control" + campo["id"]].value);
          //Si no es una fecha válida.
          if (!fecha.getDate()) {
            this._alerta("Introduzca una fecha válida.").subscribe(() => {
              //Se hace focus en el campo.
              this.campoHTML.find(campoHTML => campoHTML.nativeElement["id"] === "control" + campo["id"]).nativeElement.focus();
            });
          }
          break;
        }
        case "HORA": {
          //Se obtiene el valor escrito en el campo de hora.
          let hora = new Date('01/01/1910 ' + this.formAltaConsultas.controls["control" + campo["id"]].value);
          //Si no es una hora válida.;
          if (!hora.getTime()) {
            this._alerta("Introduzca una hora válida.").subscribe(() => {
              //Se hace focus en el campo.
              this.campoHTML.find(campoHTML => campoHTML.nativeElement["id"] === "control" + campo["id"]).nativeElement.focus();
            });
          }
          break;
        }
      }

    });

    //Se abre el modal de espera.
    this.esperarService.esperar();

    //Se intenta dar de alta la consulta.
    this.consultaService.altaConsulta(this.pacienteControl.value.id, this.clinicaControl.value, this.usuarioControl.value.id)
      .subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this._alerta(respuesta["mensaje"]);
        }
        else {

          //Se obtiene el identificador de la consulta recién creado.
          let consultaId: string = respuesta["mensaje"];
          //Variable que almacenará los campos a insertar en el detalle de la consulta.
          let camposAlta: any[] = new Array();

          /*Se recorren los campos obtenidos de la BD
          para obtener los valores introducidos en los campos del formulario.*/
          for (let iteracion: number = 0; iteracion < this.campos.length; iteracion++) {

            let campo = this.campos[iteracion];

            //Almacena lo escrito en el campo.
            let valor: string = "";
            //Para los campos de tipo archivo.
            let archivo: string = "";
            //Si el campo es un archivo o imagen.
            if (campo["tipo_campo"] == "IMAGEN") {              
              //Se obtiene el archivo.
              archivo = this.formAltaConsultas.controls["control" + campo["id"]].value;
              //Si el archivo es nulo, se inicializa en cadena vacía.
              if(archivo !== null){
                for(let i = 0; i < this.imagenes.length ; i++){
                  console.log("iteracion " + i );
                  if(this.imagenes[i]["campoId"] == "control" + campo["id"]){
                    archivo = this.imagenes[i]["json"];
                    break;
                  }
                }                                       
              }
              else{
                archivo = "";
              }
              //No puede tener archivo y valor juntos, o es uno u otro.              
              valor = "";
            } else {
              archivo = "";
              valor = this.formAltaConsultas.controls["control" + campo["id"]].value;
              valor === null ? valor = "" : null;
            }

            //Se agregan al arreglo los campos que se van a insertar en el detalle de consulta.
            camposAlta.push({ "consultaId": consultaId, "campoId": campo["id"], "valor": valor, "archivo": archivo });
          }

          //Se recoren los campos a insertar recursivamente.
          this.altaDetConsulta(camposAlta, 0);
        }

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetConsulta.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta los campos en el detalle de la  |
  |  consulta.                                                            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campos = campos que se insertarán,            |
  |  iteracion = iteración o registro que sigue para insertar.            |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetConsulta(campos: any[], iteracion: number) {

    //Se almacenan los campos que se insertarán en el detalle.
    let consultaId: string = campos[iteracion].consultaId;
    let campoId: string = campos[iteracion].campoId;
    let valor: string = campos[iteracion].valor;
    let archivo: string = campos[iteracion].archivo;

    //Se intenta dar de alta el detalle de la consulta.
    this.consultaService.altaDetConsulta(consultaId, campoId, valor, archivo)
      .subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Si hubo un error en alguno de los detalles, se borra toda la información de la consulta.
          this.esperarService.noEsperar();
          this._alerta(respuesta["mensaje"]).subscribe(() => {
            //Se retorna a la lista de consultas.
            this.regresar();
            return;
          });         
        }
        //Si la inserción fue correcta.
        else {
          //Si no es el último registro.
          if (iteracion < campos.length - 1) {
            this.altaDetConsulta(campos, iteracion + 1);
          }
          //Si ya es el último registro, se despliega alerta de éxito.
          else {
            this.esperarService.noEsperar();
            this._alerta("La consulta se dio de alta correctamente." + respuesta["mensaje"]).subscribe(() => {
              //Se retorna a la lista de consultas.
              this.regresar();
            });
          }
        }
      });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarImagen.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para campos de tipo imágen.                      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarImagen(event){

    //Si ha sido seleccionada una imagen.
    if (event.target.files && event.target.files[0]) {

      //Variable que almacena la ruta del archivo.
      let archivo: File = event.target.files[0];
      //Variable que almacena la extensión o tipo del archivo.
      let tipoArchivo: string = archivo["type"];

      //Si el archivo no es una imagen.
      if (!tipoArchivo.toUpperCase().includes("IMAGE")) {

        this._alerta("El archivo que seleccionó No es una imagen.");

      }
      //Si sí es una imagen.
      else {

        //Se lee el archivo obtenido.
        var reader = new FileReader();
        reader.readAsDataURL(archivo);

        //Si el tamaño del archivo es muy grande.
        if (archivo.size > 160000) {
          this._alerta("El tamaño de la imagen debe ser menor a 16 megas.");
        }
        else {

          //Obtiene el campo de la imagen.
          let campoId = event.target["id"];

          //Cuando la imagen ya se subió temporalmente.
          reader.onload = (event) => {
            
            //Arma el JSON de la información de la imageny la almacena en el arreglo de imágenes.
            this.imagenes.push({"campoId": campoId, "json": JSON.stringify({              
              nombre: archivo.name,
              extension: archivo.type,
              tamano: archivo.size,
              //decodifica la imagen para que todos los carácteres se almacenen.
              valor: btoa(event.target["result"])
            })});  

            console.log(this.imagenes);

          }

        }

      }

    }

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



}
