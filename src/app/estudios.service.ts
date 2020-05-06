/******************************************************************|
|NOMBRE: Estudios.                                                 | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|estudios.                                                         |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 14/02/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutenticarService } from './autenticar.service';

@Injectable()
export class EstudiosService {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
  |                         urlApi= url de la aplicación backend,         |
  |                         autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 14/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }

    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroEstudios.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los servicios y/o estudios          |
    |  activos del usuario logueado.                                        |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  usuarioId = identificador del usuario al que se buscarán los estudios|  
    |  estatus = indica el estatus de los registros: ACTIVO o INACTIVO,     |
    |  clinicaId = identificador de la clínica.                             |   
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        | 
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/09/2018.                                                   |    
    |----------------------------------------------------------------------*/
    filtroEstudios(usuarioId: string, estatus: string = "ACTIVO", clinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los estudios.
      return this.http.get(this.urlApi + 'filtro-estudios/' + usuarioId + "/" + estatus + "/" + clinicaId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaEstudio.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un estudio.                     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  clinicaId = identificador de la clínica,                             |
  |  nombre = nombre del estudio,                                         |
  |  descripcion = descripción del estudio,                               | 
  |  precioBruto = precio bruto del estudio.                              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaEstudio(
    clinicaId: string,
    nombre: string,
    descripcion: string,    
    precioBruto: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      clinicaId: clinicaId,
      nombre: nombre,
      descripcion: descripcion,
      precioBruto: precioBruto
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-estudio',
        json,
        { headers: headers });
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: modificarEstudio.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para modificar un estudio.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  estudioId = identificador del estudio,                               |
  |  clinicaId = identificador de la clínica,                             |
  |  nombre = nombre del estudio,                                         |
  |  descripcion = descripción del estudio,                               | 
  |  precioBruto = precio bruto del estudio,                              |
  |  estatus = estatus del estudio.                                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  modificarEstudio(
    estudioId: string,
    clinicaId: string,
    nombre: string,
    descripcion: string,    
    precioBruto: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      estudioId: estudioId,
      clinicaId: clinicaId,
      nombre: nombre,
      descripcion: descripcion,
      precioBruto: precioBruto,
      estatus: estatus
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'modificar-estudio',
        json,
        { headers: headers });
  }  

    /*----------------------------------------------------------------------|
    |  NOMBRE: verEstudio.                                                  |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener un estudio en específico.           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  estudioId = identificador del estudio.                               |    
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        | 
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/04/2020.                                                   |    
    |----------------------------------------------------------------------*/
    verEstudio(estudioId: string): Observable<any> {

      //Si está conectado, entonces el token sí existe.
      if (this.autorizacion.obtenerToken() !== null) {
  
        //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
        const headers: HttpHeaders = new HttpHeaders({
          'X-API-KEY': this.autorizacion.obtenerToken()
        });
  
        //Envía la petición al servidor backend para obtener el estudio.
        return this.http.get(this.urlApi + 'ver-estudio/' + estudioId , { headers: headers });
      }
      //No está conectado.
      return of(false);
  
    }  


  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarEstudio.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un estudio.                        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  estudioId = identificador del estudio,                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarEstudio(
    estudioId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      estudioId: estudioId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-estudio',
        json,
        { headers: headers });
  }     

  /*----------------------------------------------------------------------|
  |  NOMBRE: desasignarEstudio.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desasignar un estudio.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  estudioId = identificador del estudio,                               |
  |  usuarioId = identificador del usuario.                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  desasignarEstudio(
    estudioId: string,
    usuarioId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      estudioId: estudioId,
      usuarioId: usuarioId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'desasignar-estudio',
        json,
        { headers: headers });
  }     

    /*----------------------------------------------------------------------|
    |  NOMBRE: usuariosEstudio.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: obtiene los usuarios que tienen o no un estudio.        |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  estudioId = identificador del estudio,                               |
    |  conEstudio = 1 usuarios con estudio, 0 usuarios sin estudio.         |    
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        | 
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 05/05/2020.                                                   |    
    |----------------------------------------------------------------------*/
    usuariosEstudio(estudioId: string, conEstudio: string): Observable<any> {

      //Si está conectado, entonces el token sí existe.
      if (this.autorizacion.obtenerToken() !== null) {
  
        //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
        const headers: HttpHeaders = new HttpHeaders({
          'X-API-KEY': this.autorizacion.obtenerToken()
        });
  
        //Envía la petición al servidor backend para obtener los usuarios.
        return this.http.get(this.urlApi + 'usuarios-estudio/' + estudioId + '/' + conEstudio , { headers: headers });
      }
      //No está conectado.
      return of(false);
  
    }  


}

//Constante que se utilizará para inyectar el servicio.
export const ESTUDIOS_PROVIDERS: Array<any> = [
  { provide: EstudiosService, useClass: EstudiosService }
];
