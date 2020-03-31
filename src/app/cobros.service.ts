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
import { Observable, of, Subject } from 'rxjs';
import { AutenticarService } from './autenticar.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
/*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      |          
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
|                         urlApi= url de la aplicación backend,         |
|                         autorizacion = contiene los métodos para saber|
|                                        si un usuario está conectado,  |
|           modalService = contiene los métodos para manipular modals.  |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 24/01/2020.                                                   |    
|----------------------------------------------------------------------*/

export class CobrosService {

  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService,
    private modalService: NgbModal) { }

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



  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroTiposCobros                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los tipos de cobros.                |      
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroTiposCobros(): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los tipos de cobros.
      return this.http.get(this.urlApi + 'filtro-tipos-cobros', { headers: headers });
    }
    //No está conectado.
    return of(false);

  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: verificarProductosInventario                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para verificar los productos           |
  |  del inventario.                                                      |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  productoId = identificador del producto,                             |
  |  cantidad   = cantidad del producto.                                  |       
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  verificarProductosInventario(productoId, cantidad): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + `verificar-productos-inventario/${productoId}/${cantidad}`, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaCobro.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un cobro.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  clinicaId = identificador de la clínica,                             | 
  |  total = total del cobro,                                             |                            
  |  observaciones = observaciones del cobro.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaCobro(
    clinicaId: string,
    tipoCobroId: string,
    productos: string,    
    observaciones: string,
    descuento: string,
    pacienteId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      clinicaId: clinicaId,
      tipoCobroId: tipoCobroId,
      productos: productos,
      observaciones: observaciones,
      descuento: descuento,
      pacienteId: pacienteId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-cobro',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaBitacoraCobro.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta la bitácora de un cobro.        | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro,                                   | 
  |  nombreEstadoCobro = nombre del estado del cobro.                     |                            
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaBitacoraCobro(
    cobroId: string,
    nombreEstadoCobro: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId,
      nombreEstadoCobro: nombreEstadoCobro
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-bitacora-cobro',
        json,
        { headers: headers });
  }*/

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetCobro.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para dar de alta en la bitácora de un  |
  |  cobro.                                                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro,                                   | 
  |  tipoCobroId = identificador del tipo de cobro,                       |
  |  total = total de la partida del cobro,                               |
  |  observaciones = observaciones de la partida.                         |                            
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaDetCobro(
    cobroId: string,
    tipoCobroId: string,
    total: string,
    observaciones: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId,
      tipoCobroId: tipoCobroId,
      total: total,
      observaciones: observaciones
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-det-cobro',
        json,
        { headers: headers });
  }*/

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaBitacoraDetCobro.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para dar de alta en el detalle de la   |
  |  bitácora de un cobro.                                                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  detCobroId = identificador del detalle del cobro,                    | 
  |  estatus = estatus del detalle del cobro.                             |                          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaBitacoraDetCobro(
    detCobroId: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      detCobroId: detCobroId,
      estatus: estatus
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-bitacora-det-cobro',
        json,
        { headers: headers });
  }*/

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaProductosCobro.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para dar de alta los productos         |
  |  en un cobro.                                                         |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro,                                   | 
  |  productoId = identificador del producto,                             |
  |  cantidad = cantidad del producto.                                    |                          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaProductosCobro(
    cobroId: string,
    productoId: string,
    cantidad: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId,
      productoId: productoId,
      cantidad: cantidad
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-productos-cobro',
        json,
        { headers: headers });
  }*/

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDescuentoCobro.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para dar de alta un descuento al cobro.|
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro,                                   | 
  |  descuento = descuento que se le dará al cobro.                       |                          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaDescuentoCobro(
    cobroId: string,
    descuento: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId,
      descuento: descuento
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-descuento-cobro',
        json,
        { headers: headers });
  }  */

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaPacienteCobro.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para dar de alta un paciente al cobro. |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro,                                   | 
  |  pacienteId = identificador del paciente.                             |                          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*altaPacienteCobro(
    cobroId: string,
    pacienteId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId,
      pacienteId: pacienteId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-paciente-cobro',
        json,
        { headers: headers });
  }  */

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarCobro.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para eliminar un cobro.                |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  cobroId = identificador del cobro.                                   |                          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  /*eliminarCobro(cobroId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      cobroId: cobroId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-cobro',
        json,
        { headers: headers });
  }    */

/*----------------------------------------------------------------------|
  |  NOMBRE: agregarCantidadProducto.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal para añadir la cantidad de un producto al |
  |  cobro.                                                               |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: clase  = clase u objeto que se abrirá,        |
  |  producto = producto al que se le establecerá la cantidad.            |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 19/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  agregarCantidadProducto(componente, producto): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño extra grande.
    modalOption.size = "sm";

    const modalRef = this.modalService.open(componente, modalOption);
    //Define el título del modal.
    modalRef.componentInstance.producto = producto;

    //Se retorna el botón pulsado.
    modalRef.result.then((producto) => {
      //Se retorna el producto seleccionado.
      producto ? subject.next(producto) : subject.next(null);
    },
      (reason) => {
        subject.next(null)
      });

    //Se retorna el observable.
    return subject.asObservable();
  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarAbono.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal para añadir un abono al cobro.            |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: clase  = clase u objeto que se abrirá,        |
  |  cobro = cobro al que se le agregará el abono.                        |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 31/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  agregarAbono(componente, cobro): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño extra grande.
    modalOption.size = "sm";

    const modalRef = this.modalService.open(componente, modalOption);
    
    modalRef.componentInstance.cobro = cobro;

    //Se retorna el botón pulsado.
    modalRef.result.then((cobro) => {
      //Se retorna el cobro seleccionado.
      cobro ? subject.next(cobro) : subject.next(null);
    },
      (reason) => {
        subject.next(null)
      });

    //Se retorna el observable.
    return subject.asObservable();
  }      

 /*----------------------------------------------------------------------|
  |  NOMBRE: verResumenCobro                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para ver el resumen y totales del cobro|  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  cobroId = identificador del cobro.                                   |     
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  verResumenCobro(cobroId): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + `ver-resumen-cobro/${cobroId}`, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: verHistorialCobrosReciboCobro.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para obtener el historial de cobros de |
  |  un cobro para el recibo de cobro.                                    |  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  cobroId = identificador del cobro.                                   |     
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  verHistorialCobrosReciboCobro(cobroId): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + `ver-historial-cobros-recibo-cobro/${cobroId}`, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }    

  /*----------------------------------------------------------------------|
  |  NOMBRE: verProductosReciboCobro.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que sirve para obtener los productos de un cobro.|  
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |  
  |  cobroId = identificador del cobro.                                   |     
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 22/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  verProductosReciboCobro(cobroId): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los registros.
      return this.http.get(this.urlApi + `ver-productos-recibo-cobro/${cobroId}`, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }      


}


//Constante que se utilizará para inyectar el servicio.
export const COBROS_PROVIDERS: Array<any> = [
  { provide: CobrosService, useClass: CobrosService }
];