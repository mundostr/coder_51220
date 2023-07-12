/**
 * Generación de login mediante TDD
 * Este es un segundo ejemplo manual
 * 
 * Qué debe retornar:
 * T1: No se ha proporcionado un password si se recibe clave vacía
 * T2: No se ha proporcionado un usuario si se recibe user vacío
 * T3: Contraseña incorrecta si no coincide el password
 * T4: Credenciales incorrectas si no coincide el user
 * T5: Logueado si coinciden user y password
 * 
 * Más sobre TDD:
 * https://www.freecodecamp.org/news/test-driven-development-tutorial-how-to-test-javascript-and-reactjs-app/
 */

const login = (user, pass) => {
    if (pass == null || pass === '') return 'No se ha proporcionado contraseña'
    if (user == null || user === '') return 'No se ha proporcionado usuario'
    if (pass !== '123') return 'Contraseña incorrecta'
    if (user !== 'coderUser') return 'Credenciales incorrectas'
    return 'Logueado'
}

let test
let passedTests = 0

console.log('T1: No se ha proporcionado contraseña si pass está vacío.')
if (login('cperren') === 'No se ha proporcionado contraseña') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T2: No se ha proporcionado usuario si user está vacío.')
if (login('', 'abc123') === 'No se ha proporcionado usuario') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T3: Contraseña incorrecta si pass es incorrecto.')
if (login('coderUser', 'abc123') === 'Contraseña incorrecta') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T4: Credenciales incorrectas si user es incorrecto.')
if (login('cperren', '123') === 'Credenciales incorrectas') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T5: Logueado si user y pass coinciden.')
if (login('coderUser', '123') === 'Logueado') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log(`Tests superados: ${passedTests} de 5`)