
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
import 'hammerjs';

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
  imagen: string = "";
  //Imagen que guardará la imagen por default.
  private imagenDefault: string
  //Imagenes que se almacenarán con cambios los cambios en el dibujo.
  private imagenes: string[] = new Array();
  //Almacena el índice actual del arreglo de imágenes.
  private indiceActualImagenes: number = 0;
  //Variable que establece el color del pincel, por default es negro.
  private color: string = "black";
  //Variable que establece el tamaño del pincel, por default es 2.
  private tamanoPincel: number = 1;  

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

  /*----------------------------------------------------------------------|
  |  NOMBRE: ngAfterViewInit.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando la vista está lista.       |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/09/2018.                                                   |    
  |----------------------------------------------------------------------*/

  ngAfterViewInit() {

    //Si no viene imagen de fondo. //Se obtiene lo que hay actualmente en pantalla.
    this.imagen.length === 0 ? this.imagen = this.signaturePad.toDataURL() : null;    

    //Se guarda la imagen por default por si se refresca el dibujo.
    this.imagenDefault = this.imagen;
    //Se agrega la imagen default al arreglo de imágenes.
    this.imagenes.push(this.imagenDefault);
    //Se establecen las propiedades del área de dibujo.
    this.actualizarAreaDibujo();

    //Se subscribe al evento que escucha cuando cambia el tamaño de la ventana.
    fromEvent(window, 'resize')
      //Extrae el texto del cuadro de texto.
      .pipe(debounceTime(200))
      //Se subscribe al evento.
      .subscribe(() => {         
        //Almacena la imagen previamente para volver a cargarla con el nuevo tamaño de la ventana.
        this.imagen = this.signaturePad.toDataURL();
        this.actualizarAreaDibujo();
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarColor.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cambiar el color del pincel.                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: color = color que se le pondrá al pincel.     |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private cambiarColor(color: string) {
    this.color = color;
    this.signaturePad.set('penColor', this.color);
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: actualizarAreaDibujo.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para refrescar el dibujo cuando cambie el tamaño |
  |  de la ventana.                                                       |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private actualizarAreaDibujo() {

    this.signaturePad.set('penColor', this.color);
    this.signaturePad.set('minWidth', this.tamanoPincel);
    this.signaturePad.set('backgroundColor', "white");
    this.signaturePad.set('canvasWidth', this.modalBody.nativeElement["clientWidth"] - 50);
    this.signaturePad.set('canvasHeight', (this.modalBody.nativeElement["clientWidth"] - 300) / 2);

    //Se cargará la imagen por default si es que tiene.
    this.signaturePad.fromDataURL(this.imagen);
    this.signaturePad.clear();
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: cerrar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cerrar el modal.                            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private cerrar() {
    this.activeModal.close();
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarTamanoPincel.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Se dispara cuando se cambia el valor del slider.        |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: event = se obtiene el valor del tamaño del    |
  |  pincel.                                                              |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private cambiarTamanoPincel(event) {
    //Se cambia el tamaño del pincel según lo seleccionado en el slider.
    this.tamanoPincel = event.value;
    this.signaturePad.set('minWidth', this.tamanoPincel);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: refrescarDibujo.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Refresca o limpia el dibujo.                            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private refrescarDibujo() {
    //Se regresa el dibujo a su estado original, es decir, sin editar.
    this.imagen = this.imagenDefault;
    this.actualizarAreaDibujo();
    //Se vacía el arreglo de imagenes.
    this.imagenes = new Array();
    //Se almacena en la primera posición del arreglo de imágenes la imagen default.
    this.imagenes.push(this.imagenDefault);
    //Se inicializa el índice actual.
    this.indiceActualImagenes = 0;
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: deshacerCambio.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Se deshace el último cambio.                            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private deshacerCambio() {

    //Se deshace el último cambio.
    if (this.indiceActualImagenes < this.imagenes.length - 1) {
      //Se incrementa el contador del número veces que se pulsa el botón deshacer.
      this.indiceActualImagenes = this.indiceActualImagenes + 1;
      //Se obtiene el penúltimo cambio del dibujo.
      let indiceAnterior: number = this.imagenes.length - 1 - this.indiceActualImagenes;
      //Se actualiza la imagen.
      this.imagen = this.imagenes[indiceAnterior];
      this.actualizarAreaDibujo();
    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: rehacerCambio.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Se rehace el último cambio.                             |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private rehacerCambio() {

    //Se rehace el último cambio.
    if (this.indiceActualImagenes - 1 >= 0) {
      this.indiceActualImagenes = this.indiceActualImagenes - 1;
      //Se obtiene el último cambio del dibujo.
      let indiceSiguiente: number = this.imagenes.length - 1 - this.indiceActualImagenes;
      //Se actualiza la imagen.
      this.imagen = this.imagenes[indiceSiguiente];
      this.actualizarAreaDibujo();
    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: dibujoCompleto.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: guarda la última pincelada.                             |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private dibujoCompleto() {
    //Se agrega el nuevo cambio al arreglo de imágenes con la nueva pincelada.
    this.imagenes.push(this.signaturePad.toDataURL());
  }


}
