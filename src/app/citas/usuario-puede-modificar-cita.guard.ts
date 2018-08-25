/******************************************************************|
|NOMBRE: UsuarioPuedeModificarCita.                                | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda modificar|
| una cita.                                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/08/2018.                                                |
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
export class UsuarioPuedeModificarCitaGuard implements CanActivate {

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
  |  FECHA: 20/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    //Obtiene el identificador de la cita de la url.
    let citaId: string = next.paramMap.get("id");
    //Obtiene el parámetro de vista de la cita de la url.
    let soloVer: string = next.paramMap.get("soloVer")? next.paramMap.get("soloVer"): "0";        

    //Retorna verdadero o falso en caso de que el usuario pueda modificar la cita o no respectivamente.
    return this.autorizacion.usuarioPuedeModificarCita(citaId, soloVer).pipe(map((resultado) => {                  
      
      //Si el usuario no puede acceder a la cita.
      if(!resultado["value"]){
        
       this.rutaNavegacion.navigate(['citas', 'lista-citas']);
      } 
      
      return resultado["value"];             
    })).toPromise();
    
  }
}
