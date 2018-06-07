/******************************************************************|
|NOMBRE: Autenticar.                                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio para autenticar o ingresar al sistema.      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable } from '@angular/core';

@Injectable()
export class AutenticarService {

  //Propiedad que indica el mensaje del porqué expiró la sesión.
  public mensajeExpiracion: string = "La sesión ha expirado.";
  //Propiedad que indica el título del mensaje de expiración.
  public tituloExpiracion: string = "Token expirado";

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(){}

  /*----------------------------------------------------------------------|
  |  NOMBRE: login.                                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ingresar al  sistema.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuario   = Usuario del sistema,              |
  |                         password  = Contraseña del usuario.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
  |                         en caso de que ingreso o no respectivamente.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public login(usuario: string, password: string): boolean {

    //Si el usuario y la contraseña son correctas.
    if (usuario === 'user' && password === 'password') {
      //Se almacena localmente el token retornado.
      localStorage.setItem('token', '12345');      
      //Retorna verdadero.
      return true;
    }

    //Autenticación inválida.
    return false;
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: logout.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para salirse del sistema.                        | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public logout(): void {    
    //Elimina el token y se sale del sistema.
    localStorage.removeItem('token');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerToken.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener el token.                           | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public obtenerToken(): any {
    return localStorage.getItem('token');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: estaConectado.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario está conectado          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
  |                         en caso de que el usuario esté conectado o no |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/  
  public estaConectado(): boolean {

    return this.obtenerToken() !== null;
  }
}

//Constante que se utilizará para inyectar el servicio.
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AutenticarService, useClass: AutenticarService }
];
