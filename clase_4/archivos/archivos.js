/*
Ejemplo de utilización de módulo fs con callbacks
*/

const fs = require('fs');

const ARCHIVO = './contenido.txt';
const DATE = new Date();
const FECHA_Y_HORA = DATE.toLocaleString();

// const resultado = fs.readFileSync(ARCHIVO, 'utf-8');
// console.log(resultado);

fs.writeFile(ARCHIVO, FECHA_Y_HORA, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Archivo actualizado');

        fs.readFile(ARCHIVO, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
})
