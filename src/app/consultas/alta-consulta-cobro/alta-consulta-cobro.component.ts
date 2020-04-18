/******************************************************************|
|NOMBRE: AltaCobroComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta cobros.                  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, fromEvent } from 'rxjs';
import { EsperarService } from '../../esperar.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UtilidadesService } from '../../utilidades.service';
import { I18n, CustomDatePicker, FormatDatePicker } from '../../custom-date-picker';
import { AutenticarService } from '../../autenticar.service';
import { CobrosService } from '../../cobros.service';
import { CobroReciboService } from './../../cobro-recibo.service';
import { CurrencyPipe } from '@angular/common';
import { AgregarAbonoComponent } from '../../agregar-abono/agregar-abono.component';
import { ConsultasService } from '../../consultas.service';


@Component({
  selector: 'app-alta-consulta-cobro',
  templateUrl: './alta-consulta-cobro.component.html',
  styleUrls: ['./alta-consulta-cobro.component.css'],
  providers: [I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatePicker },
    { provide: NgbDateParserFormatter, useClass: FormatDatePicker }]

})
export class AltaConsultaCobroComponent implements OnInit {

  //Identificador de la consulta tomada de la url.
  consultaId: string;
  //Clinica de la consulta.
  clinica: { id: string, nombre: string } = { id: "", nombre: "" };
  //Usuario o médico que atenderá la consulta.
  usuario: { id: string, nombre: string } = { id: "", nombre: "" };
  //paciente que recibirá la consulta.
  paciente: { id: string, nombre: string } = { id: "", nombre: "" };
  //Estudios de la consulta.
  estudios: { id: string, nombre_estudio: string, descripcion: string, precio_neto: string, precio_neto_formato: string, precio_bruto: string, precio_bruto_formato: string }[] = [];
  //Variable que almacena el control del formulario del descuento.
  @ViewChild('descuentoHTML') descuentoHTML: ElementRef;
  //Variable que almacena el control del formulario del tipo de cobro.
  @ViewChild('tipoCobroHTML') tipoCobroHTML: ElementRef;
  //Variable que almacena el control del formulario del descuento.
  @ViewChild('porcentajeDescuentoHTML') porcentajeDescuentoHTML: ElementRef;
  //Variable que almacena el control del formulario de los comentarios.
  @ViewChild('comentariosHTML') comentariosHTML: ElementRef;

  //Indica si  ya se verificó que el usuario pueda dar descuentos.
  verificarUsuarioPuedeDarDescuentos: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de alta de los cobros.
  formAltaCobros: FormGroup;
  //Propiedad para cuando se oprime el botón de crear cobro.
  pulsarCrear: boolean = false;
  //Objeto del formulario que contendrá el descuento.
  descuentoControl: AbstractControl;
  //Objeto del formulario que contendrá el porcentaje de descuento.
  porcentajeDescuentoControl: AbstractControl;
  //Objeto del formulario que contendrá los comentarios.
  comentariosControl: AbstractControl;
  //Subtotal del cobro (sin impuestos).
  subtotal: number = 0;
  //Iva.
  iva: number = 0;
  //Total del cobro.
  total: number = 0;
  //Registros de tipo de cobros que se verán en la vista en el campo tipos de cobro.
  tipoCobros: Array<JSON> = new Array();
  //Indica si el filtro de tipos de cobros está listo.
  tiposCobrosListo: boolean = false;
  //Objeto del formulario que contendrá al tipo de cobro.
  tipoCobroControl: AbstractControl;
  //Indica si el usuario logueado puede dar descuentos.
  usuarioPuedeDarDescuentos: boolean = false;
  //Indica si los inputs de descuento son válidos.
  verificarInputsDescuentos: boolean = false;
  //Verifica que la información de la consulta ya esté lista.
  verificarInfoConsultaLista: boolean = false;
  //Verifica que los estudios de la consulta ya están listos.
  verificarEstudios: boolean = false;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  usuariosService = contiene los métodos de la bd de los usuarios,     | 
  |  pacientesService = Contiene los métodos de mto. de pacientes,        |
  |  modalService = contiene los métodos para manipular modals,           |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |  
  |  cobrosServicce = contiene los métodos de la bd de los cobros,        |  
  |  autenticarService = contiene los métodos de autenticación,           |
  |  parametrosService = contiene los métodos para la obtención de params,|
  |  cobrosReciboService = contiene los métodos para el recibo del cobro, |
  |  rutaActual: Para obtener los parámetros de la url,                   |
  |  consultasService = contiene los métodos de la bd de las consultas.   |                              
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private modalService: NgbModal,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private cobrosService: CobrosService,
    private autenticarService: AutenticarService,
    private cobroReciboService: CobroReciboService,
    private rutaActual: ActivatedRoute,
    private consultasService: ConsultasService) {

    //Se agregan las validaciones al formulario de alta de cobros.
    this.formAltaCobros = fb.group({
      'descuento': ['', [this.utilidadesService.decimalValidator, Validators.max(this.subtotal), Validators.min(0)]],
      'porcentajeDescuento': ['', [this.utilidadesService.decimalValidator, Validators.max(100), Validators.min(0)]],
      'tipoCobro': ['', [Validators.required]],
      'comentarios': ['']
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.    
    this.descuentoControl = this.formAltaCobros.controls['descuento'];
    this.porcentajeDescuentoControl = this.formAltaCobros.controls['porcentajeDescuento'];
    this.tipoCobroControl = this.formAltaCobros.controls['tipoCobro'];
    this.comentariosControl = this.formAltaCobros.controls['comentarios'];

  }

  ngOnInit() {


    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {

      //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
      this.esperarService.esperar();
      this.consultaId = params.get("id");
 
      //Se verifica que el usuario logueado pueda dar descuentos.
      this.usuarioPuedeDarDescuento();
      //Se cargan los tipos de cobros.
      this.filtroTiposCobros();
      //Se carga la información de la consulta.
      this.infoConsulta();
      //Se carga la información de los estudios.
      this.estudiosConsulta();

    });

    //Cuando se cambia el descuento.
    this.descuentoControl.statusChanges.subscribe(() => {
      this.activarValidacionesDescuentos();
    });

    //Cuando se cambia el porcentaje de descuento.
    this.porcentajeDescuentoControl.statusChanges.subscribe(() => {
      this.activarValidacionesDescuentos();
    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarUsuarioPuedeDarDescuentos &&
        this.tiposCobrosListo &&
        this.verificarInfoConsultaLista &&
        this.verificarEstudios) {

        this.verificarUsuarioPuedeDarDescuentos = false;
        this.tiposCobrosListo = false;
        this.verificarInfoConsultaLista = false;
        this.verificarEstudios = false;

        this.esperarService.noEsperar();

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
          //Se inicializa el select con el primer valor encontrado.
          this.tipoCobroControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
        }

        //Indica que el filtro de tipos cobros ya se cargó.
        this.tiposCobrosListo = true;
        this.cargaInicialLista$.next(this.tiposCobrosListo);
      });

  }

 
  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsulta.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener la información de la consulta.      |      
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 16/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsulta() {
    this.consultasService.verConsulta(this.consultaId).subscribe((respuesta) => {

      this.verificarInfoConsultaLista = true;
      this.cargaInicialLista$.next(this.verificarInfoConsultaLista);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se establece la información de la clínica.
        this.clinica.nombre = respuesta["datos"][0]["nombre_clinica"];
        this.usuario.nombre = respuesta["datos"][0]["nombres_usuario"];
        this.paciente.nombre = respuesta["datos"][0]["nombres_paciente"];
        this.subtotal = respuesta["datos"][0]["subtotal"];        
        this.iva = respuesta["datos"][0]["porcentaje_iva"];   

      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: estudiosConsulta.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para obtener los estudios de la consulta.        |      
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/04/2020.                                                   |    
  |----------------------------------------------------------------------*/
  estudiosConsulta() {
    this.consultasService.verEstudiosConsulta(this.consultaId).subscribe((respuesta) => {

      this.verificarEstudios = true;
      this.cargaInicialLista$.next(this.verificarEstudios);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {
        this.estudios = respuesta["datos"];
      }
    });
  }  
  

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de consultas.                |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: usuarioPuedeDarDescuento.                                    |  
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Verifica que un usuario pueda dar descuentos.           | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  usuarioPuedeDarDescuento() {

    this.autenticarService.usuarioPuedeDarDescuentos().subscribe((respuesta) => {   
      this.usuarioPuedeDarDescuentos = respuesta["value"];
      this.verificarUsuarioPuedeDarDescuentos = true;
      this.cargaInicialLista$.next(this.verificarUsuarioPuedeDarDescuentos);
    });


  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: cobrar.                                                      |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para cobrar.                                     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: estatus = COBRADO o PENDIENTE (abono).        |  
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/03/2020.                                                   |    
  |----------------------------------------------------------------------*/
  cobrar(estatus: string) {

    //El mensaje cambiará dependiendo del estatus del cobro (COBRADO o PENDIENTE).
    let tituloConfirmacion: string;
    let mensajeConfirmacion: string;

    if (estatus == 'COBRADO') {
      tituloConfirmacion = "Confirmación de cobro";
      mensajeConfirmacion = "¿Está seguro de realizar el cobro?";
    }
    //Si es un abono.
    else {
      tituloConfirmacion = "Confirmación de abono";
      mensajeConfirmacion = "¿Está seguro de realizar el abono?";
    }

    this.utilidadesService.confirmacion(tituloConfirmacion, mensajeConfirmacion).subscribe(respuesta => {
      //Si se acepta.
      if (respuesta == "Aceptar") {

        //Se pulsa el botón  de dar de alta cobro o abonar.
        this.pulsarCrear = true;

        /*Si los elementos del formulario estáticos requeridos no están llenos, 
        se hace un focus para que se ingrese texto.*/
        if (this.tipoCobroControl.invalid) {
          this.tipoCobroHTML.nativeElement.focus();
          return;
        }

        //Si no se agregó ningún estudio.
        if (this.estudios.length == 0) {
          this.utilidadesService.alerta("Sin estudios", "Agregue por lo menos un estudio.");
          return;
        }

        //Se utiliza para distinguir entre un abono y un cobrado total.
        let procesoCobrado: Subject<any> = new Subject<any>();

        //Si es un cobro total.
        if (estatus == 'COBRADO') {
          //No hay más procesos que realizar.
          procesoCobrado.next(null);
          procesoCobrado.complete();
        }
        //Si es un abono.
        else {

          //Se establece la información del cobro para poder abonar.
          let abono: { total: string, totalFormato: string, abono: string, tiposCobros: Array<any>, tipoCobro: string, observaciones: string } = { total: "", totalFormato: "", abono: "", tiposCobros: new Array(), tipoCobro: "", observaciones: "" };

          abono.total = (this.subtotal - this.descuentoControl.value) + ((this.subtotal - this.descuentoControl.value) * (this.iva / 100)) + "";
          abono.totalFormato = new CurrencyPipe("EN").transform(abono.total, "$");
          abono.tiposCobros = this.tipoCobros.filter(tipoCobro => tipoCobro["id"] == this.tipoCobroControl.value);

          //Se muestra un caja de diálogo donde el usuario escribirá el abono que se le dará al cobro.
          this.cobrosService.agregarAbono(AgregarAbonoComponent, abono).subscribe((abono) => {
            //Si se agregó un abono
            if (abono) {
              procesoCobrado.next(abono);
              procesoCobrado.complete();
            }
            //Si se cerró el modal sin aplicar el abono.         
            else {
              //No hay más procesos que realizar.
              return false;
            }
          });

        }

        procesoCobrado.toPromise().then((abono) => {

          //Se abre el modal de espera.
          this.esperarService.esperar();

          let listadoEstudios: string = "";

          //Se forma la lista de estudios.
          this.estudios.forEach(estudio => {

            listadoEstudios = listadoEstudios + estudio.id + ",";

          });

          //Se obtiene el descuento.
          let descuento: string = this.descuentoControl.value && this.descuentoControl.value.trim().length > 0 ? this.descuentoControl.value : "0";


          this.cobrosService.altaCobro(this.clinica.id, this.tipoCobroControl.value, listadoEstudios, this.comentariosControl.value, descuento, this.paciente.id, abono ? abono.abono : '0', abono ? abono.observaciones : '').subscribe(respuestaAltaCobro => {
            //Si hubo un error en el alta de cobro.
            if (respuestaAltaCobro["estado"] === "ERROR") {
              //Se detiene la espera.
              this.esperarService.noEsperar();
              //Se muestra la alerta.
              this.utilidadesService.alerta("Error alta de cobro", respuestaAltaCobro["mensaje"]);
            }
            else {

              //Se detiene la espera.
              this.esperarService.noEsperar();

              //Se obtiene el identificador del cobro.
              let cobroId = respuestaAltaCobro["mensaje"];

              this.utilidadesService.alerta("Alta de cobro satisfactoria.", "El cobro se dio de alta satisfactoriamente.").subscribe(() => {

                //Se intenta imprimir el recibo.
                this.cobroReciboService.imprimirRecibo(cobroId).subscribe(respuestaImprimirRecibo => {

                  //Si No hubo error al imprimir el recibo.
                  if (respuestaImprimirRecibo) {
                    //Se retorna al listado de cobros.
                    this.regresar();
                  }
                });

              });

            }
          });

        });

      }
    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: activarValidacionesDescuentos.                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para activar las validaciones de los decuentos.  |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 21/02/2020.                                                   |    
  |----------------------------------------------------------------------*/
  activarValidacionesDescuentos() {

    //Solo se disparará el evento cuando los elementos del descuento estén inválidos.
    if (!this.descuentoHTML || !this.porcentajeDescuentoHTML) {
      this.verificarInputsDescuentos = false;
    }

    //Si el usuario puede dar descuentos, entonces se activan los campos corresponmdientes.
    if (!this.verificarInputsDescuentos && this.usuarioPuedeDarDescuentos && this.estudios.length > 0 && this.descuentoHTML && this.porcentajeDescuentoHTML) {

      //Se utiliza para que no se dispare tantas veces el evento.
      this.verificarInputsDescuentos = true;

      //this.descuentoControl.setValue("");

      //El descuento solo aceptará números.
      this.utilidadesService.inputNumerico(this.descuentoHTML, true, this.descuentoControl);
      //El porcentaje del descuento solo aceptará números.
      this.utilidadesService.inputNumerico(this.porcentajeDescuentoHTML, true, this.porcentajeDescuentoControl);

      //Cuando se cambia el descuento.    
      fromEvent(this.descuentoHTML.nativeElement, 'keyup').subscribe(() => {
        //Si el descuento es mayor que el subtotal.
        if (Number(this.descuentoControl.value) > Number(this.subtotal)) {
          this.utilidadesService.alerta("Descuento no permitido", "El descuento debe ser menor o igual al subtotal.").subscribe(() => {
            this.descuentoControl.setValue("");
            this.porcentajeDescuentoControl.setValue("");
            this.descuentoHTML.nativeElement.focus();
          });
        }
        //Si el descuento es válido.
        else {
          //Se actualiza el porcentaje del descuento.
          this.porcentajeDescuentoControl.setValue(this.descuentoControl.value / this.subtotal * 100 + "");
        }
      });

      //Cuando se cambia el porcentaje del descuento.    
      fromEvent(this.porcentajeDescuentoHTML.nativeElement, 'keyup').subscribe(() => {
        //Si el porcentaje del descuento es mayor a 100.
        if (Number(this.porcentajeDescuentoControl.value) > 100) {
          this.utilidadesService.alerta("Descuento no permitido", "El porcentaje del descuento debe ser menor o igual a 100.").subscribe(() => {
            this.porcentajeDescuentoControl.setValue("");
            this.descuentoControl.setValue("");
            this.porcentajeDescuentoHTML.nativeElement.focus();
          });
        }
        else {
          //Se actualiza el descuento.
          this.descuentoControl.setValue(this.porcentajeDescuentoControl.value / 100 * this.subtotal + "");
        }
      });

    }

  }

}

