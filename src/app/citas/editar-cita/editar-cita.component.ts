/******************************************************************|
|NOMBRE: EditarCitaComponent.                                      | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para editar citas.                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead, NgbModalOptions, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter, NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, fromEvent } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { PacientesService } from '../../pacientes.service';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { ClinicasService } from '../../clinicas.service';
import { CitasService } from '../../citas.service';
import { AutenticarService } from '../../autenticar.service';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {

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
  //Indica si el filtro de usuarios ya se cargó.
  usuariosListos: boolean = false;
  //Indica si el filtro de pacientes ya se cargó.
  pacientesInicioListo: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de edición de las citas.
  formEdicionCitas: FormGroup;
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
  //Indica si el filtro de estados citas ya cargó.
  estadosCitasListos: boolean = false;
  //Propiedad para cuando se oprime el botón de crear cita.
  pulsarEditar: boolean = false;
  //Identificador de la cita tomado de la url.
  citaId: string;
  //Almacena los eventos o detalle de las citas de la base de datos pero su información se puede filtrar.
  detCitas: JSON[] = [];
  //Almacena los eventos o detalle de las cita de la base de datos original sin que se filtre su información.
  detCitasServidor: JSON[] = [];
  //Propiedad que indica si el usuario puede eliminar eventos de la cita.
  eliminarDetCitas: boolean = false;

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
   |  citasService = contiene los métodos de la bd de los estados de citas,|
   |  rutaActual: Para obtener los parámetros de la url,                   |
   |  autenticarService = contiene los métodos de autenticación.           |                                
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 21/08/2018.                                                   |    
   |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private clinicasService: ClinicasService,
    private citasService: CitasService,
    private rutaActual: ActivatedRoute,
    private autenticarService: AutenticarService) {

    //Se agregan las validaciones al formulario de edición de citas.
    this.formEdicionCitas = fb.group({
      'usuario': ['', Validators.required],
      'paciente': ['', Validators.required],
      'clinica': ['', [Validators.required]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuarioControl = this.formEdicionCitas.controls['usuario'];
    this.pacienteControl = this.formEdicionCitas.controls['paciente'];
    this.clinicaControl = this.formEdicionCitas.controls['clinica'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los pacientes en su filtro.
    this.filtroPacientes();
    //Se cargan los usuarios en su filtro.
    this.filtroUsuarios();
    //Se cargan las clínicas en su filtro.
    this.filtroClinicas(0);

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.usuariosListos &&
        this.pacientesInicioListo &&
        this.clinicasInicioListas) {

        //Obtiene el identificador de la cita de la url.
        this.rutaActual.paramMap.subscribe(params => {

          this.citaId = params.get("id");

          //Se obtiene la información de la cita.
          this.citasService.verCita(this.citaId, "0").subscribe(respuesta => {

            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this._alerta(respuesta["mensaje"]).subscribe(() => {
                //Se retorna al listado de citas.
                this.rutaNavegacion.navigate(['citas', 'lista-citas']);
              })
            }
            //Si todo salió bien.
            else {

              //Se establece el valor del usuario de atención de la cita.
              this.usuarioControl.setValue(this.usuarios.filter(usuario =>
                usuario.id.indexOf(respuesta["datos"][0]["usuario_id_atencion"]) > -1)[0]);

              //Se establece el valor del paciente de la cita.
              this.pacienteControl.setValue(this.pacientes.filter(paciente =>
                paciente.id.indexOf(respuesta["datos"][0]["paciente_id"]) > -1)[0]);

              //Se establece el valor de la clínica de la cita.             
              this.clinicaControl.setValue(respuesta["datos"][0]["clinica_id"]);

              //Se obtienen los eventos de la cita.
              this.buscar().subscribe(() => {
                //Se detiene la espera.
                this.esperarService.noEsperar();
              });

            }

          });


        });

      }

    });


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.detCitasServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.detCitas = resultados;
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

    //El botón de dar eliminar el detalle de citas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR EVENTO CITA').subscribe((respuesta: boolean) => {
      this.eliminarDetCitas = respuesta["value"];
    });

  }
  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de citas.                    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/08/2018.                                                   |    
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
  |  NOMBRE: editarCita.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que edita una cita.                              |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 21/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarCita() {

    //Se pulsa el botón  de dar de alta cita.
    this.pulsarEditar = true;

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

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
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

    //Se abre el  modal de espera.
    this.esperarService.esperar();

    this.citasService.editarCita(this.citaId,
      this.usuarioControl.value.id,
      this.pacienteControl.value.id,
      this.clinicaControl.value)
      .subscribe(respuesta => {

        //Se cierra el  modal de espera.
        this.esperarService.noEsperar();
        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this._alerta(respuesta["mensaje"]);
        }
        else {
          //Muestra una alerta con el mensaje satisfactorio.
          this._alerta("La cita se modificó satisfactoriamente.");
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
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.detCitas = this.detCitasServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarDetCita.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un evento de una cita.             |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: detCitaId = id. del detalle de la cita.       |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarDetCita(detCitaId: string) {

    //Abre el modal.
    const modalRef = this.modalService.open(DialogoConfirmacionComponent, { centered: true });
    //Define el título del modal.
    modalRef.componentInstance.titulo = "Confirmación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información del evento de la cita. "
      + "¿Está seguro de eliminar el evento?";
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
    //Define la etiqueta del botón de Cancelar.
    modalRef.componentInstance.etiquetaBotonCancelar = "No";
    //Se retorna el botón pulsado.
    modalRef.result.then((result) => {
      //Si la respuesta es eliminar el evento o detalle de la cita.
      if (result === "Sí") {
        //Se procede a eliminar el detalle de la cita.
        this.citasService.eliminarDetCita(detCitaId).subscribe(respuesta => {
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this._alerta(respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            this._alerta("El evento de la cita se eliminó permanentemente.").subscribe(() => {
              //Inicia la espera.
              this.esperarService.esperar();
              //Se actualizan los datos.
              this.buscar().subscribe(() => {
                //Se detiene la espera.
                this.esperarService.noEsperar();
              });
            });

          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda de eventos de la cita.              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscar(): Observable<any> {

    //Se utiliza para esperar a que se ejecute la búsqueda.
    let subject: Subject<any> = new Subject<null>();



    // Se obtienen los eventos o detalle de las citas.
    this.citasService.listaDetCitas(this.citaId, "0").subscribe(respuesta => {

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this._alerta(respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        this.detCitas = respuesta["datos"];
        this.detCitasServidor = respuesta["datos"];
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();

      }
      //se hace un next, signo de que ya obtuvo la información.
      subject.next(null);
    });

    //Se retorna el observable.
    return subject.asObservable();

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetCita.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear un detalle o    |
  |  evento de cita.                                                      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetCita() {
    this.rutaNavegacion.navigateByUrl('citas/alta-det-cita/' + this.citaId);
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
