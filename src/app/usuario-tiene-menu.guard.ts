/******************************************************************|
|NOMBRE: UsuarioTieneMenuGuard                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para validar que un usuario tenga cierto menú |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 04/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { AutenticarService } from './autenticar.service';
import { map } from "rxjs/operators";
import { EsperarService } from './esperar.service';



@Injectable()
export class UsuarioTieneMenuGuard implements CanActivate {


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  |
  |  esperarService = contiene los métodos para mostrar modal de espera.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
             private esperarService: EsperarService,
             private rutaNavegacion: Router) { }

  /*----------------------------------------------------------------------|
|  NOMBRE: canActivate.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Implementación que abre cierta ruta solo si el          |
|               usuario tiene el menú dado.                             | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: next = Ruta que se pretende ingresar          |
|-----------------------------------------------------------------------|
|  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
|                         en caso de que la ruta se pueda utilizar      |
|                         respectivamente.                              |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 04/07/2018.                                                   |    
|----------------------------------------------------------------------*/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    
      
      //Abre el modal de espera.
      this.esperarService.esperar();

      //Obtiene  los menús de la url.  
      const menus: string[] =  state.url.split("/"); 
      //Almacenará el menú o la url para ver si el usuario puede accesar a él.
      let url: string;                            

      //Si solo hay menú.
      if(menus.length == 2){
        //Solo obtiene la primera ruta de la url.
        url = menus[1];
      }    
      //Si son dos menús.
      else if(menus.length >= 3){
        //Solo obtiene la segunda ruta de la url.
        url = menus[2];
      }

      //Retorna verdadero o falso en caso de que el usuario tenga o no el menú.
      return this.autorizacion.usuarioTieneMenu(url).pipe(map((resultado) => {     
        
        //Detiene la espera.
        this.esperarService.noEsperar();

        //Si el usuario no tiene el menú, se le retorna al inicio o página principal.
        if(!resultado["value"]){
          this.rutaNavegacion.navigate(['inicio']);
        }
        //Retorna el resultado.
        return resultado["value"];             
      }));
      
  }
}
