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
import { Component, OnInit } from '@angular/core';
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
  public formSignIn: FormGroup;
  //Objeto que contendrá el formulario de olvidar contraseña.
  public formOlvidarPassword: FormGroup;
  //Objeto del formulario que contendrá al usuario.
  public usuario: AbstractControl;
  //Objeto del formulario que contendrá al password.
  public password: AbstractControl;
  //Objeto del formulario que contendrá al email.
  public email: AbstractControl;
  //Propiedad que indica si se pulsó el botón de ingresar.
  public pulsarIngresar: boolean = false;
  //Propiedad que indica si se desplegará el formulario de olvidar password en vez del de ingresar.
  public olvidarPassword: boolean = false;
  //Propiedad que almacena la ruta de la imágen del logo.
  public imagenLogo: String = "../../assets/img/logo_completo.png";

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fb           = contiene los métodos           |
  |                                        de validaciones de formularios,|
  |                         autorizacion = contiene los métodos para      |
  |                                        conectarse al sistema,         |
  |                         router       = contiene los métodos para      |
  |                                         manipular rutas,              |
  |                         modalService = contiene los métodos para      |  
  |                                        manipular modals,              |
  |                         esperar      = contiene los métodos para      |  
  |                                        abrir modals de espera.        |                
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private fb: FormBuilder,
    private autorizacion: AutenticarService,
    private router: Router,
    private modalService: NgbModal,
    private esperar: EsperarService) {

    //Se agregan las validaciones al formulario de ingresar.
    this.formSignIn = fb.group({
      'usuario': ['', Validators.required],
      'password': ['', Validators.required]
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
    if(this.autorizacion.obtenerToken() !== null){     
        this.router.navigate(['inicio']); 
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
  ingresarSubmit(usuarioHTML: HTMLInputElement, passwordHTML: HTMLInputElement): void {

    //Se pulsa el botón ingresar.
    this.pulsarIngresar = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (this.usuario.hasError("required")) {
      usuarioHTML.focus();
      return;
    } else if (this.password.hasError("required")) {
      passwordHTML.focus();
      return;
    }
    //Se hace focus a algún elemento del formulario para evitar el warning del modal.
    usuarioHTML.focus();
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
            //Se retorna para que no siga con la ejecución.
            return;
          }
          //Si se realiza con éxito el ingreso. 
          else {
            //Se navega a la página de inicio.
            this.router.navigate(['inicio']);
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
  olvidarPaswordSubmit(emailHtml: HTMLInputElement): void {

    //Se pulsa el botón ingresar.
    this.pulsarIngresar = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (!this.email.valid) {
      emailHtml.focus();
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
        //Se retorna para que no siga con la ejecución.
        return;
      }
      //Si se realiza con éxito la petición de recuperación de contraseña. 
      else {
         //Se despliega el resultado del envío del correo electrónico.
        this._alerta("Se ha enviado un enlace de ingreso a su email.");
      }
      
      return;

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

    //Se resetea el valor ya que es independiente.
    this.pulsarIngresar = false;
    //Se indica que se olvidó el password para posteriormente mostrar dicho formulario.
    this.olvidarPassword = true;
    return;

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

    //Se resetea el valor ya que es independiente.
    this.pulsarIngresar = false;
    //Se indica que se NO se olvidó el password para posteriormente mostrar dicho formulario.
    this.olvidarPassword = false;
    return;

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
    //Se retorna el botón pulsado.
    modalRef.result.then((result) => {
    }, (reason) => { });

  }

}
