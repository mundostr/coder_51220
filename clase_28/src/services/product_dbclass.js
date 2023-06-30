import mongoose from 'mongoose';
import productModel from '../models/product_dbmodel.js';

export class Product {
    constructor() {
        this.products = [];
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['description', 'price', 'stock'];

    static #verifyRequiredFields = (obj) => {
        return Product.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null);
    }

    static #objEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    checkStatus = () => {
        return this.status;
    }

    showStatusMsg = () => {
        return this.statusMsg;
    }

    // Se puede utilizar el standard JSDoc para comentar los detalles de funciones y métodos
    // https://blog.shhdharmen.me/how-to-utilise-jsdoc-comment-tags-so-that-visual-studio-code-intellisense-works-great
    
    /**
     * Agrega un producto a la base de datos, verificando campos requeridos
     * @param {Product} product Objeto con campos del producto (description, price, stock)
    */
    addProduct = async (product) => {
        try {
            if (!Product.#objEmpty(product) && Product.#verifyRequiredFields(product)) {
                const process = await productModel.create(product);
                this.status = 1;
                this.statusMsg = "Producto registrado en bbdd";
            } else {
                this.status = -1;
                this.statusMsg = `Faltan campos obligatorios (${Product.requiredFields.join(', ')})`;
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `AddProduct: ${err}`;
        }
    }

    getProducts = async () => {
        try {
            const products = await productModel.find().lean();
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return products;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }

    getProductsPaginated = async (offset, itemsPerPage) => {
        try {
            const queryOptions = {
                offset: offset,
                limit: itemsPerPage,
                lean: true // habilitamos esta opción para evitar problemas con Handlebars
            }
            const products = await productModel.paginate({}, queryOptions);
            
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return products;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }

    getProductById = async (id) => {
        try {
            this.status = 1;
            const product = productModel.findById(id);
            return product;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProductById: ${err}`;
        }
    }

    updateProduct = async (id, data) => {
        try {
            if (data === undefined || Object.keys(data).length === 0) {
                this.status = -1;
                this.statusMsg = "Se requiere body con data";
            } else {
                // Con mongoose.Types.ObjectId realizamos el casting para que el motor reciba el id en el formato correcto
                const process = await productModel.updateOne({ '_id': new mongoose.Types.ObjectId(id) }, data);
                this.status = 1;
                process.modifiedCount === 0 ? this.statusMsg = "El ID no existe o no hay cambios por realizar": this.statusMsg = "Producto actualizado";
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `updateProduct: ${err}`;
        }
    }

    deleteProduct = async (id) => {
        try {
            const process = await productModel.deleteOne({ '_id': new mongoose.Types.ObjectId(id) });
            this.status = 1;
            process.deletedCount === 0 ? this.statusMsg = "El ID no existe": this.statusMsg = "Producto borrado";
        } catch (err) {
            this.status = -1;
            this.statusMsg = `deleteProduct: ${err}`;
        }
    }
}