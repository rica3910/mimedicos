import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilidadesService } from '../utilidades.service';

@Component({
  selector: 'app-agregar-abono',
  templateUrl: './agregar-abono.component.html',
  styleUrls: ['./agregar-abono.component.css']
})
export class AgregarAbonoComponent implements OnInit {

  //Objeto que contendrá el formulario del abono.
  formAgregarAbono: FormGroup;
  //Objeto del formulario que contendrá al campo abono.
  abonoControl: AbstractControl;
  //Elemento HTML del abono.
  @ViewChild('abonoHTML') abonoHTML: ElementRef;
  //Variable que indica que ya se hicieron visibles los campos.
  activarCampos: boolean = false;
  //Variable para almacenar el cobro.
  public cobro;
  //Registros de tipo de cobros que se verán en la vista en el campo tipos de cobro.
  tipoCobros: Array<JSON> = new Array();
  //Objeto del formulario que contendrá al tipo de cobro.
  tipoCobroControl: AbstractControl;
  //Objeto del formulario que contendrá las observaciones.
  observacionesControl: AbstractControl;

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
  |  FECHA: 31/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService) {

  }

  ngOnInit() {

    //Se agregan las validaciones al formulario.
    this.formAgregarAbono = this.fb.group({
      'tipoCobro': ['', [Validators.required]],
      'observaciones': [''],
      'abono': ['', [this.utilidadesService.numberValidator, Validators.required, Validators.min(1), Validators.max(Number(this.cobro.total))]]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.tipoCobroControl = this.formAgregarAbono.controls['tipoCobro'];
    this.abonoControl = this.formAgregarAbono.controls['abono'];
    this.observacionesControl = this.formAgregarAbono.controls['observaciones'];

    //Se almacenan los tipos de cobros.
    this.tipoCobros = this.cobro.tiposCobros;
    //Se inicializa el select con el primer valor encontrado.
    this.tipoCobroControl.setValue(this.cobro.tiposCobros[0]["id"] ? this.cobro.tiposCobros[0]["id"] : "");

    //Se le asigna la mínima cantidad por default.
    this.abonoControl.setValue("");

    //Cuando se cambia el abono.
    this.abonoControl.valueChanges.subscribe(() => {

      //El abono no puede ser menor 1. El abono no puede ser mayor al total del cobro.
      if (this.abonoControl.value != "" && (Number(this.abonoControl.value) < 1 || Number(this.abonoControl.value) > Number(this.cobro.total))) {
        this.abonoControl.setValue("");
      }

    });
  }

  ngAfterViewChecked(): void {

    //El abono será número.
    if (this.abonoHTML &&
      !this.activarCampos) {

      this.activarCampos = true;
      this.utilidadesService.inputNumerico(this.abonoHTML, true, this.abonoControl);

      //Se le hace un focus al abono
      this.abonoHTML.nativeElement.focus();

    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: abonar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar el abono al cobro.                  | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  abonar() {

    //Se almacena el abono
    this.cobro.abono = this.abonoControl.value;
    this.cobro.tipoCobro = this.tipoCobroControl.value;
    this.cobro.observaciones = this.observacionesControl.value;

    //Se retorna el resultado.
    this.activeModal.close(this.cobro);

  }

}
