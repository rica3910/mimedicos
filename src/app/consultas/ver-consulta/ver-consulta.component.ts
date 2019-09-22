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
  //Cantidad de diagnósticos que tiene la consulta.
  cantidadDiagnosticos: number = 0;
  //Propiedad que indica si el usuario puede dar de alta consultas.
  altaConsultas: boolean = false;
  //Propiedad que indica si el usuario puede editar consultas.
  editarConsultas: boolean = false;
  //Propiedad que indica si el usuario puede eliminar consultas.
  eliminarConsultas: boolean = false;
  //Propiedad que indica si el usuario puede cancelar consultas.
  cancelarConsultas: boolean = false;
  //Propiedad que indica si el usuario puede pasar a consultas.
  pasarAConsultas: boolean = false;
  //Propiedad que indica si el usuario puede pasar a pendiente la consulta.
  pasarAPendientes: boolean = false;
  //Propiedad que indica si el usuario puede pasar a diagnóstico la consulta.
  pasarADiagnosticos: boolean = false;
  //Propiedad que indica si el usuario puede finalizar la consulta
  finalizarConsultas: boolean = false;
  //Propiedad que indica si el usuario puede ver disgnósticos.
  verDiagnostico: boolean = false;

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
          this.cantidadDiagnosticos = respuesta["datos"][0]["cantidad_diagnosticos"];

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

  ngAfterViewInit(): void {

    //El botón de dar de alta consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ALTA CONSULTA').subscribe((respuesta: boolean) => {
      this.altaConsultas = respuesta["value"];
    });

    //El botón de editar consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('EDITAR CONSULTA').subscribe((respuesta: boolean) => {
      this.editarConsultas = respuesta["value"];
    });

    //El botón de eliminar consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('ELIMINAR CONSULTA').subscribe((respuesta: boolean) => {
      this.eliminarConsultas = respuesta["value"];
    });

    //El botón de cancelar consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('CANCELAR CONSULTA').subscribe((respuesta: boolean) => {
      this.cancelarConsultas = respuesta["value"];
    });

    //El botón de pasar a consultas se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('INICIAR CONSULTA').subscribe((respuesta: boolean) => {
      this.pasarAConsultas = respuesta["value"];
    });

    //El botón de pasar la consulta a pendiente se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('CONSULTA PENDIENTE').subscribe((respuesta: boolean) => {
      this.pasarAPendientes = respuesta["value"];
    });

    //El botón de pasar la consulta a diangóstico se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('INICIAR DIAGNOSTICO').subscribe((respuesta: boolean) => {
      this.pasarADiagnosticos = respuesta["value"];
    });

    //El botón de finalizar consulta se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('FINALIZAR CONSULTA').subscribe((respuesta: boolean) => {
      this.finalizarConsultas = respuesta["value"];
    });

    //El botón de ver diagnóstico se hará visible solamente si el usuario tiene el privilegio.
    this.autenticarService.usuarioTieneDetModulo('VER DIAGNOSTICOS').subscribe((respuesta: boolean) => {
      this.verDiagnostico = respuesta["value"];
    });


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

  /*----------------------------------------------------------------------|
    |  NOMBRE: cancelarConsulta.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para cancelar una consulta.                      |   
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
    |-----------------------------------------------------------------------|  
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/11/2018.                                                   |    
    |----------------------------------------------------------------------*/
  cancelarConsulta(consultaId: string) {

    this.utilidadesService.confirmacion("Cancelar consulta.", "¿Está seguro de cancelar la consulta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.cambiarEstadoConsulta(consultaId, 'CANCELADA').subscribe(respuesta => {
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
            this.utilidadesService.alerta("Cancelación exitosa", "La consulta se canceló satisfactoriamente.");
            window.location.reload();
          }

        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: pasarAConsulta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para iniciar una consulta.                       |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  pasarAConsulta(consultaId: string) {

    this.utilidadesService.confirmacion("Iniciar consulta.", "¿Está seguro de iniciar la consulta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.cambiarEstadoConsulta(consultaId, 'CONSULTA').subscribe(respuesta => {
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
            this.utilidadesService.alerta("Inicio de consulta exitosa", "La consulta se inició satisfactoriamente.");
            window.location.reload();
          }

        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: pasarAPendiente.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para regresar la consulta a pendiente.           |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  pasarAPendiente(consultaId: string) {

    this.utilidadesService.confirmacion("Confirmación.", "¿Está seguro de establecer la consulta en estado pendiente?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.cambiarEstadoConsulta(consultaId, 'PENDIENTE').subscribe(respuesta => {
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
            this.utilidadesService.alerta("Consulta pendiente", "La consulta se cambió a estado pendiente satisfactoriamente.");
            window.location.reload();
          }

        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: pasarADiagnostico.                                           |
  |----------------------------------------------------- -----------------|
  |  DESCRIPCIÓN: Método para pasar la consulta a diagnóstico.            |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 05/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  pasarADiagnostico(consultaId: string) {

    this.utilidadesService.confirmacion("Iniciar diagnóstico.", "¿Está seguro de pasar la consulta a diagnóstico?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.cambiarEstadoConsulta(consultaId, 'DIAGNOSTICO').subscribe(respuesta => {
          //Se finaliza la espera.
          this.esperarService.noEsperar();
          //Si hubo un error.
          if (respuesta["estado"] === "ERROR") {
            //Muestra una alerta con el porqué del error.
            this.utilidadesService.alerta("Error", respuesta["mensaje"]);
          }
          //Si todo salió bien.
          else {
            //Se abre la pantalla del listado de diagnósticos de la consulta.
            this.rutaNavegacion.navigateByUrl('consultas/lista-diagnosticos/' + consultaId);
          }

        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: finalizarConsulta.                                           |
  |----------------------------------------------------- -----------------|
  |  DESCRIPCIÓN: Método para finalizar una consulta.                     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  finalizarConsulta(consultaId: string) {

    this.utilidadesService.confirmacion("Finalizar consulta.", "¿Está seguro de finalizar la consulta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.cambiarEstadoConsulta(consultaId, 'FINALIZADA').subscribe(respuesta => {
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
            this.utilidadesService.alerta("Consulta finalizada", "La consulta se finalizó satisfactoriamente.");
            window.location.reload();
          }

        });
      }
    });
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: eliminarConsulta.                                            |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para eliminar una consulta.                      |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 31/10/2018.                                                   |    
  |----------------------------------------------------------------------*/
  eliminarConsulta(consultaId: string) {

    //Abre el modal.
    this.utilidadesService.confirmacion("Eliminar consulta.", "¿Está seguro de eliminar la consulta?").subscribe(respuesta => {
      if (respuesta == "Aceptar") {
        //Se inicia la espera en respuesta del servidor.
        this.esperarService.esperar();
        this.consultasService.eliminarConsulta(consultaId).subscribe(respuesta => {
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
            this.utilidadesService.alerta("Eliminación exitosa", "La consulta se eliminó permanentemente.");
            this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
          }
        });
      }
    });
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: editarConsulta.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que llama al formulario de editar consulta.      |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 28/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  editarConsulta(consultaId) {

    let url: string = 'consultas/editar-consulta/' + consultaId;
    this.rutaNavegacion.navigateByUrl(url);

  }

  /*----------------------------------------------------------------------|
   |  NOMBRE: verConsulta.                                                 |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método que llama al detalle de la consulta.             |    
   |-----------------------------------------------------------------------|
   |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 28/08/2018.                                                   |    
   |----------------------------------------------------------------------*/
  verConsulta(consultaId) {

    let url: string = 'consultas/ver-consulta/' + consultaId;
    this.rutaNavegacion.navigateByUrl(url);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: verDiagnosticos.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que envía a la pantalla de ver diagnósticos.     |    
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 14/08/2019.                                                   |    
  |----------------------------------------------------------------------*/
  verDiagnosticos(consultaId) {
    this.rutaNavegacion.navigateByUrl('consultas/lista-diagnosticos/' + consultaId);
  }



}
