
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
import { RouterModule, ActivatedRoute, Router, Routes } from "@angular/router";
import { PacientesComponent } from "./pacientes.component";
import { AltaPacienteComponent } from './alta-paciente/alta-paciente.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioTieneMenuGuard } from "../usuario-tiene-menu.guard";
import { ReactiveFormsModule } from "@angular/forms";

//Constante que contiene las rutas que tendrá el sistema.
export const rutas: Routes = [    
    { path: '', component: ListaPacientesComponent},        
    { path: 'lista-pacientes', component: ListaPacientesComponent, canActivate: [UsuarioTieneMenuGuard]},        
    { path: 'alta-paciente', component: AltaPacienteComponent,canActivate: [UsuarioTieneMenuGuard]},        
    { path: '**', redirectTo: 'pacientes'}    
  ];

  @NgModule({
    declarations: [
      PacientesComponent,
      AltaPacienteComponent,
      ListaPacientesComponent
    ],  
    exports: [
        PacientesComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      NgbModule.forRoot(),
      ReactiveFormsModule
    ],
    providers: [          
      UsuarioTieneMenuGuard      
    ]
  })
  export class PacientesModule{}