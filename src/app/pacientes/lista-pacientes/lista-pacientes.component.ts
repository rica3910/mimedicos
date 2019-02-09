/******************************************************************|
|NOMBRE: ListaPacientesComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los pacientes    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 12/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PacientesService } from '../../pacientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../../dialogo-alerta/dialogo-alerta.component';
import { EsperarService } from '../../esperar.service';
import { fromEvent } from 'rxjs';
import { UtilidadesService } from '../../utilidades.service';
import { Router } from '@angular/router';
import { map, switchAll, debounceTime } from "rxjs/operators";
import { AutenticarService } from '../../autenticar.service';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  //Propiedad para indicar que la información ya está disponible para mostrar.
  infoLista: boolean = true;
  //Registros de pacientes que se verán en la vista en la tabla.
  pacientes: Array<JSON>;
  //Registros que vienen de la consulta del servidor sin filtrar.
  private pacientesServidor: Array<JSON>;
  //Propiedad que indica si el usuario puede dar de alta pacientes.
  private altaPacientes: boolean = false;
  //Propiedad que indica si el usuario puede ver pacientes.
  private verPacientes: boolean = false;
  //Propiedad que indica si el usuario puede ver las fichas clínicas de los pacientes.
  private verFichaClinicaPacientes: boolean = false;
  //Propiedad que indica si el usuario puede editar pacientes.
  private editarPacientes: boolean = false;
  //Propiedad que indica si el usuario puede eliminar pacientes.
  private eliminarPacientes: boolean = false;
  //Propiedad que indica si el usuario puede desasignar pacientes.
  private desAsignarPacientes: boolean = false;

  //Cuadro de texto del búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;

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
  |                                          mostrar o no la espera,      |
  |  buscarInfoHTML = elemento de texto HTML que servirá como buscador,   |
  |  utilidadesService= Contiene métodos genéricos y útiles,              |
  |  rutaNavegacion   = para navegar a otras url´s                        |
  |  autenticarService = contiene los métodos de autenticación.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private pacientesService: PacientesService,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private rutaNavegacion: Router,
    private autenticarService: AutenticarService) { }

  ngOnInit() {

    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()
    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.obtenerPacientes()
      .subscribe((respuesta) => {

        //Se termina la espera.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          //No se intenta mostrar nada en la vista por el error.
          this.infoLista = false;
        }
        //Si todo salió bien.
        else {
          //Se indica en la vista que ya puede mostrar la info.
          this.infoLista = true;
          //Se llena los arreglos de pacientes para que pueda ser mostrado.
          this.pacientes = respuesta["datos"];
          this.pacientesServidor = respuesta["datos"];

          //Se obtiene el método de tecleado del elemento HTML de búsqueda.
          fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
            //Extrae el valor de la búsqueda.
            .pipe(map((e: any) => e.target.value))
            //Se realiza la búsqueda.
            .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.pacientesServidor)))
            //Se utiliza para obtener solo la búsqueda más reciente.
            .pipe(switchAll())
            //Se actualiza la información del arreglo de pacientes.
            .subscribe((resultados: JSON[]) => {
              //Se actualiza la información en pantalla.        
              this.pacientes = resultados;
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
      });
  }

  ngAfterViewInit() {

    //Se le da un focus a la búsqueda.
    this.buscarInfoHTML.nativeElement.focus();

    //El botón de dar de alta pacientes se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA PACIENTE').subscribe((respuesta: boolean) => {
      this.altaPacientes = respuesta["value"];
    });    

    //El botón de ver a un paciente en la tabla de lista de pacientes,
    // se hará visible solamente si el usuario tiene el privilegio. 
    this.autenticarService.usuarioTieneDetModulo('VER PACIENTE').subscribe((respuesta: boolean) => {
      this.verPacientes = respuesta["value"];
    });    

    //El botón de editar a un paciente en la tabla de lista de pacientes,
    // se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('EDITAR PACIENTE').subscribe((respuesta: boolean) => {
      this.editarPacientes = respuesta["value"];
    });      

    //El botón de ver la ficha clínica a un paciente en la tabla de lista de pacientes,
    // se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('VER FICHA CLINICA PACIENTE').subscribe((respuesta: boolean) => {
      this.verFichaClinicaPacientes = respuesta["value"];
    });          

    //El botón de eliminar a un paciente en la tabla de lista de pacientes,
    // se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR PACIENTE').subscribe((respuesta: boolean) => {
      this.eliminarPacientes = respuesta["value"];
    });

    //El botón de desasignar a un paciente en la tabla de lista de pacientes,
    // se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('DESASIGNAR PACIENTE').subscribe((respuesta: boolean) => {
      this.desAsignarPacientes = respuesta["value"];
    });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campo  = Campo HTML que se limpiará.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda(campo: HTMLInputElement) {

    //Si el campo tiene algo escrito se limpiará.
    if (campo.value.length > 0) {
      //limpia el cuadro de texto.
      campo.value = "";
      //Actualiza la información con la original.
      this.pacientes = this.pacientesServidor;
    }
    //Le da un focus al elemento de búsqueda.
    campo.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaPaciente.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear paciente.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaPaciente() {

    this.rutaNavegacion.navigate(['pacientes', 'alta-paciente']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para buscar pacientes.                           |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Se limpia el cuadro de búsqueda.
    this.buscarInfoHTML.nativeElement.value = "";
    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()
    //Intenta obtener los pacientes del usuario ingresado.
    this.pacientesService.obtenerPacientes()
      .subscribe((respuesta) => {

        //Se termina la espera.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          //No se intenta mostrar nada en la vista por el error.
          this.infoLista = false;
        }
        //Si todo salió bien.
        else {
          //Se indica en la vista que ya puede mostrar la info.
          this.infoLista = true;
          //Se llena los arreglos de pacientes para que pueda ser mostrado.
          this.pacientes = respuesta["datos"];
          this.pacientesServidor = respuesta["datos"];
        }
      });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verPaciente.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para entrar al detalle del paciente.             |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 25/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  verPaciente(id: string) {
    this.rutaNavegacion.navigateByUrl('pacientes/ver-paciente/' + id);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarPaciente.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para entrar al formulario de editar paciente.    |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 27/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarPaciente(id: string) {
    this.rutaNavegacion.navigateByUrl('pacientes/editar-paciente/' + id);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarPaciente.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar a un paciente.                     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: id = identificador del paciente.              |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarPaciente(id: string) {

    this.utilidadesService.confirmacion("Confirmación.", "Se eliminará permanentemente toda la información del paciente. "
      + "¿Está seguro de eliminar al paciente?").subscribe(respuesta => {
        if (respuesta == "Aceptar") {

          this.pacientesService.eliminarPaciente(id).subscribe(respuesta => {
            //Si hubo un error.
            if (respuesta["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this.utilidadesService.alerta("Error", respuesta["mensaje"]);
            }
            //Si todo salió bien.
            else {
              this.utilidadesService.alerta("Paciente eliminado", "El paciente se eliminó permanentemente.");
              //Se actualizan los datos.
              this.buscar();
            }
          });

        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: desAsignarPaciente.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desasignar a un paciente del usuario.       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: id = identificador del paciente.              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  desAsignarPaciente(id: string) {

    this.utilidadesService.confirmacion("Confirmación.", "Ya no podrá acceder a la información del paciente. "
      + "¿Está seguro de desasignarse el paciente?").subscribe(respuesta => {
        if (respuesta == "Aceptar") {

          this.pacientesService.desAsignarPaciente(id).subscribe(respuesta => {
            //Si hubo un error.
            if (respuesta["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this.utilidadesService.alerta("Error", respuesta["mensaje"]);
            }
            //Si todo salió bien.
            else {
              this.utilidadesService.alerta("Paciente desasignado", "El paciente se desasignó satisfactoriamente.");
              //Se actualizan los datos.
              this.buscar();
            }
          });

        }
      });
  }


}
