/******************************************************************|
|NOMBRE: cambiarPasswordOlvidadoComponent.                         | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para cambiar el  | 
|             password olvidado.                                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/06/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AutenticarService } from '../autenticar.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../esperar.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cambiar-password-olvidado',
  templateUrl: './cambiar-password-olvidado.component.html',
  styleUrls: ['./cambiar-password-olvidado.component.css']
})
export class CambiarPasswordOlvidadoComponent implements OnInit {

  //Objeto que contendrá el formulario de cambio de password.
  formCambioPassword: FormGroup;
  //Objeto del formulario que contendrá al password nuevo.
  nuevoPassword: AbstractControl;
  //Objeto del formulario que contendrá a la confirmación del password.
  confirmarPassword: AbstractControl;
  //Propiedad que indica si se pulsó el botón de ingresar.
  pulsarIngresar: boolean = false;
  //Propiedad que almacena la ruta de la imágen del logo.
  imagenLogo: String = "../../assets/img/logo_completo.png";
  //Obtiene el token de la url.
  tokenUrl: string;
  //Cuadro de texto del password nuevo.
  @ViewChild("nuevoPasswordHTML") nuevoPasswordHTML: ElementRef;
  //Cuadro de texto de confirmar password.
  @ViewChild("confirmarPasswordHTML") confirmarPasswordHTML: ElementRef;

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
  |                                        abrir modals de espera,        |  |                
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private fb: FormBuilder,
    private autorizacion: AutenticarService,
    private router: Router,
    private modalService: NgbModal,
    private esperar: EsperarService
  ) {

    //Se agregan las validaciones al formulario de cambiar password.
    this.formCambioPassword = fb.group({
      'nuevoPassword': ['Telmex123$', Validators.compose([Validators.required, this._passwordValidator])],
      'confirmarPassword': ['Telmex123$', [Validators.required]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.nuevoPassword = this.formCambioPassword.controls['nuevoPassword'];
    this.confirmarPassword = this.formCambioPassword.controls['confirmarPassword'];

  }


  ngOnInit() {

    //Hace un focus al cuadro de texto de password nuevo.
    this.nuevoPasswordHTML.nativeElement.focus();

    this.tokenUrl = this.router.url.split("/")[2];

    //Si el token es menor a 40 carácteres, es incorrecto.
    if (this.tokenUrl.length < 40) {
      this._alerta("Token inválido", "El token obtenido es inválido.").subscribe(
        resultado => {
        this.router.navigate(['ingresar']);
      }
      );
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: submit.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Evento que se dispara cuando se intenta cambiar         |
  |               el password.                                            | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  submit(): void {

    //Se pulsa el botón ingresar.
    this.pulsarIngresar = true;

    //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
    if (!this.nuevoPassword.valid) {
      this.nuevoPasswordHTML.nativeElement.focus();
      return;
    } else if (!this.confirmarPassword.valid || this.confirmarPassword.value != this.nuevoPassword.value) {
      this.confirmarPasswordHTML.nativeElement.focus();
      return;
    }

    //Se abre el modal de esperar, indicando que se hará una petición al servidor.
    this.esperar.esperar();

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _passwordValidator.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que valida la seguridad de la contraseña.        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: formControl = Elemento del formulario que se  |
  |                         validará.                                     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\|\$%\^&\*])(?=.{6,40})/)) {
      return { invalidPassword: true };
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _alerta.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que valida la seguridad de la contraseña.        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: título  = Título que tendrá la alerta,        |
  |                         mensaje = Mensaje que tendrá la alerta        |                                      |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _alerta(titulo: string, mensaje: string): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();
    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, { centered: true });
    //Define el título del modal.
    modalRef.componentInstance.titulo = titulo;
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    //Se retorna el botón pulsado.
    modalRef.result.then((result) => {
      //Se retorna un nulo, ya que no se espera un resultado.         
      subject.next(null);
    });

    return subject.asObservable();

  }

}
