import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaDiagnosticosComponent } from './lista-diagnosticos/lista-diagnosticos.component';
import { UsuarioTieneMenuGuard } from '../usuario-tiene-menu.guard';
import { UsuarioPuedeVerDiagnosticosGuard } from './usuario-puede-ver-diagnosticos.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '/:id', redirectTo: 'lista-diagnosticos/:id', pathMatch: 'full' },
  { path: 'lista-diagnosticos/:id', component: ListaDiagnosticosComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerDiagnosticosGuard]}  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ListaDiagnosticosComponent
  ],  
  providers: [
    UsuarioTieneMenuGuard,
    UsuarioPuedeVerDiagnosticosGuard    
  ]
})
export class DiagnosticosModule { }
