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
  |  PARÁMETROS DE ENTRADA: router       = contiene los métodos para      |
  |                                         manipular rutas.              |                  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private router: Router) { }
  
  ngOnInit(){
    //Si escribe una url que no existe, lo retorna a la página de ingreso.
    this.router.navigate(['ingresar']);
  }

}
