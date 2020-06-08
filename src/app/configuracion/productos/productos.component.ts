/******************************************************************|
|NOMBRE: productosComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los productos.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 07/05/2020.                                                |
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
import { AutenticarService } from '../../autenticar.service';
import { OrganizacionesService } from '../../organizaciones.service';
import { ClinicasService } from '../../clinicas.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from './../../productos.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //Propiedad que indica si el usuario puede dar de alta productos.
  altaProductos: boolean = false;
  //Propiedad que indica si el usuario puede editar productos.
  editarProductos: boolean = false;
  //Propiedad que indica si el usuario puede eliminar productos.
  eliminarProductos: boolean = false;
  //Propiedad que indica si el usuario puede desasignarse productos.
  desasignarProductos: boolean = false;
  //Registros de organizaciones que se verán en la vista en el campo de búsqueda de organizaciones.
  organizaciones: Array<JSON>;
  //Registros de clínicas que se verán en la vista en el campo de búsqueda de clínicas.
  clinicas: Array<JSON>;
  //Objeto que contendrá el formulario de búsqueda de los productos.
  formBusquedaProductos: FormGroup;
  //Objeto del formulario que contendrá a la organización.
  organizacionControl: AbstractControl;
  //Objeto del formulario que contendrá a la clínica.
  clinicaControl: AbstractControl;
  //Objeto del formulario que contendrá al estatus del producto.
  estatusProductoControl: AbstractControl;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;

  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica si el filtro de organizaciones ya se cargó.
  organizacionesInicioListas: boolean = false;
  //Indica si el filtro de clínicas ya se cargó.
  clinicasInicioListas: boolean = false;
  //Indica si la información de productos ya se obtuvo.
  productosListos: boolean = false;
  //Almacena los productos de la base de datos pero su información se puede filtrar.
  productos: JSON[] = [];
  //Almacena los productos de la base de datos original sin que se filtre su información.
  productosServidor: JSON[] = [];
  //Almacena el porcentaje del iva.
  porcentajeIva: string;
  // Indica si el usuario puede ver los usuarios que tiene el producto.
  verUsuariosProducto: boolean = false;
  //Indica si puede acceder al inventario del producto.
  verInventarioProducto: boolean = false;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  autenticarService = contiene los métodos de autenticación,           |
  |  organizacionesService = contiene los métodos de base de datos de las |
  |  organizaciones,                                                      |
  |  clinicasService = contiene los métodos de la bd de las clínicas,     |
  |  productosService = contiene los métodos de la bd de los products,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  rutaNavegacion   = para navegar a otras url´s.                       |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private utilidadesService: UtilidadesService,
    private esperarService: EsperarService,
    private autenticarService: AutenticarService,
    private organizacionesService: OrganizacionesService,
    private clinicasService: ClinicasService,
    private productosService: ProductosService,
    private fb: FormBuilder,
    private rutaNavegacion: Router) {

    //Se agregan las validaciones al formulario de búsqueda de productos.
    this.formBusquedaProductos = fb.group({
      'organizacion': ['', Validators.required],
      'clinica': ['', Validators.required],
      'estatusProducto': ['ACTIVO', Validators.required]
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.organizacionControl = this.formBusquedaProductos.controls['organizacion'];
    this.clinicaControl = this.formBusquedaProductos.controls['clinica'];
    this.estatusProductoControl = this.formBusquedaProductos.controls['estatusProducto'];


    //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
    this.esperarService.esperar()

    //Se cargan las organizaciones y las clínicas en sus filtros.
    this.filtroOrganizaciones();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe(() => {

      //Si las organizaciones están listas.
      if (this.organizacionesInicioListas) {

        //Si las clínicas están listas.
        if (this.clinicasInicioListas) {

          //Se detiene la espera.
          this.esperarService.noEsperar();

          //Se busca la información según los filtros iniciales.
          this.buscar();

        }
      }

    });


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.productosServidor)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.productos = resultados;
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(this.buscarInfoHTML.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para asegurar que se dispare el evento.
        this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
      });


    //Cuando se cambia la organización.
    this.organizacionControl.valueChanges.subscribe(() => {

      //Si no es la carga inicial se hace la espera.
      if (this.clinicasInicioListas) {
        this.esperarService.esperar();
      }

      //Se actualiza la información de las clínicas.
      this.clinicasService.filtroClinicas(null, null, this.organizacionControl.value).subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan las clínicas en el arreglo de clínicas.
          this.clinicas = respuesta["datos"];

          //Se le asigna el primer valor encontrado al control de clínicas.
          this.clinicaControl.setValue(this.clinicas[0] ? this.clinicas[0]["id"] : "");

        }
        //Si no es la carga inicial se detiene la espera.
        if (this.clinicasInicioListas) {
          this.esperarService.noEsperar();
        }
        //Si se está iniciando la página.
        else {
          this.clinicasInicioListas = true;
          this.cargaInicialLista$.next(this.clinicasInicioListas);
        }


      });

    });
  }

  ngAfterViewInit() {

    //El botón de dar de alta productos se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA PRODUCTO').subscribe((respuesta: boolean) => {
      this.altaProductos = respuesta["value"];
    });

    //El botón de editar productos se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('MODIFICAR PRODUCTO').subscribe((respuesta: boolean) => {
      this.editarProductos = respuesta["value"];
    });

    //El botón de desasignar productos se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('DESASIGNAR PRODUCTO').subscribe((respuesta: boolean) => {
      this.desasignarProductos = respuesta["value"];
    });


    //El botón de eliminar productos se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR PRODUCTO').subscribe((respuesta: boolean) => {
      this.eliminarProductos = respuesta["value"];
    });

    //El botón de ver los usuarios del producto se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('VER USUARIOS PRODUCTO').subscribe((respuesta: boolean) => {
      this.verUsuariosProducto = respuesta["value"];
    });

    //El botón de ver el inventario del producto se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('INVENTARIO PRODUCTO').subscribe((respuesta: boolean) => {
      this.verInventarioProducto = respuesta["value"];
    });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroOrganizaciones.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de organizaciones.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  filtroOrganizaciones() {

    this.organizacionesService.filtroOrganizaciones("TODOS").subscribe((respuesta) => {

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se almacenan las organizaciones en el arreglo de organizaciones.
        this.organizaciones = respuesta["datos"];

        //Se le asigna el primer valor encontrado al control de organizaciones.
        this.organizacionControl.setValue(this.organizaciones[0] ? this.organizaciones[0]["id"] : "");
      }

      this.organizacionesInicioListas = true;
      this.cargaInicialLista$.next(this.organizacionesInicioListas);
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: buscar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  buscar() {


    /*Si los elementos del formulario estáticos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.organizacionControl.invalid) {
      return;
    } else if (this.clinicaControl.invalid) {
      return;
    } else if (this.estatusProductoControl.invalid) {
      return;
    }
    //Inicia la espera de respuesta.
    this.esperarService.esperar();
    //Busca las productos según los filtros aplicados.
    this.productosService.filtroProductos(
      '0',
      this.estatusProductoControl.value,
      this.clinicaControl.value).subscribe((respuesta) => {

        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);

        }
        //Si todo salió bien.
        else {

          //Se almacenan los productos en el arreglo de productos.
          this.productos = respuesta["datos"];
          this.porcentajeIva = this.productos[0] ? this.productos[0]["porcentaje_iva"] : "";
          this.productosServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

        }

      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 24/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.productos = this.productosServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cambiarEstatusProducto.                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ACTIVAR o INACTIVAR un producto.            |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: productoId = identificador del producto,      |
  |                         estatus = estatus del producto.               |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cambiarEstatusProducto(productoId: string, estatus: string) {

    //Mensaje que tedrá la confirmación dependiendo del estatus.
    let tituloMensaje: string = estatus == "ACTIVO" ? "Activar producto." : "Inactivar producto.";
    let mensaje: string = estatus == "ACTIVO" ? "¿Está seguro de activar el producto?" : "¿Está seguro de inactivar el producto?";

    this.utilidadesService.confirmacion(tituloMensaje, mensaje).subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.productosService.modificarProducto(productoId, "", "", "", "", estatus).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Modificación exitosa.", "El estatus del producto se modificó satisfactoriamente.");
            this.buscar();
          }

        });
      }
    });

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarProducto.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar un producto.                       |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: productoId = identificador del producto.      |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarProducto(productoId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar producto.", "¿Está seguro de eliminar el producto?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.productosService.eliminarProducto(productoId).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Eliminación exitosa", "El producto se eliminó permanentemente.");
            this.buscar();
          }
        });
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: desasignarProducto.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desasignar un producto.                     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: productoId = identificador del producto,        |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  desasignarProducto(productoId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Desasignar producto.", "¿Está seguro de desasignarse el producto?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.productosService.desasignarProducto(productoId).subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Desasignación exitosa", "El producto se desasignó satisfactoriamente.");
            this.buscar();
          }
        });
      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaProducto.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de crear producto.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaProducto() {

    this.rutaNavegacion.navigate(['configuracion', 'alta-producto']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarProducto.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar producto.      |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:  productoId = identificador del producto.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  editarProducto(productoId) {
    this.rutaNavegacion.navigateByUrl('configuracion/editar-producto/' + productoId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuariosProducto.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de usuarios producto.    |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:  productoId = identificador del producto.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  usuariosProducto(productoId) {
    this.rutaNavegacion.navigateByUrl('configuracion/ver-usuarios-producto/' + productoId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: inventarioProducto.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de inventario producto.  |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:  productoId = identificador del producto.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/05/2020.                                                   |    
  |----------------------------------------------------------------------*/
  inventarioProducto(productoId) {
    this.rutaNavegacion.navigateByUrl('configuracion/inventario-producto/' + productoId);
  }  

}
