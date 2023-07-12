/**
 * Primer ejemplo de desarrollo de funcionalidad por TDD
 * TDD = Test Driven Development (Desarrollo basado en pruebas)
 * En este primer ejemplo, plantearemos MANUALMENTE las pruebas
 * 
 * Paso 1: Enunciamos las pruebas que debe superar nuestra función suma(), comenzando con una función declarada vacía:
 * Qué debe devolver:
 * T1: 0 si no recibe parámetros
 * T2: null si algún parámetro no es numérico
 * T3: La suma de los parámetros
 * T4: La suma de cualquier cantidad de parámetros
 * 
 * Por supuesto en esta etapa, TODAS las pruebas deben FALLAR.
 * 
 * Paso 2: Vamos implementando la función por etapas hasta lograr que TODAS las pruebas PASEN.
 * 
 * Paso 3: Refactorizamos, es decir, intentamos optimizar el código de la función, pero por supuesto
 * TODAS las pruebas deben seguir PASANDO.
 * 
 * Repetimos la secuencia hasta que estemos conformes con la implementación de la función.
 * 
 * Más sobre TDD:
 * https://www.freecodecamp.org/news/test-driven-development-tutorial-how-to-test-javascript-and-reactjs-app/
 */

const sumar = (...params) => {
    if (params.length === 0) return 0
    
    // Estas dos líneas surgen de una refactorización y reemplazan al código comentado debajo
    // permitiendo una función más compacta que sigue superando todos los tests planteados.
    if (!params.every(num => typeof(num) === 'number')) return null
    return params.reduce((accum, current) => accum + current, 0)
    
    // for (let i = 0; i < params.length; i++) { if (typeof(params[i]) !== 'number') return null }
    
    /* let suma = 0;
    for (let i = 0; i < params.length; i++) {
        suma += params[i]
    }
    return suma */
}

let test
let passedTests = 0

test = sumar(2, 3)
console.log('T1: La suma de los parámetros')
if (test === 5) {
    passedTests++
    console.log('Superado')
} else {
    console.log('Fallido')
}

test = sumar('2', 3)
console.log('T2: null si algún parámetro no es numérico')
if (test === null) {
    passedTests++
    console.log('Superado')
} else {
    console.log('Fallido')
}

test = sumar()
console.log('T3: 0 si no recibe parámetros')
if (test === 0) {
    passedTests++
    console.log('Superado')
} else {
    console.log('Fallido')
}

test = sumar(1, 2, 3, 4, 5)
console.log('T4: La suma de cualquier cantidad de parámetros')
if (test === 15) {
    passedTests++
    console.log('Superado')
} else {
    console.log('Fallido')
}

console.log(`Tests superados: ${passedTests} de 4`)