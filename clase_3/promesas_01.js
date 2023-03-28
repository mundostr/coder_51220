const dividir = (n1, n2) => {
    // Creamos una función dividir que recibe dos argumentos y retorna una promesa
    return new Promise((resolve, reject) => {
        if (n2 === 0) {
            reject('División por 0');
        } else {
            resolve(n1 / n2);
        }
    });
}

// Consumimos la función dividir, utilizando then, catch y finally.
// el callback en then se ejecuta si todo salió ok con la promesa,
// el de catch si la promesa fue rechazada (rejected)
// y el finally se ejecuta al final, sea cual fuere el resultado de la promesa
dividir(5, 4)
.then((resultado) => {
    console.log(resultado);
})
.catch((err) => {
    console.log(err);
})
.finally(() => {
    console.log('Esto se ejecuta sí o sí al final');
})