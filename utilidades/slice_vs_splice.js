/*
Comparativa de los métodos slice() y splice() que muchas veces pueden confundirse.
*/

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


// Slice NO modifica la matriz original, crea una copia total o parcial
console.log(meses);
const primerTrimestre = meses.slice(0, 3);
console.log(primerTrimestre);

// Splice SI modifica la matriz original
console.log(meses);
const quitarFebrero = meses.splice(1, 1); // Quita 1 elemento a partir del subíndice 1 (Febrero)
console.log(quitarFebrero); // retorna el/los elementos involucrados
console.log(meses); // La matriz original ya no tiene Febrero
