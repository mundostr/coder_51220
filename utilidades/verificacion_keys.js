/*

Alternativas de verificación de claves (keys) en objeto incluyendo no nulo

*/

const datos = { apellido: 'Carlos', nombre: 'Perren', edad: 0 };
const requeridos = [ 'apellido', 'nombre', 'edad' ];

const verificarRequeridosManual = (obj, obligatorios) => {
    let todoOk = true;
    obligatorios.forEach(campo => {
        if (obj[campo] === undefined || obj[campo] === null) { todoOk = false; }
    })

    return todoOk;
}

const verificarRequeridosEvery = (obj, obligatorios) => {
    // El método every recorre el array y retorna true, SI Y SOLO SI
    // todos los elementos pasan la condición especificada.
    return obligatorios.every(campo => Object.prototype.hasOwnProperty.call(obj, campo) && obj[campo] !== null )
}

console.log(verificarRequeridosEvery(datos, requeridos));
// console.log(verificarRequeridosManual(datos, requeridos));
