/******************************************************************|
|NOMBRE: UsuarioTieneProducto                                      | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario logueado       |
|pueda ver un producto en específico.                              |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 08/05/2020.                                                |
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
export class UsuarioTieneProductoGuard implements CanActivate {

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
  |  FECHA: 08/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private rutaNavegacion: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //Obtiene el identificador del producto de la url.
    let productoId: string = next.paramMap.get("id");

    /*Retorna verdadero o falso en caso de que el usuario pueda ver el producto
    en específico o no respectivamente.*/
    return this.autorizacion.usuarioTieneProducto("0", productoId).pipe(map((resultado) => {

      //Si el usuario no puede ver un producto en específico.
      if (!resultado["value"]) {

        this.rutaNavegacion.navigate(['configuracion', 'productos']);
      }

      return resultado["value"];
    })).toPromise();
  }
}
