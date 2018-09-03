(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/******************************************************************|\n|NOMBRE: CSS de la aplicación en general.                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos modificados de la página      |\n|             en general.                                          |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Elementos HTML de ligas*/\n\na{\n    /*No llevarán caja o margen alrededor.*/\n    outline:none;    \n}\n\n/*Tamaño de letra de las opciones del menú.*/\n\n.menu-opcion{\n    font-size: 20px; \n    color: rgb(110, 110, 110) !important;\n}\n\n/*Color de las opciones del menú cuando el mouse esté por encima, cuando se está pulsando el mouse.\ny cuando está seleccionado.*/\n\n.menu-opcion:hover, .active-link {    \n    color: rgb(0, 162, 232) !important;\n}\n\n/*Clase para el color de los botones desplegbales, color de fuente y tamaño de fuente.*/\n\n.btn-desplegable{\n    background-color: rgb(0, 162, 232);\n    color: white;\n    font-size: 20px; \n  }\n\n/*Color y tamaño de letra en estado normal de los elementos del  menú desplegable.*/\n\n.dropdown-item{\n    color: rgb(110, 110, 110);\n    font-size: 20px; \n  }\n\n/*Color de letra de los elementos del  menú desplegable.*/\n\n.dropdown-item:active{\n    background-color: rgb(0, 162, 232);\n    color: white;\n}\n    \n\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: app.                                                      | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página  principal de la aplicación.                  |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n<!--Si el usuario está conectado-->\n<ng-container *ngIf=\"autorizacion.obtenerToken()!== null; then thenTemplate; else elseTemplate\">\n</ng-container>\n<!--Template de cuando el usuario está conectado. Se muestra el menú principal-->\n<ng-template #thenTemplate>\n  <div class=\"container\">\n    <header class=\"navbar navbar-light navbar-fixed-top navbar-expand-lg bg-light\">\n      <a class=\"navbar-brand\" [routerLink]=\"['/inicio']\">\n        <img src=\"../assets/img/logo_resumen.png\" width=\"60\" height=\"30\">\n      </a>\n      <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" (click)=\"navbarCollapsed = !navbarCollapsed\" [attr.aria-expanded]=\"!navbarCollapsed\"\n        aria-controls=\"navbarContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"navbar-collapse\" [ngbCollapse]=\"navbarCollapsed\" id=\"navbarContent\">\n        <ul class=\"navbar-nav mr-auto\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link menu-opcion\" [routerLinkActive]=\"['active-link']\" [routerLink]=\"['/inicio']\">Inicio</a>\n          </li>\n          <li class=\"nav-item\"  *ngIf=\"autorizacion.obtenerMenusArreglo().includes('pacientes')\">\n            <a class=\"nav-link menu-opcion\" [routerLinkActive]=\"['active-link']\" [routerLink]=\"['/pacientes']\">Pacientes</a>\n          </li>      \n          <li class=\"nav-item\"  *ngIf=\"autorizacion.obtenerMenusArreglo().includes('citas')\">\n            <a class=\"nav-link menu-opcion\" [routerLinkActive]=\"['active-link']\" [routerLink]=\"['/citas']\">Citas</a>\n          </li>    \n          <li class=\"nav-item\"  *ngIf=\"autorizacion.obtenerMenusArreglo().includes('consultas')\">\n            <a class=\"nav-link menu-opcion\" [routerLinkActive]=\"['active-link']\" [routerLink]=\"['/consultas']\">Consultas</a>\n          </li>                     \n        </ul>        \n        <div ngbDropdown class=\"d-inline-block\">\n          <button class=\"btn btn-desplegable\" id=\"dropdownBasic1\" ngbDropdownToggle>{{autorizacion.obtenerNombreUsuario()}}</button>\n          <div ngbDropdownMenu aria-labelledby=\"dropdownBasic1\">\n            <button class=\"dropdown-item\">Cambiar password</button>            \n            <app-logout (emitirSalir)=\"salir($event)\"></app-logout>        \n          </div>\n        </div>\n      </div>\n    </header>\n    <hr>\n    <router-outlet></router-outlet>\n  </div>\n</ng-template>\n<!--Fin del template #thenTemplate.-->\n<!--Template de cuando el usuario NO está conectado.-->\n<ng-template #elseTemplate>\n  <!--Template de login.-->\n  <app-login *ngIf=\"!rutaNavegacion.url.includes('/cambiar-password-olvidado')\">\n  </app-login>\n  <!--Template de cambiar password.-->\n  <app-cambiar-password-olvidado *ngIf=\"rutaNavegacion.url.includes('/cambiar-password-olvidado')\">\n  </app-cambiar-password-olvidado>\n</ng-template>\n<!--Fin del template #elseTemplate.-->"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/observable/timer */ "./node_modules/rxjs-compat/_esm5/observable/timer.js");
/******************************************************************|
|NOMBRE: AppComponent.                                             |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente principal del sistema                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado,  |
    |                         modal        = contiene los métodos para      |
    |                                        manipular los modals,          |
    |                         esperar      = contiene los métodos para      |
    |                                        abrir modals de espera,        |
    |                     rutaNavegacion   = para manipular las url's       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function AppComponent(autorizacion, modal, esperar, rutaNavegacion) {
        this.autorizacion = autorizacion;
        this.modal = modal;
        this.esperar = esperar;
        this.rutaNavegacion = rutaNavegacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: ngOnInit.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que se inicia junto con el componente.           |
    |               Estará comparando cada 30 segundos que el usuario esté  |
    |               logueado.                                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Observador que se ejecuta cada 30 segundos para verificar que el token del usuario sea válido.
        Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_6__["timer"])(0, 30000).subscribe(function (t) {
            _this.autorizacion.estaConectado()
                .subscribe(function (respuesta) {
                //Si el token está inactivo o caduco y el usuario se encuentra logueado.
                if (respuesta !== false && respuesta["estado"] === "ERROR") {
                    //Abre el modal de tamaño chico.
                    var modalRef = _this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_3__["DialogoAlertaComponent"], { centered: true });
                    //Define el título del modal.
                    modalRef.componentInstance.titulo = "Sesión finalizada";
                    //Define el mensaje del modal.
                    modalRef.componentInstance.mensaje = respuesta["mensaje"];
                    //Define la etiqueta del botón de Aceptar.
                    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
                }
            });
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: salir.                                                       |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para salirse o desloguearse del sistema.         |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: resultado = Obtiene el resultado del botón    |
    |                                     que se oprimió: Sí o No           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    AppComponent.prototype.salir = function (resultado) {
        var _this = this;
        //Si el resultado es Sí, entonces se sale del sistema. Mandando la página de ingresar.
        if (resultado == 'Sí') {
            //Se abre el modal de esperar, indicando que se hará una petición al servidor.
            this.esperar.esperar();
            this.autorizacion.logout().subscribe(function () {
                //Se detiene la espera.
                _this.esperar.noEsperar();
                //Navega a la url ingresar.
                _this.rutaNavegacion.navigate(['ingresar']);
            });
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_1__["AutenticarService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_4__["EsperarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _inicio_inicio_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./inicio/inicio.component */ "./src/app/inicio/inicio.component.ts");
/* harmony import */ var _usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./usuario-ingresado.guard */ "./src/app/usuario-ingresado.guard.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _dialogo_espera_dialogo_espera_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dialogo-espera/dialogo-espera.component */ "./src/app/dialogo-espera/dialogo-espera.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _cambiar_password_olvidado_cambiar_password_olvidado_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./cambiar-password-olvidado/cambiar-password-olvidado.component */ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.ts");
/* harmony import */ var _pacientes_pacientes_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pacientes/pacientes.component */ "./src/app/pacientes/pacientes.component.ts");
/* harmony import */ var _pagina_invalida_pagina_invalida_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pagina-invalida/pagina-invalida.component */ "./src/app/pagina-invalida/pagina-invalida.component.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./usuario-tiene-menu.guard */ "./src/app/usuario-tiene-menu.guard.ts");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _pacientes_pacientes_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pacientes/pacientes.module */ "./src/app/pacientes/pacientes.module.ts");
/* harmony import */ var _citas_citas_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./citas/citas.module */ "./src/app/citas/citas.module.ts");
/* harmony import */ var _consultas_consultas_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./consultas/consultas.module */ "./src/app/consultas/consultas.module.ts");
/* harmony import */ var _citas_citas_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./citas/citas.component */ "./src/app/citas/citas.component.ts");
/* harmony import */ var _organizaciones_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./organizaciones.service */ "./src/app/organizaciones.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _citas_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./citas.service */ "./src/app/citas.service.ts");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _consultas_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./consultas.service */ "./src/app/consultas.service.ts");
/* harmony import */ var _consultas_consultas_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./consultas/consultas.component */ "./src/app/consultas/consultas.component.ts");
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































//Constante que contiene las rutas que tendrá el sistema.
var rutas = [
    { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
    { path: 'ingresar', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'cambiar-password-olvidado/:token', component: _cambiar_password_olvidado_cambiar_password_olvidado_component__WEBPACK_IMPORTED_MODULE_17__["CambiarPasswordOlvidadoComponent"] },
    { path: 'inicio', component: _inicio_inicio_component__WEBPACK_IMPORTED_MODULE_9__["InicioComponent"], canActivate: [_usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"]] },
    { path: 'pacientes', component: _pacientes_pacientes_component__WEBPACK_IMPORTED_MODULE_18__["PacientesComponent"], canActivate: [_usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"], _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_21__["UsuarioTieneMenuGuard"]], children: _pacientes_pacientes_module__WEBPACK_IMPORTED_MODULE_23__["rutas"] },
    { path: 'citas', component: _citas_citas_component__WEBPACK_IMPORTED_MODULE_26__["CitasComponent"], canActivate: [_usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"], _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_21__["UsuarioTieneMenuGuard"]], children: _citas_citas_module__WEBPACK_IMPORTED_MODULE_24__["rutas"] },
    { path: 'consultas', component: _consultas_consultas_component__WEBPACK_IMPORTED_MODULE_32__["ConsultasComponent"], canActivate: [_usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"], _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_21__["UsuarioTieneMenuGuard"]], children: _consultas_consultas_module__WEBPACK_IMPORTED_MODULE_25__["rutas"] },
    { path: '**', component: _pagina_invalida_pagina_invalida_component__WEBPACK_IMPORTED_MODULE_19__["PaginaInvalidaComponent"], canActivate: [_usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"]] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
                _inicio_inicio_component__WEBPACK_IMPORTED_MODULE_9__["InicioComponent"],
                _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_12__["DialogoConfirmacionComponent"],
                _logout_logout_component__WEBPACK_IMPORTED_MODULE_13__["LogoutComponent"],
                _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_14__["DialogoAlertaComponent"],
                _dialogo_espera_dialogo_espera_component__WEBPACK_IMPORTED_MODULE_15__["DialogoEsperaComponent"],
                _cambiar_password_olvidado_cambiar_password_olvidado_component__WEBPACK_IMPORTED_MODULE_17__["CambiarPasswordOlvidadoComponent"],
                _pagina_invalida_pagina_invalida_component__WEBPACK_IMPORTED_MODULE_19__["PaginaInvalidaComponent"]
            ],
            entryComponents: [
                _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_12__["DialogoConfirmacionComponent"],
                _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_14__["DialogoAlertaComponent"],
                _dialogo_espera_dialogo_espera_component__WEBPACK_IMPORTED_MODULE_15__["DialogoEsperaComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(rutas),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_16__["HttpClientModule"],
                _pacientes_pacientes_module__WEBPACK_IMPORTED_MODULE_23__["PacientesModule"],
                _citas_citas_module__WEBPACK_IMPORTED_MODULE_24__["CitasModule"],
                _consultas_consultas_module__WEBPACK_IMPORTED_MODULE_25__["ConsultasModule"]
            ],
            providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_11__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_11__["HashLocationStrategy"] },
                _autenticar_service__WEBPACK_IMPORTED_MODULE_6__["AUTH_PROVIDERS"],
                _esperar_service__WEBPACK_IMPORTED_MODULE_7__["WAIT_MODAL_PROVIDERS"],
                _usuario_ingresado_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioIngresadoGuard"],
                _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_21__["UsuarioTieneMenuGuard"],
                { provide: 'URL_API_BACKEND', useValue: 'http://telmexcatedral.ddns.net/mimedicos-backend/index.php/' },
                _pacientes_service__WEBPACK_IMPORTED_MODULE_20__["PACIENTES_PROVIDERS"],
                _utilidades_service__WEBPACK_IMPORTED_MODULE_22__["UTILIDADES_PROVIDERS"],
                _organizaciones_service__WEBPACK_IMPORTED_MODULE_27__["ORGANIZACIONES_PROVIDERS"],
                _clinicas_service__WEBPACK_IMPORTED_MODULE_28__["CLINICAS_PROVIDERS"],
                _citas_service__WEBPACK_IMPORTED_MODULE_29__["CITAS_PROVIDERS"],
                _usuarios_service__WEBPACK_IMPORTED_MODULE_30__["USUARIOS_PROVIDERS"],
                _consultas_service__WEBPACK_IMPORTED_MODULE_31__["CONSULTAS_PROVIDERS"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/autenticar.service.ts":
/*!***************************************!*\
  !*** ./src/app/autenticar.service.ts ***!
  \***************************************/
/*! exports provided: AutenticarService, AUTH_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutenticarService", function() { return AutenticarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTH_PROVIDERS", function() { return AUTH_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/******************************************************************|
|NOMBRE: Autenticar.                                               |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio para autenticar o ingresar al sistema.      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AutenticarService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    function AutenticarService(http, urlApi) {
        this.http = http;
        this.urlApi = urlApi;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: login.                                                       |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para ingresar al  sistema.                       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: usuario   = Usuario del sistema,              |
    |                         password  = Contraseña del usuario.           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.login = function (usuario, password) {
        var _this = this;
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            usuario: usuario,
            password: password
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Le agrega el header codificado.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'ingresar', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
            //Si el ingreso se hace satisfactoriamente.
            if (respuesta["estado"] !== "ERROR") {
                //Se almacena el token en el navegador del cliente..
                _this._guardarToken(respuesta["token"]);
                _this._guardarNombreUsuario(respuesta["usuario"]);
                //Arreglo que contiene todos los menús del sistema.
                var urlsMenus_1 = ["pacientes", "citas", "consultas"];
                //Se borran los  menús en caso de que haya.
                _this._eliminarMenus();
                //Establecer los menús que pueda utilizar el usuario ingresado.          
                urlsMenus_1.forEach(function (url, indice) {
                    _this.usuarioTieneMenu(url)
                        .subscribe(function (menu) {
                        //Si sí tiene el menú, lo añade al arreglo de los menús del usuario logueado.
                        if (menu["value"]) {
                            //Si es es el último url o menú.                  
                            if (indice == urlsMenus_1.length - 1) {
                                _this._guardarMenus(url, true);
                            }
                            else {
                                _this._guardarMenus(url);
                            }
                        }
                    });
                });
            }
            return respuesta;
        }));
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _eliminarMenus.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar los menús.                         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._eliminarMenus = function () {
        localStorage.removeItem('menus');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerMenus.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los menús del usuario logueado.     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._obtenerMenus = function () {
        return localStorage.getItem('menus');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerMenusArreglo                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los menús del usuario logueado      |
    |  en forma de arreglo.                                                 |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.obtenerMenusArreglo = function () {
        //Variable que se retornará.
        var menus = new Array();
        //Si hay menús.
        if (this._obtenerMenus() !== null) {
            //Se almacenan los menús en una constante de tipo cadena para obtener los métodos.
            var menusString = this._obtenerMenus();
            //Se transforman los menús en un arreglo.
            menus = menusString.split(",");
        }
        //Se retornan los menús.
        return menus;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _guardarMenus.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para almacenar los menús que tiene el usuario.   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: menu   = menú o url que se agregará,          |
    |                         final = si es el último menú.                 |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._guardarMenus = function (menu, final) {
        if (final === void 0) { final = false; }
        //SÍ hay menús guardados.
        if (this._obtenerMenus() !== null) {
            //Si es el último menú.
            if (final) {
                localStorage.setItem("menus", this._obtenerMenus() + menu);
            }
            else {
                localStorage.setItem("menus", this._obtenerMenus() + menu + ",");
            }
        }
        else {
            //Se empieza a armar la cadena con comas.      
            //Si es el último menú.
            if (final) {
                localStorage.setItem("menus", menu);
            }
            else {
                localStorage.setItem("menus", menu + ",");
            }
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _guardarToken.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para almacenar el token.                         |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: token   = token de la sesión actual.          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._guardarToken = function (token) {
        localStorage.setItem('token', token);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _guardarNombreUsuario.                                       |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para almacenar el nombre del usuario.            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: nombre = Nombre del usuario.                  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._guardarNombreUsuario = function (nombre) {
        localStorage.setItem('usuario', nombre);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _eliminarNombreUsuario.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar el nombre del usuario.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._eliminarNombreUsuario = function () {
        localStorage.removeItem('usuario');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerNombreUsuario.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener el nombre del usuario.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.obtenerNombreUsuario = function () {
        return localStorage.getItem('usuario');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarToken.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar el token.                          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 18/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype._eliminarToken = function () {
        localStorage.removeItem('token');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: logout.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para salirse del sistema.                        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.logout = function () {
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Elimina el token.
            this._eliminarToken();
            //Elimina el nombre del usuario.
            this._eliminarNombreUsuario();
            //Elimina los menús.
            this._eliminarMenus();
            return this.http.post(this.urlApi + 'salir', "", { headers: headers });
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerToken.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener el token.                           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.obtenerToken = function () {
        return localStorage.getItem('token');
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: estaConectado.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para saber si el usuario está conectado          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |                         en caso de que el usuario esté conectado o no |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.estaConectado = function () {
        var _this = this;
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend.
            return this.http.get(this.urlApi + 'validar-token/0', { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si el token está inactivo o caduco y el usuario está logueado.
                if (respuesta["estado"] === "ERROR") {
                    //Se desloguea del sistema.
                    _this.logout().subscribe();
                }
                return respuesta;
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: validarToken.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para validar un token.                           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: token = token a validar.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |                         en caso de que el token esté correcto o no    |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.validarToken = function (token) {
        //Si la longitud del token es menor de 40, entonces el token es inválido.
        if (token.length < 40) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
        }
        //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': token
        });
        //Si no está conectado y se olvidó el password.
        return this.http.get(this.urlApi + 'validar-token/' + 0, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: validarActualizarToken.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para validar y actualizar un token.              |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |                         en caso de que el token esté correcto o no    |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.validarActualizarToken = function () {
        var _this = this;
        //Si está conectado, entonces el token sí existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend para validar y acualizar el token.
            return this.http.get(this.urlApi + 'validar-token/' + 1, { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si existe algún error con el token.
                if (respuesta["estado"] === "ERROR") {
                    //Se desloguea del sistema.
                    _this.logout().subscribe();
                }
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: olvidarPassword.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que se ejecuta cuando se olvida la contraseña.   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: email   = Email del usuario.                  |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.olvidarPassword = function (email) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            email: email
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Le agrega el header codificado.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'olvidar-password', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: cambiarPassword.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para cambiar el password del usuario.            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: token           = Token que viene de la url,  |
    |                         olvidarPassword = 0 si es cambio normal,      |
    |                                           1 si se olvidó el password, |
    |                         passwordActual  = password actual del usuario,|
    |                         passwordNuevo   = password nuevo del usuario. |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.cambiarPassword = function (token, olvidarPassword, passwordActual, passwordNuevo) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            token: token,
            olvidarPassword: olvidarPassword,
            passwordActual: passwordActual,
            passwordNuevo: passwordNuevo
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Le agrega el header codificado.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'cambiar-password', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: usuarioTieneMenu.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para saber si el usuario tiene un menú dado.     |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: url = url del menú.                           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |                         en caso de que el usuario tenga o no el menú  |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.usuarioTieneMenu = function (url) {
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend.
            return this.http.get(this.urlApi + 'usuario-tiene-menu/' + url, { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si el usuario no tiene el menú.
                if (respuesta["estado"] === "ERROR") {
                    //Retorna un falso.
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
                }
                //Retorna un verdadero, signo de que si tiene asignado el menú.
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: usuarioTienePaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para saber si el usuario tiene un paciente dado. |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: pacienteId: identificador del paciente.       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |  en caso de que el usuario tenga o no el paciente respectivamente.    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.usuarioTienePaciente = function (pacienteId) {
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend.
            return this.http.get(this.urlApi + 'usuario-tiene-paciente/' + pacienteId, { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si el usuario no tiene el paciente.
                if (respuesta["estado"] === "ERROR") {
                    //Retorna un falso.
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
                }
                //Retorna un verdadero, signo de que sí tiene asignado el paciente.
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: usuarioTieneDetModulo.                                       |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para saber si el usuario tiene el detalle del    |
    |  módulo.                                                              |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: nombreDetModulo = nombre del det. del módulo. |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |                         en caso de que el usuario tenga o no el menú  |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.usuarioTieneDetModulo = function (nombreDetModulo) {
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend.
            return this.http.get(this.urlApi + 'usuario-tiene-det-modulo/' + nombreDetModulo, { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si el usuario no tiene el menú.
                if (respuesta["estado"] === "ERROR") {
                    //Retorna un falso.
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
                }
                //Retorna un verdadero, signo de que si tiene asignado el detalle del módulo.
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: usuarioPuedeModificarCita.                                   |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para garantizar que el usuario pueda modificar   |
    | una cita.                                                             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId: identificador de la cita,             |
    |  soloVer = Se utiliza para ver solo la cita, sin modificar.           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK o ERROR                |
    |  en caso de que el usuario pueda modificar la cita respectivamente.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AutenticarService.prototype.usuarioPuedeModificarCita = function (citaId, soloVer) {
        if (soloVer === void 0) { soloVer = '0'; }
        //Si está conectado, entonces el token si existe.
        if (this.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.obtenerToken()
            });
            //Envía la petición al servidor backend.
            return this.http.get(this.urlApi + ("usuario-puede-modificar-cita/" + citaId + "/" + soloVer), { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (respuesta) {
                //Si el usuario no puede acceder o editar la cita.
                if (respuesta["estado"] === "ERROR") {
                    //Retorna un falso.
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
                }
                //Retorna un verdadero, signo de que sí puede acceder o modificar la cita.
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    AutenticarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
    ], AutenticarService);
    return AutenticarService;
}());

//Constante que se utilizará para inyectar el servicio.
var AUTH_PROVIDERS = [
    { provide: AutenticarService, useClass: AutenticarService }
];


/***/ }),

/***/ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: cambiar-password-olvidado.                                | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del formulario de cambio      |\n|             de password.                                         |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 20/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\nhtml,\nbody {\n  height: 100%;\n}\n\n#div-contenedor {\n  display: flex;\n  align-items: center;\n  padding-top: 100px;\n  padding-bottom: 40px;\n  background-color: #fff;\n}\n\n.form-cambio-password {\n  width: 100%;\n  max-width: 450px;\n  padding: 15px;\n  margin: auto;\n}\n\n.form-cambio-password .form-control {\n  position: relative;\n  box-sizing: border-box;\n  height: auto;\n  padding: 10px;\n  font-size: 30px;\n}\n\n.form-cambio-password .form-control:focus {\n  z-index: 2;\n}\n\n.form-cambio-password input[type=\"password\"] {\n  margin-bottom: 1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  text-align: center;\n}\n\n.input-borde-rojo{\n  background-color: rgb(252, 224, 224);\n}\n\n.btn-azul{\n  background-color: rgb(0, 162, 232);\n  color: white;\n}\n\n.link-azul{\n  color: rgb(0, 162, 232);\n}"

/***/ }),

/***/ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: cambiar-password-olvidado.                                |  \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML que contiene la forma para cambiar   |\n|             el password olvidado, a partir de un token.          |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 20/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<!--Formulario de cambio de password.-->\n<div class=\"text-center\" id=\"div-contenedor\">\n  <form [formGroup]=\"formCambioPassword\" class=\"form-cambio-password\" (ngSubmit)=\"submit()\">\n    <img class=\"img-fluid\" src={{imagenLogo}} alt=\"\">\n    <input type=\"password\" class=\"form-control\" placeholder=\"Password\" [formControl]=\"nuevoPassword\" #nuevoPasswordHTML [ngClass]=\"{'input-borde-rojo':(nuevoPassword.touched && !nuevoPassword.valid) || (pulsarIngresar && !nuevoPassword.valid)}\">\n    <ngb-alert *ngIf=\"(nuevoPassword.touched && nuevoPassword.hasError('required')) || (pulsarIngresar && nuevoPassword.hasError('required'))\"\n      type=\"danger\" [dismissible]=\"false\">El Nuevo Password es Requerido.</ngb-alert>\n    <ngb-alert *ngIf=\"(nuevoPassword.touched && nuevoPassword.hasError('invalidPassword') \n                      && !nuevoPassword.hasError('required')) || (pulsarIngresar \n                      && nuevoPassword.hasError('invalidPassword')\n                      && !nuevoPassword.hasError('required'))\" type=\"danger\" [dismissible]=\"false\">\n      El Nuevo Password debe de tener una longitud mínima de 8 carácteres, y dentro de ellos se debe de incluir mínimo: una\n      mayúscula, un número y un carácter especial.\n    </ngb-alert>\n    <input type=\"password\" class=\"form-control\" placeholder=\"Confirmar Password\" [formControl]=\"confirmarPassword\" #confirmarPasswordHTML\n      [ngClass]=\"{'input-borde-rojo':(confirmarPassword.touched && !confirmarPassword.valid) || (pulsarIngresar && !confirmarPassword.valid)}\">\n    <ngb-alert *ngIf=\"(confirmarPassword.touched && confirmarPassword.hasError('required')) || (pulsarIngresar && confirmarPassword.hasError('required'))\"\n      type=\"danger\" [dismissible]=\"false\">La Confirmación del password es Requerida.</ngb-alert>\n    <ngb-alert *ngIf=\"(confirmarPassword.touched && confirmarPassword.value != nuevoPassword.value\n                      && !confirmarPassword.hasError('required')) || (pulsarIngresar \n                      && confirmarPassword.value != nuevoPassword.value\n                      && !confirmarPassword.hasError('required'))\" type=\"danger\" [dismissible]=\"false\">\n       Los Passwords no coindicen, favor de revisar.\n    </ngb-alert>\n    <button class=\"btn btn-lg btn-azul btn-block\" type=\"submit\">Cambiar password</button>\n    <hr>\n    <a class=\"link-azul\" href=\"/inicio\">Inicio.</a>\n    <p class=\"mt-5 mb-3 text-muted\">MiMédicos &copy; 2018-2019</p>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.ts ***!
  \**********************************************************************************/
/*! exports provided: CambiarPasswordOlvidadoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CambiarPasswordOlvidadoComponent", function() { return CambiarPasswordOlvidadoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilidades.service */ "./src/app/utilidades.service.ts");
/******************************************************************|
|NOMBRE: cambiarPasswordOlvidadoComponent.                         |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para cambiar el  |
|             password olvidado.                                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/06/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CambiarPasswordOlvidadoComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fb           = contiene los métodos           |
    |                                        de validaciones de formularios,|
    |                         autorizacion = contiene los métodos para      |
    |                                        conectarse al sistema,         |
    |                 rutaNavegacion       = contiene los métodos para      |
    |                                         manipular rutas,              |
    |                         modalService = contiene los métodos para      |
    |                                        manipular modals,              |
    |                         esperar      = contiene los métodos para      |
    |                                        abrir modals de espera,        |
    |                 utilidadServices = contiene métodos genéricos.        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    function CambiarPasswordOlvidadoComponent(fb, autorizacion, rutaNavegacion, modalService, esperar, utilidadesService) {
        this.fb = fb;
        this.autorizacion = autorizacion;
        this.rutaNavegacion = rutaNavegacion;
        this.modalService = modalService;
        this.esperar = esperar;
        this.utilidadesService = utilidadesService;
        //Propiedad que indica si se pulsó el botón de ingresar.
        this.pulsarIngresar = false;
        //Propiedad que almacena la ruta de la imágen del logo.
        this.imagenLogo = "../../assets/img/logo_completo.png";
        //Se agregan las validaciones al formulario de cambiar password.
        this.formCambioPassword = fb.group({
            'nuevoPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, this.utilidadesService.passwordValidator])],
            'confirmarPassword': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.nuevoPassword = this.formCambioPassword.controls['nuevoPassword'];
        this.confirmarPassword = this.formCambioPassword.controls['confirmarPassword'];
    }
    CambiarPasswordOlvidadoComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Si el usuario no está conectado.
        if (this.autorizacion.obtenerToken() === null) {
            //Obtiene el token de la url.
            this.tokenUrl = this.rutaNavegacion.url.split("/")[2];
            //Si el token es menor o mayor a 40 carácteres, es incorrecto.
            if (this.tokenUrl.length < 40 || this.tokenUrl.length > 40) {
                this._alerta("El token obtenido es inválido.").subscribe(function () {
                    //Se retorna al formulario de ingresar.
                    _this.rutaNavegacion.navigate(['ingresar']);
                });
            }
            else {
                //Se abre el modal de esperar, indicando que se hará una petición al servidor.
                this.esperar.esperar();
                //Se hace la petición al servidor para validar el token.
                this.autorizacion.validarToken(this.tokenUrl).subscribe(function (respuesta) {
                    //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
                    _this.esperar.noEsperar();
                    //Si existe algún error con el token.
                    if (respuesta["estado"] === "ERROR") {
                        _this._alerta(respuesta["mensaje"]).subscribe(function () {
                            //Se retorna al formulario de ingresar.
                            _this.rutaNavegacion.navigate(['ingresar']);
                        });
                    }
                    else {
                        //Hace un focus al cuadro de texto de password nuevo al iniciar la página.
                        _this.nuevoPasswordHTML.nativeElement.focus();
                    }
                });
            }
        }
        else {
            this.rutaNavegacion.navigate(['inicio']);
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: submit.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Evento que se dispara cuando se intenta cambiar         |
    |               el password.                                            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    CambiarPasswordOlvidadoComponent.prototype.submit = function () {
        var _this = this;
        //Se pulsa el botón ingresar.
        this.pulsarIngresar = true;
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (!this.nuevoPassword.valid) {
            this.nuevoPasswordHTML.nativeElement.focus();
            return;
        }
        else if (!this.confirmarPassword.valid || this.confirmarPassword.value != this.nuevoPassword.value) {
            this.confirmarPasswordHTML.nativeElement.focus();
            return;
        }
        //Se abre el modal de esperar, indicando que se hará una petición al servidor.
        this.esperar.esperar();
        //Se envía la petición al servidor para el cambio de contraseña.
        this.autorizacion.cambiarPassword(this.tokenUrl, 1, '', this.nuevoPassword.value)
            .subscribe(function (respuesta) {
            //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
            _this.esperar.noEsperar();
            //Si hubo un error en el proceso de cambio de password.
            if (respuesta["estado"] === "ERROR") {
                //Se despliega un modal con una alerta del porqué del error.
                _this._alerta(respuesta["mensaje"]).subscribe();
            }
            else {
                //Despliega alerta de satisfactorio.
                _this._alerta("Se ha efectuado el cambio de password satisfactoriamente.\n                      Favor de ingresar con su nuevo password.")
                    .subscribe(function () {
                    //Se retorna al formulario de ingresar.
                    _this.rutaNavegacion.navigate(['ingresar']);
                });
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que envía una alerta o mensaje de diálogo.       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje = Mensaje que tendrá la alerta        |                                      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    CambiarPasswordOlvidadoComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Cambio de password";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("nuevoPasswordHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CambiarPasswordOlvidadoComponent.prototype, "nuevoPasswordHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("confirmarPasswordHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CambiarPasswordOlvidadoComponent.prototype, "confirmarPasswordHTML", void 0);
    CambiarPasswordOlvidadoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cambiar-password-olvidado',
            template: __webpack_require__(/*! ./cambiar-password-olvidado.component.html */ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.html"),
            styles: [__webpack_require__(/*! ./cambiar-password-olvidado.component.css */ "./src/app/cambiar-password-olvidado/cambiar-password-olvidado.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_2__["AutenticarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_6__["EsperarService"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_8__["UtilidadesService"]])
    ], CambiarPasswordOlvidadoComponent);
    return CambiarPasswordOlvidadoComponent;
}());



/***/ }),

/***/ "./src/app/citas.service.ts":
/*!**********************************!*\
  !*** ./src/app/citas.service.ts ***!
  \**********************************/
/*! exports provided: CitasService, CITAS_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CitasService", function() { return CitasService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CITAS_PROVIDERS", function() { return CITAS_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/******************************************************************|
|NOMBRE: Citas.                                                    |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|citas.                                                            |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/




var CitasService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend,         |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function CitasService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroEstadosCitas.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los estados de las citas            |
    |  del usuario logueado.                                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.filtroEstadosCitas = function () {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los registros.
            return this.http.get(this.urlApi + 'filtro-estados-citas', { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: listaCitas.                                                  |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener las citas de los pacientes.         |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacion = id. de la organización,        |
    |  clinica = id. de la clínica,                                         |
    |  estatus = estado de la cita,                                         |
    |  actividad = id. de la actividad de la cita,                          |
    |  desde = fecha inicial,                                               |
    |  hasta = fecha final,                                                 |
    |  paciente= id. del paciente,                                          |
    |  usuario = id. del usuario.                                           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.listaCitas = function (organizacion, clinica, estatus, actividad, desde, hasta, paciente, usuario) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener las citas.
            return this.http.get(this.urlApi + ("lista-citas/" + organizacion + "/" + clinica + "/" + estatus + "/" + actividad + "/" + desde + "/" + hasta + "/" + paciente + "/" + usuario), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarCita.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar una cita.                          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  citaId = identificador de la cita.                                   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 12/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.eliminarCita = function (citaId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            citaId: citaId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'eliminar-cita', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: usuarioCitaFechaOcupada.                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Sirve para ver el número de citas que tiene el usuario  |
    |  de atención en una fecha y hora dada.                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  usuarioAtencionId = id. del usuario de atención de citas,            |
    |  fechaHora = fecha y hora de la cita.
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.usuarioCitaFechaOcupada = function (usuarioAtencionId, fechaHora) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener el número de citas.
            return this.http.get(this.urlApi + ("usuario-cita-fecha-ocupada/" + usuarioAtencionId + "/" + fechaHora), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaCita.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para dar de alta una cita.                       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  usuarioAtencionId = identificador del paciente,                      |
    |  pacienteId = identificador de la cita,                               |
    |  clinicaId = identificador de la clínica,                             |
    |  fechaHora = fecha y hora de la cita,                                 |
    |  estadoCitaId = identificador del estado de la cita.                  |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 15/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.altaCita = function (usuarioAtencionId, pacienteId, clinicaId, fechaHora, estadoCitaId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            usuarioAtencionId: usuarioAtencionId,
            pacienteId: pacienteId,
            clinicaId: clinicaId,
            fechaHora: fechaHora,
            estadoCitaId: estadoCitaId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'alta-cita', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: cambiarEstatusCita.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para cambiar el estatus de la cita.              |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  citaId = identificador de la cita,                                   |
    |  estatus = estatus de la cita (ABIERTO o CERRADO).                    |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 16/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.cambiarEstatusCita = function (citaId, estatus) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            citaId: citaId,
            estatus: estatus
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'cambiar-estatus-cita', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: verCita.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para ver una cita en específico.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId = id. de la cita,                      |
    |  soloVer = Se utiliza para cuando solo se quiere ver la cita.         |
    |  Es decir, sin modificar. 0 = modificar, 1 = solo ver.                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.verCita = function (citaId, soloVer) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener las cita.
            return this.http.get(this.urlApi + ("ver-cita/" + citaId + "/" + soloVer), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarCita.                                                  |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para editar una cita.                            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  citaId = identificador de la cita,                                   |
    |  usuarioAtencionId = identificador del paciente,                      |
    |  pacienteId = identificador de la cita,                               |
    |  clinicaId = identificador de la clínica.                             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 15/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.editarCita = function (citaId, usuarioAtencionId, pacienteId, clinicaId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            citaId: citaId,
            usuarioAtencionId: usuarioAtencionId,
            pacienteId: pacienteId,
            clinicaId: clinicaId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'editar-cita', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: listaDetCitas.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para ver los eventos o detalle de una cita.      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId = id. de la cita,                      |
    |  soloVer = Se utiliza para cuando solo se quiere ver la cita.         |
    |  Es decir, sin modificar. 0 = modificar, 1 = solo ver.                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.listaDetCitas = function (citaId, soloVer) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener las cita.
            return this.http.get(this.urlApi + ("lista-det-citas/" + citaId + "/" + soloVer), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarDetCita.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar el detalle de una cita.            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  detCitaId = identificador del detalle de una cita.                   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.eliminarDetCita = function (detCitaId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            detCitaId: detCitaId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'eliminar-det-cita', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaDetCita.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para dar de alta un evento o detalle de una cita.|
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  citaId = identificador de la cita,                                   |
    |  estadoCitaId = identificador del estado de la cita,                  |
    |  fechaHora = fecha y hora de la cita,                                 |
    |  comentarios = comentarios del evento.                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    CitasService.prototype.altaDetCita = function (citaId, estadoCitaId, fechaHora, comentarios) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            citaId: citaId,
            estadoCitaId: estadoCitaId,
            fechaHora: fechaHora,
            comentarios: comentarios
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'alta-det-cita', params, { headers: headers });
    };
    CitasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], CitasService);
    return CitasService;
}());

//Constante que se utilizará para inyectar el servicio.
var CITAS_PROVIDERS = [
    { provide: CitasService, useClass: CitasService }
];


/***/ }),

/***/ "./src/app/citas/alta-cita/alta-cita.component.css":
/*!*********************************************************!*\
  !*** ./src/app/citas/alta-cita/alta-cita.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: alta-cita.                                                | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del alta de citas.            |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/citas/alta-cita/alta-cita.component.html":
/*!**********************************************************!*\
  !*** ./src/app/citas/alta-cita/alta-cita.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: alta-cita.                                                | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para dar de alta citas.                       |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-4\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de citas.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-8\">\n      <h1 class=\"display-4\">Alta de citas</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <form [formGroup]=\"formAltaCitas\" (ngSubmit)=\"altaCita()\">\n    <div class=\"row\">\n      <div class=\"col-lg-3\"></div>\n      <div class=\"col-lg-3\">\n        <ngb-datepicker [formControl]=\"fechaControl\" (navigate)=\"date = $event.next\"></ngb-datepicker>\n      </div>\n      <div class=\"col-lg-6\">\n        <ngb-timepicker [formControl]=\"horaControl\"></ngb-timepicker>\n      </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Usuario*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"usuarioControl\" [ngbTypeahead]=\"buscarUsuario\" (focus)=\"focusBuscarUsuario$.next($event.target.value)\"\n            (click)=\"clickBuscarUsuario$.next($event.target.value)\" #usuarioHTML #usuarioNG=\"ngbTypeahead\" ngbTooltip=\"Seleccionar usuario.\"\n            [resultFormatter]=\"formatoUsuarios\" [inputFormatter]=\"formatoUsuarios\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoUsuario()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div  *ngIf=\"pulsarCrear && !usuarioControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El Usuario es Requerido.</div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Paciente*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"pacienteControl\" [ngbTypeahead]=\"buscarPaciente\" (focus)=\"focusBuscarPaciente$.next($event.target.value)\"\n            (click)=\"clickBuscarPaciente$.next($event.target.value)\" #pacienteHTML #pacienteNG=\"ngbTypeahead\" ngbTooltip=\"Seleccionar paciente.\"\n            [resultFormatter]=\"formatoPacientes\" [inputFormatter]=\"formatoPacientes\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoPaciente()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div  *ngIf=\"pulsarCrear && !pacienteControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El Paciente es Requerido.</div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Clínica*</span>\n          </div>\n          <select class=\"form-control\" [formControl]=\"clinicaControl\" #clinicaHTML ngbTooltip=\"Seleccionar una clínica.\">\n            <option *ngFor=\"let clinica of clinicas\" value={{clinica.id}}>\n              {{clinica.nombre}}\n            </option>\n          </select>\n        </div>\n        <div *ngIf=\"pulsarCrear && !clinicaControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">La clínica es Requerida.</div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Evento*</span>\n          </div>\n          <select class=\"form-control\" [formControl]=\"actividadControl\" #actividadHTML ngbTooltip=\"Seleccionar el evento o proceso de la cita.\">\n            <option *ngFor=\"let estadoCita of estadosCitas\" value={{estadoCita.id}}>\n              {{estadoCita.nombre}}\n            </option>\n          </select>\n        </div>\n        <div *ngIf=\"pulsarCrear && !actividadControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El evento es Requerido.</div>\n      </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Crear o dar de alta una cita.\">Crear</button>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/citas/alta-cita/alta-cita.component.ts":
/*!********************************************************!*\
  !*** ./src/app/citas/alta-cita/alta-cita.component.ts ***!
  \********************************************************/
/*! exports provided: AltaCitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltaCitaComponent", function() { return AltaCitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _citas_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../citas.service */ "./src/app/citas.service.ts");
/* harmony import */ var _custom_date_picker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../custom-date-picker */ "./src/app/custom-date-picker.ts");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/******************************************************************|
|NOMBRE: AltaCitaComponent.                                        |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta citas.                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 13/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AltaCitaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para navegar a otras url's,                           |
    |  usuariosService = contiene los métodos de la bd de los usuarios,     |
    |  pacientesService = Contiene los métodos de mto. de pacientes,        |
    |  modalService = contiene los métodos para manipular modals,           |
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  utilidadesService = Contiene métodos genéricos y útiles,             |
    |  clinicasService = contiene los métodos de la bd de las clínicas,     |
    |  citasService = contiene los métodos de la bd de los estados de citas |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function AltaCitaComponent(rutaNavegacion, usuariosService, pacientesService, modalService, esperarService, fb, utilidadesService, clinicasService, citasService) {
        var _this = this;
        this.rutaNavegacion = rutaNavegacion;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.modalService = modalService;
        this.esperarService = esperarService;
        this.fb = fb;
        this.utilidadesService = utilidadesService;
        this.clinicasService = clinicasService;
        this.citasService = citasService;
        //Variable que reacciona al focus del campo buscar usuario.
        this.focusBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar usuario.
        this.clickBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al focus del campo buscar paciente.
        this.focusBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar paciente.
        this.clickBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
        this.formatoUsuarios = function (value) { return value.nombres_usuario; };
        //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
        this.formatoPacientes = function (value) { return value.nombres_paciente; };
        //Indica si el filtro de usuarios ya se cargó.
        this.usuariosListos = false;
        //Indica si el filtro de pacientes ya se cargó.
        this.pacientesInicioListo = false;
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Indica si el filtro de clínicas ya se cargó.
        this.clinicasInicioListas = false;
        //Indica si el filtro de estados citas ya cargó.
        this.estadosCitasListos = false;
        //Propiedad para cuando se oprime el botón de crear cita.
        this.pulsarCrear = false;
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarUsuario.                                               |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un usuario.                          |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 13/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarUsuario = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarUsuario$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.usuarioNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.usuarios
                : _this.usuarios.filter(function (usuario) { return usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarPaciente.                                              |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un paciente.                         |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 13/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarPaciente = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarPaciente$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.pacienteNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.pacientes
                : _this.pacientes.filter(function (paciente) { return paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        //Al calendario se le establece la fecha actual.
        var fechaActual = new Date();
        //Se agregan las validaciones al formulario de alta de citas.
        this.formAltaCitas = fb.group({
            'usuario': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'paciente': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'clinica': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required]],
            'actividad': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
            'hora': [{ hour: 12, minute: 0 }]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.usuarioControl = this.formAltaCitas.controls['usuario'];
        this.pacienteControl = this.formAltaCitas.controls['paciente'];
        this.clinicaControl = this.formAltaCitas.controls['clinica'];
        this.actividadControl = this.formAltaCitas.controls['actividad'];
        this.fechaControl = this.formAltaCitas.controls['fecha'];
        this.horaControl = this.formAltaCitas.controls['hora'];
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan los pacientes en su filtro.
        this.filtroPacientes();
        //Se cargan los usuarios en su filtro.
        this.filtroUsuarios();
        //Se cargan las clínicas en su filtro.
        this.filtroClinicas(0);
        //Se cargan los estados de las citas.
        this.filtroEstadosCitas();
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.usuariosListos &&
                _this.pacientesInicioListo &&
                _this.clinicasInicioListas &&
                _this.estadosCitasListos) {
                //Se detiene la espera.
                _this.esperarService.noEsperar();
            }
        });
    }
    AltaCitaComponent.prototype.ngOnInit = function () {
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de citas.                    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['citas', 'lista-citas']);
    };
    /*----------------------------------------------------------------------|
   |  NOMBRE: filtroUsuarios.                                              |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               |
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 06/08/2018.                                                   |
   |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.filtroUsuarios = function () {
        var _this = this;
        //Intenta obtener los usuarios del usuario ingresado.
        this.usuariosService.filtroUsuarios()
            .subscribe(function (respuesta) {
            //Indica que el filtro de usuarios ya se cargó.
            _this.usuariosListos = true;
            _this.cargaInicialLista$.next(_this.usuariosListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los uusuarios en el arreglo de usuarios.
                _this.usuarios = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.filtroPacientes = function () {
        var _this = this;
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.filtroPacientes()
            .subscribe(function (respuesta) {
            _this.pacientesInicioListo = true;
            _this.cargaInicialLista$.next(_this.pacientesInicioListo);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los pacientes en el arreglo de pacientes.
                _this.pacientes = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
      |  NOMBRE: _alerta.                                                     |
      |-----------------------------------------------------------------------|
      |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
      |               de la base de datos en forma de alerta.                 |
      |-----------------------------------------------------------------------|
      |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
      |-----------------------------------------------------------------------|
      |  AUTOR: Ricardo Luna.                                                 |
      |-----------------------------------------------------------------------|
      |  FECHA: 03/08/2018.                                                   |
      |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoPaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo paciente.                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.limpiarCampoPaciente = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
        this.pacienteControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoUsuario.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo usuario.                                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.limpiarCampoUsuario = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
        this.usuarioControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
    |  esperar = para saber si se despliega el modal de espera.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.filtroClinicas = function (organizacionId, esperar) {
        var _this = this;
        if (esperar === void 0) { esperar = false; }
        //Si esperar es verdadero, entonces se abre el modal de espera.
        esperar ? this.esperarService.esperar() : null;
        this.clinicasService.filtroClinicas(organizacionId).subscribe(function (respuesta) {
            //Solo se realiza al recargar la página.
            if (!esperar) {
                _this.clinicasInicioListas = true;
                _this.cargaInicialLista$.next(_this.clinicasInicioListas);
            }
            //Si esperar es verdadero, entonces se cierra el modal de espera.
            esperar ? _this.esperarService.noEsperar() : null;
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las clínicas en el arreglo de clínicas.
                _this.clinicas = respuesta["datos"];
                //Se inicializa el select con el primer valor encontrado.
                _this.clinicaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
            }
        });
    };
    /*----------------------------------------------------------------------|
     |  NOMBRE: filtroEstadosCitas.                                          |
     |-----------------------------------------------------------------------|
     |  DESCRIPCIÓN: Método para llenar el filtro de estados citas.          |
     |-----------------------------------------------------------------------|
     |  AUTOR: Ricardo Luna.                                                 |
     |-----------------------------------------------------------------------|
     |  FECHA: 13/08/2018.                                                   |
     |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.filtroEstadosCitas = function () {
        var _this = this;
        this.citasService.filtroEstadosCitas().subscribe(function (respuesta) {
            _this.estadosCitasListos = true;
            _this.cargaInicialLista$.next(_this.estadosCitasListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los estados de las citas en el arreglo de estados citas.
                _this.estadosCitas = respuesta["datos"];
                //Se inicializa el select con el primer valor encontrado.
                _this.actividadControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaCita.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que da de alta una cita.                         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype.altaCita = function () {
        var _this = this;
        //Se pulsa el botón  de dar de alta cita.
        this.pulsarCrear = true;
        //Se almacena la hora y la fecha.
        var hora = this.horaControl.value;
        var fecha = this.fechaControl.value;
        //Si no es una hora válida.
        if (!hora) {
            this._alerta("Seleccione una hora válida.").subscribe(function () { });
            return;
        }
        var paciente = this.pacienteControl.value;
        //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
        if (paciente && !paciente.id) {
            this._alerta("Seleccione un paciente válido.").subscribe(function () {
                _this.pacienteHTML.nativeElement.focus();
            });
            return;
        }
        var usuario = this.usuarioControl.value;
        //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
        if (usuario && !usuario.id) {
            this._alerta("Seleccione un usuario válido.").subscribe(function () {
                _this.usuarioHTML.nativeElement.focus();
            });
            return;
        }
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.usuarioControl.invalid) {
            this.usuarioHTML.nativeElement.focus();
            return;
        }
        else if (this.pacienteControl.invalid) {
            this.pacienteHTML.nativeElement.focus();
            return;
        }
        else if (this.clinicaControl.invalid) {
            this.clinicaHTML.nativeElement.focus();
            return;
        }
        else if (this.actividadControl.invalid) {
            this.actividadHTML.nativeElement.focus();
            return;
        }
        var fechaHora = this.utilidadesService.formatearFechaHora(fecha, hora, false);
        //Se abre el  modal de espera.
        this.esperarService.esperar();
        this.citasService.usuarioCitaFechaOcupada(this.usuarioControl.value.id, fechaHora).subscribe(function (respuesta) {
            //Se cierra el  modal de espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Si tiene una o más citas a esa misma hora.
                if (respuesta["mensaje"] !== "OK") {
                    //Abre el modal.
                    var modalRef = _this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__["DialogoConfirmacionComponent"], { centered: true });
                    //Define el título del modal.
                    modalRef.componentInstance.titulo = "Confirmación";
                    //Define el mensaje del modal.
                    modalRef.componentInstance.mensaje = respuesta["mensaje"];
                    //Define la etiqueta del botón de Aceptar.
                    modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
                    //Define la etiqueta del botón de Cancelar.
                    modalRef.componentInstance.etiquetaBotonCancelar = "No";
                    //Se retorna el botón pulsado.
                    modalRef.result.then(function (result) {
                        //Si no se desea continuar, se detiene la ejecución del programa.
                        if (result === "No") {
                            return;
                        }
                        else {
                            _this._altaCita(fechaHora);
                        }
                    });
                }
                else {
                    _this._altaCita(fechaHora);
                }
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaCita.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que da de alta una cita.                         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 15/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaCitaComponent.prototype._altaCita = function (fechaHora) {
        var _this = this;
        //Se abre el  modal de espera.
        this.esperarService.esperar();
        //Se da de alta la cita.
        this.citasService.altaCita(this.usuarioControl.value.id, this.pacienteControl.value.id, this.clinicaControl.value, fechaHora, this.actividadControl.value).
            subscribe(function (respuesta) {
            //Se cierra el  modal de espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Muestra una alerta con el mensaje satisfactorio.
                _this._alerta("Se dio de alta satisfactoriamente la cita.");
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], AltaCitaComponent.prototype, "usuarioNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaCitaComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], AltaCitaComponent.prototype, "pacienteNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaCitaComponent.prototype, "pacienteHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clinicaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaCitaComponent.prototype, "clinicaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('actividadHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaCitaComponent.prototype, "actividadHTML", void 0);
    AltaCitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-alta-cita',
            template: __webpack_require__(/*! ./alta-cita.component.html */ "./src/app/citas/alta-cita/alta-cita.component.html"),
            styles: [__webpack_require__(/*! ./alta-cita.component.css */ "./src/app/citas/alta-cita/alta-cita.component.css")],
            providers: [_custom_date_picker__WEBPACK_IMPORTED_MODULE_13__["I18n"],
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbDatepickerI18n"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_13__["CustomDatePicker"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbDateParserFormatter"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_13__["FormatDatePicker"] }]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _usuarios_service__WEBPACK_IMPORTED_MODULE_4__["UsuariosService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_5__["PacientesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_10__["UtilidadesService"],
            _clinicas_service__WEBPACK_IMPORTED_MODULE_11__["ClinicasService"],
            _citas_service__WEBPACK_IMPORTED_MODULE_12__["CitasService"]])
    ], AltaCitaComponent);
    return AltaCitaComponent;
}());



/***/ }),

/***/ "./src/app/citas/alta-det-cita/alta-det-cita.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/citas/alta-det-cita/alta-det-cita.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: alta-det-cita.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del alta de detalle de citas. |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 23/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/citas/alta-det-cita/alta-det-cita.component.html":
/*!******************************************************************!*\
  !*** ./src/app/citas/alta-det-cita/alta-det-cita.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: alta-det-cita.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para dar de alta un detalle a una cita.       |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 23/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar a la edición de la cita.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-6\">\n      <h1 class=\"display-4 text-center\">Alta de evento</h1>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-2\"></div>\n    <div class=\"col-lg-8 table-responsive\" *ngIf=\"cita\">\n      <table class=\"table table-bordered\">\n        <tr>\n          <th class=\"text-center\">Usuario</th>\n          <td class=\"text-center\">{{cita.nombres_usuario}}</td>\n        </tr>\n        <tr>\n          <th class=\"text-center\">Paciente</th>\n          <td class=\"text-center\">{{cita.nombres_paciente}}</td>\n        </tr>\n        <tr>\n          <th class=\"text-center\">Clínica</th>\n          <td class=\"text-center\">{{cita.nombre_clinica}}</td>\n        </tr>\n      </table>\n    </div>\n  </div>\n  <form [formGroup]=\"formAltaDetCitas\" (ngSubmit)=\"altaDetCita()\">\n    <div class=\"row\">\n      <div class=\"col-lg-3\">\n        <ngb-datepicker [formControl]=\"fechaControl\" (navigate)=\"date = $event.next\"></ngb-datepicker>\n      </div>\n      <div class=\"col-lg-2\">\n        <ngb-timepicker [formControl]=\"horaControl\"></ngb-timepicker>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"row\">\n          <div class=\"col-lg-12\">\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\">Evento*</span>\n              </div>\n              <select class=\"form-control\" [formControl]=\"estadoCitaControl\" #estadoCitaHTML ngbTooltip=\"Seleccionar el evento o proceso de la cita.\">\n                <option *ngFor=\"let estadoCita of estadosCitas\" value={{estadoCita.id}}>\n                  {{estadoCita.nombre}}\n                </option>\n              </select>\n            </div>\n            <div *ngIf=\"pulsarCrear && !estadoCitaControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El\n              Evento es Requerido.</div>\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div class=\"col-lg-12\">\n            <textarea class=\"form-control\" [formControl]=\"comentariosControl\" rows=\"7\" placeholder=\"Comentarios\" ngbTooltip=\"Ingresar comentarios al evento.\"></textarea>\n          </div>\n        </div>\n      </div>\n    </div>\n    <br>\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Crear o dar de alta el evento de la cita.\">Crear</button>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/citas/alta-det-cita/alta-det-cita.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/citas/alta-det-cita/alta-det-cita.component.ts ***!
  \****************************************************************/
/*! exports provided: AltaDetCitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltaDetCitaComponent", function() { return AltaDetCitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _citas_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../citas.service */ "./src/app/citas.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _custom_date_picker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../custom-date-picker */ "./src/app/custom-date-picker.ts");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AltaDetCitaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para navegar a otras url's,                           |
    |  rutaActual: Para obtener los parámetros de la url,                   |
    |  citasService = contiene los métodos de la bd de los estados de citas,|
    |  modalService = contiene los métodos para manipular modals,           |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  utilidadesService = Contiene métodos genéricos y útiles.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function AltaDetCitaComponent(rutaNavegacion, rutaActual, citasService, modalService, fb, esperarService, utilidadesService) {
        var _this = this;
        this.rutaNavegacion = rutaNavegacion;
        this.rutaActual = rutaActual;
        this.citasService = citasService;
        this.modalService = modalService;
        this.fb = fb;
        this.esperarService = esperarService;
        this.utilidadesService = utilidadesService;
        //Indica si el filtro de estados citas ya cargó.
        this.estadosCitasListos = false;
        //Propiedad para cuando se oprime el botón de crear cita.
        this.pulsarCrear = false;
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Al calendario se le establece la fecha actual.
        var fechaActual = new Date();
        //Se agregan las validaciones al formulario de alta de citas.
        this.formAltaDetCitas = fb.group({
            'estadoCita': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            'fecha': [{ year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() }],
            'hora': [{ hour: fechaActual.getHours(), minute: fechaActual.getMinutes() }],
            'comentarios': ['']
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.comentariosControl = this.formAltaDetCitas.controls['comentarios'];
        this.estadoCitaControl = this.formAltaDetCitas.controls['estadoCita'];
        this.fechaControl = this.formAltaDetCitas.controls['fecha'];
        this.horaControl = this.formAltaDetCitas.controls['hora'];
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan los estados de las citas.
        this.filtroEstadosCitas();
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.estadosCitasListos) {
                //Se detiene la espera.
                _this.esperarService.noEsperar();
            }
        });
        //Obtiene el identificador de la cita de la url.
        this.rutaActual.paramMap.subscribe(function (params) {
            _this.citaId = params.get("id");
            //Se obtiene la información de la cita.
            _this.citasService.verCita(_this.citaId, "0").subscribe(function (respuesta) {
                //Si hubo un error en la obtención de información.
                if (respuesta["estado"] === "ERROR") {
                    //Muestra una alerta con el porqué del error.
                    _this._alerta(respuesta["mensaje"]).subscribe(function () {
                        //Se retorna al listado de citas.
                        _this.rutaNavegacion.navigate(['citas', 'lista-citas']);
                    });
                }
                else {
                    //Se almacena la información de la cita.
                    _this.cita = respuesta["datos"][0];
                }
            });
        });
    }
    AltaDetCitaComponent.prototype.ngOnInit = function () {
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa a la edición de la cita.                        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaDetCitaComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigateByUrl('citas/editar-cita/' + this.citaId);
    };
    /*----------------------------------------------------------------------|
   |  NOMBRE: filtroEstadosCitas.                                          |
   |-----------------------------------------------------------------------|
   |  DESCRIPCIÓN: Método para llenar el filtro de estados citas.          |
   |-----------------------------------------------------------------------|
   |  AUTOR: Ricardo Luna.                                                 |
   |-----------------------------------------------------------------------|
   |  FECHA: 13/08/2018.                                                   |
   |----------------------------------------------------------------------*/
    AltaDetCitaComponent.prototype.filtroEstadosCitas = function () {
        var _this = this;
        this.citasService.filtroEstadosCitas().subscribe(function (respuesta) {
            _this.estadosCitasListos = true;
            _this.cargaInicialLista$.next(_this.estadosCitasListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los estados de las citas en el arreglo de estados citas.
                _this.estadosCitas = respuesta["datos"];
                //Se inicializa el select con el primer valor encontrado.
                _this.estadoCitaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaDetCita.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que da de alta el evento o detalle de una cita.  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaDetCitaComponent.prototype.altaDetCita = function () {
        var _this = this;
        //Se pulsa el botón  de dar de alta cita.
        this.pulsarCrear = true;
        //Se almacena la hora y la fecha.
        var hora = this.horaControl.value;
        var fecha = this.fechaControl.value;
        //Si no es una hora válida.
        if (!hora) {
            this._alerta("Seleccione una hora válida.").subscribe(function () { });
            return;
        }
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.estadoCitaControl.invalid) {
            this.estadoCitaHTML.nativeElement.focus();
            return;
        }
        var fechaHora = this.utilidadesService.formatearFechaHora(fecha, hora, false);
        //Se abre el  modal de espera.
        this.esperarService.esperar();
        this.citasService.usuarioCitaFechaOcupada(this.cita["usuario_id_atencion"], fechaHora).subscribe(function (respuesta) {
            //Se cierra el  modal de espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Si tiene una o más citas a esa misma hora.
                if (respuesta["mensaje"] !== "OK") {
                    //Abre el modal.
                    var modalRef = _this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_10__["DialogoConfirmacionComponent"], { centered: true });
                    //Define el título del modal.
                    modalRef.componentInstance.titulo = "Confirmación";
                    //Define el mensaje del modal.
                    modalRef.componentInstance.mensaje = respuesta["mensaje"];
                    //Define la etiqueta del botón de Aceptar.
                    modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
                    //Define la etiqueta del botón de Cancelar.
                    modalRef.componentInstance.etiquetaBotonCancelar = "No";
                    //Se retorna el botón pulsado.
                    modalRef.result.then(function (result) {
                        //Si no se desea continuar, se detiene la ejecución del programa.
                        if (result === "No") {
                            return;
                        }
                        else {
                            _this._altaDetCita(fechaHora);
                        }
                    });
                }
                else {
                    _this._altaDetCita(fechaHora);
                }
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _altaDetCita.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que da de alta el detalle de una cita.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaDetCitaComponent.prototype._altaDetCita = function (fechaHora) {
        var _this = this;
        //Se abre el  modal de espera.
        this.esperarService.esperar();
        //Se da de alta el detalle de la cita.
        this.citasService.altaDetCita(this.citaId, this.estadoCitaControl.value, fechaHora, this.comentariosControl.value).
            subscribe(function (respuesta) {
            //Se cierra el  modal de espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Muestra una alerta con el mensaje satisfactorio.
                _this._alerta("Se dio de alta satisfactoriamente el evento.").subscribe(function () {
                    //Se retorna a la edición de la cita.
                    _this.regresar();
                });
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
    |               de la base de datos en forma de alerta.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaDetCitaComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('estadoCitaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaDetCitaComponent.prototype, "estadoCitaHTML", void 0);
    AltaDetCitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-alta-det-cita',
            template: __webpack_require__(/*! ./alta-det-cita.component.html */ "./src/app/citas/alta-det-cita/alta-det-cita.component.html"),
            styles: [__webpack_require__(/*! ./alta-det-cita.component.css */ "./src/app/citas/alta-det-cita/alta-det-cita.component.css")],
            providers: [_custom_date_picker__WEBPACK_IMPORTED_MODULE_8__["I18n"],
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDatepickerI18n"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_8__["CustomDatePicker"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDateParserFormatter"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_8__["FormatDatePicker"] }]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _citas_service__WEBPACK_IMPORTED_MODULE_2__["CitasService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_9__["UtilidadesService"]])
    ], AltaDetCitaComponent);
    return AltaDetCitaComponent;
}());



/***/ }),

/***/ "./src/app/citas/citas.component.css":
/*!*******************************************!*\
  !*** ./src/app/citas/citas.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/citas/citas.component.html":
/*!********************************************!*\
  !*** ./src/app/citas/citas.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/citas/citas.component.ts":
/*!******************************************!*\
  !*** ./src/app/citas/citas.component.ts ***!
  \******************************************/
/*! exports provided: CitasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CitasComponent", function() { return CitasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CitasComponent = /** @class */ (function () {
    function CitasComponent() {
    }
    CitasComponent.prototype.ngOnInit = function () {
    };
    CitasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-citas',
            template: __webpack_require__(/*! ./citas.component.html */ "./src/app/citas/citas.component.html"),
            styles: [__webpack_require__(/*! ./citas.component.css */ "./src/app/citas/citas.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CitasComponent);
    return CitasComponent;
}());



/***/ }),

/***/ "./src/app/citas/citas.module.ts":
/*!***************************************!*\
  !*** ./src/app/citas/citas.module.ts ***!
  \***************************************/
/*! exports provided: rutas, CitasModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rutas", function() { return rutas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CitasModule", function() { return CitasModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _lista_citas_lista_citas_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lista-citas/lista-citas.component */ "./src/app/citas/lista-citas/lista-citas.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _citas_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./citas.component */ "./src/app/citas/citas.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../usuario-tiene-menu.guard */ "./src/app/usuario-tiene-menu.guard.ts");
/* harmony import */ var _alta_cita_alta_cita_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alta-cita/alta-cita.component */ "./src/app/citas/alta-cita/alta-cita.component.ts");
/* harmony import */ var _editar_cita_editar_cita_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editar-cita/editar-cita.component */ "./src/app/citas/editar-cita/editar-cita.component.ts");
/* harmony import */ var _usuario_puede_modificar_cita_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./usuario-puede-modificar-cita.guard */ "./src/app/citas/usuario-puede-modificar-cita.guard.ts");
/* harmony import */ var _alta_det_cita_alta_det_cita_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./alta-det-cita/alta-det-cita.component */ "./src/app/citas/alta-det-cita/alta-det-cita.component.ts");
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//Constante que contiene las rutas que tendrá el módulo.
var rutas = [
    { path: '', component: _lista_citas_lista_citas_component__WEBPACK_IMPORTED_MODULE_2__["ListaCitasComponent"] },
    { path: 'lista-citas', component: _lista_citas_lista_citas_component__WEBPACK_IMPORTED_MODULE_2__["ListaCitasComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"]] },
    { path: 'alta-cita', component: _alta_cita_alta_cita_component__WEBPACK_IMPORTED_MODULE_8__["AltaCitaComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"]] },
    { path: 'editar-cita/:id', component: _editar_cita_editar_cita_component__WEBPACK_IMPORTED_MODULE_9__["EditarCitaComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"], _usuario_puede_modificar_cita_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioPuedeModificarCitaGuard"]] },
    { path: 'alta-det-cita/:id', component: _alta_det_cita_alta_det_cita_component__WEBPACK_IMPORTED_MODULE_11__["AltaDetCitaComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"], _usuario_puede_modificar_cita_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioPuedeModificarCitaGuard"]] }
];
var CitasModule = /** @class */ (function () {
    function CitasModule() {
    }
    CitasModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"]
            ],
            declarations: [_citas_component__WEBPACK_IMPORTED_MODULE_4__["CitasComponent"], _lista_citas_lista_citas_component__WEBPACK_IMPORTED_MODULE_2__["ListaCitasComponent"], _alta_cita_alta_cita_component__WEBPACK_IMPORTED_MODULE_8__["AltaCitaComponent"], _editar_cita_editar_cita_component__WEBPACK_IMPORTED_MODULE_9__["EditarCitaComponent"], _alta_det_cita_alta_det_cita_component__WEBPACK_IMPORTED_MODULE_11__["AltaDetCitaComponent"]],
            exports: [_citas_component__WEBPACK_IMPORTED_MODULE_4__["CitasComponent"]],
            providers: [
                _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"], _usuario_puede_modificar_cita_guard__WEBPACK_IMPORTED_MODULE_10__["UsuarioPuedeModificarCitaGuard"]
            ]
        })
    ], CitasModule);
    return CitasModule;
}());



/***/ }),

/***/ "./src/app/citas/editar-cita/editar-cita.component.css":
/*!*************************************************************!*\
  !*** ./src/app/citas/editar-cita/editar-cita.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: editar-cita.                                              | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la edición de citas.       |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 20/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/citas/editar-cita/editar-cita.component.html":
/*!**************************************************************!*\
  !*** ./src/app/citas/editar-cita/editar-cita.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: editar-cita.                                              | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para editar o modificar citas.                |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 20/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de citas.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-6\">\n      <h1 class=\"display-4 text-center\">Edición de cita</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <form [formGroup]=\"formEdicionCitas\" (ngSubmit)=\"editarCita()\">\n    <div class=\"row\">\n      <div class=\"col-lg-3\"></div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Usuario*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"usuarioControl\" [ngbTypeahead]=\"buscarUsuario\" (focus)=\"focusBuscarUsuario$.next($event.target.value)\"\n            (click)=\"clickBuscarUsuario$.next($event.target.value)\" #usuarioHTML #usuarioNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por usuario.\"\n            [resultFormatter]=\"formatoUsuarios\" [inputFormatter]=\"formatoUsuarios\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoUsuario()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div *ngIf=\"pulsarEditar && !usuarioControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El Usuario\n          es Requerido.</div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-3\"></div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Paciente*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"pacienteControl\" [ngbTypeahead]=\"buscarPaciente\" (focus)=\"focusBuscarPaciente$.next($event.target.value)\"\n            (click)=\"clickBuscarPaciente$.next($event.target.value)\" #pacienteHTML #pacienteNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por paciente.\"\n            [resultFormatter]=\"formatoPacientes\" [inputFormatter]=\"formatoPacientes\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoPaciente()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div *ngIf=\"pulsarEditar && !pacienteControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El\n          Paciente es Requerido.</div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-3\"></div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Clínica*</span>\n          </div>\n          <select class=\"form-control\" [formControl]=\"clinicaControl\" #clinicaHTML ngbTooltip=\"Seleccionar una clínica.\">\n            <option *ngFor=\"let clinica of clinicas\" value={{clinica.id}}>\n              {{clinica.nombre}}\n            </option>\n          </select>\n        </div>\n        <div *ngIf=\"pulsarEditar && !clinicaControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">La clínica\n          es Requerida.</div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-3\"></div>\n      <div class=\"col-lg-6\">\n        <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Editar o modificar una cita.\">Modificar</button>\n      </div>\n    </div>\n  </form>\n  <hr>\n  <div class=\"row\">\n    <div class=\"col-lg-1\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg col-lg-12\" placement=\"bottom\" ngbTooltip=\"Agregar un evento a la cita.\"\n        (click)=\"altaDetCita();\">\n        <i class=\"material-icons\">add</i>\n      </button>\n    </div>\n    <div class=\"col-lg-5\">\n      <div class=\"input-group input-group-lg\">\n        <input type=\"text\" #buscarInfoHTML class=\"form-control\" placeholder=\"Búsqueda\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-azul\" type=\"button\" (click)=\"limpiarCampoBusqueda()\" placement=\"bottom\" ngbTooltip=\"Borrar búsqueda.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-12 table-responsive\">\n      <div style=\"height:600px;overflow:auto;margin-right:15px;\">\n        <table class=\"table table-striped table-bordered\">\n          <thead>\n            <tr>\n              <th class=\"text-center\">Evento</th>\n              <th class=\"text-center\">Fecha y hora</th>\n              <th class=\"text-center\">Opciones</th>\n            </tr>\n          </thead>\n          <tbody *ngIf=\"detCitas.length > 0\">\n            <tr *ngFor=\"let detCita of detCitas\">\n              <td class=\"text-center\">{{detCita.nombre}}</td>\n              <td class=\"text-center\">{{detCita.fecha}}</td>\n              <td>\n                <div class=\"btn-group btn-group-sm\" role=\"group\">            \n                  <button *ngIf=\"eliminarDetCitas\" type=\"button\" class=\"btn\" ngbTooltip=\"Eliminar evento permanentemente.\" (click)='eliminarDetCita(detCita.id)'>\n                    <i class=\"material-icons\">delete_forever</i>\n                  </button>        \n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/citas/editar-cita/editar-cita.component.ts":
/*!************************************************************!*\
  !*** ./src/app/citas/editar-cita/editar-cita.component.ts ***!
  \************************************************************/
/*! exports provided: EditarCitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditarCitaComponent", function() { return EditarCitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _citas_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../citas.service */ "./src/app/citas.service.ts");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/******************************************************************|
|NOMBRE: EditarCitaComponent.                                      |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para editar citas.                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var EditarCitaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
     |  NOMBRE: constructor.                                                 |
     |-----------------------------------------------------------------------|
     |  DESCRIPCIÓN: Método constructor del componente.                      |
     |-----------------------------------------------------------------------|
     |  PARÁMETROS DE ENTRADA:                                               |
     |  rutaActual   = para navegar a otras url's,                           |
     |  usuariosService = contiene los métodos de la bd de los usuarios,     |
     |  pacientesService = Contiene los métodos de mto. de pacientes,        |
     |  modalService = contiene los métodos para manipular modals,           |
     |  esperarService = contiene los métodos para mostrar o no la espera,   |
     |  fb = contiene los métodos para manipular formularios HTML,           |
     |  utilidadesService = Contiene métodos genéricos y útiles,             |
     |  clinicasService = contiene los métodos de la bd de las clínicas,     |
     |  citasService = contiene los métodos de la bd de los estados de citas,|
     |  rutaActual: Para obtener los parámetros de la url,                   |
     |  autenticarService = contiene los métodos de autenticación.           |
     |-----------------------------------------------------------------------|
     |  AUTOR: Ricardo Luna.                                                 |
     |-----------------------------------------------------------------------|
     |  FECHA: 21/08/2018.                                                   |
     |----------------------------------------------------------------------*/
    function EditarCitaComponent(rutaNavegacion, usuariosService, pacientesService, modalService, esperarService, fb, utilidadesService, clinicasService, citasService, rutaActual, autenticarService) {
        var _this = this;
        this.rutaNavegacion = rutaNavegacion;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.modalService = modalService;
        this.esperarService = esperarService;
        this.fb = fb;
        this.utilidadesService = utilidadesService;
        this.clinicasService = clinicasService;
        this.citasService = citasService;
        this.rutaActual = rutaActual;
        this.autenticarService = autenticarService;
        //Variable que reacciona al focus del campo buscar usuario.
        this.focusBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar usuario.
        this.clickBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al focus del campo buscar paciente.
        this.focusBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar paciente.
        this.clickBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
        this.formatoUsuarios = function (value) { return value.nombres_usuario; };
        //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
        this.formatoPacientes = function (value) { return value.nombres_paciente; };
        //Indica si el filtro de usuarios ya se cargó.
        this.usuariosListos = false;
        //Indica si el filtro de pacientes ya se cargó.
        this.pacientesInicioListo = false;
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Indica si el filtro de clínicas ya se cargó.
        this.clinicasInicioListas = false;
        //Indica si el filtro de estados citas ya cargó.
        this.estadosCitasListos = false;
        //Propiedad para cuando se oprime el botón de crear cita.
        this.pulsarEditar = false;
        //Almacena los eventos o detalle de las citas de la base de datos pero su información se puede filtrar.
        this.detCitas = [];
        //Almacena los eventos o detalle de las cita de la base de datos original sin que se filtre su información.
        this.detCitasServidor = [];
        //Propiedad que indica si el usuario puede eliminar eventos de la cita.
        this.eliminarDetCitas = false;
        /*----------------------------------------------------------------------|
         |  NOMBRE: buscarUsuario.                                               |
         |-----------------------------------------------------------------------|
         |  DESCRIPCIÓN: Método para buscar un usuario.                          |
         |-----------------------------------------------------------------------|
         |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
         |-----------------------------------------------------------------------|
         |  AUTOR: Ricardo Luna.                                                 |
         |-----------------------------------------------------------------------|
         |  FECHA: 13/08/2018.                                                   |
         |----------------------------------------------------------------------*/
        this.buscarUsuario = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarUsuario$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.usuarioNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.usuarios
                : _this.usuarios.filter(function (usuario) { return usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarPaciente.                                              |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un paciente.                         |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 13/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarPaciente = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarPaciente$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.pacienteNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.pacientes
                : _this.pacientes.filter(function (paciente) { return paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        //Se agregan las validaciones al formulario de edición de citas.
        this.formEdicionCitas = fb.group({
            'usuario': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'paciente': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'clinica': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required]]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.usuarioControl = this.formEdicionCitas.controls['usuario'];
        this.pacienteControl = this.formEdicionCitas.controls['paciente'];
        this.clinicaControl = this.formEdicionCitas.controls['clinica'];
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan los pacientes en su filtro.
        this.filtroPacientes();
        //Se cargan los usuarios en su filtro.
        this.filtroUsuarios();
        //Se cargan las clínicas en su filtro.
        this.filtroClinicas(0);
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.usuariosListos &&
                _this.pacientesInicioListo &&
                _this.clinicasInicioListas) {
                //Obtiene el identificador de la cita de la url.
                _this.rutaActual.paramMap.subscribe(function (params) {
                    _this.citaId = params.get("id");
                    //Se obtiene la información de la cita.
                    _this.citasService.verCita(_this.citaId, "0").subscribe(function (respuesta) {
                        //Si hubo un error en la obtención de información.
                        if (respuesta["estado"] === "ERROR") {
                            //Muestra una alerta con el porqué del error.
                            _this._alerta(respuesta["mensaje"]).subscribe(function () {
                                //Se retorna al listado de citas.
                                _this.rutaNavegacion.navigate(['citas', 'lista-citas']);
                            });
                        }
                        else {
                            //Se establece el valor del usuario de atención de la cita.
                            _this.usuarioControl.setValue(_this.usuarios.filter(function (usuario) {
                                return usuario.id.indexOf(respuesta["datos"][0]["usuario_id_atencion"]) > -1;
                            })[0]);
                            //Se establece el valor del paciente de la cita.
                            _this.pacienteControl.setValue(_this.pacientes.filter(function (paciente) {
                                return paciente.id.indexOf(respuesta["datos"][0]["paciente_id"]) > -1;
                            })[0]);
                            //Se establece el valor de la clínica de la cita.             
                            _this.clinicaControl.setValue(respuesta["datos"][0]["clinica_id"]);
                            //Se obtienen los eventos de la cita.
                            _this.buscar().subscribe(function () {
                                //Se detiene la espera.
                                _this.esperarService.noEsperar();
                            });
                        }
                    });
                });
            }
        });
    }
    EditarCitaComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se obtiene el método de tecleado del elemento HTML de búsqueda.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (query) { return _this.utilidadesService.filtrarDatos(query, _this.detCitasServidor); }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchAll"])())
            .subscribe(function (resultados) {
            //Se actualiza la información en pantalla.        
            _this.detCitas = resultados;
        });
        //Evento de cuando se pega con el mouse algun texto en la caja de texto.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'paste')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(50))
            .subscribe(function (cadena) {
            //Genera un evento de teclazo para asegurar que se dispare el evento.
            _this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
        });
    };
    EditarCitaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //El botón de dar eliminar el detalle de citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('ELIMINAR EVENTO CITA').subscribe(function (respuesta) {
            _this.eliminarDetCitas = respuesta["value"];
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de citas.                    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['citas', 'lista-citas']);
    };
    /*----------------------------------------------------------------------|
  |  NOMBRE: filtroUsuarios.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 06/08/2018.                                                   |
  |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.filtroUsuarios = function () {
        var _this = this;
        //Intenta obtener los usuarios del usuario ingresado.
        this.usuariosService.filtroUsuarios()
            .subscribe(function (respuesta) {
            //Indica que el filtro de usuarios ya se cargó.
            _this.usuariosListos = true;
            _this.cargaInicialLista$.next(_this.usuariosListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los uusuarios en el arreglo de usuarios.
                _this.usuarios = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.filtroPacientes = function () {
        var _this = this;
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.filtroPacientes()
            .subscribe(function (respuesta) {
            _this.pacientesInicioListo = true;
            _this.cargaInicialLista$.next(_this.pacientesInicioListo);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los pacientes en el arreglo de pacientes.
                _this.pacientes = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
    |  esperar = para saber si se despliega el modal de espera.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.filtroClinicas = function (organizacionId, esperar) {
        var _this = this;
        if (esperar === void 0) { esperar = false; }
        //Si esperar es verdadero, entonces se abre el modal de espera.
        esperar ? this.esperarService.esperar() : null;
        this.clinicasService.filtroClinicas(organizacionId).subscribe(function (respuesta) {
            //Solo se realiza al recargar la página.
            if (!esperar) {
                _this.clinicasInicioListas = true;
                _this.cargaInicialLista$.next(_this.clinicasInicioListas);
            }
            //Si esperar es verdadero, entonces se cierra el modal de espera.
            esperar ? _this.esperarService.noEsperar() : null;
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las clínicas en el arreglo de clínicas.
                _this.clinicas = respuesta["datos"];
                //Se inicializa el select con el primer valor encontrado.
                _this.clinicaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoPaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo paciente.                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.limpiarCampoPaciente = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
        this.pacienteControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoUsuario.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo usuario.                                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.limpiarCampoUsuario = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
        this.usuarioControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarCita.                                                  |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que edita una cita.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 21/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.editarCita = function () {
        var _this = this;
        //Se pulsa el botón  de dar de alta cita.
        this.pulsarEditar = true;
        var usuario = this.usuarioControl.value;
        //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
        if (usuario && !usuario.id) {
            this._alerta("Seleccione un usuario válido.").subscribe(function () {
                _this.usuarioHTML.nativeElement.focus();
            });
            return;
        }
        var paciente = this.pacienteControl.value;
        //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
        if (paciente && !paciente.id) {
            this._alerta("Seleccione un paciente válido.").subscribe(function () {
                _this.pacienteHTML.nativeElement.focus();
            });
            return;
        }
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.usuarioControl.invalid) {
            this.usuarioHTML.nativeElement.focus();
            return;
        }
        else if (this.pacienteControl.invalid) {
            this.pacienteHTML.nativeElement.focus();
            return;
        }
        else if (this.clinicaControl.invalid) {
            this.clinicaHTML.nativeElement.focus();
            return;
        }
        //Se abre el  modal de espera.
        this.esperarService.esperar();
        this.citasService.editarCita(this.citaId, this.usuarioControl.value.id, this.pacienteControl.value.id, this.clinicaControl.value)
            .subscribe(function (respuesta) {
            //Se cierra el  modal de espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Muestra una alerta con el mensaje satisfactorio.
                _this._alerta("La cita se modificó satisfactoriamente.");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.limpiarCampoBusqueda = function () {
        //Si el campo tiene algo escrito se limpiará.
        if (this.buscarInfoHTML.nativeElement.value.length > 0) {
            //limpia el cuadro de texto.
            this.buscarInfoHTML.nativeElement.value = "";
            //Actualiza la información con la original.
            this.detCitas = this.detCitasServidor;
        }
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarDetCita.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar un evento de una cita.             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: detCitaId = id. del detalle de la cita.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.eliminarDetCita = function (detCitaId) {
        var _this = this;
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información del evento de la cita. "
            + "¿Está seguro de eliminar el evento?";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar el evento o detalle de la cita.
            if (result === "Sí") {
                //Se procede a eliminar el detalle de la cita.
                _this.citasService.eliminarDetCita(detCitaId).subscribe(function (respuesta) {
                    //Si hubo un error.
                    if (respuesta["estado"] === "ERROR") {
                        //Muestra una alerta con el porqué del error.
                        _this._alerta(respuesta["mensaje"]);
                    }
                    else {
                        _this._alerta("El evento de la cita se eliminó permanentemente.").subscribe(function () {
                            //Inicia la espera.
                            _this.esperarService.esperar();
                            //Se actualizan los datos.
                            _this.buscar().subscribe(function () {
                                //Se detiene la espera.
                                _this.esperarService.noEsperar();
                            });
                        });
                    }
                });
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: buscar.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Ejecuta la búsqueda de eventos de la cita.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.buscar = function () {
        var _this = this;
        //Se utiliza para esperar a que se ejecute la búsqueda.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        // Se obtienen los eventos o detalle de las citas.
        this.citasService.listaDetCitas(this.citaId, "0").subscribe(function (respuesta) {
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                _this.detCitas = respuesta["datos"];
                _this.detCitasServidor = respuesta["datos"];
                //Le da un focus al elemento de búsqueda.
                _this.buscarInfoHTML.nativeElement.focus();
            }
            //se hace un next, signo de que ya obtuvo la información.
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaDetCita.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de crear un detalle o    |
    |  evento de cita.                                                      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype.altaDetCita = function () {
        this.rutaNavegacion.navigateByUrl('citas/alta-det-cita/' + this.citaId);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
    |               de la base de datos en forma de alerta.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarCitaComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], EditarCitaComponent.prototype, "usuarioNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarCitaComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], EditarCitaComponent.prototype, "pacienteNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarCitaComponent.prototype, "pacienteHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clinicaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarCitaComponent.prototype, "clinicaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('buscarInfoHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarCitaComponent.prototype, "buscarInfoHTML", void 0);
    EditarCitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editar-cita',
            template: __webpack_require__(/*! ./editar-cita.component.html */ "./src/app/citas/editar-cita/editar-cita.component.html"),
            styles: [__webpack_require__(/*! ./editar-cita.component.css */ "./src/app/citas/editar-cita/editar-cita.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _usuarios_service__WEBPACK_IMPORTED_MODULE_4__["UsuariosService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_5__["PacientesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_10__["UtilidadesService"],
            _clinicas_service__WEBPACK_IMPORTED_MODULE_11__["ClinicasService"],
            _citas_service__WEBPACK_IMPORTED_MODULE_12__["CitasService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_13__["AutenticarService"]])
    ], EditarCitaComponent);
    return EditarCitaComponent;
}());



/***/ }),

/***/ "./src/app/citas/lista-citas/lista-citas.component.css":
/*!*************************************************************!*\
  !*** ./src/app/citas/lista-citas/lista-citas.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: lista-citas.                                              | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la lista de citas.         |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 03/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n    font-size: 15px;\n\n  }\n\n  \n"

/***/ }),

/***/ "./src/app/citas/lista-citas/lista-citas.component.html":
/*!**************************************************************!*\
  !*** ./src/app/citas/lista-citas/lista-citas.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: lista-citas.                                              | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página de citas.                                     |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 03/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Organización</span>\n        </div>\n        <select class=\"form-control select\" [formControl]=\"organizacionControl\" #organizacionHTML ngbTooltip=\"Seleccionar una organización.\"\n          (change)=\"filtroClinicas(organizacionHTML.value, true)\">\n          <option value=\"0\">TODAS</option>\n          <option *ngFor=\"let organizacion of organizaciones\" value={{organizacion.id}}>\n            {{organizacion.nombre}}\n          </option>\n        </select>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Clínica</span>\n        </div>\n        <select class=\"form-control\" [formControl]=\"clinicaControl\" ngbTooltip=\"Seleccionar una clínica.\">\n          <option value=\"0\">TODAS</option>\n          <option *ngFor=\"let clinica of clinicas\" value={{clinica.id}}>\n            {{clinica.nombre}}\n          </option>\n        </select>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Estatus</span>\n        </div>\n        <select class=\"form-control\" [formControl]=\"estatusControl\" ngbTooltip=\"Seleccionar el estatus de la cita.\">\n          <option value=\" \" selected>TODOS</option>\n          <option value=\"ABIERTO\" selected>ABIERTO</option>\n          <option value=\"CERRADO\">CERRADO</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Actividad</span>\n        </div>\n        <select class=\"form-control\" [formControl]=\"actividadControl\" ngbTooltip=\"Seleccionar la actividad o proceso de la cita.\">\n          <option value=\"0\">TODAS</option>\n          <option *ngFor=\"let estadoCita of estadosCitas\" value={{estadoCita.id}}>\n            {{estadoCita.nombre}}\n          </option>\n        </select>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Desde</span>\n        </div>\n        <input #calendarioDesdeHTML=\"ngbDatepicker\" [startDate]=\"fechaDesdeInicial\" #fechaDesdeHTML (dateSelect)=\"fechaDesdeSeleccion($event)\"\n          ngbDatepicker class=\"form-control\" readonly ngbTooltip=\"Fecha desde donde inicia la búsqueda.\" [formControl]=\"fechaDesdeControl\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" (click)=\"mostrarPopUpFechaDesde()\" type=\"button\" ngbTooltip=\"Abrir calendario.\">\n            <i class=\"material-icons\">date_range</i>\n          </button>\n          <button class=\"btn btn-outline-secondary\" type=\"button\" ngbTooltip=\"Borrar fecha.\" (click)=\"limpiarCampoFechaDesde()\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Hasta</span>\n        </div>\n        <input #calendarioHastaHTML=\"ngbDatepicker\" [startDate]=\"fechaHastaMinima\" [minDate]=\"fechaHastaMinima\" #fechaHastaHTML (dateSelect)=\"fechaHastaSeleccion($event)\"\n          ngbDatepicker class=\"form-control\" readonly ngbTooltip=\"Fecha hasta donde inicia la búsqueda.\" [formControl]=\"fechaHastaControl\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" (click)=\"calendarioHastaHTML.toggle()\" type=\"button\" ngbTooltip=\"Abrir calendario.\">\n            <i class=\"material-icons\">date_range</i>\n          </button>\n          <button class=\"btn btn-outline-secondary\" type=\"button\" ngbTooltip=\"Borrar fecha.\" (click)=\"limpiarCampoFechaHasta()\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Paciente</span>\n        </div>\n        <input type=\"text\" class=\"form-control\" [formControl]=\"pacienteControl\" [ngbTypeahead]=\"buscarPaciente\" (focus)=\"focusBuscarPaciente$.next($event.target.value)\"\n          (click)=\"clickBuscarPaciente$.next($event.target.value)\" #pacienteHTML #pacienteNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por paciente.\"\n          [resultFormatter]=\"formatoPacientes\" [inputFormatter]=\"formatoPacientes\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoPaciente()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Usuario</span>\n        </div>\n        <input type=\"text\" class=\"form-control\" [formControl]=\"usuarioControl\" [ngbTypeahead]=\"buscarUsuario\" (focus)=\"focusBuscarUsuario$.next($event.target.value)\"\n          (click)=\"clickBuscarUsuario$.next($event.target.value)\" #usuarioHTML #usuarioNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por usuario.\"\n          [resultFormatter]=\"formatoUsuarios\" [inputFormatter]=\"formatoUsuarios\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoUsuario()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-1\">\n      <button *ngIf=\"altaCitas\" type=\"button\" class=\"btn btn-azul btn-lg col-lg-12\" placement=\"bottom\" ngbTooltip=\"Realizar una cita.\"\n        (click)=\"altaCita();\">\n        <i class=\"material-icons\">add</i>\n      </button>\n    </div>\n    <div class=\"col-lg-5\">\n      <div class=\"input-group input-group-lg\">\n        <input type=\"text\" #buscarInfoHTML class=\"form-control\" placeholder=\"Búsqueda\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-azul\" type=\"button\" (click)=\"limpiarCampoBusqueda()\" placement=\"bottom\" ngbTooltip=\"Borrar búsqueda.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-1\">\n      <button class=\"btn btn-azul btn-lg col-lg-12\" type=\"button\" (click)=\"buscar()\" placement=\"bottom\" ngbTooltip=\"Buscar.\">\n        <i class=\"material-icons\">search</i>\n      </button>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-12 table-responsive\">\n      <div style=\"height:600px;overflow:auto;margin-right:15px;\">\n        <table class=\"table table-striped table-bordered\">\n          <thead>\n            <tr>\n              <th class=\"text-center\">Usuario</th>\n              <th class=\"text-center\">Paciente</th>\n              <th class=\"text-center\">Organización</th>\n              <th class=\"text-center\">Clínica</th>\n              <th class=\"text-center\">Estatus</th>\n              <th class=\"text-center\">Fecha</th>\n              <th class=\"text-center\">Actividad</th>\n              <th class=\"text-center\">Opciones</th>\n            </tr>\n          </thead>\n          <tbody *ngIf=\"citas.length > 0\">\n            <tr *ngFor=\"let cita of citas\">\n              <td>{{cita.nombres_usuario}}</td>\n              <td>{{cita.nombres_paciente}}</td>\n              <td>{{cita.nombre_organizacion}}</td>\n              <td>{{cita.nombre_clinica}}</td>\n              <td>{{cita.estatus}}</td>\n              <td>{{cita.fecha_hora_cita}}</td>\n              <td>{{cita.nombre_estado_cita}}</td>\n              <td>\n                <div class=\"btn-group btn-group-sm\" role=\"group\">\n                  <button *ngIf=\"cita.estatus=='ABIERTO' && editarCitas\" type=\"button\" class=\"btn\" ngbTooltip=\"Editar información de la cita.\" (click)='editarCita(cita.cita_id)'>\n                    <i class=\"material-icons\">edit</i>\n                  </button>\n                  <button *ngIf=\"eliminarCitas\" type=\"button\" class=\"btn\" ngbTooltip=\"Eliminar cita permanentemente.\" (click)='eliminarCita(cita.cita_id)'>\n                    <i class=\"material-icons\">delete_forever</i>\n                  </button>\n                  <button *ngIf=\"(inactivarCitas && cita.estatus=='ABIERTO') || (activarCitas && cita.estatus=='CERRADO')\" type=\"button\" class=\"btn\"\n                    (click)=\"cambiarEstatusCita(cita.cita_id, cita.estatus == 'ABIERTO'? 'CERRADO': 'ABIERTO')\">\n                    <i *ngIf=\"cita.estatus == 'ABIERTO'\" class=\"material-icons\" ngbTooltip=\"Cerrar cita.\">block</i>\n                    <i *ngIf=\"cita.estatus == 'CERRADO'\" class=\"material-icons\" ngbTooltip=\"Abrir cita.\">done</i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/citas/lista-citas/lista-citas.component.ts":
/*!************************************************************!*\
  !*** ./src/app/citas/lista-citas/lista-citas.component.ts ***!
  \************************************************************/
/*! exports provided: ListaCitasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaCitasComponent", function() { return ListaCitasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../custom-date-picker */ "./src/app/custom-date-picker.ts");
/* harmony import */ var _organizaciones_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../organizaciones.service */ "./src/app/organizaciones.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _citas_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../citas.service */ "./src/app/citas.service.ts");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/******************************************************************|
|NOMBRE: ListaCitasComponent.                                      |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de las citas.       |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 03/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var ListaCitasComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  utilidadesService = Contiene métodos genéricos y útiles,             |
    |  pacientesService = Contiene los métodos de mto. de pacientes,        |
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  modalService = contiene los métodos para manipular modals,           |
    |  autenticarService = contiene los métodos de autenticación,           |
    |  organizacionesService = contiene los métodos de base de datos de las |
    |  organizaciones,                                                      |
    |  clinicasService = contiene los métodos de la bd de las clínicas,     |
    |  citasService = contiene los métodos de la bd de los estados de citas,|
    |  usuariosService = contiene los métodos de la bd de los usuarios,     |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  rutaNavegacion   = para navegar a otras url´s                        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function ListaCitasComponent(utilidadesService, pacientesService, esperarService, modalService, autenticarService, organizacionesService, clinicasService, citasService, usuariosService, fb, rutaNavegacion) {
        var _this = this;
        this.utilidadesService = utilidadesService;
        this.pacientesService = pacientesService;
        this.esperarService = esperarService;
        this.modalService = modalService;
        this.autenticarService = autenticarService;
        this.organizacionesService = organizacionesService;
        this.clinicasService = clinicasService;
        this.citasService = citasService;
        this.usuariosService = usuariosService;
        this.fb = fb;
        this.rutaNavegacion = rutaNavegacion;
        //Propiedad que indica si el usuario puede dar de alta citas.
        this.altaCitas = false;
        //Propiedad que indica si el usuario puede editar citas.
        this.editarCitas = false;
        //Propiedad que indica si el usuario puede eliminar citas.
        this.eliminarCitas = false;
        //Propiedad que indica si el usuario puede inactivar citas.
        this.inactivarCitas = false;
        //Propiedad que indica si el usuario puede activar citas.
        this.activarCitas = false;
        //Variable que reacciona al focus del campo buscar usuario.
        this.focusBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar usuario.
        this.clickBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al focus del campo buscar paciente.
        this.focusBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar paciente.
        this.clickBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
        this.formatoUsuarios = function (value) { return value.nombres_usuario; };
        //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
        this.formatoPacientes = function (value) { return value.nombres_paciente; };
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Indica si el filtro de organizaciones ya se cargó.
        this.organizacionesInicioListas = false;
        //Indica si el filtro de clínicas ya se cargó.
        this.clinicasInicioListas = false;
        //Indica si el filtro de estados citas ya cargó.
        this.estadosCitasListos = false;
        //Indica si el filtro de usuarios ya se cargó.
        this.usuariosListos = false;
        //Indica si el filtro de pacientes ya se cargó.
        this.pacientesInicioListo = false;
        //Indica si la información de citas ya se obtuvo.
        this.citaslistas = false;
        //Almacena las citas de la base de datos pero su información se puede filtrar.
        this.citas = [];
        //Almacena las citas de la base de datos original sin que se filtre su información.
        this.citasServidor = [];
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarUsuario.                                               |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un usuario.                          |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 06/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarUsuario = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarUsuario$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function () { return !_this.usuarioNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(debouncedText$, _this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (term) { return (term === '' ? _this.usuarios
                : _this.usuarios.filter(function (usuario) { return usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarPaciente.                                              |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un paciente.                         |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 03/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarPaciente = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarPaciente$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function () { return !_this.pacienteNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(debouncedText$, _this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (term) { return (term === '' ? _this.pacientes
                : _this.pacientes.filter(function (paciente) { return paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        //Se agregan las validaciones al formulario de búsqueda de citas.
        this.formBusquedCitas = fb.group({
            'organizacion': ['0'],
            'clinica': ['0'],
            'estatus': ['ABIERTO'],
            'actividad': ['0'],
            'fechaDesde': [''],
            'fechaHasta': [''],
            'paciente': [''],
            'usuario': ['']
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.organizacionControl = this.formBusquedCitas.controls['organizacion'];
        this.clinicaControl = this.formBusquedCitas.controls['clinica'];
        this.estatusControl = this.formBusquedCitas.controls['estatus'];
        this.actividadControl = this.formBusquedCitas.controls['actividad'];
        this.fechaDesdeControl = this.formBusquedCitas.controls['fechaDesde'];
        this.fechaHastaControl = this.formBusquedCitas.controls['fechaHasta'];
        this.pacienteControl = this.formBusquedCitas.controls['paciente'];
        this.usuarioControl = this.formBusquedCitas.controls['usuario'];
        //Al calendario del campo fecha desde y hasta se les establece la fecha actual.
        var fechaActual = new Date();
        this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
        this.fechaHastaMinima = this.fechaDesdeInicial;
        //Se selecciona en el calendario de fecha desde y fecha hasta la fecha actual.
        this.fechaDesdeControl.setValue("");
        this.fechaHastaControl.setValue("");
        this.fechaDesdeSeleccionada = this.fechaDesdeInicial;
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan las organizaciones en su filtro.
        this.filtroOrganizaciones();
        //Se cargan las clínicas en su filtro.
        this.filtroClinicas(0);
        //Se cargan los estados de las citas.
        this.filtroEstadosCitas();
        //Se cargan los pacientes en su filtro.
        this.filtroPacientes();
        //Se cargan los usuarios en su filtro.
        this.filtroUsuarios();
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.organizacionesInicioListas &&
                _this.clinicasInicioListas &&
                _this.estadosCitasListos &&
                _this.usuariosListos &&
                _this.pacientesInicioListo) {
                //Se detiene la espera.
                _this.esperarService.noEsperar();
                //Se busca la información según los filtros iniciales.
                _this.buscar();
            }
        });
    }
    ListaCitasComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se obtiene el método de tecleado del elemento HTML de búsqueda.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (query) { return _this.utilidadesService.filtrarDatos(query, _this.citasServidor); }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchAll"])())
            .subscribe(function (resultados) {
            //Se actualiza la información en pantalla.        
            _this.citas = resultados;
        });
        //Evento de cuando se pega con el mouse algun texto en la caja de texto.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'paste')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(50))
            .subscribe(function (cadena) {
            //Genera un evento de teclazo para asegurar que se dispare el evento.
            _this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
        });
    };
    ListaCitasComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //El botón de dar de alta citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneMenu('alta-cita').subscribe(function (respuesta) {
            _this.altaCitas = respuesta["value"];
        });
        //El botón de editar citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('EDITAR CITA').subscribe(function (respuesta) {
            _this.editarCitas = respuesta["value"];
        });
        //El botón de eliminar citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('ELIMINAR CITA').subscribe(function (respuesta) {
            _this.eliminarCitas = respuesta["value"];
        });
        //El botón de inactivar citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('INACTIVAR CITA').subscribe(function (respuesta) {
            _this.inactivarCitas = respuesta["value"];
        });
        //El botón de activar citas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('ACTIVAR CITA').subscribe(function (respuesta) {
            _this.activarCitas = respuesta["value"];
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroOrganizaciones.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de organizaciones.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.filtroOrganizaciones = function () {
        var _this = this;
        this.organizacionesService.filtroOrganizaciones().subscribe(function (respuesta) {
            _this.organizacionesInicioListas = true;
            _this.cargaInicialLista$.next(_this.organizacionesInicioListas);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las organizaciones en el arreglo de organizaciones.
                _this.organizaciones = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
    |  esperar = para saber si se despliega el modal de espera.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.filtroClinicas = function (organizacionId, esperar) {
        var _this = this;
        if (esperar === void 0) { esperar = false; }
        //Si esperar es verdadero, entonces se abre el modal de espera.
        esperar ? this.esperarService.esperar() : null;
        this.clinicasService.filtroClinicas(organizacionId).subscribe(function (respuesta) {
            //Solo se realiza al recargar la página.
            if (!esperar) {
                _this.clinicasInicioListas = true;
                _this.cargaInicialLista$.next(_this.clinicasInicioListas);
            }
            //Si esperar es verdadero, entonces se cierra el modal de espera.
            esperar ? _this.esperarService.noEsperar() : null;
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las clínicas en el arreglo de clínicas.
                _this.clinicas = respuesta["datos"];
                //Se inicializa el select.
                _this.clinicaControl.setValue(0);
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroEstadosCitas.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de estados citas.          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.filtroEstadosCitas = function () {
        var _this = this;
        this.citasService.filtroEstadosCitas().subscribe(function (respuesta) {
            _this.estadosCitasListos = true;
            _this.cargaInicialLista$.next(_this.estadosCitasListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los estados de las citas en el arreglo de estados citas.
                _this.estadosCitas = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroUsuarios.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.filtroUsuarios = function () {
        var _this = this;
        //Intenta obtener los usuarios del usuario ingresado.
        this.usuariosService.filtroUsuarios()
            .subscribe(function (respuesta) {
            //Indica que el filtro de usuarios ya se cargó.
            _this.usuariosListos = true;
            _this.cargaInicialLista$.next(_this.usuariosListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los uusuarios en el arreglo de usuarios.
                _this.usuarios = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.filtroPacientes = function () {
        var _this = this;
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.filtroPacientes()
            .subscribe(function (respuesta) {
            _this.pacientesInicioListo = true;
            _this.cargaInicialLista$.next(_this.pacientesInicioListo);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los pacientes en el arreglo de pacientes.
                _this.pacientes = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: fechaDesdeSeleccion.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Cuando la fecha desde es seleccionada, la fecha hasta   |
    |  se resetea.                                                          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.fechaDesdeSeleccion = function (fechaSeleccionada) {
        //Se limpia la fecha hasta.
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierra el popup de fecha hasta en caso de que esté abierta.
        this.calendarioHastaHTML.close();
        //Se establece la fecha desde seleccionada.
        this.fechaDesdeSeleccionada = fechaSeleccionada;
        /*La fecha mínima a seleccionar en el campo hasta es la fecha desde,
        ya que no puede ser menor.*/
        this.fechaHastaMinima = fechaSeleccionada;
        //Se selecciona la fecha mínima a seleccionar en la fecha hasta.
        this.fechaHastaControl.setValue(fechaSeleccionada);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoFechaDesde.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo fecha desde y sus dependientes.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.limpiarCampoFechaDesde = function () {
        //Se limpia la fecha desde y hasta.
        this.fechaDesdeHTML.nativeElement.value = "";
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierran los popups del fecha desde y hasta en caso que estén abiertos.
        this.calendarioDesdeHTML.close();
        this.calendarioHastaHTML.close();
        //Se obtiene la fecha actual.
        var fechaActual = new Date();
        //Se establece la fecha actual en el calendario de las fechas desde y hasta.
        this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
        this.fechaHastaMinima = this.fechaDesdeInicial;
        this.fechaDesdeControl.setValue("");
        this.fechaHastaControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: mostrarPopUpFechaDesde.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Muestra el calendario de la fecha desde.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 08/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.mostrarPopUpFechaDesde = function () {
        /*Se cierra el calendario de fecha hasta, para que cuando se vuelva a abrir,
        se abra con la fecha mínima, que es la fecha desde.*/
        this.calendarioHastaHTML.close();
        //Se abre el el popup del calendario fecha desde.
        this.calendarioDesdeHTML.toggle();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: fechaHastaSeleccion.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Se le asigna a la fecha hasta la fecha seleccionada.    |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.fechaHastaSeleccion = function (fechaSeleccionada) {
        //Se establece la fecha desde seleccionada.
        this.fechaHastaSeleccionada = fechaSeleccionada;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoFechaHasta.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo fecha hasta.                            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.limpiarCampoFechaHasta = function () {
        //Se limpia la fecha hasta.    
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierran el popup del fecha hasta en caso que esté abierto.
        this.calendarioHastaHTML.close();
        //La fecha mínima de la fecha desde será la fecha desde seleccionada.
        this.fechaHastaMinima = this.fechaDesdeSeleccionada;
        this.fechaHastaControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoPaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo paciente.                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 09/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.limpiarCampoPaciente = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
        this.pacienteControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoUsuario.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo usuario.                                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 09/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.limpiarCampoUsuario = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
        this.usuarioControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: buscar.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 09/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.buscar = function () {
        var _this = this;
        //Si algunas de las fechas está seleccionada, la otra también debe de estarlo.
        var fechaDesde = this.fechaDesdeControl.value;
        var fechaHasta = this.fechaHastaControl.value;
        if (fechaDesde && !fechaHasta) {
            //Muestra una alerta indicando que se deben de llenar las dos fechas.      
            this._alerta("La fecha final debe ser completada.").subscribe(function () {
                _this.fechaHastaHTML.nativeElement.focus();
            });
            return;
        }
        else if (!fechaDesde && fechaHasta) {
            //Muestra una alerta indicando que se deben de llenar las dos fechas.      
            this._alerta("La fecha inicial debe ser completada.").subscribe(function () {
                _this.fechaDesdeHTML.nativeElement.focus();
            });
            return;
        }
        else if (fechaDesde && fechaHasta &&
            (fechaDesde.year >= fechaHasta.year &&
                fechaDesde.month >= fechaHasta.month &&
                fechaDesde.day > fechaHasta.day)) {
            this._alerta("La fecha inicial debe ser menor o igual a la fecha final.").subscribe(function () {
                _this.fechaDesdeHTML.nativeElement.focus();
            });
            return;
        }
        var paciente = this.pacienteControl.value;
        //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
        if (paciente && !paciente.id) {
            this._alerta("Seleccione un paciente válido.").subscribe(function () {
                _this.pacienteHTML.nativeElement.focus();
            });
            return;
        }
        var usuario = this.usuarioControl.value;
        //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
        if (usuario && !usuario.id) {
            this._alerta("Seleccione un usuario válido.").subscribe(function () {
                _this.usuarioHTML.nativeElement.focus();
            });
            return;
        }
        //Inicia la espera de respuesta.
        this.esperarService.esperar();
        //Busca las citas según los filtros aplicados.
        this.citasService.listaCitas(this.organizacionControl.value, this.clinicaControl.value, this.estatusControl.value, this.actividadControl.value, fechaDesde ? this.utilidadesService.formatearFecha(fechaDesde, false) : " ", fechaHasta ? this.utilidadesService.formatearFecha(fechaHasta, false) : " ", paciente ? paciente.id : "0", usuario ? usuario.id : "0").subscribe(function (respuesta) {
            //Detiene la espera, signo de que ya se obtuvo la información.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las citas en el arreglo de citas.
                _this.citas = respuesta["datos"];
                _this.citasServidor = respuesta["datos"];
                //Le da un focus al elemento de búsqueda.
                _this.buscarInfoHTML.nativeElement.focus();
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 11/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.limpiarCampoBusqueda = function () {
        //Si el campo tiene algo escrito se limpiará.
        if (this.buscarInfoHTML.nativeElement.value.length > 0) {
            //limpia el cuadro de texto.
            this.buscarInfoHTML.nativeElement.value = "";
            //Actualiza la información con la original.
            this.citas = this.citasServidor;
        }
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarCita.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar una cita.                          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId = identificador de la cita.            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 12/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.eliminarCita = function (citaId) {
        var _this = this;
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_15__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información de la cita. "
            + "¿Está seguro de eliminar la cita?";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar al paciente.
            if (result === "Sí") {
                _this.citasService.eliminarCita(citaId).subscribe(function (respuesta) {
                    //Si hubo un error.
                    if (respuesta["estado"] === "ERROR") {
                        //Muestra una alerta con el porqué del error.
                        _this._alerta(respuesta["mensaje"]);
                    }
                    else {
                        //Se actualizan los datos.            
                        _this._alerta("La cita se eliminó permanentemente.");
                        _this.buscar();
                    }
                });
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaCita.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de crear cita.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 13/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.altaCita = function () {
        this.rutaNavegacion.navigate(['citas', 'alta-cita']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarCita.                                                  |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de editar cita.          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId = identificador de la cita.            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.editarCita = function (citaId) {
        this.rutaNavegacion.navigateByUrl('citas/editar-cita/' + citaId);
    };
    /*----------------------------------------------------------------------|
      |  NOMBRE: _alerta.                                                     |
      |-----------------------------------------------------------------------|
      |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
      |               de la base de datos en forma de alerta.                 |
      |-----------------------------------------------------------------------|
      |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
      |-----------------------------------------------------------------------|
      |  AUTOR: Ricardo Luna.                                                 |
      |-----------------------------------------------------------------------|
      |  FECHA: 03/08/2018.                                                   |
      |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_8__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: cambiarEstatusCita.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para cambiar el estatus de una cita.             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: citaId = identificador de la cita.            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 16/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaCitasComponent.prototype.cambiarEstatusCita = function (citaId, estatus) {
        var _this = this;
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_15__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        // Mensaje que mostrará la confirmación según la opción: CERRADO o ABIERTO.
        var mensaje;
        // Mensaje que se mostrará al modificar el estatus de la cita.
        var mensajeCorrecto;
        if (estatus === 'CERRADO') {
            mensaje = "¿Desea inactivar/cerrar la cita?";
            mensajeCorrecto = "La cita se inactivó/cerró satisfactoriamente.";
        }
        else {
            mensaje = "¿Desea activar/abrir la cita?";
            mensajeCorrecto = "La cita se activó/abrió satisfactoriamente.";
        }
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar al paciente.
            if (result === "Sí") {
                //Abre el modal de espera.
                _this.esperarService.esperar();
                _this.citasService.cambiarEstatusCita(citaId, estatus).subscribe(function (respuesta) {
                    //Cierra el modal de espera.
                    _this.esperarService.noEsperar();
                    //Si hubo un error.
                    if (respuesta["estado"] === "ERROR") {
                        //Muestra una alerta con el porqué del error.
                        _this._alerta(respuesta["mensaje"]);
                    }
                    else {
                        _this._alerta(mensajeCorrecto).subscribe();
                        //Se actualizan los datos.
                        _this.buscar();
                    }
                });
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbTypeahead"])
    ], ListaCitasComponent.prototype, "usuarioNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaCitasComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbTypeahead"])
    ], ListaCitasComponent.prototype, "pacienteNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaCitasComponent.prototype, "pacienteHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fechaDesdeHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaCitasComponent.prototype, "fechaDesdeHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('calendarioDesdeHTML'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbInputDatepicker"]
        //Variable que almacena el control del formulario de la fechaHasta.
        )
    ], ListaCitasComponent.prototype, "calendarioDesdeHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fechaHastaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaCitasComponent.prototype, "fechaHastaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('calendarioHastaHTML'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbInputDatepicker"]
        //Cuadro de texto de búsqueda.
        )
    ], ListaCitasComponent.prototype, "calendarioHastaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('buscarInfoHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaCitasComponent.prototype, "buscarInfoHTML", void 0);
    ListaCitasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lista-citas',
            template: __webpack_require__(/*! ./lista-citas.component.html */ "./src/app/citas/lista-citas/lista-citas.component.html"),
            styles: [__webpack_require__(/*! ./lista-citas.component.css */ "./src/app/citas/lista-citas/lista-citas.component.css")],
            providers: [_custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["I18n"],
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDatepickerI18n"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["CustomDatePicker"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["FormatDatePicker"] }]
        }),
        __metadata("design:paramtypes", [_utilidades_service__WEBPACK_IMPORTED_MODULE_4__["UtilidadesService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_5__["PacientesService"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_6__["EsperarService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_7__["AutenticarService"],
            _organizaciones_service__WEBPACK_IMPORTED_MODULE_10__["OrganizacionesService"],
            _clinicas_service__WEBPACK_IMPORTED_MODULE_11__["ClinicasService"],
            _citas_service__WEBPACK_IMPORTED_MODULE_12__["CitasService"],
            _usuarios_service__WEBPACK_IMPORTED_MODULE_13__["UsuariosService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_16__["Router"]])
    ], ListaCitasComponent);
    return ListaCitasComponent;
}());



/***/ }),

/***/ "./src/app/citas/usuario-puede-modificar-cita.guard.ts":
/*!*************************************************************!*\
  !*** ./src/app/citas/usuario-puede-modificar-cita.guard.ts ***!
  \*************************************************************/
/*! exports provided: UsuarioPuedeModificarCitaGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioPuedeModificarCitaGuard", function() { return UsuarioPuedeModificarCitaGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/******************************************************************|
|NOMBRE: UsuarioPuedeModificarCita.                                |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario pueda modificar|
| una cita.                                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 20/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsuarioPuedeModificarCitaGuard = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |  si un usuario tiene asignado el usuario de atención, el paciente y   |
    |  la clínica.                                                          |
    |  rutaNavegacion: contiene los métodos para manipular url´s.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UsuarioPuedeModificarCitaGuard(autorizacion, rutaNavegacion) {
        this.autorizacion = autorizacion;
        this.rutaNavegacion = rutaNavegacion;
    }
    UsuarioPuedeModificarCitaGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        //Obtiene el identificador de la cita de la url.
        var citaId = next.paramMap.get("id");
        //Obtiene el parámetro de vista de la cita de la url.
        var soloVer = next.paramMap.get("soloVer") ? next.paramMap.get("soloVer") : "0";
        //Retorna verdadero o falso en caso de que el usuario pueda modificar la cita o no respectivamente.
        return this.autorizacion.usuarioPuedeModificarCita(citaId, soloVer).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resultado) {
            //Si el usuario no puede acceder a la cita.
            if (!resultado["value"]) {
                _this.rutaNavegacion.navigate(['citas', 'lista-citas']);
            }
            return resultado["value"];
        })).toPromise();
    };
    UsuarioPuedeModificarCitaGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_2__["AutenticarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], UsuarioPuedeModificarCitaGuard);
    return UsuarioPuedeModificarCitaGuard;
}());



/***/ }),

/***/ "./src/app/clinicas.service.ts":
/*!*************************************!*\
  !*** ./src/app/clinicas.service.ts ***!
  \*************************************/
/*! exports provided: ClinicasService, CLINICAS_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicasService", function() { return ClinicasService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLINICAS_PROVIDERS", function() { return CLINICAS_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/******************************************************************|
|NOMBRE: Clinicas.                                                 |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de base de datos de|
|las clínicas.                                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 06/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ClinicasService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend,         |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function ClinicasService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener las clínicas activas                |
    |  del usuario logueado.                                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:  organizacionId = id de la organización.      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ClinicasService.prototype.filtroClinicas = function (organizacionId) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los registros.
            return this.http.get(this.urlApi + 'filtro-clinicas/' + organizacionId, { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    ClinicasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], ClinicasService);
    return ClinicasService;
}());

//Constante que se utilizará para inyectar el servicio.
var CLINICAS_PROVIDERS = [
    { provide: ClinicasService, useClass: ClinicasService }
];


/***/ }),

/***/ "./src/app/consultas.service.ts":
/*!**************************************!*\
  !*** ./src/app/consultas.service.ts ***!
  \**************************************/
/*! exports provided: ConsultasService, CONSULTAS_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultasService", function() { return ConsultasService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSULTAS_PROVIDERS", function() { return CONSULTAS_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/******************************************************************|
|NOMBRE: Consultas.                                                |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos para el mto. de    |
|consultas.                                                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 28/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ConsultasService = /** @class */ (function () {
    function ConsultasService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: listaConsultas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener las consultas de los pacientes.     |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacion = id. de la organización,        |
    |  clinica = id. de la clínica,                                         |
    |  desde = fecha inicial,                                               |
    |  hasta = fecha final,                                                 |
    |  paciente= id. del paciente,                                          |
    |  usuario = id. del usuario.                                           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ConsultasService.prototype.listaConsultas = function (organizacion, clinica, desde, hasta, paciente, usuario) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener las consultas.
            return this.http.get(this.urlApi + ("lista-consultas/" + organizacion + "/" + clinica + "/" + desde + "/" + hasta + "/" + paciente + "/" + usuario), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: camposConsultaUsuario.                                       |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los campos para realizar, ver o     |
    |  editar una consulta del usuario logueado.                            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: alta = 1 = indica que se dará de alta una     |
    |  consulta, 0 = indica que se verá o editará la consulta.              |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ConsultasService.prototype.camposConsultaUsuario = function (alta) {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener la información..
            return this.http.get(this.urlApi + ("campos-consulta-usuario/" + alta), { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    ConsultasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
        /*----------------------------------------------------------------------|
        |  NOMBRE: constructor.                                                 |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método constructor del componente.                      |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
        |                         urlApi= url de la aplicación backend,         |
        |                         autorizacion = contiene los métodos para saber|
        |                                        si un usuario está conectado   |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 28/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        ,
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], ConsultasService);
    return ConsultasService;
}());

//Constante que se utilizará para inyectar el servicio.
var CONSULTAS_PROVIDERS = [
    { provide: ConsultasService, useClass: ConsultasService }
];


/***/ }),

/***/ "./src/app/consultas/alta-consulta/alta-consulta.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/consultas/alta-consulta/alta-consulta.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: alta-consulta.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del alta de consultas.        |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 29/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/consultas/alta-consulta/alta-consulta.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/consultas/alta-consulta/alta-consulta.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: alta-consulta.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para dar de alta consultas.                   |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 29/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-4\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de consultas.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-8\">\n      <h1 class=\"display-4\">Alta de consultas</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <form [formGroup]=\"formAltaConsultas\" (ngSubmit)=\"altaConsulta()\">    \n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Usuario*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"usuarioControl\" [ngbTypeahead]=\"buscarUsuario\" (focus)=\"focusBuscarUsuario$.next($event.target.value)\"\n            (click)=\"clickBuscarUsuario$.next($event.target.value)\" #usuarioHTML #usuarioNG=\"ngbTypeahead\" ngbTooltip=\"Seleccionar usuario de atención.\"\n            [resultFormatter]=\"formatoUsuarios\" [inputFormatter]=\"formatoUsuarios\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoUsuario()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div  *ngIf=\"pulsarCrear && !usuarioControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El Usuario es Requerido.</div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Paciente*</span>\n          </div>\n          <input type=\"text\" class=\"form-control\" [formControl]=\"pacienteControl\" [ngbTypeahead]=\"buscarPaciente\" (focus)=\"focusBuscarPaciente$.next($event.target.value)\"\n            (click)=\"clickBuscarPaciente$.next($event.target.value)\" #pacienteHTML #pacienteNG=\"ngbTypeahead\" ngbTooltip=\"Seleccionar paciente.\"\n            [resultFormatter]=\"formatoPacientes\" [inputFormatter]=\"formatoPacientes\" />\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoPaciente()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n              <i class=\"material-icons\">backspace</i>\n            </button>\n          </div>\n        </div>\n        <div  *ngIf=\"pulsarCrear && !pacienteControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">El Paciente es Requerido.</div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">Clínica*</span>\n          </div>\n          <select class=\"form-control\" [formControl]=\"clinicaControl\" #clinicaHTML ngbTooltip=\"Seleccionar una clínica.\">\n            <option *ngFor=\"let clinica of clinicas\" value={{clinica.id}}>\n              {{clinica.nombre}}\n            </option>\n          </select>\n        </div>\n        <div *ngIf=\"pulsarCrear && !clinicaControl.valid\" class=\"col-lg-12 alert-danger text-center campo-invalido\">La clínica es Requerida.</div>\n      </div>\n    </div>\n    <hr>\n    <div *ngFor=\"let campo of campos\" class=\"row\">\n      <div class=\"col-lg-3\"></div>      \n      <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">{{campo.etiqueta}}{{campo.requerido == \"1\" ? \"*\": \"\"}} </span>\n          </div>        \n          <input *ngIf=\"campo.tipo_campo == 'NUMÉRICO'\" #campoHTML [formControlName]=\"'control' + campo.id\" id=\"control{{campo.id}}\" type=\"text\" class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\">\n          <input *ngIf=\"campo.tipo_campo == 'TEXTO'\" #campoHTML [formControlName]=\"'control' + campo.id\" id=\"control{{campo.id}}\"  type=\"text\" class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\">          \n          <textarea  *ngIf=\"campo.tipo_campo == 'COMENTARIO'\" #campoHTML [formControlName]=\"'control' + campo.id\"  id=\"control{{campo.id}}\"  class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\"></textarea>\n          <input *ngIf=\"campo.tipo_campo == 'FECHA'\" #campoHTML [formControlName]=\"'control' + campo.id\" id=\"control{{campo.id}}\"   type=\"date\" class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\">          \n          <input *ngIf=\"campo.tipo_campo == 'HORA'\" #campoHTML [formControlName]=\"'control' + campo.id\" id=\"control{{campo.id}}\"   type=\"time\" class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\">          \n          <input *ngIf=\"campo.tipo_campo == 'IMAGEN'\" #campoHTML [formControlName]=\"'control' + campo.id\" id=\"control{{campo.id}}\"   type=\"file\" class=\"form-control\" ngbTooltip=\"{{campo.indicio}}\">          \n        </div>\n      </div>        \n      <div class=\"col-lg-3\"></div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Crear o dar de alta una consulta.\">Crear</button>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/consultas/alta-consulta/alta-consulta.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/consultas/alta-consulta/alta-consulta.component.ts ***!
  \********************************************************************/
/*! exports provided: AltaConsultaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltaConsultaComponent", function() { return AltaConsultaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _consultas_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../consultas.service */ "./src/app/consultas.service.ts");
/******************************************************************|
|NOMBRE: AltaConsultaComponent.                                        |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta citas.                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AltaConsultaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
      |  NOMBRE: constructor.                                                 |
      |-----------------------------------------------------------------------|
      |  DESCRIPCIÓN: Método constructor del componente.                      |
      |-----------------------------------------------------------------------|
      |  PARÁMETROS DE ENTRADA:                                               |
      |  rutaActual   = para navegar a otras url's,                           |
      |  usuariosService = contiene los métodos de la bd de los usuarios,     |
      |  pacientesService = Contiene los métodos de mto. de pacientes,        |
      |  modalService = contiene los métodos para manipular modals,           |
      |  esperarService = contiene los métodos para mostrar o no la espera,   |
      |  fb = contiene los métodos para manipular formularios HTML,           |
      |  utilidadesService = Contiene métodos genéricos y útiles,             |
      |  clinicasService = contiene los métodos de la bd de las clínicas,     |
      |  consultasService = contiene los métodos de la bd de las consultas.   |
      |-----------------------------------------------------------------------|
      |  AUTOR: Ricardo Luna.                                                 |
      |-----------------------------------------------------------------------|
      |  FECHA: 29/08/2018.                                                   |
      |----------------------------------------------------------------------*/
    function AltaConsultaComponent(rutaNavegacion, usuariosService, pacientesService, modalService, esperarService, fb, utilidadesService, clinicasService, consultaService) {
        var _this = this;
        this.rutaNavegacion = rutaNavegacion;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.modalService = modalService;
        this.esperarService = esperarService;
        this.fb = fb;
        this.utilidadesService = utilidadesService;
        this.clinicasService = clinicasService;
        this.consultaService = consultaService;
        //Variable para almacenar los campos.
        this.campos = new Array();
        //Variable que reacciona al focus del campo buscar usuario.
        this.focusBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar usuario.
        this.clickBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al focus del campo buscar paciente.
        this.focusBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar paciente.
        this.clickBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
        this.formatoUsuarios = function (value) { return value.nombres_usuario; };
        //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
        this.formatoPacientes = function (value) { return value.nombres_paciente; };
        //Indica si el filtro de usuarios ya se cargó.
        this.usuariosListos = false;
        //Indica si el filtro de pacientes ya se cargó.
        this.pacientesInicioListo = false;
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Indica si el filtro de clínicas ya se cargó.
        this.clinicasInicioListas = false;
        //Indica si los campos ya se obtuvieron.
        this.camposListos = false;
        //Propiedad para cuando se oprime el botón de crear consulta.
        this.pulsarCrear = false;
        /*----------------------------------------------------------------------|
          |  NOMBRE: buscarUsuario.                                               |
          |-----------------------------------------------------------------------|
          |  DESCRIPCIÓN: Método para buscar un usuario.                          |
          |-----------------------------------------------------------------------|
          |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
          |-----------------------------------------------------------------------|
          |  AUTOR: Ricardo Luna.                                                 |
          |-----------------------------------------------------------------------|
          |  FECHA: 29/08/2018.                                                   |
          |----------------------------------------------------------------------*/
        this.buscarUsuario = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarUsuario$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.usuarioNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.usuarios
                : _this.usuarios.filter(function (usuario) { return usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarPaciente.                                              |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un paciente.                         |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 29/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarPaciente = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarPaciente$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function () { return !_this.pacienteNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(debouncedText$, _this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (term) { return (term === '' ? _this.pacientes
                : _this.pacientes.filter(function (paciente) { return paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        //Al calendario se le establece la fecha actual.
        var fechaActual = new Date();
        //Se agregan las validaciones al formulario de alta de consultas.
        this.formAltaConsultas = fb.group({
            'usuario': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'paciente': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            'clinica': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required]]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.usuarioControl = this.formAltaConsultas.controls['usuario'];
        this.pacienteControl = this.formAltaConsultas.controls['paciente'];
        this.clinicaControl = this.formAltaConsultas.controls['clinica'];
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan los pacientes en su filtro.
        this.filtroPacientes();
        //Se cargan los usuarios en su filtro.
        this.filtroUsuarios();
        //Se cargan las clínicas en su filtro.
        this.filtroClinicas(0);
        //Se obtienen los campos configurados para el usuario logueado.
        this.obtenerCampos();
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.usuariosListos &&
                _this.pacientesInicioListo &&
                _this.clinicasInicioListas &&
                _this.camposListos) {
                //Se detiene la espera.
                _this.esperarService.noEsperar();
            }
        });
    }
    AltaConsultaComponent.prototype.ngOnInit = function () {
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroUsuarios.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.filtroUsuarios = function () {
        var _this = this;
        //Intenta obtener los usuarios del usuario ingresado.
        this.usuariosService.filtroUsuarios()
            .subscribe(function (respuesta) {
            //Indica que el filtro de usuarios ya se cargó.
            _this.usuariosListos = true;
            _this.cargaInicialLista$.next(_this.usuariosListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los uusuarios en el arreglo de usuarios.
                _this.usuarios = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.filtroPacientes = function () {
        var _this = this;
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.filtroPacientes()
            .subscribe(function (respuesta) {
            _this.pacientesInicioListo = true;
            _this.cargaInicialLista$.next(_this.pacientesInicioListo);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los pacientes en el arreglo de pacientes.
                _this.pacientes = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoPaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo paciente.                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.limpiarCampoPaciente = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
        this.pacienteControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoUsuario.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo usuario.                                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.limpiarCampoUsuario = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
        this.usuarioControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
    |  esperar = para saber si se despliega el modal de espera.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.filtroClinicas = function (organizacionId, esperar) {
        var _this = this;
        if (esperar === void 0) { esperar = false; }
        //Si esperar es verdadero, entonces se abre el modal de espera.
        esperar ? this.esperarService.esperar() : null;
        this.clinicasService.filtroClinicas(organizacionId).subscribe(function (respuesta) {
            //Solo se realiza al recargar la página.
            if (!esperar) {
                _this.clinicasInicioListas = true;
                _this.cargaInicialLista$.next(_this.clinicasInicioListas);
            }
            //Si esperar es verdadero, entonces se cierra el modal de espera.
            esperar ? _this.esperarService.noEsperar() : null;
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las clínicas en el arreglo de clínicas.
                _this.clinicas = respuesta["datos"];
                //Se inicializa el select con el primer valor encontrado.
                _this.clinicaControl.setValue(respuesta["datos"][0]["id"] ? respuesta["datos"][0]["id"] : "");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de consultas.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['consultas', 'lista-consultas']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerCampos.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los campos del usuario logueado.    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype.obtenerCampos = function () {
        var _this = this;
        //Intenta obtener los campos del usuario logueado.
        this.consultaService.camposConsultaUsuario("1")
            .subscribe(function (respuesta) {
            //Indica que los campos del usuario ya se cargaron.
            _this.camposListos = true;
            _this.cargaInicialLista$.next(_this.camposListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los campos en forma de JSON.        
                _this.campos = respuesta["datos"];
                //Se empiezan a crear los campos del formulario.
                _this.campos.forEach(function (campo) {
                    //Se crea el control dinámico.
                    var control;
                    //Se crean las validaciones que tendrá cada campo.
                    var validaciones = new Array();
                    //Si el campo es requerido.
                    campo["requerido"] == "1" ? validaciones.push(_angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required) : null;
                    campo["tipo_campo"] == "NUMÉRICO" ? validaciones.push(_this.utilidadesService.numberValidator) : null;
                    //Se agrega el campo control al formulario.
                    control = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControl"](campo["valor"], validaciones);
                    _this.formAltaConsultas.addControl('control' + campo["id"], control);
                });
                //Se obtienen los campos HTML creados dinámicamente.
                _this.campoHTML.changes.subscribe(function () {
                    _this.campoHTML.forEach(function (campo) {
                        // 
                        //Se obtiene solo el identificador del campo.
                        var campoId = campo.nativeElement["id"];
                        campoId = campoId.replace("control", "");
                        /*Se recorren de nuevo los campos obtenidos de la BD
                         para aplicarles la máscara si es que necesitan.*/
                        _this.campos.forEach(function (campoBD) {
                            //Si se encuentra el campo.
                            if (campoBD["id"] == campoId) {
                                switch (campoBD["tipo_campo"]) {
                                    //Si el campo es numérico.
                                    case 'NUMÉRICO': _this.utilidadesService.inputNumerico(campo);
                                    case 'TEXTO': _this.utilidadesService.inputNumerico(campo, true);
                                }
                            }
                        });
                    });
                });
            }
        });
    };
    AltaConsultaComponent.prototype.hola = function (event) {
        console.log(event);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
    |               de la base de datos en forma de alerta.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaConsultaComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_6__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], AltaConsultaComponent.prototype, "usuarioNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaConsultaComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTypeahead"])
    ], AltaConsultaComponent.prototype, "pacienteNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaConsultaComponent.prototype, "pacienteHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clinicaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaConsultaComponent.prototype, "clinicaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('campoHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], AltaConsultaComponent.prototype, "campoHTML", void 0);
    AltaConsultaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-alta-consulta',
            template: __webpack_require__(/*! ./alta-consulta.component.html */ "./src/app/consultas/alta-consulta/alta-consulta.component.html"),
            styles: [__webpack_require__(/*! ./alta-consulta.component.css */ "./src/app/consultas/alta-consulta/alta-consulta.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _usuarios_service__WEBPACK_IMPORTED_MODULE_4__["UsuariosService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_5__["PacientesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_10__["UtilidadesService"],
            _clinicas_service__WEBPACK_IMPORTED_MODULE_11__["ClinicasService"],
            _consultas_service__WEBPACK_IMPORTED_MODULE_12__["ConsultasService"]])
    ], AltaConsultaComponent);
    return AltaConsultaComponent;
}());



/***/ }),

/***/ "./src/app/consultas/consultas.component.css":
/*!***************************************************!*\
  !*** ./src/app/consultas/consultas.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/consultas/consultas.component.html":
/*!****************************************************!*\
  !*** ./src/app/consultas/consultas.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/consultas/consultas.component.ts":
/*!**************************************************!*\
  !*** ./src/app/consultas/consultas.component.ts ***!
  \**************************************************/
/*! exports provided: ConsultasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultasComponent", function() { return ConsultasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConsultasComponent = /** @class */ (function () {
    function ConsultasComponent() {
    }
    ConsultasComponent.prototype.ngOnInit = function () {
    };
    ConsultasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-consultas',
            template: __webpack_require__(/*! ./consultas.component.html */ "./src/app/consultas/consultas.component.html"),
            styles: [__webpack_require__(/*! ./consultas.component.css */ "./src/app/consultas/consultas.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ConsultasComponent);
    return ConsultasComponent;
}());



/***/ }),

/***/ "./src/app/consultas/consultas.module.ts":
/*!***********************************************!*\
  !*** ./src/app/consultas/consultas.module.ts ***!
  \***********************************************/
/*! exports provided: rutas, ConsultasModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rutas", function() { return rutas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultasModule", function() { return ConsultasModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _lista_consultas_lista_consultas_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lista-consultas/lista-consultas.component */ "./src/app/consultas/lista-consultas/lista-consultas.component.ts");
/* harmony import */ var _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../usuario-tiene-menu.guard */ "./src/app/usuario-tiene-menu.guard.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _consultas_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./consultas.component */ "./src/app/consultas/consultas.component.ts");
/* harmony import */ var _alta_consulta_alta_consulta_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alta-consulta/alta-consulta.component */ "./src/app/consultas/alta-consulta/alta-consulta.component.ts");
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









//Constante que contiene las rutas que tendrá el módulo.
var rutas = [
    { path: '', component: _lista_consultas_lista_consultas_component__WEBPACK_IMPORTED_MODULE_3__["ListaConsultasComponent"] },
    { path: 'lista-consultas', component: _lista_consultas_lista_consultas_component__WEBPACK_IMPORTED_MODULE_3__["ListaConsultasComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_4__["UsuarioTieneMenuGuard"]] },
    { path: 'alta-consulta', component: _alta_consulta_alta_consulta_component__WEBPACK_IMPORTED_MODULE_8__["AltaConsultaComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_4__["UsuarioTieneMenuGuard"]] },
];
var ConsultasModule = /** @class */ (function () {
    function ConsultasModule() {
    }
    ConsultasModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"]
            ],
            declarations: [_lista_consultas_lista_consultas_component__WEBPACK_IMPORTED_MODULE_3__["ListaConsultasComponent"], _consultas_component__WEBPACK_IMPORTED_MODULE_7__["ConsultasComponent"], _alta_consulta_alta_consulta_component__WEBPACK_IMPORTED_MODULE_8__["AltaConsultaComponent"]],
            exports: [_consultas_component__WEBPACK_IMPORTED_MODULE_7__["ConsultasComponent"]],
            providers: [
                _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_4__["UsuarioTieneMenuGuard"]
            ]
        })
    ], ConsultasModule);
    return ConsultasModule;
}());



/***/ }),

/***/ "./src/app/consultas/lista-consultas/lista-consultas.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/consultas/lista-consultas/lista-consultas.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: lista-consultas.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la lista de consultas.     |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 28/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n    font-size: 15px;\n\n  }\n\n  \n"

/***/ }),

/***/ "./src/app/consultas/lista-consultas/lista-consultas.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/consultas/lista-consultas/lista-consultas.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: lista-consultas.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página de consultas.                                 |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 28/08/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Organización</span>\n        </div>\n        <select class=\"form-control select\" [formControl]=\"organizacionControl\" #organizacionHTML ngbTooltip=\"Seleccionar una organización.\"\n          (change)=\"filtroClinicas(organizacionHTML.value, true)\">\n          <option value=\"0\">TODAS</option>\n          <option *ngFor=\"let organizacion of organizaciones\" value={{organizacion.id}}>\n            {{organizacion.nombre}}\n          </option>\n        </select>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Clínica</span>\n        </div>\n        <select class=\"form-control\" [formControl]=\"clinicaControl\" ngbTooltip=\"Seleccionar una clínica.\">\n          <option value=\"0\">TODAS</option>\n          <option *ngFor=\"let clinica of clinicas\" value={{clinica.id}}>\n            {{clinica.nombre}}\n          </option>\n        </select>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Desde</span>\n        </div>\n        <input #calendarioDesdeHTML=\"ngbDatepicker\" [startDate]=\"fechaDesdeInicial\" #fechaDesdeHTML (dateSelect)=\"fechaDesdeSeleccion($event)\"\n          ngbDatepicker class=\"form-control\" readonly ngbTooltip=\"Fecha desde donde inicia la búsqueda.\" [formControl]=\"fechaDesdeControl\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" (click)=\"mostrarPopUpFechaDesde()\" type=\"button\" ngbTooltip=\"Abrir calendario.\">\n            <i class=\"material-icons\">date_range</i>\n          </button>\n          <button class=\"btn btn-outline-secondary\" type=\"button\" ngbTooltip=\"Borrar fecha.\" (click)=\"limpiarCampoFechaDesde()\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Hasta</span>\n        </div>\n        <input #calendarioHastaHTML=\"ngbDatepicker\" [startDate]=\"fechaHastaMinima\" [minDate]=\"fechaHastaMinima\" #fechaHastaHTML (dateSelect)=\"fechaHastaSeleccion($event)\"\n          ngbDatepicker class=\"form-control\" readonly ngbTooltip=\"Fecha hasta donde inicia la búsqueda.\" [formControl]=\"fechaHastaControl\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" (click)=\"calendarioHastaHTML.toggle()\" type=\"button\" ngbTooltip=\"Abrir calendario.\">\n            <i class=\"material-icons\">date_range</i>\n          </button>\n          <button class=\"btn btn-outline-secondary\" type=\"button\" ngbTooltip=\"Borrar fecha.\" (click)=\"limpiarCampoFechaHasta()\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Paciente</span>\n        </div>\n        <input type=\"text\" class=\"form-control\" [formControl]=\"pacienteControl\" [ngbTypeahead]=\"buscarPaciente\" (focus)=\"focusBuscarPaciente$.next($event.target.value)\"\n          (click)=\"clickBuscarPaciente$.next($event.target.value)\" #pacienteHTML #pacienteNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por paciente.\"\n          [resultFormatter]=\"formatoPacientes\" [inputFormatter]=\"formatoPacientes\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoPaciente()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-6\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\">Usuario</span>\n        </div>\n        <input type=\"text\" class=\"form-control\" [formControl]=\"usuarioControl\" [ngbTypeahead]=\"buscarUsuario\" (focus)=\"focusBuscarUsuario$.next($event.target.value)\"\n          (click)=\"clickBuscarUsuario$.next($event.target.value)\" #usuarioHTML #usuarioNG=\"ngbTypeahead\" ngbTooltip=\"Buscar por usuario.\"\n          [resultFormatter]=\"formatoUsuarios\" [inputFormatter]=\"formatoUsuarios\" />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"limpiarCampoUsuario()\" placement=\"bottom\" ngbTooltip=\"Borrar contenido.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-1\">\n      <button *ngIf=\"altaConsultas\" type=\"button\" class=\"btn btn-azul btn-lg col-lg-12\" placement=\"bottom\" ngbTooltip=\"Realizar una consulta.\"\n        (click)=\"altaConsulta();\">\n        <i class=\"material-icons\">add</i>\n      </button>\n    </div>\n    <div class=\"col-lg-5\">\n      <div class=\"input-group input-group-lg\">\n        <input type=\"text\" #buscarInfoHTML class=\"form-control\" placeholder=\"Búsqueda\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-azul\" type=\"button\" (click)=\"limpiarCampoBusqueda()\" placement=\"bottom\" ngbTooltip=\"Borrar búsqueda.\">\n            <i class=\"material-icons\">backspace</i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-1\">\n      <button class=\"btn btn-azul btn-lg col-lg-12\" type=\"button\" (click)=\"buscar()\" placement=\"bottom\" ngbTooltip=\"Buscar.\">\n        <i class=\"material-icons\">search</i>\n      </button>\n    </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div class=\"col-lg-12 table-responsive\">      \n        <table class=\"table table-striped table-bordered\">\n          <thead>\n            <tr>\n              <th class=\"text-center\">Usuario</th>\n              <th class=\"text-center\">Paciente</th>\n              <th class=\"text-center\">Organización</th>\n              <th class=\"text-center\">Clínica</th>              \n              <th class=\"text-center\">Fecha</th>              \n              <th class=\"text-center\">Opciones</th>\n            </tr>\n          </thead>\n          <tbody *ngIf=\"consultas.length > 0\">\n            <tr *ngFor=\"let consulta of consultas\">\n              <td>{{consulta.nombres_usuario}}</td>\n              <td>{{consulta.nombres_paciente}}</td>\n              <td>{{consulta.nombre_organizacion}}</td>\n              <td>{{consulta.nombre_clinica}}</td>              \n              <td>{{consulta.fecha_hora_consulta}}</td>              \n              <td>\n                <div class=\"btn-group btn-group-sm\" role=\"group\">\n                    <button *ngIf=\"editarConsultas\" type=\"button\" class=\"btn\" ngbTooltip=\"Editar información de la consulta.\" (click)='editarConsulta(consulta.id)'>\n                    <i class=\"material-icons\">edit</i>\n                  </button>\n                  <button *ngIf=\"eliminarConsultas\" type=\"button\" class=\"btn\" ngbTooltip=\"Eliminar consulta permanentemente.\" (click)='eliminarConsulta(consulta.id)'>\n                    <i class=\"material-icons\">delete_forever</i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>      \n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/consultas/lista-consultas/lista-consultas.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/consultas/lista-consultas/lista-consultas.component.ts ***!
  \************************************************************************/
/*! exports provided: ListaConsultasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaConsultasComponent", function() { return ListaConsultasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../custom-date-picker */ "./src/app/custom-date-picker.ts");
/* harmony import */ var _organizaciones_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../organizaciones.service */ "./src/app/organizaciones.service.ts");
/* harmony import */ var _clinicas_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../clinicas.service */ "./src/app/clinicas.service.ts");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../usuarios.service */ "./src/app/usuarios.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _consultas_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../consultas.service */ "./src/app/consultas.service.ts");
/******************************************************************|
|NOMBRE: ListaConsultasComponent.                                  |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de las consultas.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 28/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var ListaConsultasComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  utilidadesService = Contiene métodos genéricos y útiles,             |
    |  pacientesService = Contiene los métodos de mto. de pacientes,        |
    |  esperarService = contiene los métodos para mostrar o no la espera,   |
    |  modalService = contiene los métodos para manipular modals,           |
    |  autenticarService = contiene los métodos de autenticación,           |
    |  organizacionesService = contiene los métodos de base de datos de las |
    |  organizaciones,                                                      |
    |  clinicasService = contiene los métodos de la bd de las clínicas,     |
    |  consultasService = contiene los métodos de la bd de las consultas,   |
    |  usuariosService = contiene los métodos de la bd de los usuarios,     |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  rutaNavegacion   = para navegar a otras url´s                        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function ListaConsultasComponent(utilidadesService, pacientesService, esperarService, modalService, autenticarService, organizacionesService, clinicasService, consultasService, usuariosService, fb, rutaNavegacion) {
        var _this = this;
        this.utilidadesService = utilidadesService;
        this.pacientesService = pacientesService;
        this.esperarService = esperarService;
        this.modalService = modalService;
        this.autenticarService = autenticarService;
        this.organizacionesService = organizacionesService;
        this.clinicasService = clinicasService;
        this.consultasService = consultasService;
        this.usuariosService = usuariosService;
        this.fb = fb;
        this.rutaNavegacion = rutaNavegacion;
        //Propiedad que indica si el usuario puede dar de alta consultas.
        this.altaConsultas = false;
        //Propiedad que indica si el usuario puede editar consultas.
        this.editarConsultas = false;
        //Propiedad que indica si el usuario puede eliminar consultas.
        this.eliminarConsultas = false;
        //Variable que reacciona al focus del campo buscar usuario.
        this.focusBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar usuario.
        this.clickBuscarUsuario$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al focus del campo buscar paciente.
        this.focusBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Variable que reacciona al darle clic al campo buscar paciente.
        this.clickBuscarPaciente$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Formato que se utilizará para presentar la información en el cuadro de texto de usuarios.
        this.formatoUsuarios = function (value) { return value.nombres_usuario; };
        //Formato que se utilizará para presentar la información en el cuadro de texto de pacientes.
        this.formatoPacientes = function (value) { return value.nombres_paciente; };
        //Indica si la carga inicial de la página ya terminó.
        this.cargaInicialLista$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Indica si el filtro de organizaciones ya se cargó.
        this.organizacionesInicioListas = false;
        //Indica si el filtro de clínicas ya se cargó.
        this.clinicasInicioListas = false;
        //Indica si el filtro de usuarios ya se cargó.
        this.usuariosListos = false;
        //Indica si el filtro de pacientes ya se cargó.
        this.pacientesInicioListo = false;
        //Indica si la información de consultas ya se obtuvo.
        this.consultaslistas = false;
        //Almacena las consultas de la base de datos pero su información se puede filtrar.
        this.consultas = [];
        //Almacena las consultas de la base de datos original sin que se filtre su información.
        this.consultasServidor = [];
        /*----------------------------------------------------------------------|
          |  NOMBRE: buscarUsuario.                                               |
          |-----------------------------------------------------------------------|
          |  DESCRIPCIÓN: Método para buscar un usuario.                          |
          |-----------------------------------------------------------------------|
          |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
          |-----------------------------------------------------------------------|
          |  AUTOR: Ricardo Luna.                                                 |
          |-----------------------------------------------------------------------|
          |  FECHA: 28/08/2018.                                                   |
          |----------------------------------------------------------------------*/
        this.buscarUsuario = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarUsuario$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function () { return !_this.usuarioNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(debouncedText$, _this.focusBuscarUsuario$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (term) { return (term === '' ? _this.usuarios
                : _this.usuarios.filter(function (usuario) { return usuario.nombres_usuario.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        /*----------------------------------------------------------------------|
        |  NOMBRE: buscarPaciente.                                              |
        |-----------------------------------------------------------------------|
        |  DESCRIPCIÓN: Método para buscar un paciente.                         |
        |-----------------------------------------------------------------------|
        |  PARÁMETROS DE ENTRADA: text = texto que se buscará.                  |
        |-----------------------------------------------------------------------|
        |  AUTOR: Ricardo Luna.                                                 |
        |-----------------------------------------------------------------------|
        |  FECHA: 28/08/2018.                                                   |
        |----------------------------------------------------------------------*/
        this.buscarPaciente = function (text$) {
            //Tiempo que durará en buscar en el arreglo mientras se teclea.
            var debouncedText$ = text$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
            //Se abre o se cierra el popup con la lista según sea el caso.
            var clicksWithClosedPopup$ = _this.clickBuscarPaciente$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function () { return !_this.pacienteNG.isPopupOpen(); }));
            //Realiza la búsqueda dentro del arreglo.  
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(debouncedText$, _this.focusBuscarPaciente$, clicksWithClosedPopup$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (term) { return (term === '' ? _this.pacientes
                : _this.pacientes.filter(function (paciente) { return paciente.nombres_paciente.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
        //Se agregan las validaciones al formulario de búsqueda de consultas.
        this.formBusquedaConsultas = fb.group({
            'organizacion': ['0'],
            'clinica': ['0'],
            'fechaDesde': [''],
            'fechaHasta': [''],
            'paciente': [''],
            'usuario': ['']
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.organizacionControl = this.formBusquedaConsultas.controls['organizacion'];
        this.clinicaControl = this.formBusquedaConsultas.controls['clinica'];
        this.fechaDesdeControl = this.formBusquedaConsultas.controls['fechaDesde'];
        this.fechaHastaControl = this.formBusquedaConsultas.controls['fechaHasta'];
        this.pacienteControl = this.formBusquedaConsultas.controls['paciente'];
        this.usuarioControl = this.formBusquedaConsultas.controls['usuario'];
        //Al calendario del campo fecha desde y hasta se les establece la fecha actual.
        var fechaActual = new Date();
        this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
        this.fechaHastaMinima = this.fechaDesdeInicial;
        //Se selecciona en el calendario de fecha desde y fecha hasta la fecha actual.
        this.fechaDesdeControl.setValue("");
        this.fechaHastaControl.setValue("");
        this.fechaDesdeSeleccionada = this.fechaDesdeInicial;
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Se cargan las organizaciones en su filtro.
        this.filtroOrganizaciones();
        //Se cargan las clínicas en su filtro.
        this.filtroClinicas(0);
        //Se cargan los pacientes en su filtro.
        this.filtroPacientes();
        //Se cargan los usuarios en su filtro.
        this.filtroUsuarios();
        //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
        this.cargaInicialLista$.subscribe(function (valor) {
            //Si todos los filtros e información están listos.
            if (_this.organizacionesInicioListas &&
                _this.clinicasInicioListas &&
                _this.usuariosListos &&
                _this.pacientesInicioListo) {
                //Se detiene la espera.
                _this.esperarService.noEsperar();
                //Se busca la información según los filtros iniciales.
                _this.buscar();
            }
        });
    }
    ListaConsultasComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se obtiene el método de tecleado del elemento HTML de búsqueda.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (query) { return _this.utilidadesService.filtrarDatos(query, _this.consultasServidor); }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchAll"])())
            .subscribe(function (resultados) {
            //Se actualiza la información en pantalla.        
            _this.consultas = resultados;
        });
        //Evento de cuando se pega con el mouse algun texto en la caja de texto.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.buscarInfoHTML.nativeElement, 'paste')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(50))
            .subscribe(function (cadena) {
            //Genera un evento de teclazo para asegurar que se dispare el evento.
            _this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
        });
    };
    ListaConsultasComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //El botón de dar de alta consultas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneMenu('alta-consulta').subscribe(function (respuesta) {
            _this.altaConsultas = respuesta["value"];
        });
        //El botón de editar consultas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('EDITAR CONSULTA').subscribe(function (respuesta) {
            _this.editarConsulta = respuesta["value"];
        });
        //El botón de eliminar consultas se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('ELIMINAR CONSULTA').subscribe(function (respuesta) {
            _this.eliminarConsulta = respuesta["value"];
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroOrganizaciones.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de organizaciones.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.filtroOrganizaciones = function () {
        var _this = this;
        this.organizacionesService.filtroOrganizaciones().subscribe(function (respuesta) {
            _this.organizacionesInicioListas = true;
            _this.cargaInicialLista$.next(_this.organizacionesInicioListas);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las organizaciones en el arreglo de organizaciones.
                _this.organizaciones = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroClinicas.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de clínicas.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: organizacionId = id de la organización,       |
    |  esperar = para saber si se despliega el modal de espera.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.filtroClinicas = function (organizacionId, esperar) {
        var _this = this;
        if (esperar === void 0) { esperar = false; }
        //Si esperar es verdadero, entonces se abre el modal de espera.
        esperar ? this.esperarService.esperar() : null;
        this.clinicasService.filtroClinicas(organizacionId).subscribe(function (respuesta) {
            //Solo se realiza al recargar la página.
            if (!esperar) {
                _this.clinicasInicioListas = true;
                _this.cargaInicialLista$.next(_this.clinicasInicioListas);
            }
            //Si esperar es verdadero, entonces se cierra el modal de espera.
            esperar ? _this.esperarService.noEsperar() : null;
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las clínicas en el arreglo de clínicas.
                _this.clinicas = respuesta["datos"];
                //Se inicializa el select.
                _this.clinicaControl.setValue(0);
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroUsuarios.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de usuarios.               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.filtroUsuarios = function () {
        var _this = this;
        //Intenta obtener los usuarios del usuario ingresado.
        this.usuariosService.filtroUsuarios()
            .subscribe(function (respuesta) {
            //Indica que el filtro de usuarios ya se cargó.
            _this.usuariosListos = true;
            _this.cargaInicialLista$.next(_this.usuariosListos);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los uusuarios en el arreglo de usuarios.
                _this.usuarios = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para llenar el filtro de pacientes.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.filtroPacientes = function () {
        var _this = this;
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.filtroPacientes()
            .subscribe(function (respuesta) {
            _this.pacientesInicioListo = true;
            _this.cargaInicialLista$.next(_this.pacientesInicioListo);
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan los pacientes en el arreglo de pacientes.
                _this.pacientes = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: fechaDesdeSeleccion.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Cuando la fecha desde es seleccionada, la fecha hasta   |
    |  se resetea.                                                          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.fechaDesdeSeleccion = function (fechaSeleccionada) {
        //Se limpia la fecha hasta.
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierra el popup de fecha hasta en caso de que esté abierta.
        this.calendarioHastaHTML.close();
        //Se establece la fecha desde seleccionada.
        this.fechaDesdeSeleccionada = fechaSeleccionada;
        /*La fecha mínima a seleccionar en el campo hasta es la fecha desde,
        ya que no puede ser menor.*/
        this.fechaHastaMinima = fechaSeleccionada;
        //Se selecciona la fecha mínima a seleccionar en la fecha hasta.
        this.fechaHastaControl.setValue(fechaSeleccionada);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoFechaDesde.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo fecha desde y sus dependientes.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.limpiarCampoFechaDesde = function () {
        //Se limpia la fecha desde y hasta.
        this.fechaDesdeHTML.nativeElement.value = "";
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierran los popups del fecha desde y hasta en caso que estén abiertos.
        this.calendarioDesdeHTML.close();
        this.calendarioHastaHTML.close();
        //Se obtiene la fecha actual.
        var fechaActual = new Date();
        //Se establece la fecha actual en el calendario de las fechas desde y hasta.
        this.fechaDesdeInicial = { year: fechaActual.getFullYear(), month: fechaActual.getMonth() + 1, day: fechaActual.getDate() };
        this.fechaHastaMinima = this.fechaDesdeInicial;
        this.fechaDesdeControl.setValue("");
        this.fechaHastaControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: mostrarPopUpFechaDesde.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Muestra el calendario de la fecha desde.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.mostrarPopUpFechaDesde = function () {
        /*Se cierra el calendario de fecha hasta, para que cuando se vuelva a abrir,
        se abra con la fecha mínima, que es la fecha desde.*/
        this.calendarioHastaHTML.close();
        //Se abre el el popup del calendario fecha desde.
        this.calendarioDesdeHTML.toggle();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: fechaHastaSeleccion.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Se le asigna a la fecha hasta la fecha seleccionada.    |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fechaSeleccionada = fecha seleccionada.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.fechaHastaSeleccion = function (fechaSeleccionada) {
        //Se establece la fecha desde seleccionada.
        this.fechaHastaSeleccionada = fechaSeleccionada;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoFechaHasta.                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo fecha hasta.                            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.limpiarCampoFechaHasta = function () {
        //Se limpia la fecha hasta.    
        this.fechaHastaHTML.nativeElement.value = "";
        //Se cierran el popup del fecha hasta en caso que esté abierto.
        this.calendarioHastaHTML.close();
        //La fecha mínima de la fecha desde será la fecha desde seleccionada.
        this.fechaHastaMinima = this.fechaDesdeSeleccionada;
        this.fechaHastaControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoPaciente.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo paciente.                               |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 09/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.limpiarCampoPaciente = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.pacienteHTML.nativeElement);
        this.pacienteControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoUsuario.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo usuario.                                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.limpiarCampoUsuario = function () {
        //Se limpia la caja de texto y su valor.
        this.utilidadesService.limpiarCampoTexto(this.usuarioHTML.nativeElement);
        this.usuarioControl.setValue("");
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: buscar.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Ejecuta la búsqueda.                                    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.buscar = function () {
        var _this = this;
        //Si algunas de las fechas está seleccionada, la otra también debe de estarlo.
        var fechaDesde = this.fechaDesdeControl.value;
        var fechaHasta = this.fechaHastaControl.value;
        if (fechaDesde && !fechaHasta) {
            //Muestra una alerta indicando que se deben de llenar las dos fechas.      
            this._alerta("La fecha final debe ser completada.").subscribe(function () {
                _this.fechaHastaHTML.nativeElement.focus();
            });
            return;
        }
        else if (!fechaDesde && fechaHasta) {
            //Muestra una alerta indicando que se deben de llenar las dos fechas.      
            this._alerta("La fecha inicial debe ser completada.").subscribe(function () {
                _this.fechaDesdeHTML.nativeElement.focus();
            });
            return;
        }
        else if (fechaDesde && fechaHasta &&
            (fechaDesde.year >= fechaHasta.year &&
                fechaDesde.month >= fechaHasta.month &&
                fechaDesde.day > fechaHasta.day)) {
            this._alerta("La fecha inicial debe ser menor o igual a la fecha final.").subscribe(function () {
                _this.fechaDesdeHTML.nativeElement.focus();
            });
            return;
        }
        var paciente = this.pacienteControl.value;
        //Si viene algo escrito en el paciente pero no es un registro de  base de datos.
        if (paciente && !paciente.id) {
            this._alerta("Seleccione un paciente válido.").subscribe(function () {
                _this.pacienteHTML.nativeElement.focus();
            });
            return;
        }
        var usuario = this.usuarioControl.value;
        //Si viene algo escrito en el usuario pero no es un registro de  base de datos.
        if (usuario && !usuario.id) {
            this._alerta("Seleccione un usuario válido.").subscribe(function () {
                _this.usuarioHTML.nativeElement.focus();
            });
            return;
        }
        //Inicia la espera de respuesta.
        this.esperarService.esperar();
        //Busca las consultas según los filtros aplicados.
        this.consultasService.listaConsultas(this.organizacionControl.value, this.clinicaControl.value, fechaDesde ? this.utilidadesService.formatearFecha(fechaDesde, false) : " ", fechaHasta ? this.utilidadesService.formatearFecha(fechaHasta, false) : " ", paciente ? paciente.id : "0", usuario ? usuario.id : "0").subscribe(function (respuesta) {
            //Detiene la espera, signo de que ya se obtuvo la información.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se almacenan las consultas en el arreglo de consultas.
                _this.consultas = respuesta["datos"];
                _this.consultasServidor = respuesta["datos"];
                //Le da un focus al elemento de búsqueda.
                _this.buscarInfoHTML.nativeElement.focus();
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.limpiarCampoBusqueda = function () {
        //Si el campo tiene algo escrito se limpiará.
        if (this.buscarInfoHTML.nativeElement.value.length > 0) {
            //limpia el cuadro de texto.
            this.buscarInfoHTML.nativeElement.value = "";
            //Actualiza la información con la original.
            this.consultas = this.consultasServidor;
        }
        //Le da un focus al elemento de búsqueda.
        this.buscarInfoHTML.nativeElement.focus();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarConsulta.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar una consulta.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.eliminarConsulta = function (consultaId) {
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_14__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información de la consulta. "
            + "¿Está seguro de eliminar la consulta?";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar al paciente.
            if (result === "Sí") {
                /*this.citasService.eliminarCita(citaId).subscribe(respuesta => {
                  //Si hubo un error.
                  if (respuesta["estado"] === "ERROR") {
                    //Muestra una alerta con el porqué del error.
                    this._alerta(respuesta["mensaje"]);
                  }
                  //Si todo salió bien.
                  else {
                    //Se actualizan los datos.
                    this._alerta("La cita se eliminó permanentemente.");
                    this.buscar();
                  }
                });*/
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaConsulta.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de crear consulta.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.altaConsulta = function () {
        this.rutaNavegacion.navigate(['consultas', 'alta-consulta']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarConsulta.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de editar consulta.      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: consultaId = identificador de la consulta.    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype.editarConsulta = function (consultaId) {
        this.rutaNavegacion.navigateByUrl('consultas/editar-consulta/' + consultaId);
    };
    /*----------------------------------------------------------------------|
      |  NOMBRE: _alerta.                                                     |
      |-----------------------------------------------------------------------|
      |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
      |               de la base de datos en forma de alerta.                 |
      |-----------------------------------------------------------------------|
      |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
      |-----------------------------------------------------------------------|
      |  AUTOR: Ricardo Luna.                                                 |
      |-----------------------------------------------------------------------|
      |  FECHA: 03/08/2018.                                                   |
      |----------------------------------------------------------------------*/
    ListaConsultasComponent.prototype._alerta = function (mensaje) {
        //Se utiliza para esperar a que se pulse el botón aceptar.
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_8__["DialogoAlertaComponent"], modalOption);
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
        //Se retorna el botón pulsado.
        modalRef.result.then(function () {
            //Se retorna un nulo, ya que no se espera un resultado.         
            subject.next(null);
        });
        //Se retorna el observable.
        return subject.asObservable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbTypeahead"])
    ], ListaConsultasComponent.prototype, "usuarioNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('usuarioHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaConsultasComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteNG'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbTypeahead"])
    ], ListaConsultasComponent.prototype, "pacienteNG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pacienteHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaConsultasComponent.prototype, "pacienteHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fechaDesdeHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaConsultasComponent.prototype, "fechaDesdeHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('calendarioDesdeHTML'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbInputDatepicker"]
        //Variable que almacena el control del formulario de la fechaHasta.
        )
    ], ListaConsultasComponent.prototype, "calendarioDesdeHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fechaHastaHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaConsultasComponent.prototype, "fechaHastaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('calendarioHastaHTML'),
        __metadata("design:type", _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbInputDatepicker"]
        //Cuadro de texto de búsqueda.
        )
    ], ListaConsultasComponent.prototype, "calendarioHastaHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('buscarInfoHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaConsultasComponent.prototype, "buscarInfoHTML", void 0);
    ListaConsultasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lista-consultas',
            template: __webpack_require__(/*! ./lista-consultas.component.html */ "./src/app/consultas/lista-consultas/lista-consultas.component.html"),
            styles: [__webpack_require__(/*! ./lista-consultas.component.css */ "./src/app/consultas/lista-consultas/lista-consultas.component.css")],
            providers: [_custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["I18n"],
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDatepickerI18n"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["CustomDatePicker"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"], useClass: _custom_date_picker__WEBPACK_IMPORTED_MODULE_9__["FormatDatePicker"] }]
        }),
        __metadata("design:paramtypes", [_utilidades_service__WEBPACK_IMPORTED_MODULE_4__["UtilidadesService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_5__["PacientesService"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_6__["EsperarService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_7__["AutenticarService"],
            _organizaciones_service__WEBPACK_IMPORTED_MODULE_10__["OrganizacionesService"],
            _clinicas_service__WEBPACK_IMPORTED_MODULE_11__["ClinicasService"],
            _consultas_service__WEBPACK_IMPORTED_MODULE_16__["ConsultasService"],
            _usuarios_service__WEBPACK_IMPORTED_MODULE_12__["UsuariosService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_15__["Router"]])
    ], ListaConsultasComponent);
    return ListaConsultasComponent;
}());



/***/ }),

/***/ "./src/app/custom-date-picker.ts":
/*!***************************************!*\
  !*** ./src/app/custom-date-picker.ts ***!
  \***************************************/
/*! exports provided: I18n, CustomDatePicker, FormatDatePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomDatePicker", function() { return CustomDatePicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatDatePicker", function() { return FormatDatePicker; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/******************************************************************|
|NOMBRE: varios.                                                   |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Clases para poner el calendario en español           |
|y en formato dd/mm/yyyy.                                          |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 05/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var I18N_VALUES = {
    //Se establece el idioma español en las fechas.
    'sp': {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    }
};
var I18n = /** @class */ (function () {
    function I18n() {
        this.language = 'sp';
    }
    I18n = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
        //Se exporta la clase para su uso externo.
    ], I18n);
    return I18n;
}());

var CustomDatePicker = /** @class */ (function (_super) {
    __extends(CustomDatePicker, _super);
    function CustomDatePicker(_i18n) {
        var _this = _super.call(this) || this;
        _this._i18n = _i18n;
        return _this;
    }
    CustomDatePicker.prototype.getWeekdayShortName = function (weekday) {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    };
    CustomDatePicker.prototype.getMonthShortName = function (month) {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    };
    CustomDatePicker.prototype.getMonthFullName = function (month) {
        return this.getMonthShortName(month);
    };
    CustomDatePicker.prototype.getDayAriaLabel = function (date) {
        return date.day + "-" + date.month + "-" + date.year;
    };
    CustomDatePicker = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [I18n])
    ], CustomDatePicker);
    return CustomDatePicker;
}(_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDatepickerI18n"]));

var FormatDatePicker = /** @class */ (function (_super) {
    __extends(FormatDatePicker, _super);
    function FormatDatePicker() {
        return _super.call(this) || this;
    }
    FormatDatePicker.prototype.parse = function (value) {
        return { year: 1, month: 1, day: 1 };
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: format.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para formatear la fecha en dd/mm/yyyy.           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: date = estructura de fecha (y,m,d).           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 05/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    FormatDatePicker.prototype.format = function (date) {
        //Si la fecha existe.
        if (date) {
            //Se obtiene el día.
            var dia = date.day.toString();
            //Si el día es de un dígito se le agrega un cero a la izquierda.
            dia = dia.length == 1 ? dia = "0" + dia : dia;
            //Se obtiene el mes.
            var mes = date.month.toString();
            //Si el mes es de un dígito se le agrega un cero a la izquierda.
            mes = mes.length == 1 ? mes = "0" + mes : mes;
            //Se retorna la fecha formateada.
            return dia + "/" + mes + "/" + date.year;
        }
        //Si la fecha es vacía o nula.
        return null;
    };
    FormatDatePicker = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FormatDatePicker);
    return FormatDatePicker;
}(_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbDateParserFormatter"]));



/***/ }),

/***/ "./src/app/dialogo-alerta/dialogo-alerta.component.css":
/*!*************************************************************!*\
  !*** ./src/app/dialogo-alerta/dialogo-alerta.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: dialogo-alerta.                                           | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del modal de alerta.          |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 07/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Establece el color del botón de confirmación.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;\n  }\n\n/*Establece el color del título del mensaje.*/\n\n.titulo-azul{\n    color: rgb(0, 162, 232);    \n  }"

/***/ }),

/***/ "./src/app/dialogo-alerta/dialogo-alerta.component.html":
/*!**************************************************************!*\
  !*** ./src/app/dialogo-alerta/dialogo-alerta.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: dialogo-alerta.                                           |  \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML que contiene la forma para mostrar   |\n|              un modal con un cuadro de diálogo de alerta.        |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n<div class=\"modal-header\">\n  <h4 class=\"modal-title titulo-azul\">{{titulo}}</h4>\n</div>\n<div class=\"modal-body\">\n  <p>{{mensaje}}</p>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-azul\" autofocus #botonAceptar (click)=\"activeModal.close(etiquetaBotonAceptar)\">{{etiquetaBotonAceptar}}</button>\n</div>"

/***/ }),

/***/ "./src/app/dialogo-alerta/dialogo-alerta.component.ts":
/*!************************************************************!*\
  !*** ./src/app/dialogo-alerta/dialogo-alerta.component.ts ***!
  \************************************************************/
/*! exports provided: DialogoAlertaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogoAlertaComponent", function() { return DialogoAlertaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/******************************************************************|
|NOMBRE: DialogoAlertaComponent                                    |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo alerta, es decir, con un botón      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogoAlertaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: activeModal = contiene los métodos para       |
    |                                       manipular un modal.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function DialogoAlertaComponent(activeModal) {
        this.activeModal = activeModal;
    }
    DialogoAlertaComponent.prototype.ngOnInit = function () {
        //Cada vez que se inicie la alerta, se establece el focus en el botón de aceptar.
        this.botonAceptar.nativeElement.focus();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("botonAceptar"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DialogoAlertaComponent.prototype, "botonAceptar", void 0);
    DialogoAlertaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialogo-alerta',
            template: __webpack_require__(/*! ./dialogo-alerta.component.html */ "./src/app/dialogo-alerta/dialogo-alerta.component.html"),
            styles: [__webpack_require__(/*! ./dialogo-alerta.component.css */ "./src/app/dialogo-alerta/dialogo-alerta.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], DialogoAlertaComponent);
    return DialogoAlertaComponent;
}());



/***/ }),

/***/ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/dialogo-confirmacion/dialogo-confirmacion.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: dialogo-confirmacion.                                     | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del modal de confirmación.    |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 07/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Establece el color del botón de alerta.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;\n  }\n\n/*Establece el color del título del mensaje.*/\n\n.titulo-azul{\n    color: rgb(0, 162, 232);    \n  }"

/***/ }),

/***/ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/dialogo-confirmacion/dialogo-confirmacion.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: dialogo-confirmacion.                                     |  \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML que contiene la forma para mostrar   |\n|              un modal con un cuadro de diálogo de confirmación.  |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n<div class=\"modal-header\">\n  <h4 class=\"modal-title text-center titulo-azul\">{{titulo}}</h4>\n</div>\n<div class=\"modal-body\">\n  <p>{{mensaje}}</p>\n</div>\n<div class=\"modal-footer\">  \n  <button type=\"button\" class=\"btn btn-azul\" (click)=\"activeModal.close(etiquetaBotonAceptar)\">{{etiquetaBotonAceptar}}</button>\n  <button type=\"button\" class=\"btn btn-azul\" (click)=\"activeModal.close(etiquetaBotonCancelar)\">{{etiquetaBotonCancelar}}</button>\n</div>"

/***/ }),

/***/ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts ***!
  \************************************************************************/
/*! exports provided: DialogoConfirmacionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogoConfirmacionComponent", function() { return DialogoConfirmacionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/******************************************************************|
|NOMBRE: DialogoConfirmacionComponent.                             |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo confirmación, es decir, con dos     |
|             botones.                                             |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogoConfirmacionComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: activeModal = contiene los métodos para       |
    |                                       manipular un modal.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function DialogoConfirmacionComponent(activeModal) {
        this.activeModal = activeModal;
    }
    DialogoConfirmacionComponent.prototype.ngOnInit = function () { };
    DialogoConfirmacionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialogo-confirmacion',
            template: __webpack_require__(/*! ./dialogo-confirmacion.component.html */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.html"),
            styles: [__webpack_require__(/*! ./dialogo-confirmacion.component.css */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], DialogoConfirmacionComponent);
    return DialogoConfirmacionComponent;
}());



/***/ }),

/***/ "./src/app/dialogo-espera/dialogo-espera.component.css":
/*!*************************************************************!*\
  !*** ./src/app/dialogo-espera/dialogo-espera.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: dialogo-espera.                                           | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del modal de espera.          |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 07/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Establece el color del mensaje de espera.*/\n\n.mensaje-espera{\n    color: rgb(0, 162, 232);    \n  }"

/***/ }),

/***/ "./src/app/dialogo-espera/dialogo-espera.component.html":
/*!**************************************************************!*\
  !*** ./src/app/dialogo-espera/dialogo-espera.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: dialogo-espera.                                           |  \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML que contiene la forma para mostrar   |\n|              un modal con un cuadro de diálogo de espera.        |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 31/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <p class=\"text-center\">\n          <img src=\"../../assets/img/esperar.gif\"  height=\"50\" width=\"50\"> \n      </p>        \n    </div>\n  </div>\n  <div class=\"row\">\n      <div class=\"col-lg-12\">\n          <h4 class=\"text-center mensaje-espera\">Espere un momento, por favor.</h4>\n      </div>\n    </div>    \n</div>\n"

/***/ }),

/***/ "./src/app/dialogo-espera/dialogo-espera.component.ts":
/*!************************************************************!*\
  !*** ./src/app/dialogo-espera/dialogo-espera.component.ts ***!
  \************************************************************/
/*! exports provided: DialogoEsperaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogoEsperaComponent", function() { return DialogoEsperaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/******************************************************************|
|NOMBRE: DialogoEsperaComponent                                    |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para abrir       |
|             un modal de tipo espera.                             |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 31/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogoEsperaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: activeModal = contiene los métodos para       |
    |                                       manipular un modal.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 31/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function DialogoEsperaComponent(activeModal) {
        this.activeModal = activeModal;
    }
    DialogoEsperaComponent.prototype.ngOnInit = function () {
    };
    DialogoEsperaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialogo-espera',
            template: __webpack_require__(/*! ./dialogo-espera.component.html */ "./src/app/dialogo-espera/dialogo-espera.component.html"),
            styles: [__webpack_require__(/*! ./dialogo-espera.component.css */ "./src/app/dialogo-espera/dialogo-espera.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], DialogoEsperaComponent);
    return DialogoEsperaComponent;
}());



/***/ }),

/***/ "./src/app/esperar.service.ts":
/*!************************************!*\
  !*** ./src/app/esperar.service.ts ***!
  \************************************/
/*! exports provided: EsperarService, WAIT_MODAL_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EsperarService", function() { return EsperarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WAIT_MODAL_PROVIDERS", function() { return WAIT_MODAL_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_espera_dialogo_espera_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialogo-espera/dialogo-espera.component */ "./src/app/dialogo-espera/dialogo-espera.component.ts");
/******************************************************************|
|NOMBRE: Esperar.                                                  |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio para mostrar un modal cuando se hagan       |
|             peticiones al servidor                               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 31/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EsperarService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: modalService = contiene los métodos para      |
    |                                        manipular modals.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    function EsperarService(modalService) {
        this.modalService = modalService;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: esperar.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se hace una petición al servidor   |
    |               en signo de espera.                                     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 31/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    EsperarService.prototype.esperar = function () {
        var _this = this;
        //Arreglo de opciones para personalizar el modal.
        var modalOption = {};
        //No se cierra cuando se pulsa esc.
        modalOption.keyboard = false;
        //No se cierra cuando pulsamos fuera del cuadro de diálogo.
        modalOption.backdrop = 'static';
        //Modal centrado.
        modalOption.centered = true;
        //Abre el modal.   
        //Se utiliza un timeout para evitar el error del modal de alerta. 
        setTimeout(function () {
            _this.modalRef ? _this.modalRef.close() : null;
            _this.modalRef = _this.modalService.open(_dialogo_espera_dialogo_espera_component__WEBPACK_IMPORTED_MODULE_2__["DialogoEsperaComponent"], modalOption);
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: noEsperar.                                                   |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Cierra el modal activo de espera                        |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    EsperarService.prototype.noEsperar = function () {
        this.modalRef.dismiss();
        this.modalRef.close();
    };
    EsperarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], EsperarService);
    return EsperarService;
}());

//Constante que se utilizará para inyectar el servicio.
var WAIT_MODAL_PROVIDERS = [
    { provide: EsperarService, useClass: EsperarService }
];


/***/ }),

/***/ "./src/app/inicio/inicio.component.css":
/*!*********************************************!*\
  !*** ./src/app/inicio/inicio.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: inicio.                                                   | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la página de inicio.       |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 07/06/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Tamaño y color de la letra.*/\n\n.color-azul{    \n    color: rgb(0, 162, 232);  \n}\n\n/*Configuraciones del titulo de los paneles*/\n\n.panel-titulo{\n    font-size: 20px;  \n}\n"

/***/ }),

/***/ "./src/app/inicio/inicio.component.html":
/*!**********************************************!*\
  !*** ./src/app/inicio/inicio.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngb-accordion #acc=\"ngbAccordion\" activeIds=\"ngb-panel-0, ngb-panel-1\">\n  <ngb-panel>\n    <ng-template ngbPanelTitle>\n      <span class=\"panel-titulo\">\n        Citas para hoy\n      </span>\n    </ng-template>\n    <ng-template ngbPanelContent>\n      <div class=\"table-responsive\">\n        <table class=\"table .table-striped table-bordered table-condensed table\">\n          <tr>\n            <th class=\"text-center\">Fecha</th>\n            <th class=\"text-center\">Hora</th>\n            <th class=\"text-center\">Paciente</th>\n            <th class=\"text-center\">Consultorio</th>\n            <th class=\"text-center\">Resumen</th>\n          </tr>\n        </table>\n      </div>\n    </ng-template>\n  </ngb-panel>\n  <ngb-panel>\n    <ng-template ngbPanelTitle>\n      <span class=\"panel-titulo\">\n        Eventos para hoy\n      </span>\n    </ng-template>\n    <ng-template ngbPanelContent>\n      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,\n      non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt\n      aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft\n      beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat\n      craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable\n      VHS.\n    </ng-template>\n  </ngb-panel>\n</ngb-accordion>"

/***/ }),

/***/ "./src/app/inicio/inicio.component.ts":
/*!********************************************!*\
  !*** ./src/app/inicio/inicio.component.ts ***!
  \********************************************/
/*! exports provided: InicioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InicioComponent", function() { return InicioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InicioComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado,  |
    |                         esperar      = contiene los métodos para      |
    |                                        abrir modals de espera,        |
    |                         modal        = contiene los métodos para      |
    |                                        manipular los modals,          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    function InicioComponent(autorizacion, esperar, modal) {
        this.autorizacion = autorizacion;
        this.esperar = esperar;
        this.modal = modal;
    }
    InicioComponent.prototype.ngOnInit = function () {
    };
    InicioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inicio',
            template: __webpack_require__(/*! ./inicio.component.html */ "./src/app/inicio/inicio.component.html"),
            styles: [__webpack_require__(/*! ./inicio.component.css */ "./src/app/inicio/inicio.component.css")]
        }),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_1__["AutenticarService"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_2__["EsperarService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
    ], InicioComponent);
    return InicioComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: login.                                                    | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del formulario de ingreso.    |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\nhtml,\nbody {\n  height: 100%;\n}\n\n#div-contenedor {\n  display: flex;\n  align-items: center;\n  padding-top: 100px;\n  padding-bottom: 40px;\n  background-color: #fff;\n}\n\n.form-signin {\n  width: 100%;\n  max-width: 450px;\n  padding: 15px;\n  margin: auto;\n}\n\n.form-signin .checkbox {\n  font-weight: 400;\n}\n\n.form-signin .form-control {\n  position: relative;\n  box-sizing: border-box;\n  height: auto;\n  padding: 10px;\n  font-size: 30px;\n}\n\n.form-signin .form-control:focus {\n  z-index: 2;\n}\n\n.form-signin input[type=\"text\"] {\n  margin-bottom: 1px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  text-align: center;\n}\n\n.form-signin input[type=\"password\"] {\n  margin-bottom: 1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  text-align: center;\n}\n\n.form-signin input[type=\"email\"] {\n  margin-bottom: 1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  font-size: 23px;\n  text-align: center;\n}\n\n.input-borde-rojo{\n  background-color: rgb(252, 224, 224);\n}\n\n.btn-azul{\n  background-color: rgb(0, 162, 232);\n  color: white;\n}\n\n.link-azul{\n  color: rgb(0, 162, 232);\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: login.                                                    |  \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML que contiene la forma para ingresar. |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<!--Se mostrará el formulario de ingresar o el formulario de olvidar contraseña.-->\n<ng-container *ngIf=\"olvidarPassword; then thenTemplate; else elseTemplate\"></ng-container>\n<!--Si se indica que se olvidó el password.-->\n<ng-template #thenTemplate>\n    <div class=\"text-center\" id=\"div-contenedor\">\n        <form [formGroup]=\"formOlvidarPassword\" class=\"form-signin\" (ngSubmit)=\"olvidarPaswordSubmit()\">\n          <img class=\"img-fluid\" src={{imagenLogo}} alt=\"\" >\n          <input type=\"email\" class=\"form-control\" placeholder=\"Email\" [formControl]=\"email\" #emailHTML [ngClass]=\"{'input-borde-rojo':pulsarIngresar && !email.valid}\">          \n          <ngb-alert *ngIf=\"pulsarIngresar && email.hasError('required')\" type=\"danger\" [dismissible]=\"false\">El Email es Requerido.</ngb-alert>          \n          <ngb-alert *ngIf=\"pulsarIngresar && email.hasError('email')&& !email.hasError('required')\" type=\"danger\" [dismissible]=\"false\">Ingrese un email válido.</ngb-alert>          \n          <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\">Enviar email</button>\n          <hr>       \n          <p class=\"text-black-50\">Si tu email está ligado a tu cuenta de MiMédicos, recibirás un enlace para restablecer tu contraseña.</p>  \n          <a class=\"link-azul\" href=\"#\" (click)=\"mostrarFormIngresar()\">Cancelar.</a> \n          <p class=\"mt-5 mb-3 text-muted\">MiMédicos &copy; 2018-2019</p>\n        </form>\n      </div>\n</ng-template>\n<!--Formulario de ingreso normal.-->\n<ng-template #elseTemplate>\n  <div class=\"text-center\" id=\"div-contenedor\">\n    <form [formGroup]=\"formSignIn\" class=\"form-signin\" (ngSubmit)=\"ingresarSubmit()\">\n      <img class=\"img-fluid\" src={{imagenLogo}} alt=\"\" >\n      <input type=\"text\" class=\"form-control\" placeholder=\"Usuario\" [formControl]=\"usuario\" #usuarioHTML [ngClass]=\"{'input-borde-rojo':pulsarIngresar && !usuario.valid}\">\n      <ngb-alert *ngIf=\"pulsarIngresar && !usuario.valid\" type=\"danger\" [dismissible]=\"false\">El Usuario es Requerido.</ngb-alert>\n      <input type=\"password\" class=\"form-control\" placeholder=\"Password\" [formControl]=\"password\" #passwordHTML [ngClass]=\"{'input-borde-rojo':pulsarIngresar && !password.valid}\">\n      <ngb-alert *ngIf=\"pulsarIngresar && !password.valid\" type=\"danger\" [dismissible]=\"false\">El Password es Requerido.</ngb-alert>\n      <button class=\"btn btn-lg btn-azul btn-block\" type=\"submit\">Ingresar</button>\n      <hr>\n      <a class=\"link-azul\" href=\"#\" (click)=\"mostrarFormOlvidarPassword()\">Olvidé mi password.</a>\n      <p class=\"mt-5 mb-3 text-muted\">MiMédicos &copy; 2018-2019</p>\n    </form>\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../esperar.service */ "./src/app/esperar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/******************************************************************|
|NOMBRE: LoginComponent.                                           |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los métodos para ingresar.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/







var LoginComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: fb           = contiene los métodos           |
    |                                        de validaciones de formularios,|
    |                         autorizacion = contiene los métodos para      |
    |                                        conectarse al sistema,         |
    |                       rutaNavegacion = contiene los métodos para      |
    |                                         manipular rutas,              |
    |                         modalService = contiene los métodos para      |
    |                                        manipular modals,              |
    |                         esperar      = contiene los métodos para      |
    |                                        abrir modals de espera,        |
    |                         cdRef        = se utiliza para detectar       |
    |                                        cambios en la vista.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function LoginComponent(fb, autorizacion, rutaNavegacion, modalService, esperar, cdRef) {
        this.fb = fb;
        this.autorizacion = autorizacion;
        this.rutaNavegacion = rutaNavegacion;
        this.modalService = modalService;
        this.esperar = esperar;
        this.cdRef = cdRef;
        //Propiedad que indica si se pulsó el botón de ingresar.
        this.pulsarIngresar = false;
        //Propiedad que indica si se desplegará el formulario de olvidar password en vez del de ingresar.
        this.olvidarPassword = false;
        //Propiedad que almacena la ruta de la imágen del logo.
        this.imagenLogo = "../../assets/img/logo_completo.png";
        //Propiedad que indica cuando se cambia de vista.
        this.cambiarVista = false;
        //Se agregan las validaciones al formulario de ingresar.
        this.formSignIn = fb.group({
            'usuario': ['1416295', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'password': ['Telmex123$', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        //Se agregan las validaciones al formulario de olvidar contraseña.
        this.formOlvidarPassword = fb.group({
            'email': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.usuario = this.formSignIn.controls['usuario'];
        this.password = this.formSignIn.controls['password'];
        this.email = this.formOlvidarPassword.controls['email'];
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: ngOnInit.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que se ejecuta al iniciar el componente.         |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.ngOnInit = function () {
        //Si ya se encuentra conectado al sistema, lo retorna al menú principal.
        if (this.autorizacion.obtenerToken() !== null) {
            this.rutaNavegacion.navigate(['inicio']);
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: ngAfterViewChecked.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que se ejecuta cuando cambia la vista.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.ngAfterViewChecked = function () {
        //Si se muestra el formulario de ingreso o el formulario de email.
        if (this.cambiarVista) {
            //Se cambia el valor de cambiarvista para que no se ejecute cada momento.
            this.cambiarVista = false;
            //Si olvidar password es verdadero.
            if (this.olvidarPassword) {
                //Se le da un focus al email y se limpia.
                this.emailHTML.nativeElement.focus();
                this.formOlvidarPassword.reset();
                this.cdRef.detectChanges();
            }
            else {
                //Se le da un focus al usuario y se limpia junto con el password.
                this.usuarioHTML.nativeElement.focus();
                this.formSignIn.reset();
                this.cdRef.detectChanges();
            }
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: ingresarSubmit.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Evento que se dispara cuando se intenta ingresar        |
    |               al sistema.                                             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: usuarioHTML  = Elemento HTML de tipo texto del|
    |                                        usuario,                       |
    |                         passwordHTML = Elemento HTML de tipo pass del |
    |                                        password                       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.ingresarSubmit = function () {
        var _this = this;
        //Se pulsa el botón ingresar.
        this.pulsarIngresar = true;
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.usuario.hasError("required")) {
            this.usuarioHTML.nativeElement.focus();
            return;
        }
        else if (this.password.hasError("required")) {
            this.passwordHTML.nativeElement.focus();
            return;
        }
        //Se abre el modal de esperar, indicando que se hará una petición al servidor.
        this.esperar.esperar();
        //Se realiza el intento de ingreso.
        this.autorizacion.login(this.usuario.value, this.password.value)
            .subscribe(function (respuesta) {
            //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
            _this.esperar.noEsperar();
            //Si hubo un error en el ingreso.
            if (respuesta["estado"] === "ERROR") {
                //Se despliega un modal con una alerta del porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se navega a la página de inicio.
                _this.rutaNavegacion.navigate(['inicio']);
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: olvidarPaswordSubmit.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Evento que se dispara cuando se olvida el password.     |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: usuarioHTML  = Elemento HTML de tipo texto del|
    |                                        usuario,                       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.olvidarPaswordSubmit = function () {
        var _this = this;
        //Se pulsa el botón ingresar.
        this.pulsarIngresar = true;
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (!this.email.valid) {
            this.emailHTML.nativeElement.focus();
            return;
        }
        //Se abre el modal de esperar, indicando que se hará una petición al servidor.
        this.esperar.esperar();
        this.autorizacion.olvidarPassword(this.email.value).subscribe(function (respuesta) {
            //Se detiene la espera, indicando que ya se obtuvo la respuesta del servidor.
            _this.esperar.noEsperar();
            //Si hubo un error en el proceso de olvidar el password.
            if (respuesta["estado"] === "ERROR") {
                //Se despliega un modal con una alerta del porqué del error.
                _this._alerta(respuesta["mensaje"]);
            }
            else {
                //Se despliega el resultado del envío del correo electrónico.
                _this._alerta("Se ha enviado un enlace de ingreso a su email.");
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: mostrarFormOlvidarPassword                                   |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Evento que se dispara cuando indica que se olvidó pass. |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 05/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.mostrarFormOlvidarPassword = function () {
        //Se cambia de vista.
        this.cambiarVista = true;
        //Se resetea el valor ya que es independiente.
        this.pulsarIngresar = false;
        //Se indica que se olvidó el password para posteriormente mostrar dicho formulario.
        this.olvidarPassword = true;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: mostrarFormIngresar.                                         |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Evento para mostrar el formulario de ingresar.          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 05/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype.mostrarFormIngresar = function () {
        //Se cambia de vista.
        this.cambiarVista = true;
        //Se resetea el valor ya que es independiente.
        this.pulsarIngresar = false;
        //Se indica que se NO se olvidó el password para posteriormente mostrar dicho formulario.
        this.olvidarPassword = false;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
    |               de la base de datos en forma de alerta.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    LoginComponent.prototype._alerta = function (mensaje) {
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Autenticación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("usuarioHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "usuarioHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("passwordHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "passwordHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("emailHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "emailHTML", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_2__["AutenticarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_6__["EsperarService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.css":
/*!*********************************************!*\
  !*** ./src/app/logout/logout.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: logout.                                                   | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos modificados del componente.   |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n\n  /*Color y tamaño de letra en estado normal de los elementos del  menú desplegable.*/\n\n\n  .dropdown-item{\n    color: rgb(110, 110, 110);\n    font-size: 20px; \n  }\n\n\n  /*Color de letra de los elementos del  menú desplegable.*/\n\n\n  .dropdown-item:active{\n    background-color: rgb(0, 162, 232);\n    color: white;\n}"

/***/ }),

/***/ "./src/app/logout/logout.component.html":
/*!**********************************************!*\
  !*** ./src/app/logout/logout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: logout.                                                   | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Componente HTML para salirse del sistema             |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 30/05/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<button class=\"dropdown-item\" (click)=\"salir()\">Salir</button> "

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/*!********************************************!*\
  !*** ./src/app/logout/logout.component.ts ***!
  \********************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/******************************************************************|
|NOMBRE: LogoutComponent.                                          |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene el modal para salirse        |
|             del sistema.                                         |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 30/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogoutComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: modalService = contiene los métodos para      |
    |                                        manipular modals,              |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado,  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function LogoutComponent(modalService, autorizacion) {
        this.modalService = modalService;
        this.autorizacion = autorizacion;
        //Variable que emitirá cuando se pulse al elemento salir del menú.
        this.emitirSalir = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: salir.                                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que implementa la funcionalidad de abrir modal.  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    LogoutComponent.prototype.salir = function () {
        var _this = this;
        //Si está conectado.
        if (this.autorizacion.obtenerToken() !== null) {
            //Abre el modal de tamaño chico.
            var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_2__["DialogoConfirmacionComponent"], { centered: true });
            //Define el título del modal.
            modalRef.componentInstance.titulo = "Confirmación";
            //Define el mensaje del modal.
            modalRef.componentInstance.mensaje = "¿Está seguro de salir del sistema?";
            //Define la etiqueta del botón de Aceptar.
            modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
            //Define la etiqueta del botón de Cancelar.
            modalRef.componentInstance.etiquetaBotonCancelar = "No";
            //Se retorna el botón pulsado.
            modalRef.result.then(function (result) {
                _this.emitirSalir.emit(result);
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], LogoutComponent.prototype, "emitirSalir", void 0);
    LogoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__(/*! ./logout.component.html */ "./src/app/logout/logout.component.html"),
            styles: [__webpack_require__(/*! ./logout.component.css */ "./src/app/logout/logout.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./src/app/organizaciones.service.ts":
/*!*******************************************!*\
  !*** ./src/app/organizaciones.service.ts ***!
  \*******************************************/
/*! exports provided: OrganizacionesService, ORGANIZACIONES_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizacionesService", function() { return OrganizacionesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORGANIZACIONES_PROVIDERS", function() { return ORGANIZACIONES_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/******************************************************************|
|NOMBRE: Organizaciones.                                           |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de base de datos de|
|las organizaciones.                                               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 06/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/




var OrganizacionesService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend,         |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function OrganizacionesService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroOrganizaciones.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener las organizaciones activas          |
    |  del usuario logueado.                                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    OrganizacionesService.prototype.filtroOrganizaciones = function () {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los registros.
            return this.http.get(this.urlApi + 'filtro-organizaciones', { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    OrganizacionesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], OrganizacionesService);
    return OrganizacionesService;
}());

//Constante que se utilizará para inyectar el servicio.
var ORGANIZACIONES_PROVIDERS = [
    { provide: OrganizacionesService, useClass: OrganizacionesService }
];


/***/ }),

/***/ "./src/app/pacientes.service.ts":
/*!**************************************!*\
  !*** ./src/app/pacientes.service.ts ***!
  \**************************************/
/*! exports provided: PacientesService, PACIENTES_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PacientesService", function() { return PacientesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PACIENTES_PROVIDERS", function() { return PACIENTES_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/******************************************************************|
|NOMBRE: Pacientes.                                                |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de los pacientes.  |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 01/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var PacientesService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend,         |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    function PacientesService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerPacientes.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los pacientes del usuario logueado. |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.obtenerPacientes = function () {
        var _this = this;
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los pacientes.
            return this.http.get(this.urlApi + 'obtener-pacientes', { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (respuesta) {
                //Si todo salió bien.
                if (respuesta["estado"] === "OK") {
                    //Se almacenan los pacientes en el arreglo.
                    _this.pacientes = respuesta["datos"];
                }
                return respuesta;
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaPaciente.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para dar de alta un paciente.                    |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  nombres = nombres del paciente,                                      |
    |  apellidoPaterno = apellido paterno del paciente,                     |
    |  apellidoMaterno = apellido materno del paciente,                     |
    |  email = email del paciente,                                          |
    |  telefono = teléfono fijo del paciente,                               |
    |  celular = celular del paciente,                                      |
    |  imagen = archivo de la imagen.                                       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 23/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.altaPaciente = function (nombres, apellidoPaterno, apellidoMaterno, email, telefono, celular, imagen) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            nombres: nombres,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            email: email,
            telefono: telefono,
            celular: celular,
            imagen: imagen
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'alta-paciente', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: verPaciente.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para ver un paciente en específico.              |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: pPacienteId= identificador del paciente.      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y  el paciente         |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.verPaciente = function (pacienteId) {
        var _this = this;
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los pacientes.
            return this.http.get(this.urlApi + 'ver-paciente/' + pacienteId, { headers: headers })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (respuesta) {
                //Si todo salió bien.
                if (respuesta["estado"] === "OK") {
                    //Se almacenan el paciente en el arreglo.
                    _this.pacientes = respuesta["datos"];
                }
                return respuesta;
            }));
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarPaciente.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para editar a un paciente.                       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  pacienteid = identificador del paciente,                             |
    |  nombres = nombres del paciente,                                      |
    |  apellidoPaterno = apellido paterno del paciente,                     |
    |  apellidoMaterno = apellido materno del paciente,                     |
    |  email = email del paciente,                                          |
    |  telefono = teléfono fijo del paciente,                               |
    |  celular = celular del paciente,                                      |
    |  imagen = archivo de la imagen,                                       |
    |  estatus = estatus del paciente.                                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.editarPaciente = function (pacienteId, nombres, apellidoPaterno, apellidoMaterno, email, telefono, celular, imagen, estatus) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            pacienteId: pacienteId,
            nombres: nombres,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            email: email,
            telefono: telefono,
            celular: celular,
            imagen: imagen,
            estatus: estatus
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'editar-paciente', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarPaciente.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar a un paciente.                     |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  pacienteid = identificador del paciente.                             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.eliminarPaciente = function (pacienteId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            pacienteId: pacienteId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'eliminar-paciente', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: desAsignarPaciente.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para desasignar a un paciente del usuario.       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  pacienteid = identificador del paciente.                             |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna la respuesta del servidor.|
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.desAsignarPaciente = function (pacienteId) {
        //Arma el json a partir de los parámetros.
        var json = JSON.stringify({
            pacienteId: pacienteId
        });
        //Le concatena la palabra "json=" al json armado.
        var params = "json=" + json;
        //Se arman los headers, y se le agrega el X-API-KEY y la codificación del formulario.
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'X-API-KEY': this.autorizacion.obtenerToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        //Realiza la petición al servidor.
        return this.http
            .post(this.urlApi + 'desasignar-paciente', params, { headers: headers });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroPacientes.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los pacientes activos del usuario   |
    |  logueado.                                                            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    PacientesService.prototype.filtroPacientes = function () {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los pacientes.
            return this.http.get(this.urlApi + 'filtro-pacientes', { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    PacientesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], PacientesService);
    return PacientesService;
}());

//Constante que se utilizará para inyectar el servicio.
var PACIENTES_PROVIDERS = [
    { provide: PacientesService, useClass: PacientesService }
];


/***/ }),

/***/ "./src/app/pacientes/alta-paciente/alta-paciente.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/pacientes/alta-paciente/alta-paciente.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: alta-paciente.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos del alta de pacientes.        |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/pacientes/alta-paciente/alta-paciente.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pacientes/alta-paciente/alta-paciente.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: alta-paciente.                                            | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para dar de alta pacientes.                   |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-4\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de pacientes.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-8\">\n      <h1 class=\"display-4\">Alta de pacientes</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <img class=\"img-thumbnail\" [src]=\"imagenPaciente\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-9\">\n      <form [formGroup]=\"formAltaPaciente\" (ngSubmit)=\"altaPaciente()\">\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Nombre(s)*</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarCrear && nombres.invalid}\" type=\"text\" class=\"form-control\" maxlength=\"60\" [formControl]=\"nombres\"\n              #nombresHTML ngbTooltip=\"Nombre(s) del paciente. Ej. Juan Pablo.\">\n          </div>\n          <div *ngIf=\"pulsarCrear && !nombres.valid\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Nombre es Requerido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Apellido Paterno*</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarCrear && apellidoPaterno.invalid}\" type=\"text\" class=\"form-control\" maxlength=\"25\"\n              [formControl]=\"apellidoPaterno\" #apellidoPaternoHTML ngbTooltip=\"Apellido paterno del paciente. Ej. Pérez.\">\n          </div>\n          <div *ngIf=\"pulsarCrear && !apellidoPaterno.valid\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Apellido paterno es Requerido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Apellido Materno</span>\n            </div>\n            <input type=\"text\" class=\"form-control\" maxlength=\"25\" [formControl]=\"apellidoMaterno\" #apellidoMaternoHTML ngbTooltip=\"Apellido materno del paciente. Ej. Martínez.\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Email</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarCrear && email.invalid}\" type=\"email\" class=\"form-control\" maxlength=\"50\" [formControl]=\"email\"\n              #emailHTML ngbTooltip=\"Email del paciente. Ej. juanperez@gmail.com.\">\n          </div>\n          <div *ngIf=\"pulsarCrear && email.hasError('email')\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Email es inválido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Teléfono</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarCrear && (telefono.hasError('minlength') || telefono.hasError('maxlength'))}\"\n              type=\"text\" class=\"form-control\" maxlength=\"10\" [formControl]=\"telefono\" #telefonoHTML ngbTooltip=\"Teléfono del paciente. Ej. 6144100000.\">\n          </div>\n          <div *ngIf=\"pulsarCrear && (telefono.hasError('minlength') || telefono.hasError('maxlength'))\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Teléfono debe contener 10 dígitos.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Celular</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarCrear && (celular.hasError('minlength') || celular.hasError('maxlength'))}\" type=\"text\"\n              class=\"form-control\" maxlength=\"10\" [formControl]=\"celular\" #celularHTML ngbTooltip=\"Celular del paciente. Ej. 6141992000.\">\n          </div>\n          <div *ngIf=\"pulsarCrear && celular.hasError('minlength') || celular.hasError('maxlength')\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Celular debe contener 10 dígitos.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-1\">\n            <button type=\"button\" class=\"btn btn-link\" ngbTooltip=\"Limpiar imagen.\" (click)=\"limpiarImagen()\">\n              <i class=\"material-icons\">clear</i>\n            </button>\n          </div>\n          <div class=\"col-lg-11\">\n            <input type=\"file\" class=\"btn btn-lg btn-block\" ngbTooltip=\"Seleccionar una imagen.\" #imagenHTML (change)=\"seleccionarImagen($event)\"\n              accept=\"image/*\" [formControl]=\"imagen\" >\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div class=\"col-lg-7\">\n            <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Crear o dar de alta al paciente.\">Crear</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/pacientes/alta-paciente/alta-paciente.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pacientes/alta-paciente/alta-paciente.component.ts ***!
  \********************************************************************/
/*! exports provided: AltaPacienteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltaPacienteComponent", function() { return AltaPacienteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/******************************************************************|
|NOMBRE: AltaPacienteComponent.                                    |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar de alta pacientes.               |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 16/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AltaPacienteComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para navegar a otras url's,                           |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  utilidadesService = métodos genéricos y útiles,                      |
    |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
    |  esperarService = contiene los métodos para el diálogo de espera.     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function AltaPacienteComponent(rutaNavegacion, fb, utilidadesService, modal, esperarService, pacientesService) {
        this.rutaNavegacion = rutaNavegacion;
        this.fb = fb;
        this.utilidadesService = utilidadesService;
        this.modal = modal;
        this.esperarService = esperarService;
        this.pacientesService = pacientesService;
        //Propiedad para cuando se oprime el botón de crear paciente.
        this.pulsarCrear = false;
        //Constante que almacena la url del icono del paciente.
        this.imagenPacienteDefault = "../../../assets/img/pacientes/paciente_default.png";
        //Propiedad para almacenar la imagen del paciente.
        this.imagenPaciente = this.imagenPacienteDefault;
        //Propiedad que almacena el archivo de la imagen del paciente.
        this.imagenArchivo = "";
        //Se agregan las validaciones al formulario de alta paciente.
        this.formAltaPaciente = fb.group({
            'nombres': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'apellidoPaterno': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'apellidoMaterno': [''],
            'email': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email],
            'telefono': ['', [this.utilidadesService.numberValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(10)]],
            'celular': ['', [this.utilidadesService.numberValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(10)]],
            'imagen': ['']
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.nombres = this.formAltaPaciente.controls['nombres'];
        this.apellidoPaterno = this.formAltaPaciente.controls['apellidoPaterno'];
        this.apellidoMaterno = this.formAltaPaciente.controls['apellidoMaterno'];
        this.email = this.formAltaPaciente.controls['email'];
        this.telefono = this.formAltaPaciente.controls['telefono'];
        this.celular = this.formAltaPaciente.controls['celular'];
        this.imagen = this.formAltaPaciente.controls['imagen'];
    }
    AltaPacienteComponent.prototype.ngOnInit = function () {
        //Se le da el focus al cuadro de texto de nombres.
        this.nombresHTML.nativeElement.focus();
        //El teléfono y celular solo aceptarán números.
        this.utilidadesService.inputNumerico(this.telefonoHTML);
        this.utilidadesService.inputNumerico(this.celularHTML);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 16/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaPacienteComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaPaciente.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que da de alta un paciente.                      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 19/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaPacienteComponent.prototype.altaPaciente = function () {
        var _this = this;
        this.pulsarCrear = true;
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.nombres.invalid) {
            this.nombresHTML.nativeElement.focus();
            return;
        }
        else if (this.apellidoPaterno.invalid) {
            this.apellidoPaternoHTML.nativeElement.focus();
            return;
        }
        else if (this.email.invalid) {
            this.emailHTML.nativeElement.focus();
            return;
        }
        else if (this.telefono.hasError("minlength") || this.telefono.hasError("maxlength")) {
            this.telefonoHTML.nativeElement.focus();
            return;
        }
        else if (this.celular.hasError("minlength") || this.celular.hasError("maxlength")) {
            this.celularHTML.nativeElement.focus();
            return;
        }
        //Se ponen en mayúsculas algunos campos y a todos se les quita los espacios en blanco.
        var nombres = this.nombres.value ? this.nombres.value : "";
        nombres = nombres.trim().toUpperCase();
        var apellidoPaterno = this.apellidoPaterno.value ? this.apellidoPaterno.value : "";
        apellidoPaterno = apellidoPaterno.trim().toUpperCase();
        var apellidoMaterno = this.apellidoMaterno.value ? this.apellidoMaterno.value : "";
        apellidoMaterno = apellidoMaterno.trim().toUpperCase();
        var email = this.email.value ? this.email.value : "";
        email = email.trim();
        var telefono = this.telefono.value ? this.telefono.value : "";
        telefono = telefono.trim();
        var celular = this.celular.value ? this.celular.value : "";
        celular = celular.trim();
        //Abre el modal de espera.
        this.esperarService.esperar();
        //Se intenta dar de alta al paciente en la base de datos.
        this.pacientesService.altaPaciente(nombres, apellidoPaterno, apellidoMaterno, email, telefono, celular, this.imagenArchivo)
            .subscribe(function (resultado) {
            //Detiene la espera.
            _this.esperarService.noEsperar();
            _this.pulsarCrear = false;
            //Abre el modal.
            var modalRef = _this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
            modalRef.result.then(function (result) {
                //Se le da un focus a los nombres.
                _this.nombresHTML.nativeElement.focus();
            });
            //Define la etiqueta del botón de Aceptar.
            modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
            //Si se dio de alta satisfactoriamente.
            if (resultado["estado"] == "OK") {
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Alta satisfactoria.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = "El paciente se dio de alta satisfactoriamente.";
                //Se resetea el formulario.
                _this.formAltaPaciente.reset();
                //Limpia la imagen.
                _this.limpiarImagen();
            }
            else {
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Error.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = resultado["mensaje"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: seleccionarImagen.                                           |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que selecciona la imagen del paciente.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaPacienteComponent.prototype.seleccionarImagen = function (event) {
        var _this = this;
        //Si ha sido seleccionada una imagen.
        if (event.target.files && event.target.files[0]) {
            //Variable que almacena la ruta del archivo.
            var archivo_1 = event.target.files[0];
            //Variable que almacena la extensión o tipo del archivo.
            var tipoArchivo = archivo_1["type"];
            //Si el archivo no es una imagen.
            if (!tipoArchivo.toUpperCase().includes("IMAGE")) {
                //Abre el modal de tamaño chico.
                var modalRef = this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Imagen inválida.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = "El archivo que seleccionó No es una imagen.";
                //Define la etiqueta del botón de Aceptar.
                modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
                //Se resetea la imagen y el seleccionador de archivos.
                this.limpiarImagen();
            }
            else {
                //Se lee el archivo obtenido.
                var reader = new FileReader();
                reader.readAsDataURL(archivo_1);
                //Si el tamaño del archivo es muy grande.
                if (archivo_1.size > 50000) {
                    //Abre el modal de mensaje.
                    var modalRef = this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
                    //Define el título del modal.
                    modalRef.componentInstance.titulo = "Imagen inválida.";
                    //Define el mensaje del modal.
                    modalRef.componentInstance.mensaje = "El tamaño de la imagen debe ser menor a 50,000 Bytes.";
                    //Define la etiqueta del botón de Aceptar.
                    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
                    //Se resetea la imagen y el seleccionador de archivos.
                    this.limpiarImagen();
                }
                else {
                    //Cuando la imagen ya se subió temporalmente.
                    reader.onload = function (event) {
                        //Se despliega en pantalla la imagen.
                        _this.imagenPaciente = event.target["result"];
                        //Arma el JSON de la información de la imagen.
                        _this.imagenArchivo = JSON.stringify({
                            nombre: archivo_1.name,
                            extension: archivo_1.type,
                            tamano: archivo_1.size,
                            //decodifica la imagen para que todos los carácteres se almacenen.
                            valor: btoa(event.target["result"])
                        });
                    };
                }
            }
        }
        else {
            //Se retorna a la imagen por default.
            this.limpiarImagen();
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarImagen.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para resetear la imagen del paciente.            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    AltaPacienteComponent.prototype.limpiarImagen = function () {
        //Se retorna a la imagen por default.
        this.imagenPaciente = this.imagenPacienteDefault;
        //Se resetea el campo.
        this.imagenHTML.nativeElement.value = "";
        //Se vacía el archivo de la imagen.
        this.imagenArchivo = "";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("nombresHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "nombresHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apellidoPaternoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "apellidoPaternoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apellidoMaternoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "apellidoMaternoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("emailHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "emailHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("telefonoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "telefonoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("celularHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "celularHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("imagenHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AltaPacienteComponent.prototype, "imagenHTML", void 0);
    AltaPacienteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-alta-paciente',
            template: __webpack_require__(/*! ./alta-paciente.component.html */ "./src/app/pacientes/alta-paciente/alta-paciente.component.html"),
            styles: [__webpack_require__(/*! ./alta-paciente.component.css */ "./src/app/pacientes/alta-paciente/alta-paciente.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_3__["UtilidadesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_6__["PacientesService"]])
    ], AltaPacienteComponent);
    return AltaPacienteComponent;
}());



/***/ }),

/***/ "./src/app/pacientes/editar-paciente/editar-paciente.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/pacientes/editar-paciente/editar-paciente.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: editar-paciente.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la edición de pacientes.   |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 27/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-gris{\n  background-color:#e9ecef;\n  border-color: #ced4da;   \n}\n\n/*Clase para la alerta de campo inválido en el formulario.*/\n\n.campo-invalido {\n    position: relative;\n    height: 45px;    \n    padding: 10px;\n    font-size: 16px;\n  }\n\n/*Clase para que se pinte de rojo el input cuando esté inválido.*/\n\n.input-borde-rojo{\n    background-color: rgb(252, 224, 224);\n  }\n  "

/***/ }),

/***/ "./src/app/pacientes/editar-paciente/editar-paciente.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/pacientes/editar-paciente/editar-paciente.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: editar-paciente.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para editar pacientes.                        |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 27/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de pacientes.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-6\">\n      <h1 class=\"display-4 text-center\">Edición de paciente</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <img class=\"img-thumbnail\" [src]=\"imagenPaciente\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-9\">\n      <form [formGroup]=\"formEditarPaciente\" (ngSubmit)=\"editarPaciente()\">\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Nombre(s)*</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarEditar && nombres.invalid}\" type=\"text\" class=\"form-control\" maxlength=\"60\" [formControl]=\"nombres\"\n              #nombresHTML ngbTooltip=\"Nombre(s) del paciente. Ej. Juan Pablo.\">\n          </div>\n          <div *ngIf=\"pulsarEditar && !nombres.valid\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Nombre es Requerido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Apellido Paterno*</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarEditar && apellidoPaterno.invalid}\" type=\"text\" class=\"form-control\" maxlength=\"25\"\n              [formControl]=\"apellidoPaterno\" #apellidoPaternoHTML ngbTooltip=\"Apellido paterno del paciente. Ej. Pérez.\">\n          </div>\n          <div *ngIf=\"pulsarEditar && !apellidoPaterno.valid\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Apellido paterno es Requerido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Apellido Materno</span>\n            </div>\n            <input type=\"text\" class=\"form-control\" maxlength=\"25\" [formControl]=\"apellidoMaterno\" #apellidoMaternoHTML ngbTooltip=\"Apellido materno del paciente. Ej. Martínez.\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Email</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarEditar && email.invalid}\" type=\"email\" class=\"form-control\" maxlength=\"50\" [formControl]=\"email\"\n              #emailHTML ngbTooltip=\"Email del paciente. Ej. juanperez@gmail.com.\">\n          </div>\n          <div *ngIf=\"pulsarEditar && email.hasError('email')\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Email es inválido.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Teléfono</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarEditar && (telefono.hasError('minlength') || telefono.hasError('maxlength'))}\"\n              type=\"text\" class=\"form-control\" maxlength=\"10\" [formControl]=\"telefono\" #telefonoHTML ngbTooltip=\"Teléfono del paciente. Ej. 6144100000.\">\n          </div>\n          <div *ngIf=\"pulsarEditar && (telefono.hasError('minlength') || telefono.hasError('maxlength'))\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Teléfono debe contener 10 dígitos.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">Celular</span>\n            </div>\n            <input [ngClass]=\"{'input-borde-rojo':pulsarEditar && (celular.hasError('minlength') || celular.hasError('maxlength'))}\"\n              type=\"text\" class=\"form-control\" maxlength=\"10\" [formControl]=\"celular\" #celularHTML ngbTooltip=\"Celular del paciente. Ej. 6141992000.\">\n          </div>\n          <div *ngIf=\"pulsarEditar && celular.hasError('minlength') || celular.hasError('maxlength')\" class=\"col-lg-5 alert-danger text-center campo-invalido\">El Celular debe contener 10 dígitos.</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-group input-group-lg col-lg-7\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\"> Estatus</span>\n            </div>\n            <select class=\"form-control\" #estatusHTML [formControl]=\"estatus\" ngbTooltip=\"Estatus del paciente: ACTIVO o INACTIVO.\">\n              <option id=\"ACTIVO\">ACTIVO</option>\n              <option id=\"INACTIVO\">INACTIVO</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-1\">\n            <button type=\"button\" class=\"btn btn-link\" ngbTooltip=\"Limpiar imagen.\" (click)=\"limpiarImagen(true)\">\n              <i class=\"material-icons\">clear</i>\n            </button>\n          </div>\n          <div class=\"col-lg-11\">\n            <input type=\"file\" class=\"btn btn-lg btn-block\" ngbTooltip=\"Seleccionar una imagen.\" #imagenHTML (change)=\"seleccionarImagen($event)\"\n              accept=\"image/*\" [formControl]=\"imagen\">\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div class=\"col-lg-7\">\n            <button class=\"btn btn-lg btn-azul  btn-block\" type=\"submit\" ngbTooltip=\"Editar o modificar al paciente.\">Editar</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/pacientes/editar-paciente/editar-paciente.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/pacientes/editar-paciente/editar-paciente.component.ts ***!
  \************************************************************************/
/*! exports provided: EditarPacienteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditarPacienteComponent", function() { return EditarPacienteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/******************************************************************|
|NOMBRE: EditarPacienteComponent.                                  |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para dar editar pacientes.                |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 16/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditarPacienteComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual: Para obtener los parámetros de la url.                   |
    |  fb = contiene los métodos para manipular formularios HTML,           |
    |  utilidadesService = métodos genéricos y útiles,                      |
    |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
    |  esperarService = contiene los métodos para el diálogo de espera.     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 27/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    function EditarPacienteComponent(rutaNavegacion, fb, utilidadesService, modal, esperarService, pacientesService, rutaActual) {
        this.rutaNavegacion = rutaNavegacion;
        this.fb = fb;
        this.utilidadesService = utilidadesService;
        this.modal = modal;
        this.esperarService = esperarService;
        this.pacientesService = pacientesService;
        this.rutaActual = rutaActual;
        //Propiedad para cuando se oprime el botón de editar paciente.
        this.pulsarEditar = false;
        //Constante para almacenar la imagen que se mostrará cuando el paciente no tenga imagen.
        this.imagenPacienteSinImagen = "../../../assets/img/pacientes/paciente_default.png";
        //Constante que almacena la url del icono del paciente.
        this.imagenPacienteDefault = this.imagenPacienteSinImagen;
        //Propiedad para almacenar la imagen del paciente.
        this.imagenPaciente = this.imagenPacienteDefault;
        //Propiedad que almacena el archivo de la imagen del paciente.
        this.imagenArchivo = "";
        //Se agregan las validaciones al formulario de editar paciente.
        this.formEditarPaciente = fb.group({
            'nombres': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'apellidoPaterno': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'apellidoMaterno': [''],
            'email': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email],
            'telefono': ['', [this.utilidadesService.numberValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(10)]],
            'celular': ['', [this.utilidadesService.numberValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(10)]],
            'imagen': [''],
            'estatus': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        //Se relacionan los elementos del formulario con las propiedades/variables creadas.
        this.nombres = this.formEditarPaciente.controls['nombres'];
        this.apellidoPaterno = this.formEditarPaciente.controls['apellidoPaterno'];
        this.apellidoMaterno = this.formEditarPaciente.controls['apellidoMaterno'];
        this.email = this.formEditarPaciente.controls['email'];
        this.telefono = this.formEditarPaciente.controls['telefono'];
        this.celular = this.formEditarPaciente.controls['celular'];
        this.imagen = this.formEditarPaciente.controls['imagen'];
        this.estatus = this.formEditarPaciente.controls['estatus'];
    }
    EditarPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        //El teléfono y celular solo aceptarán números.
        this.utilidadesService.inputNumerico(this.telefonoHTML);
        this.utilidadesService.inputNumerico(this.celularHTML);
        //Inicia el modal de espera.
        this.esperarService.esperar();
        //Obtiene el identificador del paciente de la url.
        this.rutaActual.paramMap.subscribe(function (params) {
            _this.pacienteId = params.get("id");
            //Obtiene la información del indentificador dado.
            _this.pacientesService.verPaciente(_this.pacienteId).subscribe(function (resultado) {
                //Se le da el focus al cuadro de texto de nombres.
                _this.nombresHTML.nativeElement.focus();
                //Detiene la espera.
                _this.esperarService.noEsperar();
                //Se inicializan todas las variables.
                /*this.nombres.setValue("");
                this.apellidoPaterno.setValue("");
                this.apellidoMaterno.setValue("");
                this.email.setValue("");
                this.telefono.setValue("");
                this.celular.setValue("");
                this.estatus.setValue("");*/
                //Se le asigna al paciente una imagen por default para que no salga vacío el cuadro de la imagen.
                _this.imagenPaciente = _this.imagenPacienteSinImagen;
                //Si la imagen es válida, se despliega en pantalla.
                if (resultado["datos"][0]["imagen"]) {
                    //Se le asigna la imagen de la base de datos al paciente y aparece en pantalla.
                    _this.imagenPaciente = resultado["datos"][0]["imagen"];
                    //Si se llegara a modificar el paciente y la imagen no cambia.
                    _this.imagenArchivo = resultado["datos"][0]["imagen"];
                    //Arma el JSON de la información de la imagen original.
                    //Lo arma constante ya que es la misma imagen de la base de datos.
                    _this.imagenArchivo = JSON.stringify({
                        nombre: "imagen.jpg",
                        extension: "jpg",
                        tamano: 0,
                        //decodifica la imagen para que todos los carácteres se almacenen.
                        valor: btoa(resultado["datos"][0]["imagen"])
                    });
                    //Si el paciente tiene una imagen, esa misma será la de default.
                    _this.imagenPacienteDefault = _this.imagenPaciente;
                }
                //Si el nombre del paciente es válido, se despliega en pantalla.
                if (resultado["datos"][0]["nombres"]) {
                    _this.nombres.setValue(resultado["datos"][0]["nombres"]);
                }
                //Si el apellido paterno es válido, se despliega en pantalla.
                if (resultado["datos"][0]["apellido_paterno"]) {
                    _this.apellidoPaterno.setValue(resultado["datos"][0]["apellido_paterno"]);
                }
                //Si el apellido materno es válido, se despliega en pantalla.
                if (resultado["datos"][0]["apellido_materno"]) {
                    _this.apellidoMaterno.setValue(resultado["datos"][0]["apellido_materno"]);
                }
                //Si el email es válido, se despliega en pantalla.
                if (resultado["datos"][0]["email"]) {
                    _this.email.setValue(resultado["datos"][0]["email"]);
                }
                //Si el teléfono es válido, se despliega en pantalla.
                if (resultado["datos"][0]["telefono"]) {
                    _this.telefono.setValue(resultado["datos"][0]["telefono"]);
                }
                //Si el celular es válido, se despliega en pantalla.
                if (resultado["datos"][0]["celular"]) {
                    _this.celular.setValue(resultado["datos"][0]["celular"]);
                }
                //Si el celular es válido, se despliega en pantalla.
                if (resultado["datos"][0]["estatus"]) {
                    _this.estatus.setValue(resultado["datos"][0]["estatus"]);
                }
            });
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 16/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarPacienteComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarPaciente.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que edita un paciente.                           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 19/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarPacienteComponent.prototype.editarPaciente = function () {
        var _this = this;
        this.pulsarEditar = true;
        //Si los elementos del formulario no están llenos, se hace un focus para que se ingrese texto.
        if (this.nombres.invalid) {
            this.nombresHTML.nativeElement.focus();
            return;
        }
        else if (this.apellidoPaterno.invalid) {
            this.apellidoPaternoHTML.nativeElement.focus();
            return;
        }
        else if (this.email.invalid) {
            this.emailHTML.nativeElement.focus();
            return;
        }
        else if (this.telefono.hasError("minlength") || this.telefono.hasError("maxlength")) {
            this.telefonoHTML.nativeElement.focus();
            return;
        }
        else if (this.celular.hasError("minlength") || this.celular.hasError("maxlength")) {
            this.celularHTML.nativeElement.focus();
            return;
        }
        //Se ponen en mayúsculas algunos campos y a todos se les quita los espacios en blanco.
        var nombres = this.nombres.value ? this.nombres.value : "";
        nombres = nombres.trim().toUpperCase();
        var apellidoPaterno = this.apellidoPaterno.value ? this.apellidoPaterno.value : "";
        apellidoPaterno = apellidoPaterno.trim().toUpperCase();
        var apellidoMaterno = this.apellidoMaterno.value ? this.apellidoMaterno.value : "";
        apellidoMaterno = apellidoMaterno.trim().toUpperCase();
        var email = this.email.value ? this.email.value : "";
        email = email.trim();
        var telefono = this.telefono.value ? this.telefono.value : "";
        telefono = telefono.trim();
        var celular = this.celular.value ? this.celular.value : "";
        celular = celular.trim();
        var estatus = this.estatus.value ? this.estatus.value : "";
        estatus = estatus.trim();
        //Abre el modal de espera.
        this.esperarService.esperar();
        //Se intenta dar de alta al paciente en la base de datos.
        this.pacientesService.editarPaciente(this.pacienteId, nombres, apellidoPaterno, apellidoMaterno, email, telefono, celular, this.imagenArchivo, estatus)
            .subscribe(function (resultado) {
            //Detiene la espera.
            _this.esperarService.noEsperar();
            _this.pulsarEditar = false;
            //Abre el modal.
            var modalRef = _this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
            modalRef.result.then(function (result) {
                //Se le da un focus a los nombres.
                _this.nombresHTML.nativeElement.focus();
            });
            //Define la etiqueta del botón de Aceptar.
            modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
            //Si se modificó satisfactoriamente.
            if (resultado["estado"] == "OK") {
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Modificación satisfactoria.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = "El paciente se modificó satisfactoriamente.";
            }
            else {
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Error.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = resultado["mensaje"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: seleccionarImagen.                                           |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que selecciona la imagen del paciente.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 22/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarPacienteComponent.prototype.seleccionarImagen = function (event) {
        var _this = this;
        //Si ha sido seleccionada una imagen.
        if (event.target.files && event.target.files[0]) {
            //Variable que almacena la ruta del archivo.
            var archivo_1 = event.target.files[0];
            //Variable que almacena la extensión o tipo del archivo.
            var tipoArchivo = archivo_1["type"];
            //Si el archivo no es una imagen.
            if (!tipoArchivo.toUpperCase().includes("IMAGE")) {
                //Abre el modal de tamaño chico.
                var modalRef = this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
                //Define el título del modal.
                modalRef.componentInstance.titulo = "Imagen inválida.";
                //Define el mensaje del modal.
                modalRef.componentInstance.mensaje = "El archivo que seleccionó No es una imagen.";
                //Define la etiqueta del botón de Aceptar.
                modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
                //Se resetea la imagen y el seleccionador de archivos.
                this.limpiarImagen();
            }
            else {
                //Se lee el archivo obtenido.
                var reader = new FileReader();
                reader.readAsDataURL(archivo_1);
                //Si el tamaño del archivo es muy grande.
                if (archivo_1.size > 50000) {
                    //Abre el modal de mensaje.
                    var modalRef = this.modal.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_5__["DialogoAlertaComponent"], { centered: true });
                    //Define el título del modal.
                    modalRef.componentInstance.titulo = "Imagen inválida.";
                    //Define el mensaje del modal.
                    modalRef.componentInstance.mensaje = "El tamaño de la imagen debe ser menor a 50,000 Bytes.";
                    //Define la etiqueta del botón de Aceptar.
                    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
                    //Se resetea la imagen y el seleccionador de archivos.
                    this.limpiarImagen();
                }
                else {
                    //Cuando la imagen ya se subió temporalmente.
                    reader.onload = function (event) {
                        //Se despliega en pantalla la imagen.
                        _this.imagenPaciente = event.target["result"];
                        //Arma el JSON de la información de la imagen.
                        _this.imagenArchivo = JSON.stringify({
                            nombre: archivo_1.name,
                            extension: archivo_1.type,
                            tamano: archivo_1.size,
                            //decodifica la imagen para que todos los carácteres se almacenen.
                            valor: btoa(event.target["result"])
                        });
                    };
                }
            }
        }
        else {
            //Se retorna a la imagen por default.
            this.limpiarImagen();
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarImagen.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para resetear la imagen del paciente.            |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: eliminaimagenBD = indica que ya no se usará   |
    |  la imagen almacenada en la base de datos.                            |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    EditarPacienteComponent.prototype.limpiarImagen = function (eliminaImagenBD) {
        if (eliminaImagenBD === void 0) { eliminaImagenBD = false; }
        //Si se elimina la imagen o si ya no se quiere la imagen de la base de datos.
        if (eliminaImagenBD) {
            //Aparecerá en pantalla la imagen del paciente por default.
            this.imagenPaciente = this.imagenPacienteSinImagen;
            //Se vacía el archivo de la imagen.
            this.imagenArchivo = "";
        }
        else {
            this.imagenPaciente = this.imagenPacienteDefault;
        }
        //Se resetea el campo o explorador de archivos.
        this.imagenHTML.nativeElement.value = "";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("nombresHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "nombresHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apellidoPaternoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "apellidoPaternoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apellidoMaternoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "apellidoMaternoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("emailHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "emailHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("telefonoHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "telefonoHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("celularHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "celularHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("imagenHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "imagenHTML", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("estatusHTML"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditarPacienteComponent.prototype, "estatusHTML", void 0);
    EditarPacienteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editar-paciente',
            template: __webpack_require__(/*! ./editar-paciente.component.html */ "./src/app/pacientes/editar-paciente/editar-paciente.component.html"),
            styles: [__webpack_require__(/*! ./editar-paciente.component.css */ "./src/app/pacientes/editar-paciente/editar-paciente.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_3__["UtilidadesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_7__["EsperarService"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_6__["PacientesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], EditarPacienteComponent);
    return EditarPacienteComponent;
}());



/***/ }),

/***/ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/pacientes/lista-pacientes/lista-pacientes.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: lista-pacientes.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos de la lista de pacientes.     |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n"

/***/ }),

/***/ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/pacientes/lista-pacientes/lista-pacientes.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: lista-pacientes.                                          | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página de pacientes.                                 |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 13/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container-fluid\" *ngIf=\"infoLista\">\n    <div class=\"row\">\n        <div class=\"col-lg-1\">\n            <button *ngIf=\"altaPacientes\" type=\"button\" class=\"btn btn-azul btn-lg col-lg-12\" placement=\"bottom\" ngbTooltip=\"Dar de alta un paciente.\"\n                (click)=\"altaPaciente();\">\n                <i class=\"material-icons\">add</i>\n            </button>\n        </div>\n        <div class=\"col-lg-5\">\n            <div class=\"input-group input-group-lg\">\n                <input type=\"text\" #buscarInfoHTML class=\"form-control\" placeholder=\"Búsqueda\">\n                <div class=\"input-group-append\">\n                    <button class=\"btn btn-azul\" type=\"button\" (click)=\"limpiarCampoBusqueda(buscarInfoHTML)\" placement=\"bottom\" ngbTooltip=\"Borrar búsqueda.\">\n                        <i class=\"material-icons\">backspace</i>\n                    </button>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-1\">\n            <button class=\"btn btn-azul btn-lg col-lg-12\" type=\"button\" (click)=\"buscar()\" placement=\"bottom\" ngbTooltip=\"Buscar.\">\n                <i class=\"material-icons\">search</i>\n            </button>\n        </div>\n    </div>\n    <br>\n    <div class=\"row\">\n        <div class=\"col-lg-12 table-responsive\">\n            <div style=\"height:600px;overflow:auto;margin-right:15px;\">\n                <table class=\"table table-striped table-bordered\">\n                    <thead>\n                        <tr>\n                            <th class=\"text-center\">Nombres</th>\n                            <th class=\"text-center\">Apellido paterno</th>\n                            <th class=\"text-center\">Apellido materno</th>\n                            <th class=\"text-center\">Email</th>\n                            <th class=\"text-center\">Teléfono</th>\n                            <th class=\"text-center\">Celular</th>\n                            <th class=\"text-center\">Estatus</th>\n                            <th class=\"text-center\">Opciones</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let paciente of pacientes\">\n                            <td>{{paciente.nombres}}</td>\n                            <td>{{paciente.apellido_paterno}}</td>\n                            <td>{{paciente.apellido_materno}}</td>\n                            <td>{{paciente.email}}</td>\n                            <td class=\"text-right\">{{paciente.telefono}}</td>\n                            <td class=\"text-right\">{{paciente.celular}}</td>\n                            <td>{{paciente.estatus}}</td>\n                            <td>\n                                <div class=\"btn-group btn-group-sm\" role=\"group\">\n                                    <button *ngIf=\"verPacientes\" type=\"button\" class=\"btn\" ngbTooltip=\"Ver información del paciente.\" (click)='verPaciente(paciente.id)'>\n                                        <i class=\"material-icons\">visibility</i>\n                                    </button>\n                                    <button *ngIf=\"editarPacientes\" type=\"button\" class=\"btn\" ngbTooltip=\"Editar información del paciente.\" (click)='editarPaciente(paciente.id)'>\n                                        <i class=\"material-icons\">edit</i>\n                                    </button>\n                                    <button *ngIf=\"eliminarPacientes\" type=\"button\" class=\"btn\" ngbTooltip=\"Eliminar paciente permanentemente.\" (click)='eliminarPaciente(paciente.id)'>\n                                        <i class=\"material-icons\">delete_forever</i>\n                                    </button>\n                                    <button *ngIf=\"desAsignarPacientes\" type=\"button\" class=\"btn\" ngbTooltip=\"Desasignar paciente.\" (click)='desAsignarPaciente(paciente.id)'>\n                                        <i class=\"material-icons\">remove</i>\n                                    </button>                               \n                                </div>\n                            </td>\n\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/pacientes/lista-pacientes/lista-pacientes.component.ts ***!
  \************************************************************************/
/*! exports provided: ListaPacientesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaPacientesComponent", function() { return ListaPacientesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dialogo-alerta/dialogo-alerta.component */ "./src/app/dialogo-alerta/dialogo-alerta.component.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _utilidades_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilidades.service */ "./src/app/utilidades.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var _dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dialogo-confirmacion/dialogo-confirmacion.component */ "./src/app/dialogo-confirmacion/dialogo-confirmacion.component.ts");
/******************************************************************|
|NOMBRE: ListaPacientesComponent.                                  |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene la lista de los pacientes    |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 12/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ListaPacientesComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: pacientesService = contiene los métodos para  |
    |                                        manipular a los pacientes.     |
    |                         modalService = contiene los métodos para      |
    |                                        manipular modals,              |
    |                         esperarService = contiene los métodos para    |
    |                                          mostrar o no la espera,      |
    |  buscarInfoHTML = elemento de texto HTML que servirá como buscador,   |
    |  utilidadesService= Contiene métodos genéricos y útiles,              |
    |  rutaNavegacion   = para navegar a otras url´s                        |
    |  autenticarService = contiene los métodos de autenticación.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function ListaPacientesComponent(pacientesService, modalService, esperarService, utilidadesService, rutaNavegacion, autenticarService) {
        this.pacientesService = pacientesService;
        this.modalService = modalService;
        this.esperarService = esperarService;
        this.utilidadesService = utilidadesService;
        this.rutaNavegacion = rutaNavegacion;
        this.autenticarService = autenticarService;
        //Propiedad para indicar que la información ya está disponible para mostrar.
        this.infoLista = true;
        //Propiedad que indica si el usuario puede dar de alta pacientes.
        this.altaPacientes = false;
        //Propiedad que indica si el usuario puede ver pacientes.
        this.verPacientes = false;
        //Propiedad que indica si el usuario puede editar pacientes.
        this.editarPacientes = false;
        //Propiedad que indica si el usuario puede eliminar pacientes.
        this.eliminarPacientes = false;
        //Propiedad que indica si el usuario puede desasignar pacientes.
        this.desAsignarPacientes = false;
    }
    ListaPacientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.obtenerPacientes()
            .subscribe(function (respuesta) {
            //Se termina la espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
                //No se intenta mostrar nada en la vista por el error.
                _this.infoLista = false;
            }
            else {
                //Se indica en la vista que ya puede mostrar la info.
                _this.infoLista = true;
                //Se llena los arreglos de pacientes para que pueda ser mostrado.
                _this.pacientes = respuesta["datos"];
                _this.pacientesServidor = respuesta["datos"];
                //Se obtiene el método de tecleado del elemento HTML de búsqueda.
                Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(_this.buscarInfoHTML.nativeElement, 'keyup')
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (e) { return e.target.value; }))
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (query) { return _this.utilidadesService.filtrarDatos(query, _this.pacientesServidor); }))
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchAll"])())
                    .subscribe(function (resultados) {
                    //Se actualiza la información en pantalla.        
                    _this.pacientes = resultados;
                });
                //Evento de cuando se pega con el mouse algun texto en la caja de texto.
                Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(_this.buscarInfoHTML.nativeElement, 'paste')
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (e) { return e.target.value; }))
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(50))
                    .subscribe(function (cadena) {
                    //Genera un evento de teclazo para asegurar que se dispare el evento.
                    _this.buscarInfoHTML.nativeElement.dispatchEvent(new Event('keyup'));
                });
            }
        });
    };
    ListaPacientesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Se le da un focus a la búsqueda.
        this.buscarInfoHTML.nativeElement.focus();
        //El botón de dar de alta pacientes se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneMenu('alta-paciente').subscribe(function (respuesta) {
            _this.altaPacientes = respuesta["value"];
        });
        //El botón de ver a un paciente en la tabla de lista de pacientes,
        // se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneMenu('ver-paciente').subscribe(function (respuesta) {
            _this.verPacientes = respuesta["value"];
        });
        //El botón de editar a un paciente en la tabla de lista de pacientes,
        // se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneMenu('editar-paciente').subscribe(function (respuesta) {
            _this.editarPacientes = respuesta["value"];
        });
        //El botón de eliminar a un paciente en la tabla de lista de pacientes,
        // se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('ELIMINAR PACIENTE').subscribe(function (respuesta) {
            _this.eliminarPacientes = respuesta["value"];
        });
        //El botón de desasignar a un paciente en la tabla de lista de pacientes,
        // se hará visible solamente si el usuario tiene el privilegio.
        this.autenticarService.usuarioTieneDetModulo('DESASIGNAR PACIENTE').subscribe(function (respuesta) {
            _this.desAsignarPacientes = respuesta["value"];
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: _alerta.                                                     |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Abre el modal cuando se obtiene la respuesta incorrecta |
    |               de la base de datos en forma de alerta.                 |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype._alerta = function (mensaje) {
        //Abre el modal de tamaño chico.
        var modalRef = this.modalService.open(_dialogo_alerta_dialogo_alerta_component__WEBPACK_IMPORTED_MODULE_3__["DialogoAlertaComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Notificación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = mensaje;
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoBusqueda.                                        |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de búsqueda y restablece la info. orig. |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: campo  = Campo HTML que se limpiará.          |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 09/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.limpiarCampoBusqueda = function (campo) {
        //Si el campo tiene algo escrito se limpiará.
        if (campo.value.length > 0) {
            //limpia el cuadro de texto.
            campo.value = "";
            //Actualiza la información con la original.
            this.pacientes = this.pacientesServidor;
        }
        //Le da un focus al elemento de búsqueda.
        campo.focus();
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: altaPaciente.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que llama al formulario de crear paciente.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 11/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.altaPaciente = function () {
        this.rutaNavegacion.navigate(['pacientes', 'alta-paciente']);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: buscar.                                                      |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para buscar pacientes.                           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.buscar = function () {
        var _this = this;
        //Se limpia el cuadro de búsqueda.
        this.buscarInfoHTML.nativeElement.value = "";
        //Se abre el modal de espera, signo de que se está haciendo una búsqueda en el servidor.
        this.esperarService.esperar();
        //Intenta obtener los pacientes del usuario ingresado.
        this.pacientesService.obtenerPacientes()
            .subscribe(function (respuesta) {
            //Se termina la espera.
            _this.esperarService.noEsperar();
            //Si hubo un error en la obtención de información.
            if (respuesta["estado"] === "ERROR") {
                //Muestra una alerta con el porqué del error.
                _this._alerta(respuesta["mensaje"]);
                //No se intenta mostrar nada en la vista por el error.
                _this.infoLista = false;
            }
            else {
                //Se indica en la vista que ya puede mostrar la info.
                _this.infoLista = true;
                //Se llena los arreglos de pacientes para que pueda ser mostrado.
                _this.pacientes = respuesta["datos"];
                _this.pacientesServidor = respuesta["datos"];
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: verPaciente.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para entrar al detalle del paciente.             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 25/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.verPaciente = function (id) {
        this.rutaNavegacion.navigateByUrl('pacientes/ver-paciente/' + id);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: editarPaciente.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para entrar al formulario de editar paciente.    |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 27/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.editarPaciente = function (id) {
        this.rutaNavegacion.navigateByUrl('pacientes/editar-paciente/' + id);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: eliminarPaciente.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para eliminar a un paciente.                     |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: id = identificador del paciente.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.eliminarPaciente = function (id) {
        var _this = this;
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_10__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "Se eliminará permanentemente toda la información del paciente. "
            + "¿Está seguro de eliminar al paciente?";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar al paciente.
            if (result === "Sí") {
                _this.pacientesService.eliminarPaciente(id).subscribe(function (respuesta) {
                    //Si hubo un error.
                    if (respuesta["estado"] === "ERROR") {
                        //Muestra una alerta con el porqué del error.
                        _this._alerta(respuesta["mensaje"]);
                    }
                    else {
                        _this._alerta("El paciente se eliminó permanentemente.");
                        //Se actualizan los datos.
                        _this.buscar();
                    }
                });
            }
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: desAsignarPaciente.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para desasignar a un paciente del usuario.       |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: id = identificador del paciente.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 28/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    ListaPacientesComponent.prototype.desAsignarPaciente = function (id) {
        var _this = this;
        //Abre el modal.
        var modalRef = this.modalService.open(_dialogo_confirmacion_dialogo_confirmacion_component__WEBPACK_IMPORTED_MODULE_10__["DialogoConfirmacionComponent"], { centered: true });
        //Define el título del modal.
        modalRef.componentInstance.titulo = "Confirmación";
        //Define el mensaje del modal.
        modalRef.componentInstance.mensaje = "Ya no podrá acceder a la información del paciente. "
            + "¿Está seguro de desasignarse el paciente?";
        //Define la etiqueta del botón de Aceptar.
        modalRef.componentInstance.etiquetaBotonAceptar = "Sí";
        //Define la etiqueta del botón de Cancelar.
        modalRef.componentInstance.etiquetaBotonCancelar = "No";
        //Se retorna el botón pulsado.
        modalRef.result.then(function (result) {
            //Si la respuesta es eliminar al paciente.
            if (result === "Sí") {
                _this.pacientesService.desAsignarPaciente(id).subscribe(function (respuesta) {
                    //Si hubo un error.
                    if (respuesta["estado"] === "ERROR") {
                        //Muestra una alerta con el porqué del error.
                        _this._alerta(respuesta["mensaje"]);
                    }
                    else {
                        _this._alerta("El paciente se desasignó satisfactoriamente.");
                        //Se actualizan los datos.
                        _this.buscar();
                    }
                });
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('buscarInfoHTML'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ListaPacientesComponent.prototype, "buscarInfoHTML", void 0);
    ListaPacientesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lista-pacientes',
            template: __webpack_require__(/*! ./lista-pacientes.component.html */ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.html"),
            styles: [__webpack_require__(/*! ./lista-pacientes.component.css */ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.css")]
        }),
        __metadata("design:paramtypes", [_pacientes_service__WEBPACK_IMPORTED_MODULE_1__["PacientesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_4__["EsperarService"],
            _utilidades_service__WEBPACK_IMPORTED_MODULE_6__["UtilidadesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _autenticar_service__WEBPACK_IMPORTED_MODULE_9__["AutenticarService"]])
    ], ListaPacientesComponent);
    return ListaPacientesComponent;
}());



/***/ }),

/***/ "./src/app/pacientes/pacientes.component.css":
/*!***************************************************!*\
  !*** ./src/app/pacientes/pacientes.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pacientes/pacientes.component.html":
/*!****************************************************!*\
  !*** ./src/app/pacientes/pacientes.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/pacientes/pacientes.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pacientes/pacientes.component.ts ***!
  \**************************************************/
/*! exports provided: PacientesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PacientesComponent", function() { return PacientesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/******************************************************************|
|NOMBRE: PacientesComponent.                                       |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que contiene los componentes de los       |
|             pacientes.                                           |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 01/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PacientesComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function PacientesComponent() {
    }
    PacientesComponent.prototype.ngOnInit = function () { };
    PacientesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pacientes',
            template: __webpack_require__(/*! ./pacientes.component.html */ "./src/app/pacientes/pacientes.component.html"),
            styles: [__webpack_require__(/*! ./pacientes.component.css */ "./src/app/pacientes/pacientes.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PacientesComponent);
    return PacientesComponent;
}());



/***/ }),

/***/ "./src/app/pacientes/pacientes.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pacientes/pacientes.module.ts ***!
  \***********************************************/
/*! exports provided: rutas, PacientesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rutas", function() { return rutas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PacientesModule", function() { return PacientesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pacientes_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pacientes.component */ "./src/app/pacientes/pacientes.component.ts");
/* harmony import */ var _alta_paciente_alta_paciente_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alta-paciente/alta-paciente.component */ "./src/app/pacientes/alta-paciente/alta-paciente.component.ts");
/* harmony import */ var _lista_pacientes_lista_pacientes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lista-pacientes/lista-pacientes.component */ "./src/app/pacientes/lista-pacientes/lista-pacientes.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../usuario-tiene-menu.guard */ "./src/app/usuario-tiene-menu.guard.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _usuario_tiene_paciente_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./usuario-tiene-paciente.guard */ "./src/app/pacientes/usuario-tiene-paciente.guard.ts");
/* harmony import */ var _ver_paciente_ver_paciente_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ver-paciente/ver-paciente.component */ "./src/app/pacientes/ver-paciente/ver-paciente.component.ts");
/* harmony import */ var _editar_paciente_editar_paciente_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./editar-paciente/editar-paciente.component */ "./src/app/pacientes/editar-paciente/editar-paciente.component.ts");
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//Constante que contiene las rutas que tendrá el sistema.
var rutas = [
    { path: '', component: _lista_pacientes_lista_pacientes_component__WEBPACK_IMPORTED_MODULE_5__["ListaPacientesComponent"] },
    { path: 'lista-pacientes', component: _lista_pacientes_lista_pacientes_component__WEBPACK_IMPORTED_MODULE_5__["ListaPacientesComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"]] },
    { path: 'alta-paciente', component: _alta_paciente_alta_paciente_component__WEBPACK_IMPORTED_MODULE_4__["AltaPacienteComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"]] },
    { path: 'ver-paciente/:id', component: _ver_paciente_ver_paciente_component__WEBPACK_IMPORTED_MODULE_10__["VerPacienteComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"], _usuario_tiene_paciente_guard__WEBPACK_IMPORTED_MODULE_9__["UsuarioTienePacienteGuard"]] },
    { path: 'editar-paciente/:id', component: _editar_paciente_editar_paciente_component__WEBPACK_IMPORTED_MODULE_11__["EditarPacienteComponent"], canActivate: [_usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"], _usuario_tiene_paciente_guard__WEBPACK_IMPORTED_MODULE_9__["UsuarioTienePacienteGuard"]] },
    { path: '**', redirectTo: 'pacientes' }
];
var PacientesModule = /** @class */ (function () {
    function PacientesModule() {
    }
    PacientesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _pacientes_component__WEBPACK_IMPORTED_MODULE_3__["PacientesComponent"],
                _alta_paciente_alta_paciente_component__WEBPACK_IMPORTED_MODULE_4__["AltaPacienteComponent"],
                _lista_pacientes_lista_pacientes_component__WEBPACK_IMPORTED_MODULE_5__["ListaPacientesComponent"],
                _ver_paciente_ver_paciente_component__WEBPACK_IMPORTED_MODULE_10__["VerPacienteComponent"],
                _editar_paciente_editar_paciente_component__WEBPACK_IMPORTED_MODULE_11__["EditarPacienteComponent"]
            ],
            exports: [
                _pacientes_component__WEBPACK_IMPORTED_MODULE_3__["PacientesComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"]
            ],
            providers: [
                _usuario_tiene_menu_guard__WEBPACK_IMPORTED_MODULE_7__["UsuarioTieneMenuGuard"],
                _usuario_tiene_paciente_guard__WEBPACK_IMPORTED_MODULE_9__["UsuarioTienePacienteGuard"]
            ]
        })
    ], PacientesModule);
    return PacientesModule;
}());



/***/ }),

/***/ "./src/app/pacientes/usuario-tiene-paciente.guard.ts":
/*!***********************************************************!*\
  !*** ./src/app/pacientes/usuario-tiene-paciente.guard.ts ***!
  \***********************************************************/
/*! exports provided: UsuarioTienePacienteGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioTienePacienteGuard", function() { return UsuarioTienePacienteGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/******************************************************************|
|NOMBRE: UsuarioTienePacienteGuard.                                |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario tenga asignado |
| a un paciente.                                                   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 24/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsuarioTienePacienteGuard = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |  si un usuario tiene al paciente otorgado o dado,                     |
    |  rutaNavegacion: contiene los métodos para manipular url´s.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 24/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UsuarioTienePacienteGuard(autorizacion, rutaNavegacion) {
        this.autorizacion = autorizacion;
        this.rutaNavegacion = rutaNavegacion;
    }
    UsuarioTienePacienteGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        //Obtiene el identificador del paciente de la url.
        var pacienteId = next.paramMap.get("id");
        //Retorna verdadero o falso en caso de que el usuario tenga o no el paciente respectivamente.
        return this.autorizacion.usuarioTienePaciente(pacienteId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resultado) {
            //Si el usuario no tiene al paciente lo retorna a la lista de pacientes.
            if (!resultado["value"]) {
                _this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
            }
            return resultado["value"];
        }));
    };
    UsuarioTienePacienteGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_2__["AutenticarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], UsuarioTienePacienteGuard);
    return UsuarioTienePacienteGuard;
}());



/***/ }),

/***/ "./src/app/pacientes/ver-paciente/ver-paciente.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/pacientes/ver-paciente/ver-paciente.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/******************************************************************|\n|NOMBRE: ver-paciente.                                             | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Se muestran lo estilos para ver a un paciente.       |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 25/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n*/\n\n/*Clase para el color de los botones y color de fuente.*/\n\n.btn-azul{\n    background-color: rgb(0, 162, 232);\n    color: white;    \n  }\n\n/*Clase para darle a la fuente o letra que lo contiene el color azul. */\n\n.fuente-azul{\n  color: rgb(0, 162, 232);\n}"

/***/ }),

/***/ "./src/app/pacientes/ver-paciente/ver-paciente.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pacientes/ver-paciente/ver-paciente.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!------------------------------------------------------------------\n|NOMBRE: ver-paciente.                                             | \n|------------------------------------------------------------------|\n|DESCRIPCIÓN: Página para ver a un paciente en específico.         |\n|------------------------------------------------------------------|\n|AUTOR: Ricardo Luna.                                              |\n|------------------------------------------------------------------|\n|FECHA: 25/07/2018.                                                |\n|------------------------------------------------------------------|\n|                       HISTORIAL DE CAMBIOS                       |\n|------------------------------------------------------------------|\n| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |\n-------------------------------------------------------------------->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <button type=\"button\" class=\"btn btn-azul btn-lg\" placement=\"bottom\" ngbTooltip=\"Regresar al listado de pacientes.\" (click)=\"regresar()\">\n        <i class=\"material-icons\">arrow_back</i>\n      </button>\n    </div>\n    <div class=\"col-lg-9\">\n      <h1 class=\"display-4\">Detalle del paciente</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <hr>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-3\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <img class=\"img-thumbnail\" [src]=\"imagen\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-9\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n        <ngb-accordion activeIds=\"panel-datos-generales\">\n          <ngb-panel id=\"panel-datos-generales\">\n            <ng-template ngbPanelTitle>\n              <span>\n                  <h4 class=\"text-center fuente-azul\">Datos generales</h4>\n              </span>\n            </ng-template>\n            <ng-template ngbPanelContent>              \n                <table class=\"table table-striped table-bordered\">\n                  <tr>\n                    <th>Nombres</th>\n                    <td>{{nombres}}</td>\n                  </tr>\n                  <tr>\n                    <th>Apellido paterno</th>\n                    <td>{{apellidoPaterno}}</td>\n                  </tr>\n                  <tr>\n                    <th>Apellido materno</th>\n                    <td>{{apellidoMaterno}}</td>\n                  </tr>\n                  <tr>\n                    <th>Email</th>\n                    <td>{{email}}</td>\n                  </tr>\n                  <tr>\n                    <th>Teléfono</th>\n                    <td>{{telefono}}</td>\n                  </tr>\n                  <tr>\n                    <th>Celular</th>\n                    <td>{{celular}}</td>\n                  </tr>\n                  <tr>\n                    <th>Estatus</th>\n                    <td>{{estatus}}</td>\n                  </tr>\n                </table>\n              \n            </ng-template>\n          </ngb-panel>\n          <ngb-panel>\n            <ng-template ngbPanelTitle>\n                <span>\n                    <h4 class=\"text-center fuente-azul\">Datos de facturación</h4>\n                </span>\n            </ng-template>\n            <ng-template ngbPanelContent>\n              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,\n              non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,\n              sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh\n              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice\n              lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard\n              of them accusamus labore sustainable VHS.\n            </ng-template>\n          </ngb-panel>\n        </ngb-accordion>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pacientes/ver-paciente/ver-paciente.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pacientes/ver-paciente/ver-paciente.component.ts ***!
  \******************************************************************/
/*! exports provided: VerPacienteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerPacienteComponent", function() { return VerPacienteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pacientes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pacientes.service */ "./src/app/pacientes.service.ts");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../esperar.service */ "./src/app/esperar.service.ts");
/******************************************************************|
|NOMBRE: VerPacienteComponent.                                     |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente para ver un paciente en específico.       |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 25/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VerPacienteComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:                                               |
    |  rutaActual   = para obtener los parámetros de la url,                |
    |  rutaNavegacion = para navegar a otras url´s,                         |
    |  utilidadesService = métodos genéricos y útiles,                      |
    |  pacientesService = contiene los métodos ABC/K de los pacientes,      |
    |  esperarService = contiene los métodos para el diálogo de espera.     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function VerPacienteComponent(rutaActual, rutaNavegacion, pacientesService, esperarService) {
        this.rutaActual = rutaActual;
        this.rutaNavegacion = rutaNavegacion;
        this.pacientesService = pacientesService;
        this.esperarService = esperarService;
        //Imagen del paciente.
        this.imagen = "../../../assets/img/pacientes/paciente_default.png";
        //Nombres del paciente.
        this.nombres = "";
        //Apellido paterno del paciente.
        this.apellidoPaterno = "";
        //Apellido materno del paciente.
        this.apellidoMaterno = "";
        //Email del paciente.
        this.email = "";
        //Teléfono fijo del pacientre.
        this.telefono = "";
        //Celular del paciente.
        this.celular = "";
        //Estatus del paciente.
        this.estatus = "";
    }
    VerPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Abre el modal de espera.
        this.esperarService.esperar();
        //Obtiene el identificador del paciente de la url.
        this.rutaActual.paramMap.subscribe(function (params) {
            _this.pacienteId = params.get("id");
            //Obtiene la información del indentificador dado.
            _this.pacientesService.verPaciente(_this.pacienteId).subscribe(function (resultado) {
                //Se inicializan todas las variables.
                _this.nombres = "";
                _this.apellidoPaterno = "";
                _this.apellidoMaterno = "";
                _this.email = "";
                _this.telefono = "";
                _this.celular = "";
                _this.estatus = "";
                _this.imagen = "../../../assets/img/pacientes/paciente_default.png";
                //Detiene la espera.
                _this.esperarService.noEsperar();
                //Si la imagen es válida, se despliega en pantalla.
                if (resultado["datos"][0]["imagen"]) {
                    _this.imagen = resultado["datos"][0]["imagen"];
                }
                //Si el nombre del paciente es válido, se despliega en pantalla.
                if (resultado["datos"][0]["nombres"]) {
                    _this.nombres = resultado["datos"][0]["nombres"];
                }
                //Si el apellido paterno es válido, se despliega en pantalla.
                if (resultado["datos"][0]["apellido_paterno"]) {
                    _this.apellidoPaterno = resultado["datos"][0]["apellido_paterno"];
                }
                //Si el apellido materno es válido, se despliega en pantalla.
                if (resultado["datos"][0]["apellido_materno"]) {
                    _this.apellidoMaterno = resultado["datos"][0]["apellido_materno"];
                }
                //Si el email es válido, se despliega en pantalla.
                if (resultado["datos"][0]["email"]) {
                    _this.email = resultado["datos"][0]["email"];
                }
                //Si el teléfono es válido, se despliega en pantalla.
                if (resultado["datos"][0]["telefono"]) {
                    _this.telefono = resultado["datos"][0]["telefono"];
                }
                //Si el celular es válido, se despliega en pantalla.
                if (resultado["datos"][0]["celular"]) {
                    _this.celular = resultado["datos"][0]["celular"];
                }
                //Si el celular es válido, se despliega en pantalla.
                if (resultado["datos"][0]["estatus"]) {
                    _this.estatus = resultado["datos"][0]["estatus"];
                }
            });
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: regresar.                                                    |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Regresa al menú de listado de pacientes.                |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 25/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    VerPacienteComponent.prototype.regresar = function () {
        this.rutaNavegacion.navigate(['pacientes', 'lista-pacientes']);
    };
    VerPacienteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ver-paciente',
            template: __webpack_require__(/*! ./ver-paciente.component.html */ "./src/app/pacientes/ver-paciente/ver-paciente.component.html"),
            styles: [__webpack_require__(/*! ./ver-paciente.component.css */ "./src/app/pacientes/ver-paciente/ver-paciente.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _pacientes_service__WEBPACK_IMPORTED_MODULE_2__["PacientesService"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_3__["EsperarService"]])
    ], VerPacienteComponent);
    return VerPacienteComponent;
}());



/***/ }),

/***/ "./src/app/pagina-invalida/pagina-invalida.component.css":
/*!***************************************************************!*\
  !*** ./src/app/pagina-invalida/pagina-invalida.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pagina-invalida/pagina-invalida.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pagina-invalida/pagina-invalida.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  pagina-invalida works!\n</p>\n"

/***/ }),

/***/ "./src/app/pagina-invalida/pagina-invalida.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pagina-invalida/pagina-invalida.component.ts ***!
  \**************************************************************/
/*! exports provided: PaginaInvalidaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginaInvalidaComponent", function() { return PaginaInvalidaComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/******************************************************************|
|NOMBRE: PaginaInvalidaComponent.                                  |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Página para redireccionar al inicio cuando la  url   |
|escrita en el navegador no está permitida.                        |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 13/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginaInvalidaComponent = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: rutaNavegacion = contiene los métodos para    |
    |                                         manipular rutas.              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    function PaginaInvalidaComponent(rutaNavegacion) {
        this.rutaNavegacion = rutaNavegacion;
    }
    PaginaInvalidaComponent.prototype.ngOnInit = function () {
        //Si escribe una url que no existe, lo retorna a la página de ingreso.
        this.rutaNavegacion.navigate(['ingresar']);
    };
    PaginaInvalidaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pagina-invalida',
            template: __webpack_require__(/*! ./pagina-invalida.component.html */ "./src/app/pagina-invalida/pagina-invalida.component.html"),
            styles: [__webpack_require__(/*! ./pagina-invalida.component.css */ "./src/app/pagina-invalida/pagina-invalida.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], PaginaInvalidaComponent);
    return PaginaInvalidaComponent;
}());



/***/ }),

/***/ "./src/app/usuario-ingresado.guard.ts":
/*!********************************************!*\
  !*** ./src/app/usuario-ingresado.guard.ts ***!
  \********************************************/
/*! exports provided: UsuarioIngresadoGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioIngresadoGuard", function() { return UsuarioIngresadoGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/******************************************************************|
|NOMBRE: UsuarioIngresadoGuard                                     |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para garantizar que el usuario esté conectado |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 29/05/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsuarioIngresadoGuard = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado.  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UsuarioIngresadoGuard(autorizacion) {
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: canActivate.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Implementación que abre cierta ruta solo si está        |
    |               conectado el usuario.                                   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: next = Ruta que se pretende ingresar          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
    |                         en caso de que la ruta se pueda utilizar      |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 29/05/2018.                                                   |
    |----------------------------------------------------------------------*/
    UsuarioIngresadoGuard.prototype.canActivate = function (next, state) {
        return this.autorizacion.obtenerToken() !== null;
    };
    UsuarioIngresadoGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_1__["AutenticarService"]])
    ], UsuarioIngresadoGuard);
    return UsuarioIngresadoGuard;
}());



/***/ }),

/***/ "./src/app/usuario-tiene-menu.guard.ts":
/*!*********************************************!*\
  !*** ./src/app/usuario-tiene-menu.guard.ts ***!
  \*********************************************/
/*! exports provided: UsuarioTieneMenuGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioTieneMenuGuard", function() { return UsuarioTieneMenuGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _esperar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./esperar.service */ "./src/app/esperar.service.ts");
/******************************************************************|
|NOMBRE: UsuarioTieneMenuGuard                                     |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Guarda para validar que un usuario tenga cierto menú |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 04/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsuarioTieneMenuGuard = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado,  |
    |  esperarService = contiene los métodos para mostrar modal de espera.  |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 04/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UsuarioTieneMenuGuard(autorizacion, esperarService, rutaNavegacion) {
        this.autorizacion = autorizacion;
        this.esperarService = esperarService;
        this.rutaNavegacion = rutaNavegacion;
    }
    /*----------------------------------------------------------------------|
  |  NOMBRE: canActivate.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Implementación que abre cierta ruta solo si el          |
  |               usuario tiene el menú dado.                             |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: next = Ruta que se pretende ingresar          |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE SALIDA:  resultado = Retorna verdadero o falso         |
  |                         en caso de que la ruta se pueda utilizar      |
  |                         respectivamente.                              |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 04/07/2018.                                                   |
  |----------------------------------------------------------------------*/
    UsuarioTieneMenuGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        //Abre el modal de espera.
        this.esperarService.esperar();
        //Obtiene  los menús de la url.  
        var menus = state.url.split("/");
        //Almacenará el menú o la url para ver si el usuario puede accesar a él.
        var url;
        //Si solo hay menú.
        if (menus.length == 2) {
            //Solo obtiene la primera ruta de la url.
            url = menus[1];
        }
        else if (menus.length >= 3) {
            //Solo obtiene la segunda ruta de la url.
            url = menus[2];
        }
        //Retorna verdadero o falso en caso de que el usuario tenga o no el menú.
        return this.autorizacion.usuarioTieneMenu(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resultado) {
            //Detiene la espera.
            _this.esperarService.noEsperar();
            //Si el usuario no tiene el menú, se le retorna al inicio o página principal.
            if (!resultado["value"]) {
                _this.rutaNavegacion.navigate(['inicio']);
            }
            //Retorna el resultado.
            return resultado["value"];
        })).toPromise();
    };
    UsuarioTieneMenuGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_autenticar_service__WEBPACK_IMPORTED_MODULE_2__["AutenticarService"],
            _esperar_service__WEBPACK_IMPORTED_MODULE_4__["EsperarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], UsuarioTieneMenuGuard);
    return UsuarioTieneMenuGuard;
}());



/***/ }),

/***/ "./src/app/usuarios.service.ts":
/*!*************************************!*\
  !*** ./src/app/usuarios.service.ts ***!
  \*************************************/
/*! exports provided: UsuariosService, USUARIOS_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosService", function() { return UsuariosService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USUARIOS_PROVIDERS", function() { return USUARIOS_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _autenticar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar.service */ "./src/app/autenticar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/******************************************************************|
|NOMBRE: Usuarios.                                                 |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene los métodos de base de datos de|
|los usuarios.                                                     |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 06/08/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/




var UsuariosService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: http  = para hacer peticiones http al backend,|
    |                         urlApi= url de la aplicación backend,         |
    |                         autorizacion = contiene los métodos para saber|
    |                                        si un usuario está conectado   |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UsuariosService(http, urlApi, autorizacion) {
        this.http = http;
        this.urlApi = urlApi;
        this.autorizacion = autorizacion;
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtroUsuarios.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los usuarios activos                |
    |  del usuario logueado.                                                |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  resultado = Retorna OK y los registros,       |
    |                          o ERROR                                      |
    |                         en caso de que todo esté correcto o no        |
    |                         respectivamente.                              |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 06/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    UsuariosService.prototype.filtroUsuarios = function () {
        //Si está conectado, entonces el token sí existe.
        if (this.autorizacion.obtenerToken() !== null) {
            //Se arman los headers, y se le agrega el X-API-KEY que almacena el token.
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'X-API-KEY': this.autorizacion.obtenerToken()
            });
            //Envía la petición al servidor backend para obtener los registros.
            return this.http.get(this.urlApi + 'filtro-usuarios', { headers: headers });
        }
        //No está conectado.
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false);
    };
    UsuariosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('URL_API_BACKEND')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String, _autenticar_service__WEBPACK_IMPORTED_MODULE_3__["AutenticarService"]])
    ], UsuariosService);
    return UsuariosService;
}());

//Constante que se utilizará para inyectar el servicio.
var USUARIOS_PROVIDERS = [
    { provide: UsuariosService, useClass: UsuariosService }
];


/***/ }),

/***/ "./src/app/utilidades.service.ts":
/*!***************************************!*\
  !*** ./src/app/utilidades.service.ts ***!
  \***************************************/
/*! exports provided: UtilidadesService, UTILIDADES_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilidadesService", function() { return UtilidadesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UTILIDADES_PROVIDERS", function() { return UTILIDADES_PROVIDERS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/******************************************************************|
|NOMBRE: Utilidades.                                               |
|------------------------------------------------------------------|
|DESCRIPCIÓN: Servicio que contiene métodos genéricos útiles.      |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 09/07/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UtilidadesService = /** @class */ (function () {
    /*----------------------------------------------------------------------|
    |  NOMBRE: constructor.                                                 |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método constructor del componente.                      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 01/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    function UtilidadesService() {
    }
    /*----------------------------------------------------------------------|
    |  NOMBRE: filtrarDatos.                                                |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para filtrar un arreglo de JSON´S.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA:  busqueda = cadena que se buscará,            |
    |                          datos = arreglo de datos que se filtrará.    |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  Arreglo filtrado.                             |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.filtrarDatos = function (busqueda, datos) {
        var _this = this;
        //Se le quitan los espacios en blanco y acentos a la búsqueda y se convierte a mayúsculas.
        busqueda = this.quitarAcentos(busqueda.trim().toUpperCase());
        //Es el arreglo que se retornará filtrado.
        var datosFiltrados = new Array();
        //Si la búsqueda no es vacía.
        if (busqueda.length > 0) {
            //Se recorren los registros del arreglo original de información.
            datos.forEach(function (json) {
                //Variable que concatenará los valores del JSON.
                var registroCompleto = "";
                //Se recorre el JSON, que equivale al registro actual de la iteración.
                for (var campo in json) {
                    //Se concatena el JSON.
                    registroCompleto = registroCompleto + (json[campo] || "") + " ";
                }
                //Variable para indicar que la palabra a buscar se encuentra en el JSON.
                var existePalabra = true;
                //Variable para dividir la búsqueda en palabras divididas por espacio en blanco.
                var palabrasBusqueda = busqueda.split(" ");
                //Se recorren las palabras encontradas.
                palabrasBusqueda.forEach(function (palabra) {
                    //Si todas las palabras se encuentran en el JSON, sigue el flujo.
                    if (existePalabra) {
                        //Si la palabra no es un espacio en blanco.
                        if (palabra.trim().length > 0) {
                            //Se le quitan los acentos a la búsqueda y se convierte a mayúscula.
                            //Y si la búsqueda está en el JSON.
                            if (_this.quitarAcentos(registroCompleto.toUpperCase()).includes(palabra)) {
                                //La palabra sí existe.
                                existePalabra = true;
                            }
                            else {
                                //La palabra no existe.              
                                existePalabra = false;
                            }
                        }
                    }
                });
                //Si todas las palabras de la búsqueda coinciden en el registro o JSON.
                if (existePalabra) {
                    //Se almacena el registro en el arreglo para después ser retornado, junto con las demás coincidencias.
                    datosFiltrados.push(json);
                }
            });
        }
        else {
            //Se retorna el arreglo original.
            datosFiltrados = datos;
        }
        //Se retornan los resultados o coincidencias obtenidos.   
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(datosFiltrados);
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: quitarAcentos.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para quitarle los acentos a una cadena.          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: cadeba = cadena a la que se le quitarán los   |
    |                         acentos.                                      |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE SALIDA:  Cadena sin acentos.                           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 07/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.quitarAcentos = function (cadena) {
        var charmap = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
        var pattern = /[^\w]/g;
        return cadena.replace(pattern, function (x) { return charmap[x] || x; });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: passwordValidator.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que valida la seguridad de la contraseña.        |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: formControl = Elemento del formulario que se  |
    |                         validará.                                     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 20/06/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.passwordValidator = function (control) {
        if (control.value != null && !control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\|\$%\^&\*])(?=.{6,40})/)) {
            return { invalidPassword: true };
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: numberValidator.                                             |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que valida que una cadena sea numérica.          |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: formControl = Elemento del formulario que se  |
    |                         validará.                                     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 19/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.numberValidator = function (control) {
        if (control.value != null && !control.value.match(/[^0-9]/)) {
            return { invalidNumber: true };
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: decimalValidator.                                            |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que acepta solo números decimales.               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: formControl = Elemento del formulario que se  |
    |                         validará.                                     |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 19/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.decimalValidator = function (control) {
        if (control.value != null && !control.value.match(/[^0-9].?/)) {
            return { invalidNumber: true };
        }
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: inputNumerico.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método que solo acepta números en un input text.        |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: input = Elemento del formulario,              |
    |  decimal = verdadero: número decimal, falso: número entero.           |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 19/07/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.inputNumerico = function (input, decimal) {
        if (decimal === void 0) { decimal = false; }
        //Expresión regular.
        var regExp = /[^0-9]/g;
        //Si es decimal se usa una expresión regular y si es entero se usa otra.
        decimal ? regExp = /^-?(0|[1-9]\d*)?$/ : regExp = /[^0-9]/g;
        //Evento de tecleado.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(input.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (e) { return e.target.value; }))
            .subscribe(function (cadena) {
            //Si se escriben letras, se remueven.
            input.nativeElement.value = cadena.replace(regExp, "");
        });
        //Evento de cuando se pega con el mouse algun texto en la caja de texto.
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(input.nativeElement, 'paste')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (e) { return e.target.value; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(50))
            .subscribe(function (cadena) {
            //Genera un evento de teclazo para que validar que sea número la cadena pegada.
            input.nativeElement.dispatchEvent(new Event('keyup'));
        });
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: limpiarCampoTexto.                                           |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Limpia el campo de texto.                               |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: campo  = Campo HTML que se limpiará,          |
    |  focus = indica si se le dará un focus al campo después de limpiarse. |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 03/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.limpiarCampoTexto = function (campo, focus) {
        if (focus === void 0) { focus = true; }
        //Si el campo tiene algo escrito se limpiará.
        if (campo.value.length > 0) {
            //limpia el cuadro de texto.
            campo.value = "";
        }
        //Le da un focus al elemento de búsqueda.
        focus ? campo.focus() : null;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: formatearFecha.                                              |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para formatear la fecha en dd/mm/yyyy.           |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: date = estructura de fecha (y,m,d),           |
    |  diagonales = indica si se incluirán las diagonales en la fecha.      |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 10/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.formatearFecha = function (date, diagonales) {
        if (diagonales === void 0) { diagonales = true; }
        //Si la fecha existe.
        if (date) {
            //Se obtiene el día.
            var dia = date.day.toString();
            //Si el día es de un dígito se le agrega un cero a la izquierda.
            dia = dia.length == 1 ? dia = "0" + dia : dia;
            //Se obtiene el mes.
            var mes = date.month.toString();
            //Si el mes es de un dígito se le agrega un cero a la izquierda.
            mes = mes.length == 1 ? mes = "0" + mes : mes;
            //Se retorna la fecha formateada.
            return diagonales ? dia + "/" + mes + "/" + date.year : "" + dia + mes + date.year;
        }
        //Si la fecha es vacía o nula.
        return null;
    };
    /*----------------------------------------------------------------------|
    |  NOMBRE: formatearFechaHora.                                          |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para formatear la fecha y hora en ddmmyyyyhis.   |
    |-----------------------------------------------------------------------|
    |  PARÁMETROS DE ENTRADA: date = estructura de fecha (y,m,d),           |
    |  time  = estructura de hora (h,m),                                    |
    |  diagonales = se incluirán las diagonales y puntos en la fecha.       |
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 14/08/2018.                                                   |
    |----------------------------------------------------------------------*/
    UtilidadesService.prototype.formatearFechaHora = function (date, time, diagonales) {
        if (diagonales === void 0) { diagonales = true; }
        var fecha;
        //Si la fecha existe.
        if (date) {
            //Se obtiene el día.
            var dia = date.day.toString();
            //Si el día es de un dígito se le agrega un cero a la izquierda.
            dia = dia.length == 1 ? dia = "0" + dia : dia;
            //Se obtiene el mes.
            var mes = date.month.toString();
            //Si el mes es de un dígito se le agrega un cero a la izquierda.
            mes = mes.length == 1 ? mes = "0" + mes : mes;
            //Se arma la fecha formateada.
            fecha = diagonales ? dia + "/" + mes + "/" + date.year : "" + dia + mes + date.year;
        }
        //Si el tiempo existe.
        if (time) {
            //Se obtiene la hora.
            var hora = time.hour.toString();
            //Si la hora es de un dígito se le agrega un cero a la izquierda.
            hora = hora.length == 1 ? hora = "0" + hora : hora;
            //Se obtienen los minutos.
            var minutos = time.minute.toString();
            //Si los minutos son de un dígito se le agrega un cero a la izquierda.
            minutos = minutos.length == 1 ? minutos = "0" + minutos : minutos;
            //Se arma la fecha junto con la hora formateada.
            return diagonales ? fecha + " " + hora + ":" + minutos : "" + fecha + hora + minutos;
        }
        //Si la fecha y/o hora es vacía o nula.
        return null;
    };
    UtilidadesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UtilidadesService);
    return UtilidadesService;
}());

//Constante que se utilizará para inyectar el servicio.
var UTILIDADES_PROVIDERS = [
    { provide: UtilidadesService, useClass: UtilidadesService }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:0 ./src/main.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ricardoluna/Desktop/angular/mimedicos/node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0 */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0");
module.exports = __webpack_require__(/*! /Users/ricardoluna/Desktop/angular/mimedicos/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map