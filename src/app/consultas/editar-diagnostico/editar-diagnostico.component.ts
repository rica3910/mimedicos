import { AbstractControl } from '@angular/forms';
/******************************************************************|
|NOMBRE: EditarDiagnosticoComponent.                               | 
|------------------------------------------------------------------|
|DESCRIPCIÓN: Componente que edita un diagnóstico a la consulta.   |
|------------------------------------------------------------------|
|AUTOR: Ricardo Luna.                                              |
|------------------------------------------------------------------|
|FECHA: 12/11/2018.                                                |
|------------------------------------------------------------------|
|                       HISTORIAL DE CAMBIOS                       |
|------------------------------------------------------------------|
| #   |   FECHA  |     AUTOR      |           DESCRIPCIÓN          |
*/

import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EsperarService } from './../../esperar.service';
import { UtilidadesService } from './../../utilidades.service';
import { ConsultasService } from './../../consultas.service';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.css']
})
export class EditarDiagnosticoComponent implements OnInit {

  //Identificador de la consulta. Tomado de la url.
  consultaId: string;
  //Identificador del diagnóstico. Tomado de la url.
  diagnosticoId: string;
  //Identificador del formulario.
  formularioId: string;
  //Nombre del formulario que se desplegará en el título.
  nombreFormulario: string;
  //Descripción del formulario.
  descripcionFormulario: string;
  //Indica que ya se verificó que la información de la consulta está lista.
  verificarInfoConsulta: boolean = false;
  //Indica que ya se verificó que la información del formulario ya está lista.
  verificarInfoFormulario: boolean = false;
  //Indica si la carga inicial de la página ya terminó.
  cargaInicialLista$: Subject<Boolean> = new Subject<Boolean>();

  //Variable para almacenar los campos del formulario.
  campos: JSON[] = new Array();
  //Variable que almacena los campos dinámicos del formulario.
  @ViewChildren('campoHTML') public campoHTML: QueryList<any>;
  //Variable que almacena la subscripción a la creación de campos dinámicos.
  subscripcionCamposDinamicos: Subscription;
  //Objeto que contendrá el formulario de modificación de los diagnósticos.
  formulario: FormGroup;
  //Indica si los campos ya se obtuvieron.
  verificarCampos: boolean = false;
  //Propiedad para cuando se oprime el botón de guardar cambios.
  pulsarCrear: boolean = false;
  //Propiedad para almacenar las imágenes que pudiera tener el formulario.
  imagenes: any[] = new Array();

  //Propiedad para la configuración del editor de textos.
  editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "150px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "",
    "imageEndPoint": "",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink"]
    ]
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  rutaNavegacion   = para navegar a otras url's,                       |
  |  rutaActual = para obtener los parámetros de la url,                  |
  |  esperarService = contiene los métodos para mostrar o no la espera,   |  
  |  consultasService = contiene los métodos de la bd de las consultas,   |
  |  utilidadesService = Contiene métodos genéricos y útiles,             |
  |  fb = contiene los métodos para manipular formularios HTML.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private rutaNavegacion: Router,
    private rutaActual: ActivatedRoute,
    private esperarService: EsperarService,
    private consultasService: ConsultasService,
    private utilidadesService: UtilidadesService,
    private fb: FormBuilder) {

    //Obtiene el identificador de la consulta y del diagnóstico de la url.
    this.rutaActual.paramMap.subscribe(params => {

      this.consultaId = params.get("id");
      this.diagnosticoId = params.get("diagnosticoId");
      //Se inicia la espera de respuesta de información.
      this.esperarService.esperar();
      //Se obtiene la información del formulario.
      this.infoFormulario();

      //Se agregan las validaciones al formulario de alta de consultas.
      this.formulario = fb.group({});
    });

    //Se utiliza para saber cuando se terminó de cargar la página y toda su info.
    this.cargaInicialLista$.subscribe((valor: boolean) => {

      //Si todos los filtros e información están listos.
      if (this.verificarInfoConsulta &&
        this.verificarInfoFormulario &&
        this.verificarCampos) {

        //Se resetean los valores de información inicial.
        this.verificarInfoConsulta = false;
        this.verificarInfoFormulario = false;
        this.verificarCampos = false;

        //Se detiene la espera.
        this.esperarService.noEsperar();

        //Se cancela la subscripción de la escucha de cambios en los campos HTML.
        this.subscripcionCamposDinamicos.unsubscribe();
      }

    });

  }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: regresar.                                                    |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Regresa al menú de listado de diagnósticos.             |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 12/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  regresar() {
    //Se regresa a la lista de diagnósticos.
    this.rutaNavegacion.navigateByUrl('consultas/lista-diagnosticos/' + this.consultaId);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoConsultaLista.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que avisa que ya se obtuvo la info de la consulta|   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: infoLista = indica que la info está lista.    |  
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoConsultaLista(infoLista: boolean) {
    this.verificarInfoConsulta = infoLista;
    this.cargaInicialLista$.next(this.verificarInfoConsulta);
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: infoFormulario.                                              |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método que obtiene la información del formulario.       |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 20/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  infoFormulario() {

    this.consultasService.infoFormularioDiagnostico(this.diagnosticoId).subscribe(respuesta => {

      //Indica que ya se cargó la info del formulario.
      this.verificarInfoFormulario = true;
      this.cargaInicialLista$.next(this.verificarInfoFormulario);

      //Si hubo un error en la obtención de información.
      if (respuesta["estado"] === "ERROR") {
        //Muestra una alerta con el porqué del error.
        this.utilidadesService.alerta("Error", respuesta["mensaje"]);
      }
      //Si todo salió bien.
      else {

        //Se le asigna el valor obtenido en la BD del nombre del formulario y de la descripción.
        this.formularioId = respuesta["datos"][0]["formulario_id"];
        this.nombreFormulario = respuesta["datos"][0]["nombre"];
        this.descripcionFormulario = respuesta["datos"][0]["descripcion"];

        //Se obtienen los campos del formulario.
        this.obtenerCampos();

      }

    });
  }

  /*----------------------------------------------------------------------|
    |  NOMBRE: obtenerCampos.                                               |
    |-----------------------------------------------------------------------|
    |  DESCRIPCIÓN: Método para obtener los campos del usuario logueado.    | 
    |-----------------------------------------------------------------------|
    |  AUTOR: Ricardo Luna.                                                 |
    |-----------------------------------------------------------------------|
    |  FECHA: 30/08/2018.                                                   |    
    |----------------------------------------------------------------------*/
  obtenerCampos() {

    //Intenta obtener los campos del formulario.
    this.consultasService.camposFormulario(this.diagnosticoId)
      .subscribe((respuesta) => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          //Muestra una alerta con el porqué del error.
          this.utilidadesService.alerta("Error", respuesta["mensaje"]);
        }
        //Si todo salió bien.
        else {

          //Se obtiene la información del diagnóstico, si es que existe.
          this.consultasService.informacionDiagnostico(this.diagnosticoId).subscribe(respuestaInfoDiagnostico => {

            //Si hubo un error en la obtención de información.
            if (respuestaInfoDiagnostico["estado"] === "ERROR") {
              //Muestra una alerta con el porqué del error.
              this.utilidadesService.alerta("Error", respuestaInfoDiagnostico["mensaje"]);
            }
            else {
              //Se almacena la información del diagnóstico.
              let infoDiagnostico: JSON[] = respuestaInfoDiagnostico["datos"];

              //Se almacenan los campos en forma de JSON.                  
              let campos: JSON[] = respuesta["datos"];
              //Se utiliza para obtener los campos a utilizar.
              let camposUnicos: any[] = new Array();
              /*Si hay un campo con el mismo nombre, quiere decir que es una lista.
              Esta variable ayudará a distinguir cuando sean iguales.*/
              let etiqueta: string = "";

              //Se recorren los campos de la base de datos.
              campos.forEach((campo: JSON) => {

                //Solo almacenará los campos que no estén repetidos.
                if (etiqueta != campo["etiqueta"]) {

                  //Almacenará el valor del campo.
                  let valor: string = campo["valor"];
                  //Si es un archivo, almacenará el archivo o imagen del campo.
                  let archivo: string = campo["archivo"];
                  //Indica si hay información en el diagnóstico.
                  let hayInfo: boolean = false;

                  //Si hay información en el diagnóstico, entonces se despliega en pantalla.
                  infoDiagnostico.forEach(info => {

                    if (info["id"] == campo["id"]) {
                      valor = info["valor"];
                      archivo = info["archivo"];
                      hayInfo = true;
                    }
                  });


                  if (archivo && hayInfo) {

                    archivo = JSON.parse(archivo);

                    //Si el campo es dibujo, entonces se decodifica la imagen.
                    if (campo["tipo_campo_formulario"] == "DIBUJO") {
                      archivo = atob(archivo["valor"]);

                      this.imagenes.push({
                        campoId: campo["id"], "json": {
                          'valor': archivo
                        }
                      });
                      //Si el campo es imagen, ya viene decodificada.                    
                    } else if (campo["tipo_campo_formulario"] == "IMAGEN") {

                      archivo = archivo["valor"];

                      this.imagenes.push({
                        campoId: campo["id"], "json": {
                          'valor': archivo
                        }
                      });
                    }

                  }

                  //Se arma el JSON.
                  let json: string = JSON.stringify({
                    "requerido": campo["requerido"],
                    "tipo_campo_formulario": campo["tipo_campo_formulario"],
                    "etiqueta": campo["etiqueta"],
                    "indicio": campo["indicio"],
                    "id": campo["id"],
                    "valor": valor,
                    'campo_formulario_id': campo["campo_formulario_id"],
                    'archivo': archivo
                  });

                  //Se agrega el campo al arreglo.
                  camposUnicos.push(JSON.parse(json));
                }

                etiqueta = campo["etiqueta"];
              });

              //Se almacenan los campos únicos.
              this.campos = camposUnicos;

              //Se empiezan a crear los campos del formulario.
              this.campos.forEach((campo: JSON) => {

                //Se crea el control dinámico.
                let control: FormControl;
                //Se crean las validaciones que tendrá cada campo.
                let validaciones: Array<any> = new Array();

                //Si el campo es requerido.
                campo["requerido"] == "1" ? validaciones.push(Validators.required) : null;
                campo["tipo_campo_formulario"] == "ENTERO" ? validaciones.push(this.utilidadesService.numberValidator) : null;
                campo["tipo_campo_formulario"] == "DECIMAL" ? validaciones.push(this.utilidadesService.decimalValidator) : null;

                //Si el campo no es un dibujo.
                if (campo["tipo_campo_formulario"] != "DIBUJO") {
                  //Si el campo es una imagen, se le asigna el valor default a cadena vacía para evitar un error.
                  if (campo["tipo_campo_formulario"] == "IMAGEN") {
                    
                    control = new FormControl("", validaciones);                                   

                  }
                  //Si el campo es texto o número.
                  else {                    
                    control = new FormControl(campo["valor"], validaciones);

                  }
                  //Se agrega el campo control al formulario.
                  this.formulario.addControl('control' + campo["id"], control);

                }
              });

              //Se obtienen los campos HTML creados dinámicamente.
              this.subscripcionCamposDinamicos = this.campoHTML.changes.subscribe(() => {

                //Indica que los campos  ya se cargaron junto con su información inicial.
                this.verificarCampos = true;
                this.cargaInicialLista$.next(this.verificarCampos);

                this.campoHTML.forEach((campoHTML: ElementRef) => {

                  let campoId: string = "";
                  //Si el control de formulario es nativo HTML y no es un componente.
                  if (campoHTML.nativeElement) {

                    campoId = campoHTML.nativeElement["id"];

                    //Se obtiene solo el identificador del campo.              
                    campoId = campoId.replace("campoHTML", "");

                    //Se obtiene el identificador del campo (no del detalle del campo).
                    let campoFormularioId = campos.filter(function (item) {
                      return item["id"] === campoId;
                    })[0]["campo_formulario_id"];

                    /*Se obtienen los elementos que tienen cada campo.
                    (Solo los selects o listas tendrán mas de 1 elemento.*/
                    let elementosPorCampo: any[] = campos.filter(function (item) {
                      return item["campo_formulario_id"] === campoFormularioId;
                    });

                    //Si hay más de un elemento o es un Select o lista.
                    if (elementosPorCampo.length > 1 || (campoHTML.nativeElement && campoHTML.nativeElement["type"].includes("select"))) {
                      //Si el elemento del formulario tiene un valor por default, se almacena.
                      let valorDefault: string;
                      //Se agregan a la lista los elementos.
                      elementosPorCampo.forEach(elemento => {
                        let opcion: HTMLOptionElement = new Option(elemento["valor"], elemento["id"]);
                        campoHTML.nativeElement.add(opcion);
                        elemento["valor_default"] == "1" ? valorDefault = elemento["id"] : null;
                      });
                      //Si no hay información en el diagnóstico y si el valor default no es nulo, se le asigna el valor al campo.
                      infoDiagnostico.length == 0 && valorDefault ? this.formulario.controls["control" + campoId].setValue(valorDefault) : null;
                    }

                    //Si el campo es numérico, se divide en entero y decimal.
                    switch (campos.filter(function (item) {
                      return item["id"] === campoId;
                    })[0]["tipo_campo_formulario"]) {
                      //Si el campo es numérico.
                      case 'ENTERO': {
                        this.utilidadesService.inputNumerico(campoHTML, false, this.formulario.controls["control" + campoId]);
                        break;
                      }
                      //Si el campo es decimal.
                      case 'DECIMAL': {
                        this.utilidadesService.inputNumerico(campoHTML, true, this.formulario.controls["control" + campoId]);
                        break;
                      }
                      /*case 'IMAGEN': {
                        console.log(campoHTML);
                        for (let i = 0; i < this.imagenes.length; i++) {
                          if (this.imagenes[i]["campoId"] == campoId) {
                    
                            //campoHTML.nativeElement["onchange"] = this.seleccionarImagen(null, this.formulario.controls["control" + campoId], this.imagenes[i]["json"]["valor"]);
                       
                            break;
                          }
                        }
                         
                      }     */               
                    }
                  }
                });
              });

            }
          });
        }
      });

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: seleccionarImagen.                                           |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para campos de tipo imágen.                      |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 02/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  seleccionarImagen(event) {

    //Si ha sido seleccionada una imagen.
    if (event && event.target.files && event.target.files[0]) {

      //Variable que almacena la ruta del archivo.
      let archivo: File = event.target.files[0];
      //Variable que almacena la extensión o tipo del archivo.
      let tipoArchivo: string = archivo["type"];

      //Si el archivo no es una imagen.
      if (!tipoArchivo.toUpperCase().includes("IMAGE")) {

        this.utilidadesService.alerta("Imágen inválida", "El archivo que seleccionó No es una imagen.");

      }
      //Si sí es una imagen.
      else {

        //Se lee el archivo obtenido.
        var reader = new FileReader();
        reader.readAsDataURL(archivo);

        //Si el tamaño del archivo es muy grande. Se usan bytes.
        if (archivo.size > 16000000) {
          this.utilidadesService.alerta("Imagen inválida", "El tamaño de la imagen debe ser menor a 16 megas.");
        }
        else {

          //Obtiene el campo de la imagen.
          let campoId: string = event.target["id"].replace("campoHTML", "");
          //Se elimina la imagen del arreglo para ser substituida por la nueva.
          this.limpiarImagen(campoId, false);

          //Inica la espera de subida de la imagen.
          this.esperarService.esperar();
          //Cuando la imagen ya se subió temporalmente.
          reader.onload = (event) => {
            //Se termina la espera.
            this.esperarService.noEsperar();
            //Arma el JSON de la información de la imageny la almacena en el arreglo de imágenes.
            this.imagenes.push({
              campoId: campoId, "json": {
                //decodifica la imagen para que todos los carácteres se almacenen.
                valor: btoa(event.target["result"])
              }
            });

          }

        }

      }

    }

  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: limpiarImagen.                                               |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para resetear o limpiar la imagen del campo.     |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campoId  = identificador del campo,           |
  |  limpiarTexto = Si se requiere limpiar el texto de la imagen.         |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  limpiarImagen(campoId, limpiarTexto: boolean = true) {

    //Se resetea o limpia el texto etiqueta que viene enseguida de la imagen.
    if (limpiarTexto) {

      //Se obtiene el campo HTML con el identificador obtenido como parámetro.
      let campoHTML = this.campoHTML.find(campoHTML =>
        campoHTML.nativeElement && campoHTML.nativeElement["id"] === "campoHTML" + campoId).nativeElement;

      //Si el campo es válido o es un elemento nativo HTML, se limpia la etiqueta de la imagen.
      if (campoHTML) {
        campoHTML.value = "";
      }
    }

    //Se busca la imagen para eliminarla del arreglo.
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i].campoId == campoId) {
        this.imagenes.splice(i, 1);
        break;
      }
    }

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: verImagen.                                                   |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para ver o desplegar la imagen en un modal.      |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campoId  = identificador del campo,           |
  |  codificar = parámetro para saber si se codificará la imagen o no.    |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  verImagen(campoId, codificar: boolean) {

    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i].campoId == campoId) {
        codificar ? this.utilidadesService.desplegarImagen(atob(this.imagenes[i].json.valor)) : this.utilidadesService.desplegarImagen(this.imagenes[i].json.valor);
        break;
      }
    }

  }



  /*----------------------------------------------------------------------|
  |  NOMBRE: desplegarAreaDibujo.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para desplegar la herramienta de dibujo.         |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campoId  = identificador del campo,           |
  |  imagen = imagen de fondo.                                            |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  desplegarAreaDibujo(campoId: string, imagen: string) {

    //Se abre la imagen con el último cambio realizado.
    //Si no se encuentra, se abre la de default, en caso de que tenga.
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i].campoId == campoId) {
        imagen = this.imagenes[i].json.valor;
        break;
      }
    }

    this.utilidadesService.desplegarAreaDibujo(imagen).subscribe((imagen: string) => {

      //Si se hizo un dibujo.
      if (imagen.length > 0) {

        //Si ya se había creado un dibujo anteriormente, se elimina para que el nuevo lo reemplace.      
        this.limpiarImagen(campoId, false);

        //Arma el JSON de la información de la imagen y la almacena en el arreglo de imágenes.
        this.imagenes.push({
          campoId: campoId, "json": {
            valor: imagen
          }
        });

      }

    });


  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: guardar.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar guardar los cambios de la consulta.     | 
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/11/2018.                                                   |    
  |----------------------------------------------------------------------*/
  guardar() {

    //Se pulsa el botón  de dar de guardar cambios.
    this.pulsarCrear = true;

    //Indica si el formulario está correcto.
    let formularioValido: boolean = true;

    /*Si los elementos del formulario dinámicos requeridos no están llenos, 
    se hace un focus para que se ingrese texto.*/
    if (this.formulario.invalid) {
      return;
    }

    /*Se recorren los campos obtenidos de la BD
    para verificar que los datos introducidos sean válidos.*/
    this.campos.forEach(campo => {

      switch (campo["tipo_campo_formulario"]) {
        case "FECHA": {
          //Se obtiene el valor escrito en el campo de fecha.
          let fecha = new Date(this.formulario.controls["control" + campo["id"]].value);
          //Si no es una fecha válida.
          if (!fecha.getDate()) {
            this.utilidadesService.alerta("Fecha inválida", "Introduzca una fecha válida.").subscribe(() => {
              //Se hace focus en el campo.
              this.campoHTML.find(campoHTML => campoHTML.nativeElement["id"] === "campoHTML" + campo["id"]).nativeElement.focus();
            });
          }
          break;
        }
        case "HORA": {
          //Se obtiene el valor escrito en el campo de hora.
          let hora = new Date('01/01/1910 ' + this.formulario.controls["control" + campo["id"]].value);
          //Si no es una hora válida.;
          if (!hora.getTime()) {
            this.utilidadesService.alerta("Hora inválida", "Introduzca una hora válida.").subscribe(() => {
              //Se hace focus en el campo.
              this.campoHTML.find(campoHTML => campoHTML.nativeElement["id"] === "campoHTML" + campo["id"]).nativeElement.focus();
            });
          }
          break;
        }
        case "DIBUJO": {
          if (campo["requerido"] == "1" &&
            !this.utilidadesService.existeElementoArreglo('campoId', campo["id"], this.imagenes)) {
            formularioValido = false;
          }
          break;
        }

      }

    });

    //Si el formulario es correcto.
    if (formularioValido) {

      //Se abre el modal de espera.
      this.esperarService.esperar();

      //Variable que almacenará los campos a guardar.
      let camposInfo: any[] = new Array();

      /*Se recorren los campos obtenidos de la BD
      para obtener los valores introducidos en los campos del formulario.*/
      for (let iteracion: number = 0; iteracion < this.campos.length; iteracion++) {

        let campo = this.campos[iteracion];

        //Almacena lo escrito en el campo.
        let valor: string = "";
        //Para los campos de tipo archivo.
        let archivo: string = "";
        //Si el campo es un archivo o imagen.
        if (campo["tipo_campo_formulario"] == "IMAGEN") {

          //Se obtiene el archivo.
          archivo = this.formulario.controls["control" + campo["id"]].value;
          //Si el archivo es nulo, se le establece una cadena vacía.
          archivo = archivo == null ? "" : archivo;
          //Si el archivo no es nulo o vacío.
          if (archivo.length > 0) {
            for (let i = 0; i < this.imagenes.length; i++) {
              if (this.imagenes[i]["campoId"] == campo["id"]) {
                archivo = JSON.stringify(this.imagenes[i]["json"]);
                break;
              }
            }
          }
          else {
            archivo = "";
          }
          //No puede tener archivo y valor juntos, o es uno u otro.              
          valor = "";
        }
        //Si el campo es un dibujo.
        else if (campo["tipo_campo_formulario"] == "DIBUJO") {
          for (let i = 0; i < this.imagenes.length; i++) {
            if (this.imagenes[i]["campoId"] == campo["id"]) {
              archivo = JSON.stringify({
                valor: btoa(this.imagenes[i]["json"]["valor"])
              });
              break;
            }
          }
        }
        else {
          archivo = "";
          valor = this.formulario.controls["control" + campo["id"]].value;
          valor === null ? valor = "" : null;
        }


        //Se agregan al arreglo los campos que se van a insertar en el detalle de consulta.
        camposInfo.push({ "diagnosticoId": this.diagnosticoId, "campoId": campo["id"], "valor": valor, "archivo": archivo });
      }

      //Se recoren los campos a insertar recursivamente.
      this.altaDetDiagnostico(camposInfo, 0);
    }
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: altaDetDiagnostico.                                          |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para dar de alta los campos del diagnóstico.     |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campos = campos que se insertarán,            |
  |  iteracion = iteración o registro que sigue para insertar.            |   
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 007/12/2018.                                                   |    
  |----------------------------------------------------------------------*/
  altaDetDiagnostico(campos: any[], iteracion: number) {

    //Se almacenan los campos que se insertarán en el detalle.
    let diagnosticoId: string = campos[iteracion].diagnosticoId;
    let campoId: string = campos[iteracion].campoId;
    let valor: string = campos[iteracion].valor;
    let archivo: string = campos[iteracion].archivo;

    //Se intenta dar de alta el detalle del diagnóstico.
    this.consultasService.altaDetDiagnostico(diagnosticoId, campoId, valor, archivo)
      .subscribe(respuesta => {

        //Si hubo un error en la obtención de información.
        if (respuesta["estado"] === "ERROR") {
          this.esperarService.noEsperar();
          this.utilidadesService.alerta("Error", respuesta["mensaje"]).subscribe(() => {
            //Se retorna a la lista de diagnósticos.
            this.regresar();
            return;
          });
        }
        //Si la inserción fue correcta.
        else {
          //Si no es el último registro.
          if (iteracion < campos.length - 1) {
            this.altaDetDiagnostico(campos, iteracion + 1);
          }
          //Si ya es el último registro, se despliega alerta de éxito.
          else {
            this.esperarService.noEsperar();
            this.utilidadesService.alerta("Información guardada", "La información del diagnóstico se guardó satisfactoriamente.").subscribe(() => {
              //Se retorna a la lista de diagnósticos.
              this.regresar();
            });
          }
        }
      });
  }

}



