const dividir = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n2 === 0) {
            reject('División por 0');
        } else {
            resolve(n1 / n2);
        }
    });
}

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