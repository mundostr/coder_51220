// Declaración standard de promesa
const dividir = (nro1, nro2) => {
    return new Promise((resolve, reject) => {
        if (nro2 === 0) reject('División por 0!');
        resolve(nro1 / nro2);
    });
}

const procesar = async (n1, n2) => {
    // Consumo standard de promesa con then y catch
    /* dividir(n1, n2)
    .then((datos) => {
        console.log(datos);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log('Esto debe ejecutarse luego de finalizado el proceso');
    }) */
    
    // Alternativa con try / catch y el uso de await (recordar configurar la función como async)
    try {
        const resultado = await dividir(n1, n2);
        console.log(resultado);
        console.log('Esto debe ejecutarse luego de finalizado el proceso 2');
    }
    catch(err) {
        console.log(err);
    }
}


procesar(4, 0);