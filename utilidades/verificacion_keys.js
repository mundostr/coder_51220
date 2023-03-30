/*

Alternativas de verificación de claves (keys) en objeto incluyendo no nulo

*/

const datos = { apellido: 'Perren', nombre: 'Carlos', edad: 48 };
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

const VerificarRequeridosEveryIncludes = (obj, obligatorios) => {
    // Obtenemos los distintos keys el objeto y aprovechamos every
    // para verificar que todos los obligatorios estén incluídos
    const keys = Object.keys(obj);
    return obligatorios.every(val => keys.includes(val));
}

// console.log(verificarRequeridosManual(datos, requeridos));
// console.log(verificarRequeridosEvery(datos, requeridos));
console.log(VerificarRequeridosEveryIncludes(datos, requeridos));
