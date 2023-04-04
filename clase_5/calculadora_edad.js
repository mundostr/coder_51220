/*
Calculadora de edad utilizando módulo moment

Proyecto nuevo: npm init -y
Instalación módulo moment: npm install moment --save
*/

const moment = require('moment');

const NACIMIENTO = '2022-04-04';

// isValid retorna true o false, verifica si el formato del string de fecha utilizado es válido
const fechaValida = moment(NACIMIENTO, true).isValid();

if (fechaValida) {
    const fechaNacimiento = moment(NACIMIENTO); // objeto de fecha moment utilizando el string de nacimiento
    const fechaActual = moment(); // objeto de fecha moment sin argumentos, asigna la fecha actual
    const diasTranscurridos = fechaActual.diff(fechaNacimiento, 'days');
    
    console.log(`Han pasado ${diasTranscurridos} días desde tu nacimiento`);
} else {
    console.log('La fecha de nacimiento ingresada no es válida');
}
