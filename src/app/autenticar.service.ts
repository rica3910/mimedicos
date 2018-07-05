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

  menuInicio: boolean = false;

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
  login(usuario: string, password: string): Observable<any> {

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
          this._guardarNombreUsuario(respuesta["usuario"]);        
        }
        //Se retorna la respuesta.
        return respuesta;
      });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _guardarToken.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para almacenar el token.                         | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: token   = token de la sesión actual.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _guardarToken(token: string): any {
    return localStorage.setItem('token', token);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _guardarNombreUsuario.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para almacenar el nombre del usuario.            | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: nombre = Nombre del usuario.                  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _guardarNombreUsuario(nombre: string): any {
    return localStorage.setItem('usuario', nombre);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _eliminarNombreUsuario.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar el nombre del usuario.             | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _eliminarNombreUsuario(): void {
    localStorage.removeItem('usuario');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerNombreUsuario.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener el nombre del usuario.              | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerNombreUsuario(): any {
    return localStorage.getItem('usuario');
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
  private _eliminarToken(): void {
    localStorage.removeItem('token');
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
  logout(): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({        
        'X-API-KEY': this.obtenerToken()        
      });
          
      //Elimina el token.
      this._eliminarToken();
      //Elimina el nombre del usuario.
      this._eliminarNombreUsuario();

      return this.http.post(this.urlApi + 'salir', "", { headers: headers });      
      
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
  obtenerToken(): any {
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
  estaConectado(): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'validar-token/0', { headers: headers })
        .map(respuesta => {

          //Si el token está inactivo o caduco y el usuario está logueado.
          if (respuesta["estado"] === "ERROR") {
            //Se desloguea del sistema.
            this.logout().subscribe();
          }

          return respuesta;

        });
    }
    //No está conectado.
    return Observable.of(false);
  }
  /*----------------------------------------------------------------------|
  |  NOMBRE: validarToken.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para validar un token.                           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: token = token a validar.                      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |                         en caso de que el token esté correcto o no    |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  validarToken(token: string): Observable<any> {

    //Si la longitud del token es menor de 40, entonces el token es inválido.
    if(token.length < 40){
      return Observable.of(false); 
    }

    //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': token
    });

    //Si no está conectado y se olvidó el password.
    return this.http.get(this.urlApi + 'validar-token/' + 0, { headers: headers });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: validarActualizarToken.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para validar y actualizar un token.              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |                         en caso de que el token esté correcto o no    | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/06/2018.                                                   |    
  |----------------------------------------------------------------------*/

  validarActualizarToken(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend para validar y acualizar el token.
      return this.http.get(this.urlApi + 'validar-token/' + 1, { headers: headers })
        .map(respuesta => {
          //Si existe algún error con el token.
          if (respuesta["estado"] === "ERROR") {
            //Se desloguea del sistema.
            this.logout().subscribe();
          }
        });
    }

    //No está conectado.
    return Observable.of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: olvidarPassword.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que se ejecuta cuando se olvida la contraseña.   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: email   = Email del usuario.                  |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  olvidarPassword(email: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      email: email
    });

    //Le concatena la palabra "json=" al json armado.
    let params = "json=" + json;
    //Le agrega el header codificado.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'olvidar-password',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarPassword.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cambiar el password del usuario.            | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: token           = Token que viene de la url,  |
  |                         olvidarPassword = 0 si es cambio normal,      |
  |                                           1 si se olvidó el password, |
  |                         passwordActual  = password actual del usuario,|
  |                         passwordNuevo   = password nuevo del usuario. |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarPassword(token: string, olvidarPassword: number, passwordActual: string, passwordNuevo: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      token: token,
      olvidarPassword: olvidarPassword,
      passwordActual: passwordActual,
      passwordNuevo: passwordNuevo
    });

    //Le concatena la palabra "json=" al json armado.
    let params = "json=" + json;
    //Le agrega el header codificado.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'cambiar-password',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneMenu.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene un menú dado.     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |                         en caso de que el usuario tenga o no el menú  |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTieneMenu(url: string): Observable<any> {
    
    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });
      
      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-menu/' + url, { headers: headers })
        .map(respuesta => {

          //Si el usuario no tiene el menú.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            this.menuInicio = false;
            return Observable.of(false);
          }

          //Retorna un verdadero, signo de que si tiene asignado el menú.
          this.menuInicio = true;
          return Observable.of(true);

        });
    }
    //No está conectado.
    this.menuInicio = false;
    return Observable.of(false);
  }  

}

//Constante que se utilizará para inyectar el servicio.
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AutenticarService, useClass: AutenticarService }
];
