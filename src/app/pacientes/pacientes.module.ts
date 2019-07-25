
/******************************************************************|
|NOMBRE: PacientesModule.                                          | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Módulo de los pacientes.                             |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 13/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PacientesComponent } from "./pacientes.component";
import { AltaPacienteComponent } from './alta-paciente/alta-paciente.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioTieneMenuGuard } from "../usuario-tiene-menu.guard";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { UsuarioTienePacienteGuard } from "./usuario-tiene-paciente.guard";
import { VerPacienteComponent } from './ver-paciente/ver-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { ListaFichasClinicasPacienteComponent } from './lista-fichas-clinicas-paciente/lista-fichas-clinicas-paciente.component';
import { AltaFichaClinicaPacienteComponent } from './alta-ficha-clinica-paciente/alta-ficha-clinica-paciente.component';
import { EditarFichaClinicaPacienteComponent } from './editar-ficha-clinica-paciente/editar-ficha-clinica-paciente.component';
import { NgxEditorModule } from 'ngx-editor';
import { UsuarioPuedeManipularFichasClinicasGuard } from "./usuario-puede-manipular-fichas-clinicas.guard";
import { InfoPacienteComponent } from "../info-paciente/info-paciente.component";
import { VerFichaClinicaComponent } from './ver-ficha-clinica/ver-ficha-clinica.component';
import { InfoFichaClinicaComponent } from './info-ficha-clinica/info-ficha-clinica.component';



//Constante que contiene las rutas que tendrá el sistema.
export const rutas: Routes = [    
    { path: '', redirectTo: 'lista-pacientes', pathMatch: 'full'},      
    { path: 'lista-pacientes', component: ListaPacientesComponent, canActivate: [UsuarioTieneMenuGuard]},        
    { path: 'alta-paciente', component: AltaPacienteComponent,canActivate: [UsuarioTieneMenuGuard]},        
    { path: 'ver-paciente/:id', component: VerPacienteComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioTienePacienteGuard]},  
    { path: 'editar-paciente/:id', component:EditarPacienteComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioTienePacienteGuard]},      
    { path: 'lista-fichas-clinicas-paciente/:id', component:ListaFichasClinicasPacienteComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioTienePacienteGuard]},          
    { path: 'alta-ficha-clinica-paciente/:id', component:AltaFichaClinicaPacienteComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioTienePacienteGuard]},          
    { path: 'editar-ficha-clinica-paciente/:pacienteId/:fichaClinicaId', component:EditarFichaClinicaPacienteComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeManipularFichasClinicasGuard]},              
    { path: 'ver-ficha-clinica-paciente/:pacienteId/:fichaClinicaId', component:VerFichaClinicaComponent,canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeManipularFichasClinicasGuard]},              
    { path: '**', redirectTo: 'lista-pacientes'}    
  ];

  @NgModule({
    declarations: [
      PacientesComponent,
      AltaPacienteComponent,
      ListaPacientesComponent,
      VerPacienteComponent,
      EditarPacienteComponent,
      ListaFichasClinicasPacienteComponent,
      AltaFichaClinicaPacienteComponent,
      EditarFichaClinicaPacienteComponent,
      InfoPacienteComponent,
      VerFichaClinicaComponent,
      InfoFichaClinicaComponent
    ],  
    exports: [
        PacientesComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      RouterModule,
      NgbModule.forRoot(),
      ReactiveFormsModule,
      NgxEditorModule
    ],
    providers: [          
      UsuarioTieneMenuGuard,
      UsuarioTienePacienteGuard,
      UsuarioPuedeManipularFichasClinicasGuard     
    ]
  })
  export class PacientesModule{}