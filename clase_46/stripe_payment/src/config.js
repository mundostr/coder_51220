import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    APP_PORT: process.env.APP_PORT,
    APP_BASE: process.env.APP_BASE,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    STRIPE_KEY: process.env.STRIPE_KEY,
    // Podemos también utilizar la alternativa de path.resolve() para obtener la ruta base de ejecución
    // Esto será útil en la configuración de express.static() o handlebars
    APP_PATH: `${path.resolve()}/src`
}