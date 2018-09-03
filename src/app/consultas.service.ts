/******************************************************************|
|NOMBRE: Consultas.                                                | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|consultas.                                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 28/08/2018.                                                |
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
|  FECHA: 28/08/2018.                                                   |    
|----------------------------------------------------------------------*/
export class ConsultasService {

  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService) { }


  /*----------------------------------------------------------------------|
  |  NOMBRE: listaConsultas.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las consultas de los pacientes.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: organizacion = id. de la organización,        | 
  |  clinica = id. de la clínica,                                         |    
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
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/

  listaConsultas(
    organizacion: string,
    clinica: string,      
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

      //Envía la petición al servidor backend para obtener las consultas.
      return this.http.get(this.urlApi + `lista-consultas/${organizacion}/${clinica}/${desde}/${hasta}/${paciente}/${usuario}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: camposConsultaUsuario.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los campos para realizar, ver o     |
  |  editar una consulta del usuario logueado.                            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: alta = 1 = indica que se dará de alta una     |
  |  consulta, 0 = indica que se verá o editará la consulta.              | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  camposConsultaUsuario(
    alta: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información..
      return this.http.get(this.urlApi + `campos-consulta-usuario/${alta}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaConsulta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una consulta.                   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  pacienteId = identificador del paciente,                             | 
  |  clinicaId = identificador de la clínica,                             |                            
  |  usuarioAtencionId = identificador del usuario de atención.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaConsulta(
    pacienteId: string,
    clinicaId:string,
    usuarioAtencionId:string): Observable<any> {
   
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      pacienteId: pacienteId,
      clinicaId: clinicaId,      
      usuarioAtencionId: usuarioAtencionId
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
      .post(this.urlApi + 'alta-consulta',
        params,
        { headers: headers });
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetConsulta.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta el detalle de una consulta.     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           | 
  |  detUsuarioCampoExpedienteId = identificador del campo,               |                            
  |  valor = valor o contenido del campo,                                 |
  |  archivo = archivo seleccionado por el usuario.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetConsulta(
    consultaId: string,
    detUsuarioCampoExpedienteId:string,
    valor:string,
    archivo: string): Observable<any> {
   
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
      detUsuarioCampoExpedienteId: detUsuarioCampoExpedienteId,      
      valor: valor,
      archivo: archivo
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
      .post(this.urlApi + 'alta-det-consulta',
        params,
        { headers: headers });
  }  

}


//Constante que se utilizará para inyectar el servicio.
export const CONSULTAS_PROVIDERS: Array<any> = [
  { provide: ConsultasService, useClass: ConsultasService }
];
