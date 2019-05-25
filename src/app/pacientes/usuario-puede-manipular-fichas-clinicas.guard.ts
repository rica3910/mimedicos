/******************************************************************|
|NOMBRE: UsuarioPuedeManipularFichasClinicasGuard.                 | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda modificar|
| o manipular una ficha clínica.                                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 14/05/2019.                                                |
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

export class UsuarioPuedeManipularFichasClinicasGuard implements CanActivate {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |  si un usuario puede manipular una ficha clínica en específico.       |
  |  rutaNavegacion: contiene los métodos para manipular url´s.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 14/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      //Obtiene el identificador del paciente de la url.        
      let pacienteId: string = next.paramMap.get("pacienteId");

      //Obtiene el identificador de la ficha clínica de la url.
      let fichaClinicaId: string = next.paramMap.get("fichaClinicaId");
        
      //Retorna verdadero o falso en caso de que el usuario pueda modificar la ficha clínica o no respectivamente.
      return this.autorizacion.usuarioPuedeManipularFichaClinica(pacienteId, fichaClinicaId).pipe(map((resultado) => {                  
        
        //Si el usuario no puede acceder a la ficha clínica.
        if(!resultado["value"]){
          
         this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
        } 
        
        return resultado["value"];             
      })).toPromise();
      
    }
}
