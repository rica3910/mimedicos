/******************************************************************|
|NOMBRE: medicamentosGlobales.                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los medicamentos globales.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/06/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit } from '@angular/core';
import { AutenticarService } from '../../autenticar.service';

@Component({
  selector: 'app-medicamentos-globales',
  templateUrl: './medicamentos-globales.component.html',
  styleUrls: ['./medicamentos-globales.component.css']
})
export class MedicamentosGlobalesComponent implements OnInit {

   /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  autenticarService = contiene los métodos de autenticación.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autenticarService: AutenticarService) { }

  ngOnInit() {
  }

}
