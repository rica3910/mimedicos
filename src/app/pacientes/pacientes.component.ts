/******************************************************************|
|NOMBRE: PacientesComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los pacientes    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 01/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from './../esperar.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  
  //Propiedad para indicar que la información ya está disponible para mostrar.
  infoLista: boolean = false;
  //Registros de pacientes que se verán en la vista en la tabla.
  pacientes: Array<JSON>;
  //Elemento HTML al que será añadido el método de buscar pacientes.


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacientesService = contiene los métodos para  |
  |                                        manipular a los pacientes.     |
  |                         modalService = contiene los métodos para      |  
  |                                        manipular modals,              |
  |                         esperarService = contiene los métodos para    |
  |                                          mostrar o no la espera.      |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private pacientesService: PacientesService,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private buscarInfoHTML: ElementRef) { }

  ngOnInit() {
    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.obtenerPacientes().subscribe((respuesta) => {  
      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this._alerta(respuesta["mensaje"]);
        //No se intenta mostrar nada en la vista por el error.
        this.infoLista = false;
      }
      //Si todo salió bien.
      else {
        //Se indica en la vista que ya puede mostrar la info.
        this.infoLista = true;
        //Se llena el arreglo de pacientes para que pueda ser mostrado.
        this.pacientes = respuesta["datos"];  
      }
    });

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    Observable.fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
    //Extrae el valor de la búsqueda.
    .map((e: any) => e.target.value)
    //Solo fitrará valores de más de un carácter.
    .filter((text: string) => text.length > 1)
    //Se esperará hasta que el usuario haya terminado de escribir.
    .debounceTime(250)
    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    .do(()=>this.esperarService.esperar())
    //Se realiza la búsqueda.
    .map((query: string)=> this.pacientesService.filtrarPacientes(query))
    //Se utiliza para obtener solo la búsqueda más reciente.
    .switch()
    //Se actualiza la información del arreglo de pacientes.
    .subscribe((resultados: any) => {
      //Se deja de esperar, pues ya se obtuvo la información.
      this.esperarService.noEsperar();
      //Se actualiza la información en pantalla.
      this.pacientes = resultados;
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
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _alerta(mensaje: String) {

    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, { centered: true });

    //Define el título del modal.
    modalRef.componentInstance.titulo = "Notificación";
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";

  }

}
