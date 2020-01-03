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
  |  usuario = id. del usuario,                                           |
  |  estadoConsulta = id. del estado de la consulta.                      |
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
    usuario: string,
    estadoConsulta: string,
    tipoConsulta: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener las consultas.
      return this.http.get(this.urlApi + `lista-consultas/${organizacion}/${clinica}/${desde}/${hasta}/${paciente}/${usuario}/${estadoConsulta}/${tipoConsulta}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: camposFormulario.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los campos para realizar, ver o     |
  |  editar una consulta del usuario logueado.                            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  diagnosticoId = identificador del diagnóstico.                       |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  camposFormulario(
    diagnosticoId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información..
      return this.http.get(this.urlApi + `campos-formulario/${diagnosticoId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: informacionDiagnostico.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la información del diagnóstico.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  diagnosticoId = identificador del diagnóstico.                       |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  informacionDiagnostico(
    diagnosticoId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información..
      return this.http.get(this.urlApi + `informacion-diagnostico/${diagnosticoId}`, { headers: headers });

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
  |  fecha = fecha de la consulta,                                        |
  |  horaInicio = hora a la que comienza la consulta,                     |
  |  horaFin = hora de finalización de la consulta,                       |
  |  usuarioAtencionId = identificador del usuario de atención,           |
  |  pacienteId = identificador del paciente,                             | 
  |  clinicaId = identificador de la clínica,                             |
  |  tipoConsultaId = identificador del tipo de consulta.                 |                              
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaConsulta(
    fecha: string,
    horaInicio: string,
    horaFin: string,
    usuarioAtencionId: string,
    pacienteId: string,
    clinicaId: string,
    tipoConsultaId: string
  ): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      fecha: fecha,
      horaInicio: horaInicio,
      horaFin: horaFin,
      usuarioAtencionId: usuarioAtencionId,
      pacienteId: pacienteId,
      clinicaId: clinicaId,
      tipoConsultaId: tipoConsultaId
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
  |  NOMBRE: editarConsulta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar una consulta.                        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           |
  |  fecha = fecha de la consulta,                                        |
  |  horaInicio = hora a la que comienza la consulta,                     |
  |  horaFin = hora de finalización de la consulta,                       |
  |  usuarioAtencionId = identificador del usuario de atención,           |
  |  pacienteId = identificador del paciente,                             | 
  |  clinicaId = identificador de la clínica,                             |
  |  tipoConsultaId = identificador del tipo de consulta.                 |                              
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 30/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarConsulta(
    consultaId: string,
    fecha: string,
    horaInicio: string,
    horaFin: string,
    usuarioAtencionId: string,
    pacienteId: string,
    clinicaId: string,
    tipoConsultaId: string
  ): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
      fecha: fecha,
      horaInicio: horaInicio,
      horaFin: horaFin,
      usuarioAtencionId: usuarioAtencionId,
      pacienteId: pacienteId,
      clinicaId: clinicaId,
      tipoConsultaId: tipoConsultaId
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
      .post(this.urlApi + 'editar-consulta',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cancelarConsulta.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cancelar una consulta.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           |
  |  nombreEstadoConsulta = nombre del estado de la consulta.            |                           
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarEstadoConsulta(
    consultaId: string,
    nombreEstadoConsulta: string
  ): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
      nombreEstadoConsulta: nombreEstadoConsulta
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
      .post(this.urlApi + 'cambiar-estado-consulta',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaConsultaEstudio.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un estudio en una consulta.     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           |
  |  deProductoId = identificador del producto.                           |                           
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 01/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaConsultaEstudio(
    consultaId: string,
    detProductoId: string
  ): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
      detProductoId: detProductoId
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
      .post(this.urlApi + 'alta-consulta-estudio',
        params,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioConsultaFechaOcupada.                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Sirve para ver el número de consultas que tiene         |
  | el usuario de atención en una fecha y horas dadas.                    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta (en caso de edición).      | 
  |  usuarioAtencionId = id. del usuario de atención de consultas,        |
  |  fecha = fecha y hora de la consulta,                                 |
  |  horaInicio = hora inicial de la consulta,                            |
  |  horaFin = hora de finalización de la consulta.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/10/2018.                                                   |    
  |----------------------------------------------------------------------*/

  usuarioConsultaFechaOcupada(
    consultaId: string,
    usuarioAtencionId: string,
    fecha: string,
    horaInicio: string,
    horaFin: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener el número de con sultas.
      return this.http.get(this.urlApi + `usuario-consulta-fecha-ocupada/${consultaId}/${usuarioAtencionId}/${fecha}/${horaInicio}/${horaFin}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetDiagnostico.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta el detalle de un diagnóstico.   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  diagnosticoId = identificador del diagnóstico,                       | 
  |  detCampoFormularioId = identificador del campo,                      |                            
  |  valor = valor o contenido del campo,                                 |
  |  archivo = archivo seleccionado por el usuario.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetDiagnostico(
    diagnosticoId: string,
    detCampoFormularioId: string,
    valor: string,
    archivo: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      diagnosticoId: diagnosticoId,
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
      .post(this.urlApi + 'alta-det-diagnostico',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarConsulta.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una consulta.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  consultaId = identificador de la consulta.                           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarConsulta(consultaId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId
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
      .post(this.urlApi + 'eliminar-consulta',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroEstadosConsultas.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los estados de las consultas        |
  |  activos del usuario logueado.                                        |
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
  |  FECHA: 23/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroEstadosConsultas(estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los estados de las consultas.
      return this.http.get(this.urlApi + 'filtro-estados-consultas/' + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroTiposConsultas.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los tipos de consultas              |
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
  |  FECHA: 24/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  filtroTiposConsultas(estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los estados de las consultas.
      return this.http.get(this.urlApi + 'filtro-tipos-consultas/' + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verConsulta.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver la información de la consulta.          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  consultaId = identificador de la consulta.                           |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  verConsulta(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información de la consulta.
      return this.http.get(this.urlApi + 'ver-consulta/' + consultaId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verEstudiosConsulta.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver los estudios de una consulta.           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  consultaId = identificador de la consulta.                           |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  verEstudiosConsulta(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información de la consulta.
      return this.http.get(this.urlApi + 'ver-estudios-consulta/' + consultaId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarEstudiosConsulta.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar los estudios de una consulta.      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  consultaId = identificador de la consulta.                           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarEstudiosConsulta(consultaId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId
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
      .post(this.urlApi + 'eliminar-estudios-consulta',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaDiagnosticos.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los diagnósticos de una consulta.   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/

  listaDiagnosticos(
    consulta: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener las consultas.
      return this.http.get(this.urlApi + `lista-diagnosticos/${consulta}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDiagnostico.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un diagnóstico a la consulta.   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           |
  |  formularioId = identificador del formulario.                         |                            
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDiagnostico(
    consultaId: string,
    formularioId: string
  ): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
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
      .post(this.urlApi + 'alta-diagnostico',
        params,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarDiagnostico.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un diagnóstico.                    | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  diagnosticoId = identificador del diagnóstico.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarDiagnostico(diagnosticoId: string): Observable<any> {
    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      diagnosticoId: diagnosticoId
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
      .post(this.urlApi + 'eliminar-diagnostico',
        params,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: infoFormularioDiagnostico.                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la info de un formulario de un      |
  |   diagnóstico dado.                                                   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: diagnosticoId = identificador del diagnóstico.|
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/11/2018.                                                   |    
  |----------------------------------------------------------------------*/

  infoFormularioDiagnostico(
    diagnosticoId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la información.
      return this.http.get(this.urlApi + `info-formulario-diagnostico/${diagnosticoId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaRecetas.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las recetas de una consulta.        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/

  listaRecetas(consultaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener las recetas.
      return this.http.get(this.urlApi + `lista-recetas/${consultaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaMedicamentosUsuario.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener medicamentos del usuario logueado.  |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  listaMedicamentosUsuario(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los medicamentos del usuario logueado.
      return this.http.get(this.urlApi + `lista-medicamentos-usuario`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: unidadesTiempo.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las unidades de tiempo.             |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: estatus = ACTIVO o INACTIVO.                  |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  unidadesTiempo(estatus): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los medicamentos del usuario logueado.
      return this.http.get(this.urlApi + `unidades-tiempo/${estatus}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: imagenMedicamento.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para la imagen de un medicamento.                |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: medicamentoId = ACTIVO o INACTIVO.            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o  ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  imagenMedicamento(medicamentoId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener la imagen del  medicamento específicado.
      return this.http.get(this.urlApi + `imagen-medicamento/${medicamentoId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaReceta.                                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta una receta.                     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  consultaId = identificador de la consulta,                           | 
  |  referencias = referencias para identificar a la receta.              |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaReceta(
    consultaId: string,
    referencias: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      consultaId: consultaId,
      referencias: referencias
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-receta',
        json,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetReceta.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta el detalle de una receta.       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  recetaId = identificador de la receta,                               | 
  |  denominacionDistintivaId = identificador del medicamento,            |
  |  dosis = dosis del medicamento,                                       |
  |  frecuencia = frecuencia del medicamento,                             |
  |  frecuenciaUnidadTiempoId = identificador de la unidad de tiempo de la| 
  |  frecuencia,                                                          |
  |  duracion = duración del tratamiento,                                 |
  |  duracionUnidadTiempoId = identificador de la unidad de tiempo de la  |
  |  duración,                                                            |
  |  indicacionesUso = indicaciones de uso del medicamento.               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetReceta(
    recetaId: string,
    denominacionDistintivaId: string,
    dosis: string,
    frecuencia: string,
    frecuenciaUnidadTiempoId: string,
    duracion: string,
    duracionUnidadTiempoId: string,
    indicacionesUso: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      recetaId: recetaId,
      denominacionDistintivaId: denominacionDistintivaId,
      dosis: dosis,
      frecuencia: frecuencia,
      frecuenciaUnidadTiempoId: frecuenciaUnidadTiempoId,
      duracion: duracion,
      duracionUnidadTiempoId: duracionUnidadTiempoId,
      indicacionesUso: indicacionesUso
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-det-receta',
        json,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: verReceta.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver una receta.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: recetaId = identificador de la receta.        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 21/10/2019.                                                   |    
  |----------------------------------------------------------------------*/

  verReceta(recetaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener una receta.
      return this.http.get(this.urlApi + `ver-receta/${recetaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

   /*----------------------------------------------------------------------|
   |  NOMBRE: verMedicamentoSeleccionado.                                  |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para ver un medicamento seleccionado.            |    
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE ENTRADA: detRecetaId = identificador del medicamento.  |   
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
   |                          o ERROR                                      |
   |                         en caso de que todo esté correcto o no        | 
   |                         respectivamente.                              |
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 23/10/2019.                                                   |    
   |----------------------------------------------------------------------*/
  verMedicamentoSeleccionado(detRecetaId): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los medicamentos del usuario logueado.
      return this.http.get(this.urlApi + `ver-medicamento-seleccionado/${detRecetaId}`, { headers: headers });

    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarMedicamentosReceta.                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar los medicamentos de una receta.    | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  recetaId = identificador de la receta.                               | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/11/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarMedicamentosReceta(
    recetaId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      recetaId: recetaId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-medicamentos-receta',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarReceta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar una receta.                          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  recetaId = identificador de la receta,                               |
  |  referencias = referencias de la receta,                              |
  |  estatus = estatus de la receta.                                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/11/2019.                                                   |    
  |----------------------------------------------------------------------*/
  editarReceta(
    recetaId: string,
    referencias: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      recetaId: recetaId,
      referencias: referencias,
      estatus: estatus
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'editar-receta',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarReceta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una receta.                        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  recetaId = identificador de la receta.                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/11/2019.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarReceta(
    recetaId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      recetaId: recetaId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-receta',
        json,
        { headers: headers });
  }  
}


//Constante que se utilizará para inyectar el servicio.
export const CONSULTAS_PROVIDERS: Array<any> = [
  { provide: ConsultasService, useClass: ConsultasService }
];
