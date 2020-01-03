/******************************************************************|
|NOMBRE: UsuarioPuedeEditarRecetaGuard.                            | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda editar   |
| una receta en específico.                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 24/10/2019.                                                |
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
export class UsuarioPuedeEditarRecetaGuard implements CanActivate {
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
                
      //Obtiene el identificador de la receta de la url.
      let recetaId: string = next.paramMap.get("recetaId");
        
      //Retorna verdadero o falso en caso de que el usuario pueda editar o no la receta respectivamente.
      return this.autorizacion.usuarioPuedeEditarReceta(recetaId).pipe(map((resultado) => { 
                
        //Si el usuario no puede editar la receta.
        if(!resultado["value"]){
          
          this.rutaNavegacion.navigate(['consultas', 'lista-recetas']);
        }       
        
        return resultado["value"];             
      })).toPromise();
      
    }
}
