/******************************************************************|
|NOMBRE: UsuarioIngresadoGuard                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario esté conectado |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AutenticarService } from './autenticar.service';

@Injectable()
export class UsuarioIngresadoGuard implements CanActivate {
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService) {}

  /*----------------------------------------------------------------------|
  |  NOMBRE: canActivate.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Implementación que abre cierta ruta solo si está        |
  |               conectado el usuario.                                   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: next = Ruta que se pretende ingresar          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
  |                         en caso de que la ruta se pueda utilizar      |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.autorizacion.estaConectado();
  }
}

