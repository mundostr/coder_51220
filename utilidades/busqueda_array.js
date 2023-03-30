/*

Alternativas de búsqueda en matriz (array)

*/

const productos = [
    { id: 1, nombre: 'Pera', cantidad: 20 },
    { id: 2, nombre: 'Manzana', cantidad: 10 },
    { id: 3, nombre: 'Melón', cantidad: 1 }
]

const buscarManual = (matriz, campo, valor) => {
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][campo] === valor) return matriz[i];
    }
    return null;
}

const buscarFind = (matriz, campo, valor) => {
    const coincidencia = matriz.find((elemento) => elemento[campo] === valor);
    return (coincidencia ? coincidencia : null);
}

// const busqueda = buscarManual(productos, 'nombre', 'Melón');
const busqueda = buscarFind(productos, 'id', 3);

console.log(busqueda === null ? 'No se encontró el producto' : busqueda);
