import config from '../utils/config.js';
import MongoSingleton from '../services/mongo_class.js';
import { Product as MongoProduct } from '../services/product_dbclass.js';
import { Product as MemProduct } from '../services/product_memclass.js';

let factoryProduct;

// Este servicio factory verifica el valor de la variable config.PERSISTENCE (que a su vez
// se recupera desde los archivos de entorno), y en base a ella carga la clase del DAO
// de memoria o de MongoDB. Si es MongoDB, aplica el getInstance() del Singleton.
// Quitar la llamada al Singleton en el app.js si se utiliza este Factory.
switch (config.PERSISTENCE) {
    case 'memory':
        factoryProduct = MemProduct;
        break;
    
    case 'mongo':
        MongoSingleton.getInstance();
        factoryProduct = MongoProduct;
        break;
    
    default:
}

export default factoryProduct;