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
import { EditarEstudioComponent } from './editar-estudio/editar-estudio.component';
import { VerUsuariosEstudioComponent } from './ver-usuarios-estudio/ver-usuarios-estudio.component';
import { ProductosComponent } from './productos/productos.component';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';
import { UsuarioTieneEstudioGuard } from './usuario-tiene-estudio.guard';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { UsuarioTieneProductoGuard } from './usuario-tiene-producto.guard';
import { VerUsuariosProductoComponent } from './ver-usuarios-producto/ver-usuarios-producto.component';
import { InventarioProductoComponent } from './inventario-producto/inventario-producto.component';
import { MedicamentosGlobalesComponent } from './medicamentos-globales/medicamentos-globales.component';
import { DenominacionesGenericasGlobalesComponent } from './denominaciones-genericas-globales/denominaciones-genericas-globales.component';
import { AltaDenominacionGenericaGlobalComponent } from './alta-denominacion-generica-global/alta-denominacion-generica-global.component';

//Constante que contiene las rutas que tendrá el módulo.
export const rutas: Routes = [
  { path: '', component: InicioComponent },   
  { path: 'estudios', component: EstudiosComponent, canActivate: [UsuarioTieneMenuGuard]},    
  { path: 'alta-estudio', component: AltaEstudioComponent, canActivate: [UsuarioTieneMenuGuard]},   
  { path: 'editar-estudio/:id', component: EditarEstudioComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioTieneEstudioGuard]},  
  { path: 'ver-usuarios-estudio/:id', component: VerUsuariosEstudioComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioTieneEstudioGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [UsuarioTieneMenuGuard]},       
  { path: 'alta-producto', component: AltaProductoComponent, canActivate: [UsuarioTieneMenuGuard]}, 
  { path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioTieneProductoGuard]},  
  { path: 'ver-usuarios-producto/:id', component: VerUsuariosProductoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioTieneProductoGuard]},
  { path: 'inventario-producto/:id', component: InventarioProductoComponent, canActivate: [UsuarioTieneMenuGuard, UsuarioTieneProductoGuard]},
  { path: 'medicamentos-globales', component: MedicamentosGlobalesComponent, canActivate: [UsuarioTieneMenuGuard]},
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
  declarations: [ConfiguracionComponent, EstudiosComponent, AltaEstudioComponent, EditarEstudioComponent, VerUsuariosEstudioComponent, ProductosComponent, AltaProductoComponent, EditarProductoComponent, VerUsuariosProductoComponent, InventarioProductoComponent, MedicamentosGlobalesComponent, DenominacionesGenericasGlobalesComponent, AltaDenominacionGenericaGlobalComponent]
})
export class ConfiguracionModule { }
