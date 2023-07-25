import { fork } from 'child_process';

// Opción 1
// Configuramos manualmente el DAO a utilizar, en este caso la persistencia a MongoDB
// Probar también ejemplo con product_memclass.js para persistencia a memoria.
// import { Product } from '../services/product_dbclass.js';
// const product = new Product();

// Opción 2
// Utilizamos un factory que carga una persistencia u otra según el valor de una variable de entorno
import factoryProduct from '../services/factory.js';
const product = new factoryProduct();

export const addProduct = async(req, res) => {
    try {
        const { description, price, stock } = req.body;
        const newProduct = await product.addProduct({ description, price, stock });
        res.status(200).send(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getProducts = async(req, res) => {
    try {
        // Mostramos por consola los headers para chequear detalles de lo que viene en ellos
        // console.log(req.headers);
        // const products = await product.getProducts();
        const products = await product.getProductsPaginated(0, 5);
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getLargeProcess = async(req, res) => {
    try {
        // Separamos la rutina compleja para crear un proceso hijo (child process).
        const child = fork('src/utils/complex.js');
        // start es un mensaje que enviamos al proceso hijo, para indicarle que comience
        child.send('start');
        child.on('message', (result) => {
            // Cuando el proceso hijo termina su cálculo, nos envía mensaje con el resultado
            res.status(200).send(`Resultado: ${result}`);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}