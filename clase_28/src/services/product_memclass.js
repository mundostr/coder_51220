import products from '../models/product_memmodel.js';

export class Product {
    constructor() {
        this.products = products; // Cargamos productos de prueba desde el array exportado en models
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['description', 'price', 'stock'];

    static #verifyRequiredFields = (obj) => {
        return Product.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null && obj[field] !== undefined);
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
                const process = this.products.push(product);
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
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return this.products;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }

    getProductsPaginated = async (offset, itemsPerPage) => {
        try {
            const products = this.products.slice(offset, offset + itemsPerPage);
            
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return products;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }
}