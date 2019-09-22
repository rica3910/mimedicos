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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConsultasComponent } from './consultas.component';
import { AltaConsultaComponent } from './alta-consulta/alta-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { UsuarioPuedeModificarConsultaGuard } from './usuario-puede-modificar-consulta.guard';
import { UsuarioPuedeVerDiagnosticosGuard } from './usuario-puede-ver-diagnosticos.guard';
import { ListaDiagnosticosComponent } from './lista-diagnosticos/lista-diagnosticos.component';
import { AltaDiagnosticoComponent } from './alta-diagnostico/alta-diagnostico.component';
import { UsuarioPuedeCrearDiagnosticosGuard } from './usuario-puede-crear-diagnosticos.guard';
import { EditarDiagnosticoComponent } from './editar-diagnostico/editar-diagnostico.component';
import { UsuarioPuedeEditarDiagnosticosGuard } from './usuario-puede-editar-diagnosticos.guard';
import { InfoConsultaComponent } from './info-consulta/info-consulta.component';
import { NgxEditorModule } from 'ngx-editor';
import { VerDiagnosticoComponent } from './ver-diagnostico/ver-diagnostico.component';
import { UsuarioPuedeVerDiagnosticoGuard } from './usuario-puede-ver-diagnostico.guard';
import { VerConsultaComponent } from './ver-consulta/ver-consulta.component';
import { UsuarioPuedeVerConsultaGuard } from './usuario-puede-ver-consulta.guard';
import { ListaRecetasComponent } from './lista-recetas/lista-recetas.component';
import { UsuarioPuedeVerRecetasGuard } from './usuario-puede-ver-recetas.guard';
import { AltaRecetaComponent } from './alta-receta/alta-receta.component';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', redirectTo: 'lista-consultas', pathMatch: 'full' },
  { path: 'lista-consultas', component: ListaConsultasComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: 'lista-consultas/:status', component: ListaConsultasComponent, canActivate: [UsuarioTieneMenuGuard]}, 
  { path: 'alta-consulta', component: AltaConsultaComponent, canActivate: [UsuarioTieneMenuGuard]},     
  { path: 'alta-consulta/:fecha/:hora', component: AltaConsultaComponent, canActivate: [UsuarioTieneMenuGuard]},     
  { path: 'editar-consulta/:id', component: EditarConsultaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarConsultaGuard]},
  { path: 'editar-consulta/:id/:status', component: EditarConsultaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeModificarConsultaGuard]},
  { path: 'ver-consulta/:id', component: VerConsultaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerConsultaGuard]},
  { path: 'ver-consulta/:id/:status', component: VerConsultaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerConsultaGuard]},
  { path: 'lista-diagnosticos/:id', component: ListaDiagnosticosComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerDiagnosticosGuard]},
  { path: 'alta-diagnostico/:id', component: AltaDiagnosticoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeCrearDiagnosticosGuard]},
  { path: 'editar-diagnostico/:id/:diagnosticoId', component: EditarDiagnosticoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeCrearDiagnosticosGuard, UsuarioPuedeEditarDiagnosticosGuard]},  
  { path: 'ver-diagnostico/:id/:diagnosticoId', component: VerDiagnosticoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerDiagnosticoGuard]},  
  { path: 'lista-recetas/:id', component: ListaRecetasComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerRecetasGuard]},  
  { path: 'alta-receta/:id', component: AltaRecetaComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerRecetasGuard]},  
  { path: '**', redirectTo: 'lista-consultas', pathMatch: 'full'  }  
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxEditorModule
  ],
  declarations: [
    ListaConsultasComponent, 
    ConsultasComponent, 
    AltaConsultaComponent, 
    EditarConsultaComponent, 
    ListaDiagnosticosComponent,
    AltaDiagnosticoComponent,
    EditarDiagnosticoComponent,
    InfoConsultaComponent,
    VerDiagnosticoComponent,
    VerConsultaComponent,
    ListaRecetasComponent,
    AltaRecetaComponent
  ],
  exports: [ConsultasComponent],
  providers: [
    UsuarioTieneMenuGuard,
    UsuarioPuedeModificarConsultaGuard,
    UsuarioPuedeVerDiagnosticosGuard,
    UsuarioPuedeCrearDiagnosticosGuard,
    UsuarioPuedeEditarDiagnosticosGuard,
    UsuarioPuedeVerDiagnosticoGuard,
    UsuarioPuedeVerRecetasGuard
  ]
})
export class ConsultasModule { }
