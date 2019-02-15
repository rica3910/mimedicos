/******************************************************************|
|NOMBRE: EditarPacienteComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar editar pacientes.                |
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
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilidadesService } from '../../utilidades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { PacientesService } from '../../pacientes.service';
import { EsperarService } from '../../esperar.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {


  //Objeto que contendrá el formulario de edición del paciente.
  formEditarPaciente: FormGroup;
  //Objeto que contendrá el identificador del paciente.
  pacienteId: string;
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
  //Objeto del formulario que contendrá el estatus.
  estatus: AbstractControl;
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
  //Lista del estatus.
  @ViewChild("estatusHTML") estatusHTML: ElementRef;
  //Propiedad para cuando se oprime el botón de editar paciente.
  pulsarEditar: boolean = false;
  //Constante para almacenar la imagen que se mostrará cuando el paciente no tenga imagen.
  imagenPacienteSinImagen: string = "../../../assets/img/pacientes/paciente_default.png";
  //Constante que almacena la url del icono del paciente.
  imagenPacienteDefault: string = this.imagenPacienteSinImagen;
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
  |  rutaActual: Para obtener los parámetros de la url.                   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = métodos genéricos y útiles,                      |
  |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
  |  esperarService = contiene los métodos para el diálogo de espera.     |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 27/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private modal: NgbModal,
    private esperarService: EsperarService,
    private pacientesService: PacientesService,
    private rutaActual: ActivatedRoute
  ) {

    //Se agregan las validaciones al formulario de editar paciente.
    this.formEditarPaciente = fb.group({
      'nombres': ['', Validators.required],
      'apellidoPaterno': ['', Validators.required],
      'apellidoMaterno': [''],
      'email': ['', Validators.email],
      'telefono': ['', [this.utilidadesService.numberValidator, Validators.maxLength(10), Validators.minLength(10)]],
      'celular': ['', [this.utilidadesService.numberValidator, Validators.maxLength(10), Validators.minLength(10)]],
      'imagen': [''],
      'estatus': ['', Validators.required]
    });


    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.nombres = this.formEditarPaciente.controls['nombres'];
    this.apellidoPaterno = this.formEditarPaciente.controls['apellidoPaterno'];
    this.apellidoMaterno = this.formEditarPaciente.controls['apellidoMaterno'];
    this.email = this.formEditarPaciente.controls['email'];
    this.telefono = this.formEditarPaciente.controls['telefono'];
    this.celular = this.formEditarPaciente.controls['celular'];
    this.imagen = this.formEditarPaciente.controls['imagen'];
    this.estatus = this.formEditarPaciente.controls['estatus'];

  }

  ngOnInit() {


    //El teléfono y celular solo aceptarán números.
    this.utilidadesService.inputNumerico(this.telefonoHTML, false, this.telefono);
    this.utilidadesService.inputNumerico(this.celularHTML, false, this.celular);

    //Inicia el modal de espera.
    this.esperarService.esperar();

    //Obtiene el identificador del paciente de la url.
    this.rutaActual.paramMap.subscribe(params => {

      this.pacienteId = params.get("id");
      //Obtiene la información del indentificador dado.
      this.pacientesService.verPaciente(this.pacienteId).subscribe(resultado => {

        //Se le da el focus al cuadro de texto de nombres.
        this.nombresHTML.nativeElement.focus();

        //Detiene la espera.
        this.esperarService.noEsperar();

        //Se inicializan todas las variables.
        this.nombres.setValue("");
        this.apellidoPaterno.setValue("");
        this.apellidoMaterno.setValue("");
        this.email.setValue("");
        this.telefono.setValue("");
        this.celular.setValue("");
        this.estatus.setValue("");
        //Se le asigna al paciente una imagen por default para que no salga vacío el cuadro de la imagen.
        this.imagenPaciente = this.imagenPacienteSinImagen;

        //Si la imagen es válida, se despliega en pantalla.
        if (resultado["datos"][0]["imagen"]) {
          //Se le asigna la imagen de la base de datos al paciente y aparece en pantalla.
          this.imagenPaciente = resultado["datos"][0]["imagen"];
          //Si se llegara a modificar el paciente y la imagen no cambia.
          this.imagenArchivo = resultado["datos"][0]["imagen"];
          //Arma el JSON de la información de la imagen original.
          //Lo arma constante ya que es la misma imagen de la base de datos.
          this.imagenArchivo = JSON.stringify({
            nombre: "imagen.jpg",
            extension: "jpg",
            tamano: 0,
            //decodifica la imagen para que todos los carácteres se almacenen.
            valor: btoa(resultado["datos"][0]["imagen"])});
      //Si el paciente tiene una imagen, esa misma será la de default.
      this.imagenPacienteDefault = this.imagenPaciente;
    }
        //Si el nombre del paciente es válido, se despliega en pantalla.
        if (resultado["datos"][0]["nombres"]) {
      this.nombres.setValue(resultado["datos"][0]["nombres"]);
    }
    //Si el apellido paterno es válido, se despliega en pantalla.
    if (resultado["datos"][0]["apellido_paterno"]) {
      this.apellidoPaterno.setValue(resultado["datos"][0]["apellido_paterno"]);
    }
    //Si el apellido materno es válido, se despliega en pantalla.
    if (resultado["datos"][0]["apellido_materno"]) {
      this.apellidoMaterno.setValue(resultado["datos"][0]["apellido_materno"]);
    }
    //Si el email es válido, se despliega en pantalla.
    if (resultado["datos"][0]["email"]) {
      this.email.setValue(resultado["datos"][0]["email"]);
    }
    //Si el teléfono es válido, se despliega en pantalla.
    if (resultado["datos"][0]["telefono"]) {
      this.telefono.setValue(resultado["datos"][0]["telefono"]);
    }
    //Si el celular es válido, se despliega en pantalla.
    if (resultado["datos"][0]["celular"]) {
      this.celular.setValue(resultado["datos"][0]["celular"]);
    }
    //Si el celular es válido, se despliega en pantalla.
    if (resultado["datos"][0]["estatus"]) {
      this.estatus.setValue(resultado["datos"][0]["estatus"]);
    }
  });
});
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
|  NOMBRE: editarPaciente.                                              |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método que edita un paciente.                           |   
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 19/07/2018.                                                   |    
|----------------------------------------------------------------------*/
editarPaciente() {

  this.pulsarEditar = true;

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
  let estatus: string = this.estatus.value ? this.estatus.value : ""
  estatus = estatus.trim();

  //Abre el modal de espera.
  this.esperarService.esperar();

  //Se intenta dar de alta al paciente en la base de datos.
  this.pacientesService.editarPaciente(
    this.pacienteId,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    email,
    telefono,
    celular,
    this.imagenArchivo,
    estatus
  )
    .subscribe(resultado => {

      //Detiene la espera.
      this.esperarService.noEsperar();

      this.pulsarEditar = false;

      //Abre el modal.
      const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
      modalRef.result.then((result) => {

        //Se le da un focus a los nombres.
        this.nombresHTML.nativeElement.focus();

      });
      //Define la etiqueta del botón de Aceptar.
      modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

      //Si se modificó satisfactoriamente.
      if (resultado["estado"] == "OK") {

        //Define el título del modal.
        modalRef.componentInstance.titulo = "Modificación satisfactoria.";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "El paciente se modificó satisfactoriamente.";

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
|  PARÁMETROS DE ENTRADA: eliminaimagenBD = indica que ya no se usará   |
|  la imagen almacenada en la base de datos.                            |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 28/07/2018.                                                   |    
|----------------------------------------------------------------------*/
limpiarImagen(eliminaImagenBD: boolean = false) {
  //Si se elimina la imagen o si ya no se quiere la imagen de la base de datos.
  if (eliminaImagenBD) {
    //Aparecerá en pantalla la imagen del paciente por default.
    this.imagenPaciente = this.imagenPacienteSinImagen;
    //Se vacía el archivo de la imagen.
    this.imagenArchivo = "";
  }
  //Si no se elimina la imagen, es decir, se quiere conservar la misma.
  else {
    this.imagenPaciente = this.imagenPacienteDefault;
  }
  //Se resetea el campo o explorador de archivos.
  this.imagenHTML.nativeElement.value = "";

}

}
