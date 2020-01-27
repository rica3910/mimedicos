/******************************************************************|
|NOMBRE: Cobros.                                                   | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|cobros.                                                           |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 24/01/2020                                                 |
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
|  FECHA: 24/01/2020.                                                   |    
|----------------------------------------------------------------------*/

export class CobrosService {

  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaCobros.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los cobros.                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: organizacionId = id. de la organización,      | 
  |  clinicaId = id. de la clínica,                                       |    
  |  desde = fecha inicial,                                               |
  |  hasta = fecha final,                                                 |
  |  pacienteId= id. del paciente,                                        |
  |  estadoCobroId = id. del estado del cobro,                            |
  |  usuarioId = id. del usuario.                                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/01/2020.                                                   |    
  |----------------------------------------------------------------------*/

  listaCobros(
    clinicaId: string,
    desde: string,
    hasta: string,
    pacienteId: string,
    estadoCobroId: string,
    usuarioId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los cobros.
      return this.http.get(this.urlApi + `lista-cobros/${clinicaId}/${desde}/${hasta}/${pacienteId}/${estadoCobroId}/${usuarioId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroEstadosCobros.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los estados de los cobros.          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  estatus = indica el estatus de los registros: ACTIVO o INACTIVO.     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/01/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroEstadosCobros(estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los estados de los cobros.
      return this.http.get(this.urlApi + 'filtro-estados-cobros/' + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }


}


//Constante que se utilizará para inyectar el servicio.
export const COBROS_PROVIDERS: Array<any> = [
  { provide: CobrosService, useClass: CobrosService }
];