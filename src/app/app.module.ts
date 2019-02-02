
/******************************************************************|
|NOMBRE: appModule.                                                | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Módulo principal del sistema                         |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_PROVIDERS } from './autenticar.service';
import { WAIT_MODAL_PROVIDERS } from './esperar.service';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioIngresadoGuard } from './usuario-ingresado.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { LogoutComponent } from './logout/logout.component';
import { DialogoAlertaComponent } from './dialogo-alerta/dialogo-alerta.component';
import { DialogoEsperaComponent } from './dialogo-espera/dialogo-espera.component';
import { HttpClientModule } from '@angular/common/http';
import { CambiarPasswordOlvidadoComponent } from './cambiar-password-olvidado/cambiar-password-olvidado.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PaginaInvalidaComponent } from './pagina-invalida/pagina-invalida.component';
import { PACIENTES_PROVIDERS } from './pacientes.service';
import { UsuarioTieneMenuGuard } from './usuario-tiene-menu.guard';
import { UTILIDADES_PROVIDERS } from './utilidades.service';
import { rutas as  rutasPacientes, PacientesModule} from './pacientes/pacientes.module';
import { rutas as  rutasConsultas, ConsultasModule } from './consultas/consultas.module';
import { ORGANIZACIONES_PROVIDERS } from './organizaciones.service';
import { CLINICAS_PROVIDERS } from './clinicas.service';
import { USUARIOS_PROVIDERS } from './usuarios.service';
import { CONSULTAS_PROVIDERS } from './consultas.service';
import { ConsultasComponent } from './consultas/consultas.component';
import { DesplegarImagenComponent } from './desplegar-imagen/desplegar-imagen.component';
import { DibujoComponent } from './dibujo/dibujo.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSliderModule} from '@angular/material/slider';
import { FullCalendarModule } from 'ng-fullcalendar';
import { PRODUCTOS_PROVIDERS } from './productos.service';
import { FORMULARIOS_PROVIDERS } from './formularios.service';
import * as $ from 'jquery';
import { PDFCARTA_PROVIDERS } from './pdfcarta.service';


//Constante que contiene las rutas que tendrá el sistema.
const rutas: Routes = [    
  { path: '', redirectTo: 'ingresar', pathMatch: 'full'}, 
  { path: 'ingresar', component: LoginComponent},      
  { path: 'cambiar-password-olvidado/:token', component: CambiarPasswordOlvidadoComponent},  
  { path: 'inicio', component: InicioComponent, canActivate: [UsuarioIngresadoGuard] },  
  { path: 'pacientes', component: PacientesComponent, canActivate: [UsuarioIngresadoGuard, UsuarioTieneMenuGuard], children: rutasPacientes },     
  { path: 'consultas', component: ConsultasComponent, canActivate: [UsuarioIngresadoGuard, UsuarioTieneMenuGuard], children: rutasConsultas },
  { path: '**', component: PaginaInvalidaComponent, canActivate: [UsuarioIngresadoGuard] }    
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DialogoConfirmacionComponent,
    LogoutComponent,
    DialogoAlertaComponent,
    DialogoEsperaComponent,
    CambiarPasswordOlvidadoComponent,    
    PaginaInvalidaComponent, 
    DesplegarImagenComponent, 
    DibujoComponent
  ],  
  entryComponents: [
    DialogoConfirmacionComponent, 
    DialogoAlertaComponent, 
    DialogoEsperaComponent,
    DesplegarImagenComponent,
    DibujoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(rutas),
    HttpClientModule,
    PacientesModule,
    ConsultasModule,
    SignaturePadModule,
    ColorPickerModule,
    MatSliderModule,
    FullCalendarModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    AUTH_PROVIDERS,
    WAIT_MODAL_PROVIDERS,      
    UsuarioIngresadoGuard,
    UsuarioTieneMenuGuard,
    {provide: 'URL_API_BACKEND', useValue: 'http://telmexcatedral.ddns.net/mimedicos-backend/index.php/'},
    PACIENTES_PROVIDERS,
    UTILIDADES_PROVIDERS,
    ORGANIZACIONES_PROVIDERS,
    CLINICAS_PROVIDERS,
    USUARIOS_PROVIDERS,
    CONSULTAS_PROVIDERS,
    PRODUCTOS_PROVIDERS,
    FORMULARIOS_PROVIDERS,
    PDFCARTA_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
