/*
Diferencias entre find(), some(), filter() y every();
*/

const productos = [
    { id: 1, nombre: 'Pera', cantidad: 20 },
    { id: 2, nombre: 'Manzana', cantidad: 10 },
    { id: 3, nombre: 'Melón', cantidad: 1 }
]

const usarFind = () => { // retorna EL PRIMER elemento que cumple
    const productosFiltrados = productos.find((prod) => { return prod.id < 3 });
    return productosFiltrados;
}

const usarFilter = () => { // retorna TODOS los elementos que cumplen
    const productosFiltrados = productos.filter((prod) => { return prod.id < 3 });
    return productosFiltrados;
}

const usarSome = (id) => { // retorna TRUE o FALSE si un elemento cumple
    const productosFiltrados = productos.some((prod) => { return prod.id === id });
    return productosFiltrados;
}

const usarEvery = (id) => { // retorna TRUE o FALSE, SOLO SI TODOS los elementos cumplen
    const productosFiltrados = productos.every((prod) => { return prod.id > id });
    return productosFiltrados;
}


console.log(usarFind());
console.log(usarFilter());
console.log(usarSome(2)); // true
console.log(usarSome(5)); // false
console.log(usarEvery(0)); // true
console.log(usarEvery(5)); // false
