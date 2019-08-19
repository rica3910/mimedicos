/******************************************************************|
|NOMBRE: UsuarioPuedeEditarDiagnosticos.                           | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda editar   |
| los diagnósticos de una consulta.                                |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 11/11/2018.                                                |
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

@Injectable()

export class UsuarioPuedeEditarDiagnosticosGuard implements CanActivate {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |  si un usuario tiene asignado el usuario de atención, el paciente y   |
  |  la clínica.                                                          |
  |  rutaNavegacion: contiene los métodos para manipular url´s.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //Obtiene el identificador del diagnóstico de la url.
    let diagnosticoId: string = next.paramMap.get("diagnosticoId");

    //Retorna verdadero o falso en caso de que el usuario pueda editar los diagnósticos o no respectivamente.
    return this.autorizacion.usuarioPuedeEditarDiagnosticos(diagnosticoId).pipe(map((resultado) => {
     
      //Si el usuario no puede editar diagnósticos.
      if (!resultado["value"]) {

        this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
      }

      return resultado["value"];
    })).toPromise();

  }
}
