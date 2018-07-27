/******************************************************************|
|NOMBRE: LoginComponent.                                           | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para ingresar.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AutenticarService } from '../autenticar.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../esperar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Objeto que contendrá el formulario de ingreso.
  formSignIn: FormGroup;
  //Objeto que contendrá el formulario de olvidar contraseña.
  formOlvidarPassword: FormGroup;
  //Objeto del formulario que contendrá al usuario.
  usuario: AbstractControl;
  //Objeto del formulario que contendrá al password.
  password: AbstractControl;
  //Objeto del formulario que contendrá al email.
  email: AbstractControl;
  //Propiedad que indica si se pulsó el botón de ingresar.
  pulsarIngresar: boolean = false;
  //Propiedad que indica si se desplegará el formulario de olvidar password en vez del de ingresar.
  olvidarPassword: boolean = false;
  //Propiedad que almacena la ruta de la imágen del logo.
  imagenLogo: String = "../../assets/img/logo_completo.png";
  //Propiedad que indica cuando se cambia de vista.
  cambiarVista: boolean = false;
  //Cuadro de texto del usuario.
  @ViewChild("usuarioHTML") usuarioHTML: ElementRef;
  //Cuadro de tipo password del password.
  @ViewChild("passwordHTML") passwordHTML: ElementRef;
  //Cuadro de texto del email.
  @ViewChild("emailHTML") emailHTML: ElementRef;


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fb           = contiene los métodos           |
  |                                        de validaciones de formularios,|
  |                         autorizacion = contiene los métodos para      |
  |                                        conectarse al sistema,         |
  |                       rutaNavegacion = contiene los métodos para      |
  |                                         manipular rutas,              |
  |                         modalService = contiene los métodos para      |  
  |                                        manipular modals,              |
  |                         esperar      = contiene los métodos para      |  
  |                                        abrir modals de espera,        |
  |                         cdRef        = se utiliza para detectar       |
  |                                        cambios en la vista.           |                
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private fb: FormBuilder,
    private autorizacion: AutenticarService,
    private rutaNavegacion: Router,
    private modalService: NgbModal,
    private esperar: EsperarService,
    private cdRef: ChangeDetectorRef) {

    //Se agregan las validaciones al formulario de ingresar.
    this.formSignIn = fb.group({
      'usuario': ['1416295', Validators.required],
      'password': ['Telmex123$', Validators.required]
    });

    //Se agregan las validaciones al formulario de olvidar contraseña.
    this.formOlvidarPassword = fb.group({
      'email': ['', [Validators.required, Validators.email]]
    });


    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.usuario = this.formSignIn.controls['usuario'];
    this.password = this.formSignIn.controls['password'];
    this.email = this.formOlvidarPassword.controls['email'];

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: ngOnInit.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta al iniciar el componente.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  ngOnInit() {

    //Si ya se encuentra conectado al sistema, lo retorna al menú principal.
    if (this.autorizacion.obtenerToken() !== null) {
      this.rutaNavegacion.navigate(['inicio']);      
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: ngAfterViewChecked.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando cambia la vista.           | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  ngAfterViewChecked() {

    //Si se muestra el formulario de ingreso o el formulario de email.
    if (this.cambiarVista) {

      //Se cambia el valor de cambiarvista para que no se ejecute cada momento.
      this.cambiarVista = false;

      //Si olvidar password es verdadero.
      if (this.olvidarPassword) {
        //Se le da un focus al email y se limpia.
        this.emailHTML.nativeElement.focus();
        this.formOlvidarPassword.reset();
        this.cdRef.detectChanges();
      }
      else {
        //Se le da un focus al usuario y se limpia junto con el password.
        this.usuarioHTML.nativeElement.focus();
        this.formSignIn.reset();
        this.cdRef.detectChanges();
      }
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: ingresarSubmit.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se dispara cuando se intenta ingresar        |
  |               al sistema.                                             | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioHTML  = Elemento HTML de tipo texto del|
  |                                        usuario,                       |
  |                         passwordHTML = Elemento HTML de tipo pass del | 
  |                                        password                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  ingresarSubmit(): void {

    //Se pulsa el botón ingresar.
    this.pulsarIngresar = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (this.usuario.hasError("required")) {
      this.usuarioHTML.nativeElement.focus();
      return;
    } else if (this.password.hasError("required")) {
      this.passwordHTML.nativeElement.focus();
      return;
    }
    //Se abre el modal de esperar, indicando que se hará una petición al servidor.
    this.esperar.esperar();
    //Se realiza el intento de ingreso.
    this.autorizacion.login(this.usuario.value, this.password.value)
      .subscribe(
        respuesta => {

          //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
          this.esperar.noEsperar();
          //Si hubo un error en el ingreso.
          if (respuesta["estado"] === "ERROR") {
            //Se despliega un modal con una alerta del porqué del error.
            this._alerta(respuesta["mensaje"]);
          }
          //Si se realiza con éxito el ingreso. 
          else {
            //Se navega a la página de inicio.
            this.rutaNavegacion.navigate(['inicio']);
          }
        }
      );
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: olvidarPaswordSubmit.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se dispara cuando se olvida el password.     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioHTML  = Elemento HTML de tipo texto del|
  |                                        usuario,                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  olvidarPaswordSubmit(): void {

    //Se pulsa el botón ingresar.
    this.pulsarIngresar = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (!this.email.valid) {
      this.emailHTML.nativeElement.focus();
      return;
    }

    //Se abre el modal de esperar, indicando que se hará una petición al servidor.
    this.esperar.esperar();
    this.autorizacion.olvidarPassword(this.email.value).subscribe(respuesta => {

      //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
      this.esperar.noEsperar();
      //Si hubo un error en el proceso de olvidar el password.
      if (respuesta["estado"] === "ERROR") {
        //Se despliega un modal con una alerta del porqué del error.
        this._alerta(respuesta["mensaje"]);
      }
      //Si se realiza con éxito la petición de recuperación de contraseña. 
      else {
        //Se despliega el resultado del envío del correo electrónico.
        this._alerta("Se ha enviado un enlace de ingreso a su email.");
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: mostrarFormOlvidarPassword                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se dispara cuando indica que se olvidó pass. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  mostrarFormOlvidarPassword(): void {
  
    //Se cambia de vista.
    this.cambiarVista = true;
    //Se resetea el valor ya que es independiente.
    this.pulsarIngresar = false;
    //Se indica que se olvidó el password para posteriormente mostrar dicho formulario.
    this.olvidarPassword = true;

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: mostrarFormIngresar.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento para mostrar el formulario de ingresar.          | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  mostrarFormIngresar(): void {
    //Se cambia de vista.
    this.cambiarVista = true;
    //Se resetea el valor ya que es independiente.
    this.pulsarIngresar = false;
    //Se indica que se NO se olvidó el password para posteriormente mostrar dicho formulario.
    this.olvidarPassword = false;
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
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _alerta(mensaje: String) {

    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, { centered: true });

    //Define el título del modal.
    modalRef.componentInstance.titulo = "Autenticación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

  }

}
