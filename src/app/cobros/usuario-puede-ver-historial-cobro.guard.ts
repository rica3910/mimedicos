/******************************************************************|
|NOMBRE: UsuarioPuedeVerHistorialCobro                             | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda ver      |
| el historial de un cobro.                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 08/04/2020.                                                |
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
export class UsuarioPuedeVerHistorialCobroGuard implements CanActivate {

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
  |  FECHA: 08/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       //Obtiene el identificador del cobro de la url.
       let cobroId: string = next.paramMap.get("id");

       //Retorna verdadero o falso en caso de que el usuario pueda ver el historial de un cobro
       //en específico o no respectivamente.
       return this.autorizacion.usuarioPuedeVerHistorialCobro(cobroId).pipe(map((resultado) => {

         //Si el usuario no puede ver un cobro en específico.
         if (!resultado["value"]) {
   
           this.rutaNavegacion.navigate(['cobros', 'lista-cobros']);
         }
   
         return resultado["value"];
       })).toPromise();
  }
}
