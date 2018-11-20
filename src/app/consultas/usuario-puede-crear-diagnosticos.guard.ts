/******************************************************************|
|NOMBRE: UsuarioPuedeCrearDiagnosticos.                            | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda crear    |
| los diagnósticos de una consulta.                                |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 09/11/2018.                                                |
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

export class UsuarioPuedeCrearDiagnosticosGuard implements CanActivate {
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
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                
      //Obtiene el identificador de la consulta de la url.
      let consultaId: string = next.paramMap.get("id");
        
      //Retorna verdadero o falso en caso de que el usuario pueda crear los diagnósticos o no respectivamente.
      return this.autorizacion.usuarioPuedeCrearDiagnosticos(consultaId).pipe(map((resultado) => { 
        
        //Si el usuario no puede crear diagnósticos.
        if(!resultado["value"]){
          
         this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
        }       
        
        return resultado["value"];             
      })).toPromise();
      
    }
}
