/******************************************************************|
|NOMBRE: AppComponent.                                             | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente principal del sistema                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit } from '@angular/core';
import { AutenticarService } from './autenticar.service';
import { Observable } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from './dialogo-alerta/dialogo-alerta.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /*Propiedad que indica que se está conectado al sistema. Se utiliza para que no se despliegue
  el cuadro de diálogo de sesión expirada en la pantalla de login.*/
  private conectado: boolean = false;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  | 
  |                         modal        = contiene los métodos para      |
  |                                        manipular los modals.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private modal: NgbModal) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: ngOnInit.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se inicia junto con el componente.           |
  |               Estará comparando cada 30 segundos que el usuario esté  |
  |               logueado.                                               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  ngOnInit() {

    //Observador que se ejecuta cada 30 segundos para verificar que el token del usuario sea válido.
    Observable.timer(0, 30000).subscribe(t => {
      //Si el usuario no está conectado por alguna razón.
      if (!this.autorizacion.estaConectado() && this.conectado) {

        //Se desloguea del sistema.
        this.conectado = false;
        this.autorizacion.logout();

        //Abre el modal de tamaño chico.
        const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = this.autorizacion.tituloExpiracion;
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = this.autorizacion.mensajeExpiracion;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then((result) => {

        }, (reason) => { });

      } else if (this.autorizacion.estaConectado()) {
        this.conectado = true;
      }
    });

  }
  /*----------------------------------------------------------------------|
  |  NOMBRE: salir.                                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para salirse o desloguearse del sistema.         | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: resultado = Obtiene el resultado del botón    |
  |                                     que se oprimió: Sí o No           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public salir(resultado: String) {
    //Si el resultado es Sí, entonces se sale del sistema. Mandando la página de ingresar.
    if (resultado == 'Sí') {
      this.autorizacion.logout();
      this.conectado = false;
    }
  }


}
