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

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
  |                         urlApi= url de la aplicación backend.         |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string) { }

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

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      usuario: usuario,
      password: password
    });

    //Le concatena la palabra "json=" al json armado.
    let params = "json=" + json;
    //Le agrega el header codificado.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'ingresar',
        params,
        { headers: headers })
        .map(respuesta => {
          //Si el ingreso se hace satisfactoriamente.
          if (respuesta["estado"] !== "ERROR") {
            //Se almacena el token en el navegador del cliente..
            this._guardarToken(respuesta["token"]); 
          }    
          //Se retorna la respuesta.
          return respuesta;
        });
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
  private _guardarToken(token: string): any {
    return localStorage.setItem('token', token);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarToken.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar el token.                          | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _eliminarToken(): any {
    return localStorage.removeItem('token');
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
  public logout(): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Se arma la solicitud de tipo GET junto con los HEADERS.
      let solicitud = new HttpRequest(
        'GET',
        this.urlApi + 'salir',
        {
          headers
        }
      );

      //Elimina el token.
      this._eliminarToken();

      //Envía la petición al servidor backend.
      //Inactiva el token en la base de datos para que ya no pueda ser utilizado.
      return this.http.request(solicitud);
    }

    return Observable.of(false);

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
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |                         en caso de que el usuario esté conectado o no |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/05/2018.                                                   |    
  |----------------------------------------------------------------------*/
  public estaConectado(): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'validar-token/0', {headers: headers})
      .map(respuesta => {

          //Si el token está inactivo o caduco y el usuario está logueado.
          if (respuesta["estado"] === "ERROR") {
              //Se elimina el token que se otorga cuando el usuario ingresa.
              this._eliminarToken();
          }

          return respuesta;

      });
    }
    //No está conectado.
    return Observable.of(false);
  }
}

//Constante que se utilizará para inyectar el servicio.
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AutenticarService, useClass: AutenticarService }
];
