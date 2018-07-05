/******************************************************************|
|NOMBRE: UsuarioTieneMenuGuard                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para validar que un usuario tenga cierto menú |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 04/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarService } from './autenticar.service';


@Injectable()
export class UsuarioTieneMenuGuard implements CanActivate {


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
  |  FECHA: 04/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService) { }

  /*----------------------------------------------------------------------|
|  NOMBRE: canActivate.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Implementación que abre cierta ruta solo si el          |
|               usuario tiene el menú dado.                             | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: next = Ruta que se pretende ingresar          |
|-----------------------------------------------------------------------|
|  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
|                         en caso de que la ruta se pueda utilizar      |
|                         respectivamente.                              |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 04/07/2018.                                                   |    
|----------------------------------------------------------------------*/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {                      
      const url: string = state.url.replace("/","");         
      return this.autorizacion.usuarioTieneMenu(url).map((resultado) => {              
        return resultado["value"];             
      });
      
  }
}
