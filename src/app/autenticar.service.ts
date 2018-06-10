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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operator/map';

@Injectable()
export class AutenticarService {

  //Propiedad que indica el mensaje del porqué expiró la sesión.
  public mensajeExpiracion: string = "La sesión ha expirado.";
  //Propiedad que indica el título del mensaje de expiración.
  public tituloExpiracion: string = "Token expirado";
  //Propiedad que almacena el nombre del usuario
  public nombreUsuario: string = "Ricardo Salvador";

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: login.                                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ingresar al  sistema.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuario   = Usuario del sistema,              |
  |                         password  = Contraseña del usuario.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public login(usuario: string, password: string): Observable<any> {

    let json = JSON.stringify({
      usuario: usuario,
      password: password
    });
    let params = "json=" + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http
      .post('http://telmexcatedral.ddns.net/mimedicos-backend/index.php/ingresar',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: guardarToken.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para almacenar el token.                         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public guardarToken(token: string): any {
    return localStorage.setItem('token', token);
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
