/******************************************************************|
|NOMBRE: AltaPacienteComponent.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta pacientes.               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 16/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilidadesService } from '../../utilidades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {


  //Objeto que contendrá el formulario de alta del paciente.
  formAltaPaciente: FormGroup;
  //Objeto del formulario que contendrá al nombre.
  nombres: AbstractControl;
  //Objeto del formulario que contendrá al apellido paterno.
  apellidoPaterno: AbstractControl;
  //Objeto del formulario que contendrá al apellido materno.
  apellidoMaterno: AbstractControl;
  //Objeto del formulario que contendrá al email.
  email: AbstractControl;
  //Objeto del formulario que contendrá al teléfono.
  telefono: AbstractControl;
  //Objeto del formulario que contendrá al celular.
  celular: AbstractControl;
  //Objeto del formulario que contendrá al explorador.
  imagen: AbstractControl;
  //Cuadro de texto del nombre del paciente.
  @ViewChild("nombresHTML") nombresHTML: ElementRef;
  //Cuadro de texto del apellido paterno del paciente.
  @ViewChild("apellidoPaternoHTML") apellidoPaternoHTML: ElementRef;
  //Cuadro de texto del apellido  materno del paciente.
  @ViewChild("apellidoMaternoHTML") apellidoMaternoHTML: ElementRef;
  //Cuadro de texto del email.
  @ViewChild("emailHTML") emailHTML: ElementRef;
  //Cuadro de texto del teléfono.
  @ViewChild("telefonoHTML") telefonoHTML: ElementRef;
  //Cuadro de texto del celular.
  @ViewChild("celularHTML") celularHTML: ElementRef;
  //Cuadro de texto del celular.
  @ViewChild("imagenHTML") imagenHTML: ElementRef;
  //Propiedad para cuando se oprime el botón de crear paciente.
  pulsarCrear: boolean = false;
  //Constante que almacena la url del icono del paciente.
  private imagenPacienteDefault: string = "../../../assets/img/pacientes/paciente_default.png";
  //Propiedad para almacenar la imagen del paciente.
  imagenPaciente: string = this.imagenPacienteDefault;
  //Propiedad que almacena el archivo de la imagen del paciente.
  imagenArchivo: string = "";


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaActual   = para navegar a otras url's,                           |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = métodos genéricos y útiles,                      |
  |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
  |  esperarService = contiene los métodos para el diálogo de espera.     |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private modal: NgbModal,
    private esperarService: EsperarService,
    private pacientesService: PacientesService
  ) {

    //Se agregan las validaciones al formulario de ingresar.
    this.formAltaPaciente = fb.group({
      'nombres': ['', Validators.required],
      'apellidoPaterno': ['', Validators.required],
      'apellidoMaterno': [''],
      'email': ['', Validators.email],
      'telefono': ['', [this.utilidadesService.numberValidator, Validators.maxLength(10), Validators.minLength(10)]],
      'celular': ['', [this.utilidadesService.numberValidator, Validators.maxLength(10), Validators.minLength(10)]],
      'imagen': ['']
    });


    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.nombres = this.formAltaPaciente.controls['nombres'];
    this.apellidoPaterno = this.formAltaPaciente.controls['apellidoPaterno'];
    this.apellidoMaterno = this.formAltaPaciente.controls['apellidoMaterno'];
    this.email = this.formAltaPaciente.controls['email'];
    this.telefono = this.formAltaPaciente.controls['telefono'];
    this.celular = this.formAltaPaciente.controls['celular'];
    this.imagen = this.formAltaPaciente.controls['imagen'];

  }

  ngOnInit() {

    //Se le da el focus al cuadro de texto de nombres.
    this.nombresHTML.nativeElement.focus();

    //El teléfono y celular solo aceptarán números.
    this.utilidadesService.inputNumerico(this.telefonoHTML);
    this.utilidadesService.inputNumerico(this.celularHTML);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 16/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaPaciente.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que da de alta un paciente.                      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaPaciente() {

    this.pulsarCrear = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (this.nombres.invalid) {
      this.nombresHTML.nativeElement.focus();
      return;
    } else if (this.apellidoPaterno.invalid) {
      this.apellidoPaternoHTML.nativeElement.focus();
      return;
    } else if (this.email.invalid) {
      this.emailHTML.nativeElement.focus();
      return;
    } else if (this.telefono.hasError("minlength") || this.telefono.hasError("maxlength")) {
      this.telefonoHTML.nativeElement.focus();
      return;
    } else if (this.celular.hasError("minlength") || this.celular.hasError("maxlength")) {
      this.celularHTML.nativeElement.focus();
      return;
    }

    //Se ponen en mayúsculas algunos campos y a todos se les quita los espacios en blanco.
    let nombres: string = this.nombres.value ? this.nombres.value : "";
    nombres = nombres.trim().toUpperCase();
    let apellidoPaterno: string = this.apellidoPaterno.value ? this.apellidoPaterno.value : "";
    apellidoPaterno = apellidoPaterno.trim().toUpperCase();
    let apellidoMaterno: string = this.apellidoMaterno.value ? this.apellidoMaterno.value : "";
    apellidoMaterno = apellidoMaterno.trim().toUpperCase();
    let email: string = this.email.value ? this.email.value : "";
    email = email.trim();
    let telefono: string = this.telefono.value ? this.telefono.value : "";
    telefono = telefono.trim();
    let celular: string = this.celular.value ? this.celular.value : "";
    celular = celular.trim();

    //Abre el modal de espera.
    this.esperarService.esperar();

    //Se intenta dar de alta al paciente en la base de datos.
    this.pacientesService.altaPaciente(
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      email,
      telefono,
      celular,
      this.imagenArchivo
    )
      .subscribe(resultado => {

        //Detiene la espera.
        this.esperarService.noEsperar();

        this.pulsarCrear = false;

        //Abre el modal.
        const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
        modalRef.result.then((result) => {

          //Se le da un focus a los nombres.
          this.nombresHTML.nativeElement.focus();

        });
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

        //Si se dio de alta satisfactoriamente.
        if (resultado["estado"] == "OK") {

          //Define el título del modal.
          modalRef.componentInstance.titulo = "Alta satisfactoria.";
          //Define el mensaje del modal.
          modalRef.componentInstance.mensaje = "El paciente se dio de alta satisfactoriamente.";

          //Se resetea el formulario.
          this.formAltaPaciente.reset();
          //Limpia la imagen.
          this.limpiarImagen();

        }
        //Si hubo algún error.
        else {
          //Define el título del modal.
          modalRef.componentInstance.titulo = "Error.";
          //Define el mensaje del modal.
          modalRef.componentInstance.mensaje = resultado["mensaje"];

        }

      });


  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarImagen.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que selecciona la imagen del paciente.           |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarImagen(event) {

    //Si ha sido seleccionada una imagen.
    if (event.target.files && event.target.files[0]) {

      //Variable que almacena la ruta del archivo.
      let archivo: File = event.target.files[0];
      //Variable que almacena la extensión o tipo del archivo.
      let tipoArchivo: string = archivo["type"];

      //Si el archivo no es una imagen.
      if (!tipoArchivo.toUpperCase().includes("IMAGE")) {

        //Abre el modal de tamaño chico.
        const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Imagen inválida.";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "El archivo que seleccionó No es una imagen.";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

        //Se resetea la imagen y el seleccionador de archivos.
        this.limpiarImagen();

      }
      //Si sí es una imagen.
      else {

        //Se lee el archivo obtenido.
        var reader = new FileReader();
        reader.readAsDataURL(archivo);

        //Si el tamaño del archivo es muy grande.
        if (archivo.size > 50000) {

          //Abre el modal de mensaje.
          const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
          //Define el título del modal.
          modalRef.componentInstance.titulo = "Imagen inválida.";
          //Define el mensaje del modal.
          modalRef.componentInstance.mensaje = "El tamaño de la imagen debe ser menor a 50,000 Bytes.";
          //Define la etiqueta del botón de Aceptar.
          modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

          //Se resetea la imagen y el seleccionador de archivos.
          this.limpiarImagen();

        }
        else {

          //Cuando la imagen ya se subió temporalmente.
          reader.onload = (event) => {
            //Se despliega en pantalla la imagen.
            this.imagenPaciente = event.target["result"];

            //Arma el JSON de la información de la imagen.
            this.imagenArchivo = JSON.stringify({
              nombre: archivo.name,
              extension: archivo.type,
              tamano: archivo.size,
              //decodifica la imagen para que todos los carácteres se almacenen.
              valor: btoa(event.target["result"])
            });

          }

        }

      }

    }
    //Si ninguna imagen se seleccionó.
    else {
      //Se retorna a la imagen por default.
      this.limpiarImagen();
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarImagen.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para resetear la imagen del paciente.            |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarImagen() {
    //Se retorna a la imagen por default.
    this.imagenPaciente = this.imagenPacienteDefault;
    //Se resetea el campo.
    this.imagenHTML.nativeElement.value = "";
    //Se vacía el archivo de la imagen.
    this.imagenArchivo = "";
  }

}
