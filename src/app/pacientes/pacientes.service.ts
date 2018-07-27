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
import { Observable, of } from 'rxjs';
import { AutenticarService } from '../autenticar.service';
import { map } from "rxjs/operators";

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
  |                                        si un usuario está conectado   |
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
        .pipe(map(respuesta => {
          //Si todo salió bien.
          if (respuesta["estado"] === "OK") {
            //Se almacenan los pacientes en el arreglo.
            this.pacientes = respuesta["datos"];
          }

          return respuesta;
        }));
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaPaciente.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un paciente.                    | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  nombres = nombres del paciente,                                      | 
  |  apellidoPaterno = apellido paterno del paciente,                     |
  |  apellidoMaterno = apellido materno del paciente,                     |
  |  email = email del paciente,                                          |
  |  telefono = teléfono fijo del paciente,                               |
  |  celular = celular del paciente,                                      |
  |  imagen = archivo de la imagen.                                       |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 23/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaPaciente(nombres: string, 
              apellidoPaterno: string, 
              apellidoMaterno: string, 
              email: string,
              telefono: string,
              celular: string,
              imagen: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({      
      nombres: nombres,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      email: email,
      telefono: telefono,
      celular: celular,
      imagen:imagen
    });

    //Le concatena la palabra "json=" al json armado.
    const params = "json=" + json;

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
   
    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-paciente',
        params,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: verPaciente.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver un paciente en específico.              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pPacienteId= identificador del paciente.      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y  el paciente         |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/07/2018.                                                   |    
  |----------------------------------------------------------------------*/

  verPaciente(pacienteId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los pacientes.
      return this.http.get(this.urlApi + 'ver-paciente/' + pacienteId, { headers: headers})
        .pipe(map(respuesta => {
          //Si todo salió bien.
          if (respuesta["estado"] === "OK") {
            //Se almacenan el paciente en el arreglo.
            this.pacientes = respuesta["datos"];
          }

          return respuesta;
        }));
    }
    //No está conectado.
    return of(false);

  }


}

//Constante que se utilizará para inyectar el servicio.
export const PACIENTES_PROVIDERS: Array<any> = [
  { provide: PacientesService, useClass: PacientesService }
];
