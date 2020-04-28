/******************************************************************|
|NOMBRE: ConfiguracionModule.                                      | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Módulo de las configuraciones.                       |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 24/04/2020.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './../inicio/inicio.component';
import { ConfiguracionComponent } from './configuracion.component';
import { UsuarioTieneMenuGuard } from './../usuario-tiene-menu.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiosComponent } from './estudios/estudios.component';
import { AltaEstudioComponent } from './alta-estudio/alta-estudio.component';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', component: InicioComponent },   
  { path: 'estudios', component: EstudiosComponent, canActivate: [UsuarioTieneMenuGuard]},    
  { path: 'alta-estudio', component: AltaEstudioComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: '**', redirectTo: '', pathMatch: 'full'  }  
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule.forRoot()   
  ],
  declarations: [ConfiguracionComponent, EstudiosComponent, AltaEstudioComponent]
})
export class ConfiguracionModule { }
