import dotenv from 'dotenv';
import { Command } from 'commander';

// Comandos: https://www.npmjs.com/package/commander
const program = new Command();
program
    .version('2.0.1')
    .option('-p --port <port>', 'Execution port', 3000)
    .option('-m --mode <mode>', 'Execution mode (PRODUCTION / DEVELOPMENT)', 'DEVELOPMENT')
    .option('-d --debug', 'Activate / deactivate debug', false)
    .parse(process.argv);
const cl_options = program.opts();

// IMPORTANTE!: ejecutar este config para que dotenv inyecte las variables del archivo .env en process.env
// En este caso, usamos el argumento --mode al iniciar el script, para definir si cargamos las variables de
// entorno de desarrollo o producción
dotenv.config({ path: cl_options.mode == 'DEVEL' ? './.env.development': './.env.production' });

// Simplemente exportamos un objeto config con las distintas variables tomadas del process.env
const cors_origins = process.env.ALLOWED_ORIGINS;
const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    // Separamos la variable de entorno por coma, generando un array y trimando cada elemento (quitando espacios)
    // Esto porque la opción origin de cors no permite valores separados por coma, sino un array.
    ALLOWED_ORIGINS: cors_origins.includes(',') ? cors_origins.split(',').map(item => item.trim()) : cors_origins
}

export default config;