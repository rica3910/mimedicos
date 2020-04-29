/******************************************************************|
|NOMBRE: UsuarioTieneEstudio                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario logueado       |
|pueda ver un estudio en específico.                               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/04/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarService } from '../autenticar.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioTieneEstudioGuard implements CanActivate {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |  si el usuario logueado es autorizado para cierta acción,             |
  |  rutaNavegacion: contiene los métodos para manipular url´s.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //Obtiene el identificador del estudio de la url.
    let estudioId: string = next.paramMap.get("id");

    /*Retorna verdadero o falso en caso de que el usuario pueda ver el estudio
    en específico o no respectivamente.*/
    return this.autorizacion.usuarioTieneEstudio("0", estudioId).pipe(map((resultado) => {

      //Si el usuario no puede ver un estudio en específico.
      if (!resultado["value"]) {

        this.rutaNavegacion.navigate(['configuracion', 'estudios']);
      }

      return resultado["value"];
    })).toPromise();
  }
}
