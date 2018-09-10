
/******************************************************************|
|NOMBRE: DibujoComponent                                           | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de dibujo.                                  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 09/09/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { debounceTime } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-dibujo',
  templateUrl: './dibujo.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dibujo.component.css']
})
export class DibujoComponent implements OnInit {

  //Variable que almacena las propiedades del cuerpo del modal.
  @ViewChild("modalBody") modalBody: ElementRef;
   //Variable para manipular el área de dibujo.
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  //Variable que contendrá la imagen de fondo.
  imagen: string = "./assets/img/logo_completo.png";
  private color1 = "red";
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: activeModal = contiene los métodos para       |
  |                                       manipular un modal.             |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 08/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    //Se establecen las propiedades del área de dibujo.
    this.actualizarAreaDibujo();

    fromEvent(window, 'resize')
      //Extrae el texto del cuadro de texto.
      .pipe(debounceTime(200))
      //Se subscribe al evento.
      .subscribe(() => {
        this.imagen = this.signaturePad.toDataURL();
        this.actualizarAreaDibujo();     
      });

  }

  cambiarColor(){
   console.log("nena");
   this.signaturePad.set('penColor', this.color1);
  }

  private actualizarAreaDibujo(){
    this.signaturePad.set('penColor', this.color1);
    this.signaturePad.set('backgroundColor', "white");
    this.signaturePad.set('canvasWidth', this.modalBody.nativeElement["clientWidth"] - 100 );
    this.signaturePad.set('canvasHeight', (this.modalBody.nativeElement["clientWidth"] - 200) /2); 
    this.signaturePad.fromDataURL(this.imagen);
    this.signaturePad.clear(); 
  }

  private cerrar(){
    this.activeModal.close();
  }


}
