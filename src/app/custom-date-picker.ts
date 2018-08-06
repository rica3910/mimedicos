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

import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    //Se establece el idioma español en las fechas.
    'sp': {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    }
};

@Injectable()
//Se exporta la clase para su uso externo.
export class I18n {
    language = 'sp';
}

@Injectable()
export class CustomDatePicker extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}

@Injectable()
export class FormatDatePicker extends NgbDateParserFormatter {
    constructor() {
        super();
    }

    parse(value: string) {
        return { year: 1, month: 1, day: 1 }
    }

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
    format(date: NgbDateStruct): string {

        //Se obtiene el día.
        let dia: string = date.day.toString();
        //Si el día es de un dígito se le agrega un cero a la izquierda.
        dia = dia.length == 1 ? dia = "0" + dia : dia;
        //Se obtiene el mes.
        let mes: string = date.month.toString();
        //Si el mes es de un dígito se le agrega un cero a la izquierda.
        mes = mes.length == 1 ? mes = "0" + mes : mes;

        //Se retorna la fecha formateada.
        return `${dia}/${mes}/${date.year}`;
    }
}
