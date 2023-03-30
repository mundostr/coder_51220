/*
Borrado de un item específico en array simple o de objetos

Recordar que por defecto en JS, los arrays son pasados POR REFERENCIA,
esto quiere decir que al actuar sobre el array dentro de una función por ejemplo,
estamos modificando el original.

Si querríamos mantener el original, deberíamos pasar una copia del array como argumento,
con array.splice() o [...array] por ejemplo
 */

const lecturas = [ 23, 22, 21, 21, 23, 24 ];

const productos = [
    { id: 1, nombre: 'Pera', cantidad: 20 },
    { id: 2, nombre: 'Manzana', cantidad: 10 },
    { id: 3, nombre: 'Melón', cantidad: 1 }
]
const idABorrar = 2;

const borrarItemPlano = (array, item) => {
    const index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1) // Borra 1 item a partir de ese índice
    }
}

const borrarItemConFilter = (array, itemABorrar) => {
    // Generamos simplemente un nuevo array, filtrando el item a borrar.
    // La ventaja de este método, es que funcionará con items repetidos.
    return array.filter(item => item !== itemABorrar);
}

const borrarItemPorId = (array, id) => {
    array.forEach((item, index) => {
        if (item.id === id) {
            array.splice(index, 1); // Borra 1 item a partir de ese índice
        }
    })
}

// console.log(productos);
// borrarItemPorId(productos, 2);
// console.log(productos);

// console.log(lecturas);
// borrarItemPlano(lecturas, 24);
// console.log(lecturas);

console.log(lecturas);
const lecturasFiltradas = borrarItemConFilter(lecturas, 24);
console.log(lecturasFiltradas);
