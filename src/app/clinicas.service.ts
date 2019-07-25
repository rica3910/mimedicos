/******************************************************************|
|NOMBRE: Clinicas.                                                 | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de base de datos de|
|las clínicas.                                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 06/08/2018.                                                |
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
export class ClinicasService {

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
  |  FECHA: 06/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroClinicas.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las clínicas activas                |
  |  del usuario logueado.                                                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: usuarioId = id del usuario,                   |
  |                         status = estatus de la clínica: ACTIVO,       |
  |                         INACTIVO o TODOS,                             |
  |                         organizacionId = id de la organización.       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroClinicas(usuarioId: string, status: string, organizacionId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + 'filtro-clinicas/' + usuarioId + "/" + status + "/" + organizacionId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }
}

//Constante que se utilizará para inyectar el servicio.
export const CLINICAS_PROVIDERS: Array<any> = [
  { provide: ClinicasService, useClass: ClinicasService }
];