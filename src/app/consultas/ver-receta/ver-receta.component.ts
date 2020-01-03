/******************************************************************|
|NOMBRE: VerRecetaComponent.                                       | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver una receta.                      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 21/10/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { UtilidadesService } from '../../utilidades.service';
import { ConsultasService } from '../../consultas.service';
import { map, switchAll, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css']
})
export class VerRecetaComponent implements OnInit {

  //Identificador de la consulta. Tomada de la url.
  consultaId: string;
  //Identificador de la receta. Tomada de la url.
  recetaId: string;
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();
  //Variable que contendrá las referencias.
  referencias: string;
  //Cuadro de texto de búsqueda.
  @ViewChild('buscarInfoHTML') buscarInfoHTML: ElementRef;
  //Almacena los medicamentos y sus indicaciones (se utiliza para filtrar).
  medicamentos: Array<any> = [];
  //Almacena los medicamentos de la base de datos.
  medicamentosServidor: Array<any> = [];
  //Variable para almacenar el estatus de la receta.
  estatusReceta: string;

  /*----------------------------------------------------------------------|
|  NOMBRE: constructor.                                                 |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Método constructor del componente.                      | 
|-----------------------------------------------------------------------|
|  PARÁMETROS DE ENTRADA:                                               |
|  rutaNavegacion   = para navegar a otras url's,                       |
|  esperarService = contiene los métodos para mostrar o no la espera,   |
|  utilidadesService = Contiene métodos genéricos y útiles,             |  
|  rutaActual = para obtener los parámetros de la url,                  |
|  consultasService = contiene los métodos de bd. de las consultas.     |                          
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 21/10/2019.                                                   |    
|----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private utilidadesService: UtilidadesService,
    private rutaActual: ActivatedRoute,
    private consultasService: ConsultasService) {

    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {
      this.consultaId = params.get("id");
      this.recetaId = params.get("recetaId");

      //Inicia la espera.
      this.esperarService.esperar();

      this.consultasService.verReceta(this.recetaId).subscribe(respuesta => {
        //Detiene la espera, signo de que ya se obtuvo la información.
        this.esperarService.noEsperar();
        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Se retorna a la lista de recetas.
          this.regresar();
        }
        //Si todo salió bien.
        else {

          //Se almacena la referencia y el estatus (como es la misma en todos los registros, solo se toma la primera).
          if(respuesta["datos"]["length"] > 0){
            this.referencias = respuesta["datos"][0]["referencias"];
            this.estatusReceta = respuesta["datos"][0]["estatus"];
          }
            
          //Se almacenan las recetas.
          this.medicamentos = respuesta["datos"];
          this.medicamentosServidor = respuesta["datos"];
          //Le da un focus al elemento de búsqueda.
          this.buscarInfoHTML.nativeElement.focus();

        }
      });

    });
  }

  ngOnInit() {

    //Se obtiene el método de tecleado del elemento HTML de búsqueda.
    fromEvent(this.buscarInfoHTML.nativeElement, 'keyup')
      //Extrae el valor de la búsqueda.
      .pipe(map((e: any) => e.target.value))
      //Se realiza la búsqueda.
      .pipe(map((query: string) => this.utilidadesService.filtrarDatos(query, this.medicamentosServidor)))
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
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de recetas.                  |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 17/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de diagnósticos.
    this.rutaNavegacion.navigateByUrl('consultas/lista-recetas/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsultaLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la info de la consulta.              |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: info = información de la consulta.            |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsulta(info) {
    this.verificarInfoConsulta = true;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

  /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. | 
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/09/2019.                                                   |    
    |----------------------------------------------------------------------*/
  limpiarCampoBusqueda() {

    //Si el campo tiene algo escrito se limpiará.
    if (this.buscarInfoHTML.nativeElement.value.length > 0) {
      //limpia el cuadro de texto.
      this.buscarInfoHTML.nativeElement.value = "";
      //Actualiza la información con la original.
      this.medicamentos = this.medicamentosServidor;
    }
    //Le da un focus al elemento de búsqueda.
    this.buscarInfoHTML.nativeElement.focus();
  }



}
