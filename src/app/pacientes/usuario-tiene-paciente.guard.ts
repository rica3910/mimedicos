import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarService } from '../autenticar.service';
import { map } from "rxjs/operators";


@Injectable()
export class UsuarioTienePacienteGuard implements CanActivate {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |  si un usuario tiene al paciente otorgado o dado,                     |
  |  rutaNavegacion: contiene los métodos para manipular url´s.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
              private rutaNavegacion: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //Obtiene el identificador del paciente de la url.
    let pacienteId: string = next.paramMap.get("id");
          
    //Retorna verdadero o falso en caso de que el usuario tenga o no el paciente respectivamente.
    return this.autorizacion.usuarioTienePaciente(pacienteId).pipe(map((resultado) => { 
      
      //Si el usuario no tiene al paciente lo retorna a la lista de pacientes.
      if(!resultado["value"]){
        this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
      }          
      return resultado["value"];             
    }));
    
  }
}
