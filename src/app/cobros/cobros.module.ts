import { UsuarioPuedeVerHistorialCobroGuard } from './usuario-puede-ver-historial-cobro.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobrosComponent } from './cobros.component';
import { UsuarioTieneMenuGuard } from '../usuario-tiene-menu.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListaCobrosComponent } from './lista-cobros/lista-cobros.component';
import { AltaCobroComponent } from './alta-cobro/alta-cobro.component';
import { AgregarAbonoComponent } from '../agregar-abono/agregar-abono.component';
import { HistorialCobroComponent } from './historial-cobro/historial-cobro.component';
import { ResumenCobroComponent } from './resumen-cobro/resumen-cobro.component';
import { AltaConsultaCobroComponent } from './alta-consulta-cobro/alta-consulta-cobro.component';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', redirectTo: 'lista-cobros', pathMatch: 'full'},  
  { path: 'lista-cobros', component: ListaCobrosComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: 'alta-cobro', component: AltaCobroComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: 'historial-cobro/:id', component: HistorialCobroComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioPuedeVerHistorialCobroGuard]}, 
  { path: '**', redirectTo: 'lista-cobros', pathMatch: 'full'  }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule.forRoot()    
  ],
  declarations: [ListaCobrosComponent, CobrosComponent, AltaCobroComponent, AgregarAbonoComponent, HistorialCobroComponent, ResumenCobroComponent, AltaConsultaCobroComponent],
  exports: [CobrosComponent],
  providers: [ UsuarioTieneMenuGuard]
})
export class CobrosModule { }
