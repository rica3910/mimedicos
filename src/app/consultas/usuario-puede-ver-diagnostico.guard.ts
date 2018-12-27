/******************************************************************|
|NOMBRE: UsuarioPuedeVerDiagnostico.                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda ver      |
| un diagnóstico en específico.                                    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 12/12/2018.                                                |
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

export class UsuarioPuedeVerDiagnosticoGuard implements CanActivate {

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
  |  FECHA: 12/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //Obtiene el identificador del diagnóstico de la url.
    let diagnosticoId: string = next.paramMap.get("diagnosticoId");

    //Retorna verdadero o falso en caso de que el usuario pueda ver un diagnóstico en específico o no respectivamente.
    return this.autorizacion.usuarioPuedeVerDiagnostico(diagnosticoId).pipe(map((resultado) => {

      //Si el usuario no puede ver un diagnóstico en específico.
      if (!resultado["value"]) {

        this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
      }

      return resultado["value"];
    })).toPromise();

  }
}
