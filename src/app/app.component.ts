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
import { EsperarService } from './esperar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  //Propiedad para almacenar los menús que puede utilizar el usuario logueado.
  urlsMenusUsuario: string[];

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  | 
  |                         modal        = contiene los métodos para      |
  |                                        manipular los modals,          |
  |                         esperar      = contiene los métodos para      |  
  |                                        abrir modals de espera,        |
  |                         rutaActual   = para manipular las url's       |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private modal: NgbModal,
    private esperar: EsperarService,
    private rutaActual: Router) { }

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
  
    //Arreglo que contiene todos los menús del sistema.
    const urlsMenus: string[] = ["pacientes"];
    //Se inicializa el arreglo.
    this.urlsMenusUsuario = new Array();

    //Abre el modal de espera.
    this.esperar.esperar();
    //Establecer los menús que pueda utilizar el usuario ingresado.
    urlsMenus.forEach(url => {      
      this.autorizacion.usuarioTieneMenu(url).subscribe((resultado) => {         
        //Se detiene el modal de espera.
        this.esperar.noEsperar() ;
        //Si sí tiene el menú, lo añade al arreglo de los menús del usuario logueado.
        if(resultado["value"]){
          this.urlsMenusUsuario.push(url);
        }                               
      });
    });

    //Observador que se ejecuta cada 30 segundos para verificar que el token del usuario sea válido.
    Observable.timer(0, 30000).subscribe(t => {

      this.autorizacion.estaConectado()
        .subscribe(respuesta => {
          //Si el token está inactivo o caduco y el usuario se encuentra logueado.
          if (respuesta !== false && respuesta["estado"] === "ERROR") {

            //Abre el modal de tamaño chico.
            const modalRef = this.modal.open(DialogoAlertaComponent, { centered: true });
            //Define el título del modal.
            modalRef.componentInstance.titulo = "Sesión finalizada";
            //Define el mensaje del modal.
            modalRef.componentInstance.mensaje = respuesta["mensaje"];
            //Define la etiqueta del botón de Aceptar.
            modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

          }
        });

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
      //Se abre el modal de esperar, indicando que se hará una petición al servidor.
      this.esperar.esperar();
      this.autorizacion.logout().subscribe(() => {        
        this.esperar.noEsperar();
      });
    }
  }


}
