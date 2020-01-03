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

import { Injectable, ElementRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FormControl, FormControlName, AbstractControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from "rxjs/operators";
import { NgbDateStruct, NgbTimeStruct, NgbModalOptions, NgbModal, NgbModalRef } from '../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DesplegarImagenComponent } from './desplegar-imagen/desplegar-imagen.component';
import { DialogoAlertaComponent } from './dialogo-alerta/dialogo-alerta.component';
import { DibujoComponent } from './dibujo/dibujo.component';
import { EventEmitter } from 'events';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarMedicamentoComponent } from './consultas/agregar-medicamento/agregar-medicamento.component';

@Injectable()
export class UtilidadesService {

  /*----------------------------------------------------------------------|
  |  NOMBRE: constructor.                                                 |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método constructor del componente.                      |          
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA:                                               |
  |  modalService = contiene los métodos para manipular modals,           |                            
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  constructor(private modalService: NgbModal) { }

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
  filtrarDatos(busqueda: string, datos: JSON[]): Observable<JSON[]> {

    //Se le quitan los espacios en blanco y acentos a la búsqueda y se convierte a mayúsculas.
    busqueda = this.quitarAcentos(busqueda.trim().toUpperCase());    

    //Es el arreglo que se retornará filtrado.
    let datosFiltrados: JSON[] = new Array();

    //Si la búsqueda no es vacía.
    if (busqueda.length > 0) {

      //Se recorren los registros del arreglo original de información.
      datos.forEach((json: JSON) => {

        //Variable que concatenará los valores del JSON.
        let registroCompleto: string = "";        

        //Se recorre el JSON, que equivale al registro actual de la iteración.
        for (let campo in json) {          
          //Se concatena el JSON.
          registroCompleto = registroCompleto + (json[campo] || "") + " ";
        }

        //Variable para indicar que la palabra a buscar se encuentra en el JSON.
        let existePalabra: boolean = true;
        //Variable para dividir la búsqueda en palabras divididas por espacio en blanco.
        let palabrasBusqueda = busqueda.split(" ");

        //Se recorren las palabras encontradas.
        palabrasBusqueda.forEach((palabra: string) => {
                    
          //Si todas las palabras se encuentran en el JSON, sigue el flujo.
          if (existePalabra) {
            
            //Si la palabra no es un espacio en blanco.
            if (palabra.trim().length > 0) {                            
              //Se le quitan los acentos al registro y se convierte a mayúscula.
              //Y si la búsqueda está en el JSON.            
              if (this.quitarAcentos(registroCompleto.toUpperCase()).includes(palabra)) {
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
    //Sí la búsqueda está vacía o el cuadro de texto está vacío.
    else {
      //Se retorna el arreglo original.
      datosFiltrados = datos;
    }

    //Se retornan los resultados o coincidencias obtenidos.   
    return of(datosFiltrados);

  }

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
  public quitarAcentos(cadena: string): string {    
    let charmap = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
    let pattern = /[^\w]/g;    
    
    return cadena.replace(pattern, x => charmap[x] || x);    
  }


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
  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && !control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\|\$%\^&\*])(?=.{6,40})/)) {
      return { invalidPassword: true };
    }
  }

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
  numberValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && !control.value.match(/^[0-9]+$/g)) {
      return { invalidNumber: true };
    }
  }

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
  decimalValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && !control.value.match(/^-?[0-9]+(\.[0-9]*){0,1}$/g)) {
      return { invalidNumber: true };
    }
  }

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
  inputNumerico(input: ElementRef, decimal: boolean = false, control: AbstractControl) {

    //Expresión regular.
    let regExp: RegExp;

    //Si es decimal se usa una expresión regular y si es entero se usa otra.
    decimal ? regExp = /^-?[0-9]+(\.[0-9]*){0,1}$/g : regExp = /^[0-9]+$/g;

    //Evento de tecleado.
    fromEvent(input.nativeElement, 'keyup')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {

        //Se divide la palabra escrita en carácteres.
        let caracteres: string[] = cadena.split("");
        /*Se utiliza para ir concatenando lo escrito en el caja de texto
        e ir analizando carácter por carácter.
        */
        let cadenaFormada: string = "";

        caracteres.forEach(caracter => {
          //Se va formando la cadena final.
          cadenaFormada = cadenaFormada + caracter;
          //Si no se escriben números, se remueven.
          if (!cadenaFormada.match(regExp)) { 
            cadenaFormada = cadenaFormada.substring(0, cadenaFormada.length - 1);
          }
        });
        //Se retorna la cadena formateada.
        input.nativeElement.value = cadenaFormada;
        if(control){
          control.setValue(cadenaFormada);
        }        
      });

    //Evento de cuando se pega con el mouse algun texto en la caja de texto.
    fromEvent(input.nativeElement, 'paste')
      //Extrae el texto del cuadro de texto.
      .pipe(map((e: any) => e.target.value))
      .pipe(debounceTime(50))
      //Se subscribe al evento.
      .subscribe((cadena: string) => {
        //Genera un evento de teclazo para que validar que sea número la cadena pegada.
        input.nativeElement.dispatchEvent(new Event('keyup'));
      });
  }

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
  limpiarCampoTexto(campo: HTMLInputElement, focus: boolean = true) {

    //Si el campo tiene algo escrito se limpiará.
    if (campo.value.length > 0) {
      //limpia el cuadro de texto.
      campo.value = "";
    }
    //Le da un focus al elemento de búsqueda.
    focus ? campo.focus() : null;
  }

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
  formatearFecha(date: NgbDateStruct, diagonales: boolean = true): string {

    //Si la fecha existe.
    if (date) {
      //Se obtiene el día.
      let dia: string = date.day.toString();
      //Si el día es de un dígito se le agrega un cero a la izquierda.
      dia = dia.length == 1 ? dia = "0" + dia : dia;
      //Se obtiene el mes.
      let mes: string = date.month.toString();
      //Si el mes es de un dígito se le agrega un cero a la izquierda.
      mes = mes.length == 1 ? mes = "0" + mes : mes;

      //Se retorna la fecha formateada.
      return diagonales ? `${dia}/${mes}/${date.year}` : `${dia}${mes}${date.year}`;
    }

    //Si la fecha es vacía o nula.
    return null;
  }

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
  formatearFechaHora(date: NgbDateStruct, time: NgbTimeStruct, diagonales: boolean = true): string {

    let fecha: string;
    //Si la fecha existe.
    if (date) {
      //Se obtiene el día.
      let dia: string = date.day.toString();
      //Si el día es de un dígito se le agrega un cero a la izquierda.
      dia = dia.length == 1 ? dia = "0" + dia : dia;
      //Se obtiene el mes.
      let mes: string = date.month.toString();
      //Si el mes es de un dígito se le agrega un cero a la izquierda.
      mes = mes.length == 1 ? mes = "0" + mes : mes;

      //Se arma la fecha formateada.
      fecha = diagonales ? `${dia}/${mes}/${date.year}` : `${dia}${mes}${date.year}`;
    }

    //Si el tiempo existe.
    if (time) {
      //Se obtiene la hora.
      let hora: string = time.hour.toString();
      //Si la hora es de un dígito se le agrega un cero a la izquierda.
      hora = hora.length == 1 ? hora = "0" + hora : hora;
      //Se obtienen los minutos.
      let minutos: string = time.minute.toString();
      //Si los minutos son de un dígito se le agrega un cero a la izquierda.
      minutos = minutos.length == 1 ? minutos = "0" + minutos : minutos;

      //Se arma la fecha junto con la hora formateada.
      return diagonales ? `${fecha} ${hora}:${minutos}` : `${fecha}${hora}${minutos}`;
    }

    //Si la fecha y/o hora es vacía o nula.
    return null;
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: desplegarImagen.                                             |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal y despliega la imagen deseada.            | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: imagen  = imagen que se desplegará.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/08/2018.                                                   |    
  |----------------------------------------------------------------------*/

  desplegarImagen(imagen: string) {

    //Arreglo de opciones para personalizar el modal.    
    const modalOption: NgbModalOptions = {
      centered: true,
      size: "lg",
    };

    //Abre el modal.    
    let modalRef = this.modalService.open(DesplegarImagenComponent, modalOption);
    //Define el título del modal.    
    modalRef.componentInstance.imagen = imagen;

  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: desplegarAreaDibujo.                                         |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal y despliega la herramienta para dibujar.   | 
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: imagen  = imagen que se desplegará.           |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 08/09/2018.                                                   |    
  |----------------------------------------------------------------------*/

  desplegarAreaDibujo(imagen: string): Observable<any> {

    //Se utiliza para saber cuando se cierra el modal.
    let subject: Subject<string> = new Subject<string>();

    //Arreglo de opciones para personalizar el modal.    
    const modalOption: NgbModalOptions = {
      centered: true,
      size: "lg",
      windowClass: "dark-modal",
      backdrop: false,
      keyboard: false
    };

    //Abre el modal.
    let modalRef = this.modalService.open(DibujoComponent, modalOption);
    //Define la imagen de fondo.    
    modalRef.componentInstance.imagen = imagen;

    //Si se cierra el modal.
    modalRef.result.then((imagen: string) => {    
      subject.next(imagen);
    });

    //Se retorna el observable.
    return subject.asObservable();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: existeElementoArreglo.                                       |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Método para averiguar si un elemento existe en el       |
  |  arreglo de elementos.                                                |   
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: campo = campo del arreglo en donde se buscará,| 
  |  valor = valor que se buscará,                                        |
  |  arreglo = arreglo donde se buscará el elemento.                      |  
  |-----------------------------------------------------------------------|  
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 13/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  existeElementoArreglo(campo: string, valor: any, arreglo: Array<any>): boolean {
    return arreglo.find(item => item[campo] === valor);
  }


  /*----------------------------------------------------------------------|
  |  NOMBRE: alerta.                                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal cuando con una notificación o mensaje.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 03/08/2018.                                                   |    
  |----------------------------------------------------------------------*/
  alerta(titulo: string, mensaje: string): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};

    //No se cierra cuando se pulsa esc.
    modalOption.keyboard = false;
    //No se cierra cuando pulsamos fuera del cuadro de diálogo.
    modalOption.backdrop = 'static';
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoAlertaComponent, modalOption);
    //Define el título del modal.
    modalRef.componentInstance.titulo = titulo;
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    //Se retorna el botón pulsado.
    modalRef.result.then(() => {
      //Se retorna un nulo, ya que no se espera un resultado.         
      subject.next(null);
    });

    //Se retorna el observable.
    return subject.asObservable();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: confirmacion.                                                |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal cuando con un mensaje de confirmación.    |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: mensaje  = mensaje que contendrá la alerta.   |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 26/09/2018.                                                   |    
  |----------------------------------------------------------------------*/
  confirmacion(titulo: string, mensaje: string): Observable<string> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<string> = new Subject<null>();

    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};

    //No se cierra cuando se pulsa esc.
    modalOption.keyboard = false;
    //No se cierra cuando pulsamos fuera del cuadro de diálogo.
    modalOption.backdrop = 'static';
    //Modal centrado.
    modalOption.centered = true;
    //Abre el modal de tamaño chico.
    const modalRef = this.modalService.open(DialogoConfirmacionComponent, modalOption);
    //Define el título del modal.
    modalRef.componentInstance.titulo = titulo;
    //Define el mensaje del modal.
    modalRef.componentInstance.mensaje = mensaje;
    //Define la etiqueta del botón de Aceptar.
    modalRef.componentInstance.etiquetaBotonAceptar = "Aceptar";
    //Define la etiqueta del botón de Cancelar.
    modalRef.componentInstance.etiquetaBotonCancelar = "Cancelar";
    //Se retorna el botón pulsado.
    modalRef.result.then((resultado) => {
      //Se retorna un nulo, ya que no se espera un resultado.         
      subject.next(resultado);
    });

    //Se retorna el observable.
    return subject.asObservable();
  }

  /*----------------------------------------------------------------------|
  |  NOMBRE: agregarMedicamentoModal.                                     |
  |-----------------------------------------------------------------------|
  |  DESCRIPCIÓN: Abre el modal para añadir un medicamento a la receta.   |
  |-----------------------------------------------------------------------|
  |  PARÁMETROS DE ENTRADA: clase  = clase u objeto que se abrirá,        |
  |  medicamento = medicamento a editar en caso de ser necesario.         |
  |-----------------------------------------------------------------------|
  |  AUTOR: Ricardo Luna.                                                 |
  |-----------------------------------------------------------------------|
  |  FECHA: 18/09/2019.                                                   |    
  |----------------------------------------------------------------------*/
  agregarMedicamento(componente, medicamento ?): Observable<any> {

    //Se utiliza para esperar a que se pulse el botón aceptar.
    let subject: Subject<any> = new Subject<null>();
    
    //Arreglo de opciones para personalizar el modal.
    let modalOption: NgbModalOptions = {};
    //Modal centrado.
    modalOption.centered = true;    
    //Abre el modal de tamaño extra grande.
    modalOption.size = 'xl' as 'lg';    
    
    const modalRef = this.modalService.open(componente, modalOption);
     //Define el título del modal.
     modalRef.componentInstance.medicamentoEdicion = medicamento;  

    //Se retorna el botón pulsado.
    modalRef.result.then((medicamento) => {         
      //Se retorna el medicamento seleccionado.
      medicamento ? subject.next(medicamento) : subject.next(null);            
    },
    (reason) => {
      subject.next(null)
    });
    
    //Se retorna el observable.
    return subject.asObservable();
  }  


}

//Constante que se utilizará para inyectar el servicio.
export const UTILIDADES_PROVIDERS: Array<any> = [
  { provide: UtilidadesService, useClass: UtilidadesService }
];

