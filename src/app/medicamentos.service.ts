/******************************************************************|
|NOMBRE: Medicamentos.                                             | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|medicamentos.                                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/06/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/


import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutenticarService } from './autenticar.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
  |                         urlApi= url de la aplicación backend,         |
  |                         autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado.  |
  |   modalService = contiene los métodos para manipular modals.          |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private http: HttpClient,
    @Inject('URL_API_BACKEND') private urlApi: string,
    private autorizacion: AutenticarService,
    private modalService: NgbModal) { }

  /*----------------------------------------------------------------------|
  |  NOMBRE: denominacionesGenericasGlobales.                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener las denominaciones genericas.       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  filtro =  filtro de búsqueda,                                        |  
  |  numeroRegistro = Obtendrá los registros a partir de este número,     |
  |  estatus = estatus del medicamento genérico.                          | 
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
  denominacionesGenericasGlobales(filtro: string, numeroRegistro: string, estatus: string = "ACTIVO"): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      return this.http.get(this.urlApi + 'denominaciones-genericas-globales/' + (filtro.length == 0 ? " " : filtro) + "/" + numeroRegistro + "/" + estatus, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDenominacionGenericaGlobal.                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta un ingrediente activo.          | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  nombre = nombre del ingrediente activo.                              |                         
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaDenominacionGenericaGlobal(
    nombre: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      nombre: nombre
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-denominacion-generica-global',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDenominacionGenericaModal                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal para añadir un ingrediente activo.        |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: clase  = clase u objeto que se abrirá,        |
  |  denominacionGenerica = objeto o registro del ingrediente activo.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaDenominacionGenericaModal(componente, denominacionGenerica): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño chico.
    modalOption.size = "lg";

    const modalRef = this.modalService.open(componente, modalOption);
    modalRef.componentInstance.denominacionGenerica = denominacionGenerica;

    //Se retorna el botón pulsado.
    modalRef.result.then((respuesta) => {
      //Se retorna el producto seleccionado.
      respuesta ? subject.next(respuesta) : subject.next(null);
    },
      (reason) => {
        subject.next(null)
      });

    //Se retorna el observable.
    return subject.asObservable();
  }

/*----------------------------------------------------------------------|
  |  NOMBRE: editarDenominacionGenericaGlobal.                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para editar un ingrediente activo.               | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  id = identificador del ingrediente activo,                           |
  |  nombre = nombre del ingrediente activo,                              |
  |  estatus = estatus del ingrediente activo.                            |                         
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  editarDenominacionGenericaGlobal(
    id: string,
    nombre: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      id: id,
      nombre: nombre,
      estatus: estatus
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'editar-denominacion-generica-global',
        json,
        { headers: headers });
  }  

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarDenominacionGenericaGlobal.                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un ingrediente activo.             | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  id = identificador del ingrediente activo.                           |                        
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/06/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarDenominacionGenericaGlobal(
    id: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      id: id
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-denominacion-generica-global',
        json,
        { headers: headers });
  }  


}

//Constante que se utilizará para inyectar el servicio.
export const MEDICAMENTOS_PROVIDERS: Array<any> = [
  { provide: MedicamentosService, useClass: MedicamentosService }
];