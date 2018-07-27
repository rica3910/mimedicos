/******************************************************************|
|NOMBRE: PaginaInvalidaComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Página para redireccionar al inicio cuando la  url   |
|escrita en el navegador no está permitida.                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 13/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-invalida',
  templateUrl: './pagina-invalida.component.html',
  styleUrls: ['./pagina-invalida.component.css']
})
export class PaginaInvalidaComponent implements OnInit {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: rutaNavegacion = contiene los métodos para    |
  |                                         manipular rutas.              |                  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router) { }
  
  ngOnInit(){
    //Si escribe una url que no existe, lo retorna a la página de ingreso.
    this.rutaNavegacion.navigate(['ingresar']);
  }

}
