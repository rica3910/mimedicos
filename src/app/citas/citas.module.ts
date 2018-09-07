
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
import { AltaCitaComponent } from './alta-cita/alta-cita.component';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';
import { UsuarioPuedeModificarCitaGuard } from './usuario-puede-modificar-cita.guard';
import { AltaDetCitaComponent } from './alta-det-cita/alta-det-cita.component';
import { VerCitaComponent } from './ver-cita/ver-cita.component';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', component: ListaCitasComponent },
  { path: 'lista-citas', component: ListaCitasComponent, canActivate: [UsuarioTieneMenuGuard]}, 
  { path: 'alta-cita', component: AltaCitaComponent, canActivate: [UsuarioTieneMenuGuard]}, 
  { path: 'editar-cita/:id', component: EditarCitaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarCitaGuard]}, 
  { path: 'alta-det-cita/:id', component: AltaDetCitaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarCitaGuard]},  
  { path: 'ver-cita/:id/:soloVer', component: VerCitaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarCitaGuard]}  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [CitasComponent, ListaCitasComponent, AltaCitaComponent, EditarCitaComponent, AltaDetCitaComponent, VerCitaComponent],
  exports: [CitasComponent],
  providers: [
    UsuarioTieneMenuGuard, UsuarioPuedeModificarCitaGuard    
  ]

})
export class CitasModule { }
