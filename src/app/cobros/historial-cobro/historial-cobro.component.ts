/******************************************************************|
|NOMBRE: historialCobroComponent.                                  | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver el historial de un cobro.        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 07/04/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { CobroReciboService } from './../../cobro-recibo.service';
import { AgregarAbonoComponent } from '../../agregar-abono/agregar-abono.component';
import { AutenticarService } from './../../autenticar.service';
import { UtilidadesService } from './../../utilidades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EsperarService } from './../../esperar.service';
import { CobrosService } from './../../cobros.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-cobro',
  templateUrl: './historial-cobro.component.html',
  styleUrls: ['./historial-cobro.component.css']
})
export class HistorialCobroComponent implements OnInit {

  //Identificador del cobro. Tomado de la url.
  cobroId: string;
  //Indica que ya se verificó que la información del cobro está lista.
  verificarInfoCobro: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Indica que ya se verificó que la información del historial del cobro esté lista.
  verificarHistorialCobro: boolean = false;
  //Almacena el detalle de cobros de la base de datos.
  detCobros: JSON[] = [];
  //Variable para almacenar el saldo.
  saldo: string;
  //Variable para almacenar el saldo.
  saldoFormato: string;
  //Estatus del cobro.
  estatusCobro: string;
  //Propiedad que indica si el usuario puede dar de alta detalle de cobros.
  altaDetCobros: boolean = false;
  //Propiedad que indica si el usuario puede cancelar el detalle de cobros.
  cancelarDetCobros: boolean = false;
  //Registros de tipo de cobros que se verán en la vista en el campo tipos de cobro.
  tipoCobros: Array<JSON> = new Array();
  //Indica si el filtro de tipos de cobros está listo.
  tiposCobrosListo: boolean = false;

  /*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA:                                               |
|  rutaNavegacion   = para navegar a otras url's,                       |
|  rutaActual = para obtener los parámetros de la url,                  |
|  esperarService = contiene los métodos para mostrar o no la espera,   |  
|  cobrosService = contiene los métodos de la bd de los cobros,         |
|  utilidadesService = Contiene métodos genéricos y útiles,             |
|  autenticarService = contiene los métodos de autenticación,           | 
|  cobrosReciboService = contiene los métodos para el recibo del cobro. |
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 07/04/2020.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private cobrosService: CobrosService,
    private utilidadesService: UtilidadesService,
    private autenticarService: AutenticarService,
    private cobroReciboService: CobroReciboService) {

    //Obtiene el identificador de la consulta y del diagnóstico de la url.
    this.rutaActual.paramMap.subscribe(params => {

      //Si es el misma cobro no es necesario volver a buscar la información del mismo.
      if (this.cobroId == params.get("id")) {
        this.verificarInfoCobro = true;
      }
      else {
        this.cobroId = params.get("id");

        //Se obtienene los tipos de cobros.
        this.filtroTiposCobros();

        //Se busca el historial de cobros.
        this.cobrosService.verHistorialCobrosReciboCobro(this.cobroId).subscribe(respuesta => {

          this.verificarHistorialCobro = true;
          this.cargaInicialLista$.next(this.verificarHistorialCobro);

          //Si hubo un error en la obtención de información.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);

          }
          //Si todo salió bien.
          else {
            //Se almacen el detalle de cobros.
            this.detCobros = respuesta["datos"];
          }

        });

      }

      //Se inicia la espera de respuesta de información.
      this.esperarService.esperar();

    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarInfoCobro &&
        this.verificarHistorialCobro &&
        this.tiposCobrosListo) {
        //Se resetean los valores de información inicial.
        this.verificarInfoCobro = false;
        this.verificarHistorialCobro = false;
        this.tiposCobrosListo = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();
      }

    });


  }

  ngOnInit() {
  }


  ngAfterViewInit() {

    //El botón de alta de detalle de cobros se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA DETALLE COBRO').subscribe((respuesta: boolean) => {
      this.altaDetCobros = respuesta["value"];
    });

    //El botón de cancelar det cobros se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('CANCELAR DETALLE COBRO').subscribe((respuesta: boolean) => {
      this.cancelarDetCobros = respuesta["value"];
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de cobros.                   |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de cobros.
    this.rutaNavegacion.navigateByUrl('cobros/lista-cobros');
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoCobroLista.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que avisa que ya se obtuvo la info del cobro.    |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoLista = indica que la info está lista.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 07/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoCobroLista(infoLista: boolean) {
    this.verificarInfoCobro = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoCobro);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoCobro.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que trae la información del resumen del cobro.   |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: cobro = info del cobro.                       |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 08/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoCobro(cobro) {
    this.saldo = cobro["datos"][0]["saldo"];
    this.saldoFormato = cobro["datos"][0]["saldo_formato"];
    this.estatusCobro = cobro["datos"][0]["estado_cobro"];
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetCobro.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Da de alta un abono a un cobro.                         |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 09/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetCobro() {


    this.utilidadesService.confirmacion("Confirmación de abono", "¿Está seguro de realizar el abono?").subscribe(respuesta => {
      //Si se acepta.
      if (respuesta == "Aceptar") {

        //Se establece la información del cobro para poder abonar.
        let abono: { total: string, totalFormato: string, abono: string, tiposCobros: Array<any>, tipoCobro: string, observaciones: string } = { total: this.saldo, totalFormato: this.saldoFormato, abono: "", tiposCobros: this.tipoCobros, tipoCobro: "", observaciones: "" };
        //Se muestra un caja de diálogo donde el usuario escribirá el abono que se le dará al cobro.
        this.cobrosService.agregarAbono(AgregarAbonoComponent, abono).subscribe((abono) => {
          //Si se agregó un abono
          if (abono) {

            //Se abre el modal de espera.
            this.esperarService.esperar();

            this.cobrosService.altaDetCobro(this.cobroId, abono.tipoCobro, abono.abono, abono.observaciones).subscribe(respuesta => {

              //Si hubo un error en el alta del abono.
              if (respuesta["estado"] === "ERROR") {
                //Se detiene la espera.
                this.esperarService.noEsperar();
                //Se muestra la alerta.
                this.utilidadesService.alerta("Error alta de abono", respuesta["mensaje"]);
              }
              else {

                //Se intenta imprimir el recibo.
                this.cobroReciboService.imprimirRecibo(this.cobroId).subscribe(respuestaImprimirRecibo => {

                  //Si No hubo error al imprimir el recibo.
                  if (respuestaImprimirRecibo) {
                    //Se hace la actualización de la página.
                    location.reload();
                  }
                });

              }

            });


          }
          //Si se cerró el modal sin aplicar el abono.         
          else {
            //No hay más procesos que realizar.
            return false;
          }
        });

      }

    });

  }


  /*----------------------------------------------------------------------|
   |  NOMBRE: filtroTiposCobros.                                           |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para llenar el filtro de tipos cobros.           | 
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 06/03/2020.                                                   |    
   |----------------------------------------------------------------------*/
  filtroTiposCobros() {

    //Intenta obtener los tipos de los cobros.
    this.cobrosService.filtroTiposCobros()
      .subscribe((respuesta) => {


        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan los tipos de cobros.
          this.tipoCobros = respuesta["datos"];
        }

        //Indica que el filtro de tipos cobros ya se cargó.
        this.tiposCobrosListo = true;
        this.cargaInicialLista$.next(this.tiposCobrosListo);
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: cancelarDetCobro.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cancelar un cobro.                          |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: detCobroId = id. del detalle del cobro.       |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 11/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cancelarDetCobro(detCobroId: string) {

    this.utilidadesService.confirmacion("Cancelar abono.", "¿Está seguro de cancelar el abono?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.cobrosService.cancelarDetCobro(detCobroId).subscribe(respuesta => {
          //Se inicia la espera en respuesta del servidor.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se actualizan los datos.            
            this.utilidadesService.alerta("Cancelación exitosa", "El abono se canceló satisfactoriamente.");
            //Se hace la actualización de la página.
            location.reload();
          }

        });
      }
    });
  }



}
