/******************************************************************|
|NOMBRE: UsuarioPuedeVerRecetas.                                   | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda ver      |
| las recetas de una consulta.                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 22/08/2019.                                                |
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
export class UsuarioPuedeVerRecetasGuard implements CanActivate {
   /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para      |
  |  saber si un usuario puede ver o manipular recetas.                   |
  |  rutaNavegacion: contiene los métodos para manipular url´s.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) {}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                
      //Obtiene el identificador de la consulta de la url.
      let consultaId: string = next.paramMap.get("id");
        
      //Retorna verdadero o falso en caso de que el usuario pueda ver las recetas o no respectivamente.
      return this.autorizacion.usuarioPuedeVerRecetas(consultaId).pipe(map((resultado) => { 
        
        //Si el usuario no puede acceder a la receta.
        if(!resultado["value"]){
          
          this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
        }       
        
        return resultado["value"];             
      })).toPromise();
      
    }
}
