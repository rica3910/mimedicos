
/******************************************************************|
|NOMBRE: CitasModule.                                              | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Módulo de las citas.                                 |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioTieneMenuGuard } from '../usuario-tiene-menu.guard';
import { UsuarioTienePacienteGuard } from '../pacientes/usuario-tiene-paciente.guard';


//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', component: ListaCitasComponent },
  { path: 'lista-citas', component: ListaCitasComponent, canActivate: [UsuarioTieneMenuGuard]}, 
  { path: '**', redirectTo: 'citas' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [CitasComponent, ListaCitasComponent],
  exports: [CitasComponent],
  providers: [
    UsuarioTieneMenuGuard,
    UsuarioTienePacienteGuard
  ]

})
export class CitasModule { }
