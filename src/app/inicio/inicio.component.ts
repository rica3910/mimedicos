import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AutenticarService } from '../autenticar.service';
import { EsperarService } from '../esperar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoAlertaComponent } from '../dialogo-alerta/dialogo-alerta.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
  |                                        si un usuario está conectado,  |
  |                         esperar      = contiene los métodos para      |  
  |                                        abrir modals de espera,        |  
  |                         modal        = contiene los métodos para      |
  |                                        manipular los modals,          |            
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 29/06/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private autorizacion: AutenticarService,
    private esperar: EsperarService,
    private modal: NgbModal, ) { }

  ngOnInit() {
    //Se despliega el modal de esperar porque se está haciendo una petición al servidor.
    this.esperar.esperar();
    //Se valida el token al iniciar la página.
    this.autorizacion.validarToken(null, 1)
      .subscribe(() => {
        //Se finaliza la espera.
        this.esperar.noEsperar();
      });
  }

}
