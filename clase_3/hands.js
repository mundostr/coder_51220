/*

Ejemplo conjunto de creación y utilización de promesa

*/

const sumar = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 !== 0 && n2 != 0) {
            resolve(n1 + n2);
        } else {
            reject('Operación no válida');
        }
    });
}

sumar(3, 1)
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})
