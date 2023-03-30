/*
Generador de números aleatorios (al azar)
*/

const CTD_NUMEROS = 10;
const RANGO_MIN = 1;
const RANGO_MAX = 20;

const listadoNumeros = [];
for (let i = 0; i < CTD_NUMEROS; i++) {
    listadoNumeros.push(Math.floor(Math.random() * RANGO_MAX) + RANGO_MIN);
}

const listadoSalidas = {};
listadoNumeros.forEach((numero) => {
    if (listadoSalidas[numero]) {
        listadoSalidas[numero]++; // listadoSalidas[numero] = listadoSalidas[numero] + 1
    } else {
        listadoSalidas[numero] = 1;
    }
});

console.log(listadoNumeros);
console.log(listadoSalidas);

// { 18: 1, 7: 1, 10: 1, 12: 1, 8: 1, 13: 2, 4: 2, 16: 1 }