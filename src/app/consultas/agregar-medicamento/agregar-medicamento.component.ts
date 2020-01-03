/******************************************************************|
|NOMBRE: agregarMedicamentoComponent                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal para añadir un medicamento a la receta.     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 18/09/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, fromEvent } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EsperarService } from '../../esperar.service';
import { ConsultasService } from '../../consultas.service';
import { UtilidadesService } from '../../utilidades.service';
import { map, switchAll, debounceTime } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrls: ['./agregar-medicamento.component.css']
})
export class AgregarMedicamentoComponent implements OnInit {

  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los medicamentos y sus indicaciones (se utiliza para filtrar).
  medicamentos: JSON[] = [];
  //Almacena los medicamentos que tiene el usuario logueado.
  medicamentosOriginal: JSON[] = [];
  //Variable que indica que la información de los medicamentos ya está lista.
  medicamentosListos: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Objeto que contendrá el formulario de agregar documento.
  formAgregarMedicamento: FormGroup;
  //Propiedad para cuando se oprime el botón de agregar medicamento.
  pulsarCrear: boolean = false;
  //Objeto del formulario que contendrá al campo dosis.
  dosisControl: AbstractControl;
  //Elemento HTML de la dosis.
  @ViewChild('dosisHTML') dosisHTML: ElementRef;
  //Objeto del formulario que contendrá al campo frecuencia.
  frecuenciaControl: AbstractControl;
  //Elemento HTML de la frecuencia.
  @ViewChild('frecuenciaHTML') frecuenciaHTML: ElementRef;
  //Objeto del formulario que contendrá al campo duración.
  duracionControl: AbstractControl;
  //Elemento HTML de la duración.
  @ViewChild('duracionHTML') duracionHTML: ElementRef;
  //Objeto del formulario que contendrá al campo indicaciones.
  indicacionesControl: AbstractControl;
  //Elemento HTML de las indicaciones.
  @ViewChild('indicacionesHTML') indicacionesHTML: ElementRef;
  //Objeto del formulario que contendrá el campo duración unidad.
  duracionUnidadTiempoControl: AbstractControl;
  //Objeto del formulario que contendrá el campo frecuencia unidad.
  frecuenciaUnidadTiempoControl: AbstractControl;
  //Variable que almacena el medicamento seleccionado.
  medicamentoSeleccionado;
  //Variable que indica que ya se hicieron visibles los campos.
  activarCampos: boolean = false;
  //Variable que indica la forma farmaceutica.
  formaFarmaceutica: string;
  //Variable que indica que la información de las unidades de tiempo ya está lista.
  unidadesTiempoListas: boolean = false;
  //Variable para almacenar las unidades de tiempo obtenidas de la base de datos.
  unidadesTiempo: Array<JSON>;
  //Variable para almacenar el nombre del  medicamento.
  nombreMedicamento: string;
  //Variable para almacenar la presentación del medicamento.
  presentacionMedicamento: string;
  //Variable para almacenar la imagen del medicamento.
  imagenMedicamento: string;
  //Variable para almacenar el identificador del medicamento. En caso de edición del  mismo.
  public medicamentoEdicion;

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  activeModal = contiene los métodos para manipular un modal,          |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |
  |  fb = contiene los métodos para manipular formularios HTML,           |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |  
  |  consultasService = contiene los métodos de bd. de las consultas.     |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private activeModal: NgbActiveModal,
    private esperarService: EsperarService,
    private fb: FormBuilder,
    private utilidadesService: UtilidadesService,
    private consultasService: ConsultasService) {

    //Se agregan las validaciones al formulario.
    this.formAgregarMedicamento = fb.group({
      'dosis': ['', [this.utilidadesService.decimalValidator, Validators.required]],
      'frecuencia': ['', [this.utilidadesService.decimalValidator, Validators.required]],
      'frecuenciaUnidadTiempo': ['', Validators.required],
      'duracion': ['', [this.utilidadesService.decimalValidator, Validators.required]],
      'duracionUnidadTiempo': ['', Validators.required],
      'indicaciones': ['']
    });

    //Se relacionan los elementos del formulario con las propiedades/variables creadas.
    this.duracionControl = this.formAgregarMedicamento.controls['duracion'];
    this.duracionUnidadTiempoControl = this.formAgregarMedicamento.controls['duracionUnidadTiempo'];
    this.dosisControl = this.formAgregarMedicamento.controls['dosis'];
    this.frecuenciaControl = this.formAgregarMedicamento.controls['frecuencia'];
    this.frecuenciaUnidadTiempoControl = this.formAgregarMedicamento.controls['frecuenciaUnidadTiempo'];
    this.indicacionesControl = this.formAgregarMedicamento.controls['indicaciones'];


  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.medicamentosOriginal)))
      //Se utiliza para obtener solo la búsqueda más reciente.
      .pipe(switchAll())
      //Se actualiza la información del arreglo.
      .subscribe((resultados: JSON[]) => {
        //Se actualiza la información en pantalla.        
        this.medicamentos = resultados;
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

    //Inicia la espera en obtención de información.
    this.esperarService.esperar();

    //Se obtienen las unidades de tiempo.
    this.filtroUnidadesTiempo();
    //Se obtienen los medicamentos.
    this.listaMedicamentosUsuario();

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.medicamentosListos &&
        this.unidadesTiempoListas) {

        this.medicamentosListos = false;
        this.unidadesTiempoListas = false;
        //Se detiene la espera.
        this.esperarService.noEsperar();
        
        //Si se va a editar un medicamento. Se cargan sus valores iniciales.
        if (this.medicamentoEdicion) {
          
          //Se busca el  medicamento dentro de la lista de medicamentos.
          let medicamentoAEditar = this.utilidadesService.existeElementoArreglo("id", this.medicamentoEdicion["id"], this.medicamentosOriginal);
          //Si el medicamento a editar se encontró en la lista.
          if (medicamentoAEditar) {
            
            //Se selecciona el medicamento.
            this.seleccionarMedicamento(medicamentoAEditar);
            //Se llenan los campos con la información anterior.
            this.duracionControl.setValue(this.medicamentoEdicion["duracion"]);
            this.duracionUnidadTiempoControl.setValue(this.medicamentoEdicion["duracion_unidad_tiempo_id"]);
            this.dosisControl.setValue(this.medicamentoEdicion["dosis"]);
            this.frecuenciaControl.setValue(this.medicamentoEdicion["frecuencia"]);
            this.frecuenciaUnidadTiempoControl.setValue(this.medicamentoEdicion["frecuencia_unidad_tiempo_id"]);
            this.indicacionesControl.setValue(this.medicamentoEdicion["indicaciones_uso"]);
          }

        }

      }

    });

  }

  ngAfterViewChecked(): void {

    //La dósis, la frecuencia y la duración serán números.
    if (this.dosisHTML &&
      this.frecuenciaHTML &&
      this.duracionHTML &&
      this.medicamentoSeleccionado &&
      !this.activarCampos) {

      this.activarCampos = true;
      this.utilidadesService.inputNumerico(this.duracionHTML, true, this.duracionControl);
      this.utilidadesService.inputNumerico(this.dosisHTML, true, this.dosisControl);
      this.utilidadesService.inputNumerico(this.frecuenciaHTML, true, this.frecuenciaControl);
    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarCampoBusqueda.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.medicamentos = this.medicamentosOriginal;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarMedicamento.                                      |
  |-----------------------------------------------------------------------|
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  medicamento = registro seleccionado.                                 |
  |-----------------------------------------------------------------------|  
  |  DESCRIPCIÓN: Selecciona un medicamento de la lista.                  | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarMedicamento(medicamento) {

    this.imagenMedicamento = "./../../assets/img/logo_completo.png";

    this.medicamentoSeleccionado = medicamento;
    this.formaFarmaceutica = medicamento["nombre_forma_farmaceutica"];
    this.nombreMedicamento = medicamento["nombre_medicamento"];
    this.presentacionMedicamento = medicamento["presentacion"];
    //Se asegura que existan los elementos en el dom.
    if (this.dosisHTML &&
      this.frecuenciaHTML &&
      this.duracionHTML &&
      this.indicacionesHTML) {

      this.utilidadesService.limpiarCampoTexto(this.duracionHTML.nativeElement, true);
      this.duracionControl.setValue("");
      this.utilidadesService.limpiarCampoTexto(this.dosisHTML.nativeElement, false);
      this.dosisControl.setValue("");
      this.utilidadesService.limpiarCampoTexto(this.frecuenciaHTML.nativeElement, false);
      this.frecuenciaControl.setValue("");
      this.utilidadesService.limpiarCampoTexto(this.indicacionesHTML.nativeElement, false);
      this.indicacionesControl.setValue("");

    }

    //Se busca la imagen del medicamento en la base de datos.
    this.consultasService.imagenMedicamento(this.medicamentoSeleccionado["id"]).subscribe(respuesta => {

      //Si NO hubo un error en la obtención de información.
      if (respuesta["estado"] !== "ERROR") {
        //Si el medicamento tiene imagen.
        if (respuesta["datos"].length > 0) {
          this.imagenMedicamento = respuesta["datos"][0]["imagen"];
        }
      }

    });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: listaMedicamentosUsuario.                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar la tabla de medicamentos             | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  listaMedicamentosUsuario() {

    //Si se está editando un medicamento, se carga solo el medicamento a editar.
    if (this.medicamentoEdicion) {

      this.consultasService.verMedicamentoSeleccionado(this.medicamentoEdicion["id"]).subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          //Indica que los medicamentos ya se cargaron.
          this.medicamentosListos = true;
          this.cargaInicialLista$.next(this.medicamentosListos);
        }
        //Si todo salió bien.
        else {

          this.medicamentosOriginal = respuesta["datos"];
          this.medicamentos = respuesta["datos"];
          //Indica que los medicamentos ya se cargaron.
          this.medicamentosListos = true;
          this.cargaInicialLista$.next(this.medicamentosListos);

        }
      });

    }
    else {
      this.consultasService.listaMedicamentosUsuario().subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          //Indica que los medicamentos ya se cargaron.
          this.medicamentosListos = true;
          this.cargaInicialLista$.next(this.medicamentosListos);
        }
        //Si todo salió bien.
        else {

          this.medicamentosOriginal = respuesta["datos"];
          this.medicamentos = respuesta["datos"];
          //Indica que los medicamentos ya se cargaron.
          this.medicamentosListos = true;
          this.cargaInicialLista$.next(this.medicamentosListos);

        }
      });

    }
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: filtroUnidadesTiempo.                                        |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de unidades de tiempo.     | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  filtroUnidadesTiempo() {

    //Intenta obtener los registros.
    this.consultasService.unidadesTiempo("ACTIVO")
      .subscribe((respuesta) => {

        //Indica que las unidades de tiempo ya se cargaron.
        this.unidadesTiempoListas = true;
        this.cargaInicialLista$.next(this.unidadesTiempoListas);

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se almacenan las unidades de tiempo.
          this.unidadesTiempo = respuesta["datos"];
        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarMedicamento.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para agregar el medicamento a la receta.         | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/10/2019.                                                   |    
  |----------------------------------------------------------------------*/
  agregarMedicamento() {

    //Se pulsa el botón  de dar de alta consulta.
    this.pulsarCrear = true;

    if (!this.medicamentoSeleccionado) {
      this.utilidadesService.alerta("Seleccionar medicamento", "Debe seleccionar un medicamento para añadirlo a la receta.");
      return true;
    }

    //Se obtiene el nombre de la unidad de tiempo de la duración.
    let duracionUnidadTiempoAbreviatura = this.unidadesTiempo.find(unidadTiempo =>
      unidadTiempo["id"] == this.duracionUnidadTiempoControl.value
    )["abreviatura"];

    //Se obtiene el nombre de la unidad de tiempo de la frecuencia.
    let frecuenciaUnidadTiempoAbreviatura = this.unidadesTiempo.find(unidadTiempo =>
      unidadTiempo["id"] == this.frecuenciaUnidadTiempoControl.value
    )["abreviatura"];
            
    //Se preparan los valores a retornar al formulario padre.
    let medicamentoSeleccionado = ({
      medicamento: this.medicamentoSeleccionado,
      duracion: this.duracionControl.value,
      duracion_unidad_tiempo_id: this.duracionUnidadTiempoControl.value,
      duracion_unidad_tiempo_abreviatura: duracionUnidadTiempoAbreviatura,
      dosis: this.dosisControl.value,
      frecuencia: this.frecuenciaControl.value,
      frecuencia_unidad_tiempo_id: this.frecuenciaUnidadTiempoControl.value,
      frecuencia_unidad_tiempo_abreviatura: frecuenciaUnidadTiempoAbreviatura,
      indicaciones_uso: this.indicacionesControl.value
    });

    //Se retorna el resultado.
    this.activeModal.close(medicamentoSeleccionado);

  }

}
