/******************************************************************|
|NOMBRE: Productos.                                                | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|servicios.                                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 26/09/2018.                                                |
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
export class ProductosService {

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
  |  FECHA: 26/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroServicios.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los servicios y/o estudios          |
  |  activos del usuario logueado.                                        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  usuarioId = identificador del usuario al que se buscarán los prod,   |  
  |  estatus = indica el estatus de los registros: ACTIVO o INACTIVO.     |   
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
  filtroServicios(usuarioId: string, estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los servicios.
      return this.http.get(this.urlApi + 'filtro-servicios/' + usuarioId + "/" + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

}

//Constante que se utilizará para inyectar el servicio.
export const PRODUCTOS_PROVIDERS: Array<any> = [
  { provide: ProductosService, useClass: ProductosService }
];
