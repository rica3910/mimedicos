/******************************************************************|
|NOMBRE: Pacientes.                                                | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de los pacientes.  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 01/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticarService } from './autenticar.service';

@Injectable()
export class PacientesService {

  //Arreglo que almacena los pacientes.
  pacientes: JSON[];

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
  |                         urlApi= url de la aplicación backend,         |
  |                         autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: obtenerPacientes.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los pacientes del usuario logueado. |
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

  obtenerPacientes(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los pacientes.
      return this.http.get(this.urlApi + 'obtener-pacientes', { headers: headers })
        .map(respuesta => {
          //Si todo salió bien.
          if (respuesta["estado"] === "OK") {
            //Se almacenan los pacientes en el arreglo.
            this.pacientes = respuesta["datos"];
          }

          return respuesta;
        });
    }
    //No está conectado.
    return Observable.of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtrarPacientes.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para filtrar el arreglod de pacientes.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:  busqueda = cadena que se buscará.            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  Arreglo filtrado.                             |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/07/2018.                                                   |    
  |----------------------------------------------------------------------*/

  filtrarPacientes(busqueda: string): Observable<JSON[]>{

    //Se iguala el arreglo original al de la búsqueda para después ser filtrado.
    let resultadosPacientes: Array<JSON> = this.pacientes;

    return Observable.of(resultadosPacientes.filter((paciente: JSON) => {
      
      if(paciente["nombres"] === busqueda){
        console.log("HOLA");
        return;
      }

    }));
  }

}

//Constante que se utilizará para inyectar el servicio.
export const PACIENTES_PROVIDERS: Array<any> = [
  { provide: PacientesService, useClass: PacientesService }
];
