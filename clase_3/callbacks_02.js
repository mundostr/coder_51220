const sumar = (n1, n2) => { return n1 + n2; }

const restar = (n1, n2) => { return n1 - n2; }

const multiplicar = (n1, n2) => { return n1 * n2; }

const dividir = (n1, n2) => { return n1 / n2; }

const ejecutar = (n1, n2, cb) => { // cb = función callback que pasamos como argumento
    console.log(`Números a procesar: ${n1} y ${n2}`);
    const resultado = cb(n1, n2);
    console.log(`Resultado: ${resultado}`);
}

ejecutar(3, 5, dividir);
