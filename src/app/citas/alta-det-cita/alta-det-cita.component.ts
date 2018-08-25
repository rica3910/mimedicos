import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../../citas.service';
import { Observable, Subject } from 'rxjs';
import { NgbModalOptions, NgbModal, NgbDatepickerI18n, NgbDateParserFormatter, NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EsperarService } from '../../esperar.service';
import { CustomDatePicker, FormatDatePicker, I18n } from '../../custom-date-picker';
import { UtilidadesService } from '../../utilidades.service';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-alta-det-cita',
  templateUrl: './alta-det-cita.component.html',
  styleUrls: ['./alta-det-cita.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]
})
export class AltaDetCitaComponent implements OnInit {

  //Identificador de la cita tomado de la url.
  citaId: string;
  //Almacena la información de la cita.
  cita: JSON;
  //Variable que almacena el control del formulario de la actividad.
  @ViewChild('estadoCitaHTML') estadoCitaHTML: ElementRef;
  //Objeto que contendrá el formulario de alta del detalle de las citas.
  formAltaDetCitas: FormGroup;
  /*Registros de los estados de las citas que se verán en la vista en el campo de búsqueda de
  estados citas.*/
  estadosCitas: Array<JSON>;
  //Indica si el filtro de estados citas ya cargó.
  estadosCitasListos: boolean = false;
  //Objeto del formulario que contendrá los comentarios.
  comentariosControl: AbstractControl;
  //Objeto del formulario que contendrá a la actividad o evento.
  estadoCitaControl: AbstractControl;
  //Objeto del formulario que contendrá a la fecha.
  fechaControl: AbstractControl;
  //Objeto del formulario que contendrá a la hora.
  horaControl: AbstractControl;
  //Propiedad para cuando se oprime el botón de crear cita.
  pulsarCrear: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaActual   = para navegar a otras url's,                           |
  |  rutaActual: Para obtener los parámetros de la url,                   |
  |  citasService = contiene los métodos de la bd de los estados de citas,|
  |  modalService = contiene los métodos para manipular modals,           |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  utilidadesService = Contiene métodos genéricos y útiles.             |                                
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private citasService: CitasService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService) {      

    //Al calendario se le establece la fecha actual.
    let fechaActual = new Date();

    //Se agregan las validaciones al formulario de alta de citas.
    this.formAltaDetCitas = fb.group({
      'estadoCita': ['', Validators.required],
      'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
      'hora': [{ hour: fechaActual.getHours(), minute: fechaActual.getMinutes() }],
      'comentarios': ['']
    });


    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.comentariosControl = this.formAltaDetCitas.controls['comentarios'];
    this.estadoCitaControl = this.formAltaDetCitas.controls['estadoCita'];
    this.fechaControl = this.formAltaDetCitas.controls['fecha'];
    this.horaControl = this.formAltaDetCitas.controls['hora'];

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan los estados de las citas.
    this.filtroEstadosCitas();
    
    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.estadosCitasListos) {
        //Se detiene la espera.
        this.esperarService.noEsperar();
      }

    });

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

          //Se almacena la información de la cita.
          this.cita = respuesta["datos"][0];

        }

      });
    });

  }

  ngOnInit() {

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa a la edición de la cita.                        |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigateByUrl('citas/editar-cita/' + this.citaId);
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
        this.estadoCitaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetCita.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que da de alta el evento o detalle de una cita.  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetCita() {

    //Se pulsa el botón  de dar de alta cita.
    this.pulsarCrear = true;

    //Se almacena la hora y la fecha.
    let hora: NgbTimeStruct = this.horaControl.value;
    let fecha: NgbDateStruct = this.fechaControl.value;

    //Si no es una hora válida.
    if (!hora) {
      this._alerta("Seleccione una hora válida.").subscribe(() => { });
      return
    }

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (this.estadoCitaControl.invalid) {
      this.estadoCitaHTML.nativeElement.focus();
      return;
    }

    let fechaHora: string = this.utilidadesService.formatearFechaHora(fecha, hora, false);

    //Se abre el  modal de espera.
    this.esperarService.esperar();    

    this.citasService.usuarioCitaFechaOcupada(this.cita["usuario_id_atencion"], fechaHora).subscribe(respuesta => {

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
              this._altaDetCita(fechaHora);
            }
          });

        }
        else {
          this._altaDetCita(fechaHora);
        }

      }

    });


  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: _altaDetCita.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que da de alta el detalle de una cita.           |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _altaDetCita(fechaHora: string) {

    //Se abre el  modal de espera.
    this.esperarService.esperar();
    //Se da de alta el detalle de la cita.
    this.citasService.altaDetCita(this.citaId,
      this.estadoCitaControl.value,
      fechaHora,
      this.comentariosControl.value).
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
          this._alerta("Se dio de alta satisfactoriamente el evento.").subscribe(()=>{

            //Se retorna a la edición de la cita.
            this.regresar();

          });
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


}
