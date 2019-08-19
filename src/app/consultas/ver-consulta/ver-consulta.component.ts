/******************************************************************|
|NOMBRE: verConsultaComponent.                                     | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver el detalle de una consulta.      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 16/08/2019.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EsperarService } from '../../esperar.service';
import { ConsultasService } from '../../consultas.service';
import { ProductosService } from '../../productos.service';
import { AutenticarService } from '../../autenticar.service';
import { UtilidadesService } from '../../utilidades.service';

@Component({
  selector: 'app-ver-consulta',
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css']
})
export class VerConsultaComponent implements OnInit {

  //Fecha de la consulta
  fecha: string;
  //Hora inicial y final de la consulta.
  hora: string;
  //Médico.
  medico: string;
  //Paciente.
  paciente: string;
  //Clínica.
  clinica: string;
  //Tipo de consulta.
  tipoConsulta: string;
  //Estudios que tendrá la consulta.
  estudios: Array<any> = new Array();
  //Identificador de la consulta tomada de la url.
  consultaId: string;
  //Precio total de los estudios.
  totalEstudios: number = 0;
  //Se obtiene el status de la consulta de la url.
  estadoConsultaUrl: string;
  //Estado de la consulta obtenida de la base de datos.
  estadoConsulta: string;

  /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      | 
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para navegar a otras url's,                           |  
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  consultasService = contiene los métodos de la bd de las consultas,   |
    |  productosService = contiene los métodos de la bd de los productos,   |
    |  rutaActual: Para obtener los parámetros de la url,                   |
    |  autenticarService = contiene los métodos de autenticación,           |
    |  utilidadesService = Contiene métodos genéricos y útiles.             |                                
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |    
    |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private esperarService: EsperarService,
    private consultasService: ConsultasService,
    private productosService: ProductosService,
    private rutaActual: ActivatedRoute,
    private autenticarService: AutenticarService,
    private utilidadesService: UtilidadesService) {

    //Obtiene el identificador de la consulta de la url.
    this.rutaActual.paramMap.subscribe(params => {

      //Se reinicia el total.
      this.totalEstudios = 0;

      this.consultaId = params.get("id");   
      this.estadoConsultaUrl = params.get("status");

      //Se inicia la espera.
      this.esperarService.esperar();

      this.consultasService.verConsulta(this.consultaId).subscribe(respuesta => {                

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]).subscribe(() => {
            //Se retorna al listado de consultas.
            this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
          });
        } else {

          this.fecha = respuesta["datos"][0]["fecha_cita_formateada"];
          this.hora = respuesta["datos"][0]["hora_inicio_cita"] + " - " + respuesta["datos"][0]["hora_fin_cita"];
          this.medico = respuesta["datos"][0]["nombres_usuario"];
          this.paciente = respuesta["datos"][0]["nombres_paciente"];
          this.clinica = respuesta["datos"][0]["nombre_clinica"];
          this.tipoConsulta = respuesta["datos"][0]["nombre_tipo_consulta"];
          this.estadoConsulta = respuesta["datos"][0]["nombre_estado_consulta"];

          this.consultasService.verEstudiosConsulta(this.consultaId).subscribe(respuestaEstudios => {

            //Se detiene la espera.          
            this.esperarService.noEsperar();


            if (respuestaEstudios["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this.utilidadesService.alerta("Error", respuestaEstudios["mensaje"]).subscribe(() => {
                //Se retorna al listado de consultas.
                this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
              });
            } else {

              respuestaEstudios["datos"].forEach(estudio => {
                //Se le suma el precio del estudio al total.
                this.totalEstudios = this.totalEstudios + Number(estudio.precio_neto);
              });
            }

            this.estudios = respuestaEstudios["datos"];

          });

        }
      });

    });


  }

  ngOnInit() {
  }

/*----------------------------------------------------------------------|
|  NOMBRE: regresar.                                                    |
|-----------------------------------------------------------------------|
|  DESCRIPCIÓN: Regresa al menú de listado de consultas.                |   
|-----------------------------------------------------------------------|
|  AUTOR: Ricardo Luna.                                                 |
|-----------------------------------------------------------------------|
|  FECHA: 09/11/2018.                                                   |    
|----------------------------------------------------------------------*/
  regresar() {
    let url: string = 'consultas/lista-consultas';
    //Si viene un estado de consulta en la url.
    this.estadoConsultaUrl ? url = url + "/" + this.estadoConsultaUrl : null;
    this.rutaNavegacion.navigateByUrl(url);
  }

}
