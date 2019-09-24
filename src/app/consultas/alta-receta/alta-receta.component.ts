/******************************************************************|
|NOMBRE: AltaRecetaComponent.                                      | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que inserta una receta a la consulta.     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 17/09/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { UtilidadesService } from './../../utilidades.service';
import { FormBuilder } from '@angular/forms';
import { EsperarService } from './../../esperar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormulariosService } from './../../formularios.service';
import { Subject, fromEvent } from 'rxjs';
import { ConsultasService } from './../../consultas.service';
import { switchAll, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-alta-receta',
  templateUrl: './alta-receta.component.html',
  styleUrls: ['./alta-receta.component.css']
})
export class AltaRecetaComponent implements OnInit {

  //Identificador de la consulta. Tomada de la url.
  consultaId: string;
  //Objeto que contendrá el formulario de alta de las recetas.
  formAltaRecetas: FormGroup;
  //Propiedad para cuando se oprime el botón de crear receta.
  pulsarCrear: boolean = false;
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto del formulario que contendrá al campo referencias.
  referenciasControl: AbstractControl;
  //Variable que almacena el control de referencias del formulario.
  @ViewChild('referenciasHTML') referenciasHTML: ElementRef;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los medicamentos y sus indicaciones (se utiliza para filtrar).
  medicamentos: JSON[] = [];
  //Almacena los medicamentos previamente añadidos a la receta.
  medicamentosOriginal: JSON[] = [];

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |  
  |  rutaActual = para obtener los parámetros de la url,                  |
  |  formulariosService = contiene métodos de la bd. de formularios,      |
  |  consultasService = contiene los métodos de bd. de las consultas.     |                          
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private rutaActual: ActivatedRoute,
    private formularioService: FormulariosService,
    private consultasService: ConsultasService) {

    //Se agregan las validaciones al formulario.
    this.formAltaRecetas = fb.group({
      'referencias': ['', Validators.required]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.referenciasControl = this.formAltaRecetas.controls['referencias'];

    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {
      this.consultaId = params.get("id");
    });

  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.medicamentosOriginal)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.medicamentos = resultados;
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

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de recetas.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de diagnósticos.
    this.rutaNavegacion.navigateByUrl('consultas/lista-recetas/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsultaLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la info de la consulta.              |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: info = información de la consulta.            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsulta(info) {
    this.verificarInfoConsulta = true;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.medicamentos = this.medicamentosOriginal;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaReceta.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una receta.                     | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaReceta() {

    //Se pulsa el botón  de dar de alta consulta.
    this.pulsarCrear = true;

    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.referenciasControl.invalid) {
      this.referenciasHTML.nativeElement.focus();
      return;
    }

    //Si no se agregó ningún medicamento.
    if (this.medicamentos.length == 0) {
      this.utilidadesService.alerta("Sin medicamentos", "Agregue por lo menos un medicamento a la receta.").subscribe();
      return;
    }

    //Se abre el modal de espera.
    this.esperarService.esperar();

  }

}
