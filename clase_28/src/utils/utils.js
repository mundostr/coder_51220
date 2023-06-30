import bcrypt from 'bcrypt'
import * as url from 'url';

export const __filename = url.fileURLToPath(import.meta.url);

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)