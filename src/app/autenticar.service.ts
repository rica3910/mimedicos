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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class AutenticarService {

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
      .pipe(map((respuesta) => {

        //Si el ingreso se hace satisfactoriamente.
        if (respuesta["estado"] !== "ERROR") {
          //Se almacena el token en el navegador del cliente..
          this._guardarToken(respuesta["token"]);
          this._guardarNombreUsuario(respuesta["usuario"]);

          //Arreglo que contiene todos los menús del sistema.
          const urlsMenus: string[] = ["pacientes",  "consultas", "cobros"];
          //Se borran los  menús en caso de que haya.
          this._eliminarMenus();
          //Se despliegan los menús que tiene asignados el usuario logueado.
          this.usuarioTieneMenus(urlsMenus, 0);   
          
        }
        
        return respuesta;

      }));

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _eliminarMenus.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar los menús.                         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _eliminarMenus(): any {

    localStorage.removeItem('menus');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerMenus.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los menús del usuario logueado.     | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  _obtenerMenus(): any {

    return localStorage.getItem('menus');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerMenusArreglo                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los menús del usuario logueado      | 
  |  en forma de arreglo.                                                 | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerMenusArreglo(): Array<string> {

    //Variable que se retornará.
    let menus: string[] = new Array();

    //Si hay menús.
    if (this._obtenerMenus() !== null) {

      //Se almacenan los menús en una constante de tipo cadena para obtener los métodos.
      const menusString = this._obtenerMenus();

      //Se transforman los menús en un arreglo.
      menus = menusString.split(",");

    }

    //Se retornan los menús.
    return menus;
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: _guardarMenus.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para almacenar los menús que tiene el usuario.   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: menu   = menú o url que se agregará,          |
  |                         final = si es el último menú.                 |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  private _guardarMenus(menu: string, final: boolean = false): any {

    //SÍ hay menús guardados.
    if (this._obtenerMenus() !== null) {

      //Si es el último menú.
      if (final) {
        localStorage.setItem("menus", this._obtenerMenus() + menu);
      }
      //Si no es el último menú.
      else {
        localStorage.setItem("menus", this._obtenerMenus() + menu + ",");
      }

    }
    //Si NO hay menús.
    else {

      //Se empieza a armar la cadena con comas.      
      //Si es el último menú.
      if (final) {
        localStorage.setItem("menus", menu);
      }
      //Si no es el último menú.
      else {
        localStorage.setItem("menus", menu + ",");
      }

    }

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
    localStorage.setItem('token', token);
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
    localStorage.setItem('usuario', nombre);
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
      //Elimina los menús.
      this._eliminarMenus();

      return this.http.post(this.urlApi + 'salir', "", { headers: headers });

    }

    return of(false);

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
        .pipe(map(respuesta => {

          //Si el token está inactivo o caduco y el usuario está logueado.
          if (respuesta["estado"] === "ERROR") {
            //Se desloguea del sistema.
            this.logout().subscribe();
          }

          return respuesta;

        }));
    }
    //No está conectado.
    return of(false);
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
    if (token.length < 40) {
      return of(false);
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
        .pipe(map(respuesta => {
          //Si existe algún error con el token.
          if (respuesta["estado"] === "ERROR") {
            //Se desloguea del sistema.
            this.logout().subscribe();
          }
        }));
    }

    //No está conectado.
    return of(false);

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
|  NOMBRE: usuarioTieneMenus.                                           |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método que despliega los menús que tiene el usuario.    | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: urls = todas las urls o menús del sistema,    |
|  iteracion = índice o iteración actual en el arreglo de menús.        |
|-----------------------------------------------------------------------|
|  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
|                         en caso de que el usuario tenga o no el menú  |
|                         respectivamente.                              |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 03/09/2018.                                                   |    
|----------------------------------------------------------------------*/
  usuarioTieneMenus(urls: string[], iteracion: number) {

      let url = urls[iteracion];

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      this.usuarioTieneMenu(url).subscribe((respuesta) => {

        //Si el usuario tiene el menú.
        if (respuesta.value) {

          //Retorna un verdadero, signo de que sí tiene asignado el menú.
          //Si es es el último url o menú.                  
          if (iteracion == urls.length - 1) {
            this._guardarMenus(url, true);
          } else if (iteracion < urls.length - 1) {
            this._guardarMenus(url);
            this.usuarioTieneMenus(urls, iteracion + 1);
          }

        }

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneMenu.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene un menú dado.     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: url = url del menú.                           |
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
        .pipe(map(respuesta => {

          //Si el usuario no tiene el menú.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que si tiene asignado el menú.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }



  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTienePaciente.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene un paciente dado. | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacienteId: identificador del paciente,       |
  |                         usuarioId: identificador del usuario.         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario tenga o no el paciente respectivamente.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTienePaciente(pacienteId: string, usuarioId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-paciente/' + pacienteId + "/" + usuarioId, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no tiene el paciente.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí tiene asignado el paciente.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneDetModulo.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene el detalle del    |
  |  módulo.                                                              | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: nombreDetModulo = nombre del det. del módulo. |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |                         en caso de que el usuario tenga o no el menú  |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTieneDetModulo(nombreDetModulo: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-det-modulo/' + nombreDetModulo, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no tiene el menú.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que si tiene asignado el detalle del módulo.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }



  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeModificarCita.                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda modificar   |
  | una cita.                                                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: citaId: identificador de la cita,             |
  |  soloVer = Se utiliza para ver solo la cita, sin modificar.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la cita respectivamente.   |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeModificarCita(citaId: string, soloVer: string = '0'): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-modificar-cita/${citaId}/${soloVer}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeModificarConsulta.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda modificar   |
  | una consulta.                                                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId: identificador de la consulta.     |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la consulta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeModificarConsulta(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-modificar-consulta/${consultaId}`, { headers: headers })
        .pipe(map(respuesta => {
          
          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeManipularFichaClinica.                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda modificar   |
  | una ficha clínica.                                                    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:pacienteId: id del paciente,                   | 
  |                        fichaClinicaId: id de la ficha clínica.        |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la ficha respectivamente.  |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 14/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeManipularFichaClinica(pacienteId: string, fichaClinicaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-manipular-ficha-clinica/${pacienteId}/${fichaClinicaId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeVerDiagnosticos.                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda ver         |
  |  diagnósticos.                                                        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId: identificador de la consulta.     |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la consulta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeVerDiagnosticos(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-ver-diagnosticos/${consultaId}`, { headers: headers })
        .pipe(map(respuesta => {          

          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeCrearDiagnosticos.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda crear       |
  |  diagnósticos.                                                        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId: identificador de la consulta.     |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la consulta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeCrearDiagnosticos(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-crear-diagnosticos/${consultaId}`, { headers: headers })
        .pipe(map(respuesta => {
          
          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }   

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeEditarDiagnosticos.                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda editar      |
  |  diagnósticos.                                                        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId: identificador del diagnóstico. |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la consulta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeEditarDiagnosticos(diagnosticoId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-editar-diagnosticos/${diagnosticoId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeVerDiagnostico.                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda ver         |
  |  un diagnóstico en específico.                                                        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId: identificador del diagnóstico. |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda modificar la consulta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeVerDiagnostico(diagnosticoId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-ver-diagnostico/${diagnosticoId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede acceder o editar la cita.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }   

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneFormulario.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene un formulario.    | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioId: identificador del usuario,         |
  |                         formularioId: identificador del formulario,   |
  |                         estatus: estatus del formulario.              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario tenga o no el paciente respectivamente.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTieneFormulario(usuarioId: string, formularioId: string, estatus: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-formulario/' + usuarioId + "/" + formularioId + "/" + estatus, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no tiene el formulario
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí tiene asignado el formulario.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneClinica.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene una clínica.      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: clinicaId: identificador de la clínica,       |
  |                         usuarioId: identificador del usuario.         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario tenga o no la clínica respectivamente.     |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTieneClinica(clinicaId: string, usuarioId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-clinica/' + clinicaId + '/' + usuarioId, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no tiene la clínica.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí tiene asignado la clínica.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioTieneProducto.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para saber si el usuario tiene un producto.      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioId: identificador del usuario,         |
  |                         productoId: identificador del producto.       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario tenga o no el producto respectivamente.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioTieneProducto(usuarioId: string, productoId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + 'usuario-tiene-producto/' + usuarioId + '/' + productoId, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no tiene el producto.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí tiene asignado el producto.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeVerConsulta.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda ver         |
  | una consulta.                                                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId: identificador de la consulta.     |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda ver o no la consulta respectivamente.|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 16/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeVerConsulta(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-ver-consulta/${consultaId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede acceder o editar la consulta.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí pueda ver la consulta.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  


  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeVerRecetas.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda ver         |
  | las recetas de una consulta.                                          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId: identificador de la consulta.     |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda ver o no la receta respectivamente.  |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeVerRecetas(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-ver-recetas/${consultaId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede ver las recetas.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí pueda ver las recetas.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  


  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeEditarReceta.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para garantizar que el usuario pueda editar      |
  | una receta en específico.                                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: recetaId: identificador de la receta.         |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
  |  en caso de que el usuario pueda editar o no la receta respectivamente|  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeEditarReceta(recetaId: string): Observable<any> {

    //Si está conectado, entonces el token si existe.
    if (this.obtenerToken() !== null) {
      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.obtenerToken()
      });

      //Envía la petición al servidor backend.
      return this.http.get(this.urlApi + `usuario-puede-editar-receta/${recetaId}`, { headers: headers })
        .pipe(map(respuesta => {

          //Si el usuario no puede editar las receta.
          if (respuesta["estado"] === "ERROR") {
            //Retorna un falso.
            return of(false);
          }

          //Retorna un verdadero, signo de que sí pueda editar la receta.
          return of(true);

        }));
    }
    //No está conectado.
    return of(false);
  }  



}

//Constante que se utilizará para inyectar el servicio.
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AutenticarService, useClass: AutenticarService }
];
