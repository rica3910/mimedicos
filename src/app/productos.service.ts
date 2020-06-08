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
  |  NOMBRE: filtroProductos.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener productos                           |
  |  activos del usuario logueado y del usuario dado como parámetro.      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  usuarioId = id. del usuario al que se buscarán los productos.        |  
  |  estatus = indica el estatus de los registros: ACTIVO o INACTIVO,     |
  |  clinicaId = identificador de la clínica.                             |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroProductos(usuarioId: string, estatus: string = "ACTIVO", clinicaId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los productos.
      return this.http.get(this.urlApi + 'filtro-productos/' + usuarioId + "/" + estatus + "/" + clinicaId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
   |  NOMBRE: altaProducto.                                                |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para dar de alta un producto.                    | 
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE ENTRADA:                                               |
   |  clinicaId = identificador de la clínica,                             |
   |  nombre = nombre del producto,                                        |
   |  descripcion = descripción del producto,                              | 
   |  precioBruto = precio bruto del producto.                             |
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 07/05/2020.                                                   |    
   |----------------------------------------------------------------------*/
  altaProducto(
    clinicaId: string,
    nombre: string,
    descripcion: string,
    precioBruto: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      clinicaId: clinicaId,
      nombre: nombre,
      descripcion: descripcion,
      precioBruto: precioBruto
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'alta-producto',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: modificarProducto.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para modificar un producto.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto,                             |
  |  clinicaId = identificador de la clínica,                             |
  |  nombre = nombre del producto,                                        |
  |  descripcion = descripción del producto,                              | 
  |  precioBruto = precio bruto del producto,                             |
  |  estatus = estatus del producto.                                      |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 08/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  modificarProducto(
    productoId: string,
    clinicaId: string,
    nombre: string,
    descripcion: string,
    precioBruto: string,
    estatus: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      productoId: productoId,
      clinicaId: clinicaId,
      nombre: nombre,
      descripcion: descripcion,
      precioBruto: precioBruto,
      estatus: estatus
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'modificar-producto',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verProducto.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener un producto en específico.          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto.                             |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 08/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  verProducto(productoId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener el producto.
      return this.http.get(this.urlApi + 'ver-producto/' + productoId, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: desasignarProducto.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desasignar un producto.                     | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  desasignarProducto(
    productoId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      productoId: productoId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'desasignar-producto',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarProducto.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un producto.                       | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarProducto(
    productoId: string): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      productoId: productoId
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'eliminar-producto',
        json,
        { headers: headers });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: usuariosProducto.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: obtiene los usuarios que tienen o no un producto.       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto,                             |
  |  conProducto = 1 usuarios con producto, 0 usuarios sin producto.      |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  usuariosProducto(productoId: string, conProducto: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los usuarios.
      return this.http.get(this.urlApi + 'usuarios-producto/' + productoId + '/' + conProducto, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: asignacionUsuariosProducto.                                  |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: asigna o desasigna un producto a una lista de usuarios. | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto,                             |
  |  usuarios = lista de usuarios,                                        |
  |  asignarProducto = 1 asignar, 0 desasignar.                           |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  asignacionUsuariosProducto(
    productoId: string,
    usuarios: string,
    asignarProducto): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      productoId: productoId,
      usuarios: usuarios,
      asignarProducto: asignarProducto
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'asignacion-usuarios-producto',
        json,
        { headers: headers });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: inventarioProducto.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: obtiene el inventario e historial de un producto.       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |pToken = token del sistema,                                            |
  |pProductoId = identificador del producto,                              |
  |pFechaDesde = Fecha inicial de la búsqueda,                            |
  |pFechaHasta = Fecha final de la búsqueda,                              |
  |pNumeroRegistro =Obtiene los registros restantes a partir de este num, |
  |pTipo = ENTRADA, SALIDA,                                               |
  |pUsuarioId = identificador del usuario a buscar.                       |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
  |                          o ERROR                                      |
  |                         en caso de que todo esté correcto o no        | 
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  inventarioProducto(productoId: string, 
                     fechaDesde: string, 
                     fechaHasta: string,
                     numeroRegistro: string, 
                     tipo: string, 
                     usuarioId: string): Observable<any> {

    //Si está conectado, entonces el token sí existe.
    if (this.autorizacion.obtenerToken() !== null) {

      //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
      const headers: HttpHeaders = new HttpHeaders({
        'X-API-KEY': this.autorizacion.obtenerToken()
      });

      //Envía la petición al servidor backend para obtener los usuarios.
      return this.http.get(this.urlApi + `inventario-producto/${productoId}/${fechaDesde}/${fechaHasta}/${numeroRegistro}/${tipo}/${usuarioId}`, { headers: headers });
    }
    //No está conectado.
    return of(false);

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: actualizarInventarioProducto.                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: actualiza el inventario de un producto.                 | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  productoId = identificador del producto,                             |
  |  cantidad = cantidad de producto.                                     |
  |  tipo = ENTRADA o SALIDA.                                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  actualizarInventarioProducto(
    productoId: string,
    cantidad: string,
    tipo): Observable<any> {

    //Arma el json a partir de los parámetros.
    let json = JSON.stringify({
      productoId: productoId,
      cantidad: cantidad,
      tipo: tipo
    });

    //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY': this.autorizacion.obtenerToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //Realiza la petición al servidor.
    return this.http
      .post(this.urlApi + 'actualizar-inventario-producto',
        json,
        { headers: headers });
  }


}

//Constante que se utilizará para inyectar el servicio.
export const PRODUCTOS_PROVIDERS: Array<any> = [
  { provide: ProductosService, useClass: ProductosService }
];
