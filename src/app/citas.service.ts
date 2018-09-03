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

      //Envía la petición al servidor backend para obtener las citas.
      return this.http.get(this.urlApi + `lista-citas/${organizacion}/${clinica}/${estatus}/${actividad}/${desde}/${hasta}/${paciente}/${usuario}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarCita.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una cita.                          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  citaId = identificador de la cita.                                   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarCita(citaId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({      
      citaId: citaId
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
      .post(this.urlApi + 'eliminar-cita',
        params,
        { headers: headers });
  }    



  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioCitaFechaOcupada.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Sirve para ver el número de citas que tiene el usuario  |
  |  de atención en una fecha y hora dada.                                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               | 
  |  usuarioAtencionId = id. del usuario de atención de citas,            |
  |  fechaHora = fecha y hora de la cita.
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

  usuarioCitaFechaOcupada(
    usuarioAtencionId: string,
    fechaHora: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener el número de citas.
      return this.http.get(this.urlApi + `usuario-cita-fecha-ocupada/${usuarioAtencionId}/${fechaHora}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaCita.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una cita.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  usuarioAtencionId = identificador del paciente,                      |
  |  pacienteId = identificador del paciente,                             | 
  |  clinicaId = identificador de la clínica,                             |                            
  |  fechaHora = fecha y hora de la cita,                                 |   
  |  estadoCitaId = identificador del estado de la cita.                  |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaCita(
    usuarioAtencionId: string,
    pacienteId: string,
    clinicaId:string,
    fechaHora:string,
    estadoCitaId:string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      usuarioAtencionId: usuarioAtencionId,
      pacienteId: pacienteId,
      clinicaId: clinicaId,
      fechaHora: fechaHora,
      estadoCitaId: estadoCitaId
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
      .post(this.urlApi + 'alta-cita',
        params,
        { headers: headers });
  }    


  
  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarEstatusCita.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cambiar el estatus de la cita.              | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  citaId = identificador de la cita,                                   |
  |  estatus = estatus de la cita (ABIERTO o CERRADO).                    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 16/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarEstatusCita(citaId: string, estatus: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({      
      citaId: citaId,
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
      .post(this.urlApi + 'cambiar-estatus-cita',
        params,
        { headers: headers });
  }
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: verCita.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver una cita en específico.                 |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: citaId = id. de la cita,                      | 
  |  soloVer = Se utiliza para cuando solo se quiere ver la cita.         |
  |  Es decir, sin modificar. 0 = modificar, 1 = solo ver.                |
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

  verCita(
    citaId: string,
    soloVer: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener las cita.
      return this.http.get(this.urlApi + `ver-cita/${citaId}/${soloVer}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }
  
  /*----------------------------------------------------------------------|
  |  NOMBRE: editarCita.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar una cita.                            | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  citaId = identificador de la cita,                                   |
  |  usuarioAtencionId = identificador del paciente,                      |
  |  pacienteId = identificador de la cita,                               | 
  |  clinicaId = identificador de la clínica.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarCita(
    citaId: string,
    usuarioAtencionId: string,
    pacienteId: string,
    clinicaId:string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      citaId: citaId,
      usuarioAtencionId: usuarioAtencionId,
      pacienteId: pacienteId,
      clinicaId: clinicaId
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
      .post(this.urlApi + 'editar-cita',
        params,
        { headers: headers });
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaDetCitas.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver los eventos o detalle de una cita.      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: citaId = id. de la cita,                      | 
  |  soloVer = Se utiliza para cuando solo se quiere ver la cita.         |
  |  Es decir, sin modificar. 0 = modificar, 1 = solo ver.                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/

  listaDetCitas(
    citaId: string,
    soloVer: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener las cita.
      return this.http.get(this.urlApi + `lista-det-citas/${citaId}/${soloVer}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarDetCita.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar el detalle de una cita.            | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  detCitaId = identificador del detalle de una cita.                   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarDetCita(detCitaId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({      
      detCitaId: detCitaId
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
      .post(this.urlApi + 'eliminar-det-cita',
        params,
        { headers: headers });
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetCita.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un evento o detalle de una cita.| 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  citaId = identificador de la cita,                                   |
  |  estadoCitaId = identificador del estado de la cita,                  |
  |  fechaHora = fecha y hora de la cita,                                 | 
  |  comentarios = comentarios del evento.                                |                            
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetCita(
    citaId: string,
    estadoCitaId: string,
    fechaHora:string,
    comentarios:string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      citaId: citaId,
      estadoCitaId: estadoCitaId,
      fechaHora: fechaHora,
      comentarios: comentarios      
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
      .post(this.urlApi + 'alta-det-cita',
        params,
        { headers: headers });
  }    



}

//Constante que se utilizará para inyectar el servicio.
export const CITAS_PROVIDERS: Array<any> = [
  { provide: CitasService, useClass: CitasService }
];
