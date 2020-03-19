/******************************************************************|
|NOMBRE: Parametros.                                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los parámeteros generales.     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 19/03/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutenticarService } from './autenticar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';

@Injectable()
export class ParametrosService {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
  | urlApi= url de la aplicación backend,                                 |
  | autorizacion = contiene los métodos para saber                        |
  | si un usuario está conectado,                                         |
  | modalService = contiene los métodos para manipular modals.            |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService,
    private modalService: NgbModal) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerIva.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener el iva registrado en la bd.         |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  obtenerIva(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información.
      return this.http.get(this.urlApi + `obtener-iva`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }
}

//Constante que se utilizará para inyectar el servicio.
export const PARAMETROS_PROVIDERS: Array<any> = [
  { provide: ParametrosService, useClass: ParametrosService }
];
