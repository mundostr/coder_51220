import { fork } from 'child_process';
import { Product } from '../services/product_class.js';

const product = new Product();

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
        const child = fork('src/complex.js');
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