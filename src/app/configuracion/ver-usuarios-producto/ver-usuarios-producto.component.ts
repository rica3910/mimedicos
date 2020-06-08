
/******************************************************************|
|NOMBRE: ver-usuarios-producto.                                    | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los usuarios de un producto. |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 15/05/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map, switchAll } from 'rxjs/operators';
import { UtilidadesService } from '../../utilidades.service';
import { EsperarService } from '../../esperar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-ver-usuarios-producto',
  templateUrl: './ver-usuarios-producto.component.html',
  styleUrls: ['./ver-usuarios-producto.component.css']
})
export class VerUsuariosProductoComponent implements OnInit {

  //Variable que almacena el identificador del producto, obtenido de la url.
  productoId: string;
  //Almacena los usuarios que no tienen el producto.
  usuariosSinProducto: JSON[] = [];
  //Almacena los usuarios que no tienen el producto de la base de datos original sin que se filtre su información.
  usuariosSinProductoServidor: JSON[] = [];
  //Almacena los usuarios que tienen el producto.
  usuariosConProducto: JSON[] = [];
  //Almacena los usuarios que tienen el producto de la base de datos original sin que se filtre su información.
  usuariosConProductoServidor: JSON[] = [];
  //Cuadro de texto de búsqueda de usuarios sin producto.
  @ViewChild('buscarUsuariosSinProductoHTML') buscarUsuariosSinProductoHTML: ElementRef;
  //Cuadro de texto de búsqueda de usuarios con producto.
  @ViewChild('buscarUsuariosConProductoHTML') buscarUsuariosConProductoHTML: ElementRef;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si la info del producto ya se cargó.
  productoListo: boolean = false;
  //Indica si los usuarios sin producto ya se cargaron.
  usuariosSinProductoListos: boolean = false;
  //Indica si los usuarios con producto ya se cargaron.
  usuariosConProductoListos: boolean = false;
  //Escucha cuando se ejecuta una búsqueda.
  busqueda$: Subject<Boolean> = new Subject<Boolean>();
  //Almacena el nombre de la clínica.
  nombreClinica: string = "";
  //Almacena el nombre del producto
  nombreProducto: string = "";
  //Almacena la descripción del producto.
  descripcion: string = "";
  //Almacenan los usuarios seleccionados que se van a asignar al producto.
  usuariosAsignar: Array<string> = new Array();
  //Almacenan los usuarios seleccionados que se van a desasignar al producto.
  usuariosDesasignar: Array<string> = new Array();

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  productosService = contiene los métodos de la bd de los productos,   |  
  |  rutaActual: Para obtener los parámetros de la url,                   |
  |  rutaNavegacion   = para navegar a otras url's.                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private productosService: ProductosService,
    private rutaActual: ActivatedRoute,
    private rutaNavegacion: Router) {

    //Obtiene el identificador del producto de la url.
    this.rutaActual.paramMap.subscribe(params => {
      //Se inicia la espera.
      this.esperarService.esperar();
      //Se obtiene el identificador del producto.
      this.productoId = params.get("id");
      //Se obtiene la info del producto.
      this.infoProducto();
      //Se buscan a los usuarios.
      this.buscar();
    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe(() => {

      //Si los usuarios y el producto están listos.
      if (this.usuariosSinProductoListos && this.usuariosConProductoListos && this.productoListo) {

        this.productoListo = false;
        this.usuariosSinProductoListos = false;
        this.usuariosConProductoListos = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();
      }


    });

    //Se utiliza para cuando se hace una búsqueda.
    this.busqueda$.subscribe(() => {

      //Si los dos filtros están listos.
      if (this.usuariosSinProductoListos && this.usuariosConProductoListos) {

        this.usuariosSinProductoListos = false;
        this.usuariosConProductoListos = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();
      }


    });

  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarUsuariosSinProductoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.usuariosSinProductoServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.usuariosSinProducto = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarUsuariosSinProductoHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarUsuariosSinProductoHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarUsuariosConProductoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.usuariosConProductoServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.usuariosConProducto = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarUsuariosConProductoHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarUsuariosConProductoHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoProducto.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: obtiene la información del producto.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoProducto() {

    //Busca las usuarios sin el producto.
    this.productosService.verProducto(
      this.productoId).subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          this.nombreClinica = respuesta["datos"][0]["nombre_clinica"];
          this.nombreProducto = respuesta["datos"][0]["nombre"];
          this.descripcion = respuesta["datos"][0]["descripcion"];
        }

        this.productoListo = true;
        this.cargaInicialLista$.next(this.productoListo);

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {

    //Busca las usuarios sin el producto.
    this.productosService.usuariosProducto(
      this.productoId,
      '0').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios sin producto.
          this.usuariosSinProducto = respuesta["datos"];
          this.usuariosSinProductoServidor = respuesta["datos"];

        }

        this.usuariosSinProductoListos = true;
        this.cargaInicialLista$.next(this.usuariosSinProductoListos);

      });

    //Busca las usuarios con el producto.
    this.productosService.usuariosProducto(
      this.productoId,
      '1').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios con producto.
          this.usuariosConProducto = respuesta["datos"];
          this.usuariosConProductoServidor = respuesta["datos"];

        }

        this.usuariosConProductoListos = true;
        this.cargaInicialLista$.next(this.usuariosConProductoListos);

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscarConEspera.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda pero con espera.                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscarConEspera() {

    this.esperarService.esperar();

    //Se vacían los usuarios a asignar y desasignar.
    this.usuariosAsignar = new Array();
    this.usuariosDesasignar = new Array();

    //Se limpian los cuadros de búsqueda.
    this.limpiarBusquedaUsuariosConProducto();
    this.limpiarBusquedaUsuariosSinProducto();

    //Busca las usuarios sin el producto.
    this.productosService.usuariosProducto(
      this.productoId,
      '0').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios sin producto.
          this.usuariosSinProducto = respuesta["datos"];
          this.usuariosSinProductoServidor = respuesta["datos"];

        }

        this.usuariosSinProductoListos = true;
        this.busqueda$.next(this.usuariosSinProductoListos);

      });

    //Busca las usuarios con el producto.
    this.productosService.usuariosProducto(
      this.productoId,
      '1').subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los usuarios con producto.
          this.usuariosConProducto= respuesta["datos"];
          this.usuariosConProductoServidor = respuesta["datos"];

        }

        this.usuariosConProductoListos = true;
        this.busqueda$.next(this.usuariosConProductoListos);

      });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarBusquedaUsuariosSinProducto.                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarBusquedaUsuariosSinProducto() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarUsuariosSinProductoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarUsuariosSinProductoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.usuariosSinProducto = this.usuariosSinProductoServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarUsuariosSinProductoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarBusquedaUsuariosConProducto.                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarBusquedaUsuariosConProducto() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarUsuariosConProductoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarUsuariosConProductoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.usuariosConProducto = this.usuariosConProductoServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarUsuariosConProductoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarUsuarioConProducto.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: se ejecuta cuando se selecciona un usuario con producto.|
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  seleccionado: indica si el checkbox está o no seleccionado.          |
  |  usuarioId = identificador del usuario seleccionado.                  |  
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarUsuarioConProducto(seleccionado: boolean, usuarioId: string) {
    //Si el usuario fue seleccionado.
    if (seleccionado) {
      //Se encuentra el índice del usuario.
      let indice = this.usuariosDesasignar.findIndex(elemento => elemento == usuarioId);
      //Si no encuentra el índice entonces sí lo mete al arreglo.
      indice < 0 ? this.usuariosDesasignar.push(usuarioId) : null;

    }
    //Si el usuario fue deseleccionado.
    else {
      //Se encuentra el índice del usuario.
      let indice = this.usuariosDesasignar.findIndex(elemento => elemento == usuarioId);
      //Se elmina el usuario del arreglo.
      indice >= 0 ? this.usuariosDesasignar.splice(indice, 1) : null;
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarUsuarioSinProducto.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: se ejecuta cuando se selecciona un usuario sin producto.|
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  seleccionado: indica si el checkbox está o no seleccionado.          |
  |  usuarioId = identificador del usuario seleccionado.                  |  
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarUsuarioSinProducto(seleccionado: boolean, usuarioId: string) {
    //Si el usuario fue seleccionado.
    if (seleccionado) {
      //Se encuentra el índice del usuario.
      let indice = this.usuariosAsignar.findIndex(elemento => elemento == usuarioId);
      //Si no encuentra el índice entonces sí lo mete al arreglo.
      indice < 0 ? this.usuariosAsignar.push(usuarioId) : null;

    }
    //Si el usuario fue deseleccionado.
    else {
      //Se encuentra el índice del usuario.
      let indice = this.usuariosAsignar.findIndex(elemento => elemento == usuarioId);
      //Se elmina el usuario del arreglo.
      indice >= 0 ? this.usuariosAsignar.splice(indice, 1) : null;
    }
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: desasignarProducto.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Desasigna el producto a los usuarios seleccionados.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  desasignarProducto() {

    if (this.usuariosDesasignar.length == 0) {
      this.utilidadesService.alerta("Sin usuarios seleccionados", "Favor de seleccionar por lo menos un usuario.");
      return;
    }

    //Se arma la lista de usuarios.
    let usuarios: string = "";

    //Se recorren los usuarios.
    this.usuariosDesasignar.forEach(usuario => {
      usuarios = usuarios + usuario + ",";
    });

    //Abre el modal.
    this.utilidadesService.confirmacion("Desasignar producto.", "¿Está seguro de desasignar el producto a los usuarios seleccionados?").subscribe(respuesta => {
      //Si acepta.
      if (respuesta == "Aceptar") {
        //Inicia la espera.
        this.esperarService.esperar();
        //Se desasigna el producto a los usuarios seleccionados.
        this.productosService.asignacionUsuariosProducto(this.productoId, usuarios, "0").subscribe(respuesta => {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Si hubo un error en la obtención de información.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);

          }
          //Si todo salió bien.
          else {

            //Se actualiza la búsqueda.
            this.buscarConEspera();

          }

        });

      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: asignarProducto.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Asigna el producto a los usuarios seleccionados.        |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  asignarProducto() {

    if (this.usuariosAsignar.length == 0) {
      this.utilidadesService.alerta("Sin usuarios seleccionados", "Favor de seleccionar por lo menos un usuario.");
      return;
    }

    //Se arma la lista de usuarios.
    let usuarios: string = "";

    //Se recorren los usuarios.
    this.usuariosAsignar.forEach(usuario => {
      usuarios = usuarios + usuario + ",";
    });

    //Abre el modal.
    this.utilidadesService.confirmacion("Asignar producto.", "¿Está seguro de asignar el producto a los usuarios seleccionados?").subscribe(respuesta => {
      //Si acepta.
      if (respuesta == "Aceptar") {
        //Inicia la espera.
        this.esperarService.esperar();
        //Se desasigna el producto a los usuarios seleccionados.
        this.productosService.asignacionUsuariosProducto(this.productoId, usuarios, "1").subscribe(respuesta => {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Si hubo un error en la obtención de información.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);

          }
          //Si todo salió bien.
          else {

            //Se actualiza la búsqueda.
            this.buscarConEspera();

          }

        });

      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de productos.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 15/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['configuracion', 'productos']);
  }



}
