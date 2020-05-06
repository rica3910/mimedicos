/******************************************************************|
|NOMBRE: ver-usuarios-estudio.                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los usuarios de un estudio.  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 05/05/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from '../../esperar.service';
import { AutenticarService } from '../../autenticar.service';
import { OrganizacionesService } from '../../organizaciones.service';
import { ClinicasService } from '../../clinicas.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EstudiosService } from './../../estudios.service';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-ver-usuarios-estudio',
  templateUrl: './ver-usuarios-estudio.component.html',
  styleUrls: ['./ver-usuarios-estudio.component.css']
})
export class VerUsuariosEstudioComponent implements OnInit {
  //Variable que almacena el identificador del estudio, obtenido de la url.
  estudioId: string;
  //Almacena los usuarios que no tienen el estudio.
  usuariosSinEstudio: JSON[] = [];
  //Almacena los usuarios que no tienen el estudio de la base de datos original sin que se filtre su información.
  usuariosSinEstudioServidor: JSON[] = [];
  //Almacena los usuarios que tienen el estudio.
  usuariosConEstudio: JSON[] = [];
  //Almacena los usuarios que tienen el estudio de la base de datos original sin que se filtre su información.
  usuariosConEstudioServidor: JSON[] = [];
  //Cuadro de texto de búsqueda de usuarios sin estudio.
  @ViewChild('buscarUsuariosSinEstudioHTML') buscarUsuariosSinEstudioHTML: ElementRef;
  //Cuadro de texto de búsqueda de usuarios con estudio.
  @ViewChild('buscarUsuariosConEstudioHTML') buscarUsuariosConEstudioHTML: ElementRef;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si la info del estudio ya se cargó.
  estudioListo: boolean = false;
  //Indica si los usuarios sin estudio ya se cargaron.
  usuariosSinEstudioListos: boolean = false;
  //Indica si los usuarios con estudio ya se cargaron.
  usuariosConEstudioListos: boolean = false;
  //Escucha cuando se ejecuta una búsqueda.
  busqueda$: Subject<Boolean> = new Subject<Boolean>();
  //Almacena el nombre de la clínica.
  nombreClinica: string = "";
  //Almacena el nombre del estudio
  nombreEstudio: string = "";
  //Almacena la descripción del estudio.
  descripcion: string = "";

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  estudiosService = contiene los métodos de la bd de los estudios,     |  
  |  rutaActual: Para obtener los parámetros de la url.                   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private autenticarService: AutenticarService,
    private estudiosService: EstudiosService,
    private rutaActual: ActivatedRoute) {

    //Obtiene el identificador del estudio de la url.
    this.rutaActual.paramMap.subscribe(params => {
      //Se inicia la espera.
      this.esperarService.esperar();
      //Se obtiene el identificador del estudio.
      this.estudioId = params.get("id");
      //Se obtiene la info del estudio.
      this.infoEstudio();
      //Se buscan a los usuarios.
      this.buscar();
    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe(() => {

      //Si los usuarios y el estudio están listos.
      if (this.usuariosSinEstudioListos && this.usuariosConEstudioListos && this.estudioListo) {

        this.estudioListo = false;
        this.usuariosSinEstudioListos = false;
        this.usuariosConEstudioListos = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();
      }


    });

    //Se utiliza para cuando se hace una búsqueda.
    this.busqueda$.subscribe(() => {

      //Si los dos filtros están listos.
      if (this.usuariosSinEstudioListos && this.usuariosConEstudioListos) {

        this.usuariosSinEstudioListos = false;
        this.usuariosConEstudioListos = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();
      }


    });

  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarUsuariosSinEstudioHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.usuariosSinEstudioServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.usuariosSinEstudio = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarUsuariosSinEstudioHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarUsuariosSinEstudioHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarUsuariosConEstudioHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.usuariosConEstudioServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.usuariosConEstudio = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarUsuariosConEstudioHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarUsuariosConEstudioHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoEstudio.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: obtiene la información del estudio.                     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoEstudio() {

    //Busca las usuarios sin el estudio.
    this.estudiosService.verEstudio(
      this.estudioId).subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];
          this.nombreEstudio = respuesta["datos"][0]["nombre"];
          this.descripcion = respuesta["datos"][0]["descripcion"];          
        }

        this.estudioListo = true;
        this.cargaInicialLista$.next(this.estudioListo);

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Busca las usuarios sin el estudio.
    this.estudiosService.usuariosEstudio(
      this.estudioId,
      '0').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          console.log(respuesta["datos"]);

          //Se almacenan los usuarios sin estudio.
          this.usuariosSinEstudio = respuesta["datos"];
          this.usuariosSinEstudioServidor = respuesta["datos"];

        }

        this.usuariosSinEstudioListos = true;
        this.cargaInicialLista$.next(this.usuariosSinEstudioListos);

      });

    //Busca las usuarios con el estudio.
    this.estudiosService.usuariosEstudio(
      this.estudioId,
      '1').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          console.log(respuesta["datos"]);
          //Se almacenan los usuarios con estudio.
          this.usuariosConEstudio = respuesta["datos"];
          this.usuariosConEstudioServidor = respuesta["datos"];

        }

        this.usuariosConEstudioListos = true;
        this.cargaInicialLista$.next(this.usuariosConEstudioListos);

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscarConEspera.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda pero con espera.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscarConEspera() {

    this.esperarService.esperar();

    //Busca las usuarios sin el estudio.
    this.estudiosService.usuariosEstudio(
      this.estudioId,
      '0').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios sin estudio.
          this.usuariosSinEstudio = respuesta["datos"];
          this.usuariosSinEstudioServidor = respuesta["datos"];

        }

        this.usuariosSinEstudioListos = true;
        this.busqueda$.next(this.usuariosSinEstudioListos);

      });

    //Busca las usuarios con el estudio.
    this.estudiosService.usuariosEstudio(
      this.estudioId,
      '1').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios con estudio.
          this.usuariosConEstudio = respuesta["datos"];
          this.usuariosConEstudioServidor = respuesta["datos"];

        }

        this.usuariosConEstudioListos = true;
        this.busqueda$.next(this.usuariosConEstudioListos);

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarBusquedaUsuariosSinEstudio.                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarBusquedaUsuariosSinEstudio() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarUsuariosSinEstudioHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarUsuariosSinEstudioHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.usuariosSinEstudio = this.usuariosSinEstudioServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarUsuariosSinEstudioHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarBusquedaUsuariosConEstudio.                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarBusquedaUsuariosConEstudio() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarUsuariosConEstudioHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarUsuariosConEstudioHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.usuariosConEstudio = this.usuariosConEstudioServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarUsuariosConEstudioHTML.nativeElement.focus();
  }


}
