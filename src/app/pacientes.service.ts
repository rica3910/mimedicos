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
import { AutenticarService } from './autenticar.service';
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
      imagen: imagen
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
      return this.http.get(this.urlApi + 'ver-paciente/' + pacienteId, { headers: headers })
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


  /*----------------------------------------------------------------------|
  |  NOMBRE: editarPaciente.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar a un paciente.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  pacienteid = identificador del paciente,                             |
  |  nombres = nombres del paciente,                                      | 
  |  apellidoPaterno = apellido paterno del paciente,                     |
  |  apellidoMaterno = apellido materno del paciente,                     |
  |  email = email del paciente,                                          |
  |  telefono = teléfono fijo del paciente,                               |
  |  celular = celular del paciente,                                      |
  |  imagen = archivo de la imagen,                                       |
  |  estatus = estatus del paciente.                                      |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarPaciente(
    pacienteId: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    email: string,
    telefono: string,
    celular: string,
    imagen: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      pacienteId: pacienteId,
      nombres: nombres,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      email: email,
      telefono: telefono,
      celular: celular,
      imagen: imagen,
      estatus: estatus
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
      .post(this.urlApi + 'editar-paciente',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarPaciente.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar a un paciente.                     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  pacienteid = identificador del paciente.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarPaciente(
    pacienteId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      pacienteId: pacienteId
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
      .post(this.urlApi + 'eliminar-paciente',
        params,
        { headers: headers });
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: desAsignarPaciente.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desasignar a un paciente del usuario.       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  pacienteid = identificador del paciente.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/07/2018.                                                   |    
  |----------------------------------------------------------------------*/
  desAsignarPaciente(
    pacienteId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      pacienteId: pacienteId
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
      .post(this.urlApi + 'desasignar-paciente',
        params,
        { headers: headers });
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroPacientes.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los pacientes activos del usuario   |
  |  logueado.                                                            |
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
  |  FECHA: 03/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroPacientes(estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los pacientes.
      return this.http.get(this.urlApi + 'filtro-pacientes/' + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: listaFichasClinicasPaciente.                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN:  Método que sirve para obtener las fichas clínicas      |
  |                de un paciente dado.                                   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: pacienteId = identificador del paciente.      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/03/2019.                                                   |    
  |----------------------------------------------------------------------*/
  listaFichasClinicasPaciente(pacienteId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });
      
      //Envía la petición al servidor backend para obtener la ficha clínica del paciente.
      return this.http.get(this.urlApi + 'lista-fichas-clinicas-paciente/' + pacienteId, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaFichaClinicaPaciente.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una ficha clínica.              | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  clinicaId = identificador de la clínica,                             |
  |  pacienteId = identificador del paciente,                             |
  |  usuarioId = identificador del  usuario,                              |
  |  formularioId = identificador del formulario.                         |                            
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/04/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaFichaClinicaPaciente(
    clinicaId: string,
    pacienteId: string,
    usuarioId: string,
    formularioId: string
    ): Observable<any> {
   
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      clinicaId: clinicaId,
      pacienteId: pacienteId,
      usuarioId: usuarioId,
      formularioId: formularioId
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
      .post(this.urlApi + 'alta-ficha-clinica-paciente',
        params,
        { headers: headers });
  }     

  /*----------------------------------------------------------------------|
  |  NOMBRE: camposFichaClinica.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los campos para realizar, ver o     |
  |  editar una ficha clínica de un paciente.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  fichaClinicaId = identificador de la ficha clínica.                  |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  camposFichaClinica(
    fichaClinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información..
      return this.http.get(this.urlApi + `campos-ficha-clinica/${fichaClinicaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoFormularioFichaClinica.                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la info de un formulario de un      |
  |   ficha clínica dada.                                                 |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: fichaClinicaId = id. de la ficha clínica.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2019.                                                   |    
  |----------------------------------------------------------------------*/

  infoFormularioFichaClinica(
    fichaClinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información.
      return this.http.get(this.urlApi + `info-formulario-ficha-clinica/${fichaClinicaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }  

    /*----------------------------------------------------------------------|
  |  NOMBRE: informacionFichaClinica.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la información de la ficha clínica. |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  fichaClinicaId = identificador de la ficha clínica.                  |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  informacionFichaClinica(
    fichaClinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información..
      return this.http.get(this.urlApi + `informacion-ficha-clinica/${fichaClinicaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }  


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetFichaClinica.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta el detalle de una ficha clínica.| 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  fichaClinicaId = identificador de la ficha clínica,                  | 
  |  detCampoFormularioId = identificador del campo,                      |                            
  |  valor = valor o contenido del campo,                                 |
  |  archivo = archivo seleccionado por el usuario.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetFichaClinica(
    fichaClinicaId: string,
    detCampoFormularioId:string,
    valor:string,
    archivo: string): Observable<any> {
   
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      fichaClinicaId: fichaClinicaId,
      detCampoFormularioId: detCampoFormularioId,      
      valor: valor,
      archivo: archivo
    });
    
    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });    

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-det-ficha-clinica',
      json,
        { headers: headers });
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarFichaClinica.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una ficha clínica.                 | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  fichaClinicaId = identificador de la ficha clínica.                  |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 10/05/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarFichaClinica(fichaClinicaId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({      
      fichaClinicaId: fichaClinicaId
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
      .post(this.urlApi + 'eliminar-ficha-clinica',
        params,
        { headers: headers });
  }    
  
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: editarFichaClinicaPaciente.                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar una ficha clínica.                   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  fichaClinicaId = identificador de la ficha clínica.                  |
  |  clinicaId = identificador de la clínica,                             |
  |  usuarioId = identificador del  usuario,                              |                              
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  editarFichaClinicaPaciente(
    fichaClinicaId: string,
    clinicaId: string,    
    usuarioId: string    
    ): Observable<any> {
   
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      fichaClinicaId: fichaClinicaId,
      clinicaId: clinicaId,      
      usuarioId: usuarioId      
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
      .post(this.urlApi + 'editar-ficha-clinica-paciente',
        params,
        { headers: headers });
  }      
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: verFichaClinica.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver la información de la ficha clínica.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  fichaClinicaId = identificador de la ficha clínica.                  |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/07/2019.                                                   |    
  |----------------------------------------------------------------------*/
  verFichaClinica(fichaClinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información de la ficha clínica.
      return this.http.get(this.urlApi + 'ver-ficha-clinica/' + fichaClinicaId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }  


}


//Constante que se utilizará para inyectar el servicio.
export const PACIENTES_PROVIDERS: Array<any> = [
  { provide: PacientesService, useClass: PacientesService }
];
