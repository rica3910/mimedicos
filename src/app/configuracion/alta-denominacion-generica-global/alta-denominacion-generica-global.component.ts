/******************************************************************|
|NOMBRE: altaDenominacionGenericaGlobal.                           | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para agregar ingrediente activo.          |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 05/06/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from './../../esperar.service';
import { MedicamentosService } from './../../medicamentos.service';

@Component({
  selector: 'app-alta-denominacion-generica-global',
  templateUrl: './alta-denominacion-generica-global.component.html',
  styleUrls: ['./alta-denominacion-generica-global.component.css']
})
export class AltaDenominacionGenericaGlobalComponent implements OnInit {

  //Objeto que contendrá el formulario de agregar.
  form: FormGroup;
  //Objeto del formulario que contendrá al campo cantidad.
  nombreControl: AbstractControl;
  //Elemento HTML del nombre.
  @ViewChild('nombreHTML') nombreHTML: ElementRef;
  //Variable para almacenar el objeto ingrediente activo (en caso de que la opción sea modificar).
  public denominacionGenerica: object = null;

  /*----------------------------------------------------------------------|
 |  NOMBRE: constructor.                                                 |
 |-----------------------------------------------------------------------|
 |  DESCRIPCIÓN: Método constructor del componente.                      | 
 |-----------------------------------------------------------------------|
 |  PARÁMETROS DE ENTRADA:                                               |
 |  activeModal = contiene los métodos para manipular un modal,          |
 |  fb = contiene los métodos para manipular formularios HTML,           |
 |  utilidadesService = Contiene métodos genéricos y útiles,             |
 |  medicamentosService =Contiene los métodos de los medicamentos,       |
 |  esperarService = contiene los métodos para mostrar o no la espera.   |  
 |-----------------------------------------------------------------------|
 |  AUTOR: Ricardo Luna.                                                 |
 |-----------------------------------------------------------------------|
 |  FECHA: 05/06/2020.                                                   |    
 |----------------------------------------------------------------------*/
  constructor(private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private medicamentosService: MedicamentosService,
    private esperarService: EsperarService) {

  }

  ngOnInit() {

    let nombre: string = this.denominacionGenerica ? this.denominacionGenerica["nombre"] : "";

    //Se agregan las validaciones al formulario.
    this.form = this.fb.group({
      'nombre': [nombre, [Validators.required]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.nombreControl = this.form.controls['nombre'];

  }

  /*----------------------------------------------------------------------|
 |  NOMBRE: alta.                                                        |
 |-----------------------------------------------------------------------|
 |  DESCRIPCIÓN: Método para insertar el ingrediente activo.             | 
 |-----------------------------------------------------------------------|
 |  AUTOR: Ricardo Luna.                                                 |
 |-----------------------------------------------------------------------|
 |  FECHA: 05/06/2020.                                                   |    
 |----------------------------------------------------------------------*/
  alta() {

    /*Si los elementos del formulario estáticos requeridos no están llenos, 
       se hace un focus para que se ingrese texto.*/
    if (this.nombreControl.invalid) {
      this.nombreHTML.nativeElement.focus();
      return;
    }

    this.esperarService.esperar();

    //Si se va a dar a editar.
    if (this.denominacionGenerica) {

      this.medicamentosService.editarDenominacionGenericaGlobal(this.denominacionGenerica["id"], this.nombreControl.value, "").subscribe(respuesta => {

        //Se detiene la espera.
        this.esperarService.noEsperar();

        //Si hubo un error.
        if (respuesta["estado"] === "ERROR") {
          //Se muestra la alerta.
          this.utilidadesService.alerta("Error alta de ingrediente activo", respuesta["mensaje"]);
        }
        else {

          //Se cierra el modal.
          this.activeModal.close(this.nombreControl.value);

        }

      });

    }
    //Si se va a dar de alta.
    else {

      this.medicamentosService.altaDenominacionGenericaGlobal(this.nombreControl.value).subscribe(respuesta => {

        //Se detiene la espera.
        this.esperarService.noEsperar();

        //Si hubo un error.
        if (respuesta["estado"] === "ERROR") {
          //Se muestra la alerta.
          this.utilidadesService.alerta("Error edición de ingrediente activo", respuesta["mensaje"]);
        }
        else {

          //Se cierra el modal.
          this.activeModal.close(this.nombreControl.value);

        }

      });


    }

  }

}
