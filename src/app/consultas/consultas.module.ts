/******************************************************************|
|NOMBRE: ConsultasModule.                                          | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Módulo de las consultas.                             |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 28/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaConsultasComponent } from './lista-consultas/lista-consultas.component';
import { UsuarioTieneMenuGuard } from '../usuario-tiene-menu.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultasComponent } from './consultas.component';
import { AltaConsultaComponent } from './alta-consulta/alta-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { UsuarioPuedeModificarConsultaGuard } from './usuario-puede-modificar-consulta.guard';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', redirectTo: 'lista-consultas', pathMatch: 'full' },
  { path: 'lista-consultas', component: ListaConsultasComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: 'alta-consulta', component: AltaConsultaComponent, canActivate: [UsuarioTieneMenuGuard]},     
  { path: 'editar-consulta/:id', component: EditarConsultaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarConsultaGuard]}  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ListaConsultasComponent, 
    ConsultasComponent, 
    AltaConsultaComponent, 
    EditarConsultaComponent],
  exports: [ConsultasComponent],
  providers: [
    UsuarioTieneMenuGuard,
    UsuarioPuedeModificarConsultaGuard    
  ]
})
export class ConsultasModule { }
