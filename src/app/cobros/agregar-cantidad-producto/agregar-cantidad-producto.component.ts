/******************************************************************|
|NOMBRE: agregarCantidadProducto.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para agregar producto.                    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 18/05/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilidadesService } from '../../utilidades.service';


@Component({
  selector: 'app-agregar-cantidad-producto',
  templateUrl: './agregar-cantidad-producto.component.html',
  styleUrls: ['./agregar-cantidad-producto.component.css']
})
export class AgregarCantidadProductoComponent implements OnInit {

  //Objeto que contendrá el formulario de agregar documento.
  formAgregarCantidad: FormGroup;
  //Objeto del formulario que contendrá al campo cantidad.
  cantidadControl: AbstractControl;
  //Elemento HTML de la cantidad.
  @ViewChild('cantidadHTML') cantidadHTML: ElementRef;
  //Variable que indica que ya se hicieron visibles los campos.
  activarCampos: boolean = false;
  //Variable para almacenar el producto.
  public producto;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  activeModal = contiene los métodos para manipular un modal,          |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService) {

  }

  ngOnInit() {

    //Se agregan las validaciones al formulario.
    this.formAgregarCantidad = this.fb.group({
      'cantidad': ['', [this.utilidadesService.numberValidator, Validators.required, Validators.min(1), Validators.max(Number(this.producto.stock))]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.cantidadControl = this.formAgregarCantidad.controls['cantidad'];

    //Se le asigna la mínima cantidad por default.
    this.cantidadControl.setValue("1");

    //Cuando se cambia la cantidad.
    this.cantidadControl.valueChanges.subscribe(() => {

      //La cantidad no puede ser menor 1. La cantidad no puede ser mayor al stock.
      if (this.cantidadControl.value != "" && (Number(this.cantidadControl.value) < 1 || Number(this.cantidadControl.value) > Number(this.producto.stock))) {
        this.cantidadControl.setValue("");
      }


    });
  }

  ngAfterViewChecked(): void {

    //La cantidad será número.
    if (this.cantidadHTML &&
      !this.activarCampos) {

      this.activarCampos = true;
      this.utilidadesService.inputNumerico(this.cantidadHTML, false, this.cantidadControl);

      //Se le hace un focus a la cantidad.
      this.cantidadHTML.nativeElement.focus();

    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarProducto.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar el producto al cobro.               | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  agregarProducto() {

    //Se almacena la cantidad.
    this.producto.cantidad = this.cantidadControl.value;

    //Se retorna el resultado.
    this.activeModal.close(this.producto);

  }
  

}
