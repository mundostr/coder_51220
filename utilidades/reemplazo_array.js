/*
Forma simple de búsqueda y reemplazo en matriz de objetos (array)
*/

const productos = [
    { id: 1, nombre: 'Pera', cantidad: 20 },
    { id: 2, nombre: 'Manzana', cantidad: 10 },
    { id: 3, nombre: 'Melón', cantidad: 1 }
]

const buscarYReemplazar = (id, campo, nuevoValor) => {
    const indice = productos.findIndex(obj => obj.id === id);

    if (indice !== -1) { // si devuelve -1 significa que no encontró coincidencia en el id
        productos[indice][campo] = nuevoValor;
    }
}


console.log(productos);
const busqueda = buscarYReemplazar(3, 'cantidad', 2);
console.log(productos);
