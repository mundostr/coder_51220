// Podemos cambiar aquí fácilmente entre el servicio DAO de MongoDB
// o MySQL, veremos que el controlador continuará funcionando,
// ya que la homologación de nombres de métodos permite aislarlo
// del DAO de turno

import User from '../services/user.dao.js';
import UserDTO from '../services/user.dto.js';
import errorsDict from '../utils/errors.dict.js';
import { validationResult } from 'express-validator';

const userService = new User();

export const getUsers = async (req, res) => {
    try {
        const result = await userService.getUsers();
        if (!result) return res.status(errorsDict.NO_CONTENT.code).send({ status: 'ERR', error: errorsDict.NO_CONTENT.msg });
        res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
    } catch (err) {
        // Notar el uso del objecto errorsDict del diccionario para los códigos y mensajes de error
        res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await userService.getUserById(uid);
        if (!result) return res.status(errorsDict.NO_CONTENT.code).send({ status: 'ERR', error: errorsDict.NO_CONTENT.msg });
        res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
    } catch (err) {
        res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
    }
}

export const saveUser = async (req, res) => {
    // Esto viene de la validación de campos hecha en la ruta, si todo va ok, continuamos
    if (validationResult(req).isEmpty()) {
        try {
            // Notar el uso del objeto DTO para normalizar los datos del usuario
            // antes de pasarlos al método del servicio.
            const user = new UserDTO(req.body);
            const userFound = await userService.getUserByEmail(user.email);
            // userFound indica si el mail ya se encuentra registrado o no en la colección
            if (userFound) return res.status(errorsDict.ALREADY_REGISTERED.code).send({ status: 'ERR', result: errorsDict.ALREADY_REGISTERED.msg })

            const result = await userService.saveUser(user);
            res.status(errorsDict.ALL_OK.code).send({ status: 'OK', result: result });
        } catch (err) {
            res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: err.message });
        }
    } else {
        res.status(errorsDict.INCOMPLETE_DATA.code).send({ status: 'ERR', data: validationResult(req).array() })
    }
}