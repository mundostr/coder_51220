import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// El operador spread (...) nos sirve en este caso para pasar una cantidad variable de argumentos,
// Esta función recibirá números (1, 10, -3, 15, 16, 100, etc)
const listNumbers = (...numbers) => {
    numbers.forEach((number) => {
        // Si alguno no es un número, detenemos el proceso del script con un error -4.
        if (isNaN(number)) {
            console.log('Invalid parameters');
            process.exit(-4);
        } else {
            console.log(number);
        }
    });
};

// Esta función suma todos los números del 0 a 1 millón.
// Lógicamente el proceso toma tiempo y es para demostrar el bloqueo temporal del resto de solicitudes
// mientras se realiza este cálculo
const largeProcess = () => {
    let result = 0;
        
    for (let i = 0; i < 5e9; i++) { // 1 millón
        result += i;
    }
    
    return result;
};

export { __filename, __dirname, listNumbers, largeProcess };