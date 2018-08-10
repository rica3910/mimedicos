/******************************************************************|
|NOMBRE: Citas.                                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|citas.                                                            |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutenticarService } from './autenticar.service';
import { map } from "rxjs/operators";

@Injectable()
export class CitasService {

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
  |  NOMBRE: filtroEstadosCitas.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los estados de las citas            |
  |  del usuario logueado.                                                |  
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
  filtroEstadosCitas(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + 'filtro-estados-citas', { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaCitas.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las citas de los pacientes.         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: organizacion = id. de la organización,        | 
  |  clinica = id. de la clínica,                                         |
  |  estatus = estado de la cita,                                         |
  |  actividad = id. de la actividad de la cita,                          |
  |  desde = fecha inicial,                                               |
  |  hasta = fecha final,                                                 |
  |  paciente= id. del paciente,                                          |
  |  usuario = id. del usuario.                                           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/07/2018.                                                   |    
  |----------------------------------------------------------------------*/

  listaCitas(
    organizacion: string,
    clinica: string,
    estatus: string,
    actividad: string,
    desde: string,
    hasta: string,
    paciente: string,
    usuario: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      console.log("ORGANIZACIÓN: " +  organizacion);
      console.log("CLÍNICA: " +  clinica);
      console.log("ESTATUS: " +  estatus);
      console.log("ACTIVIDAD: " +  actividad);
      console.log("DESDE: " +  desde);
      console.log("HASTA: " +  hasta);
      console.log("PACIENTE: " +  paciente);
      console.log("USUARIO: " +  usuario);

      //Envía la petición al servidor backend para obtener las citas.
     // return this.http.get(this.urlApi + 'lista-citas', { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

}

//Constante que se utilizará para inyectar el servicio.
export const CITAS_PROVIDERS: Array<any> = [
  { provide: CitasService, useClass: CitasService }
];
