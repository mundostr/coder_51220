import { Router } from "express";
import jwt from 'jsonwebtoken';

// Definimos una clase general personalizada
export default class CustomRouter {
    constructor() {
        // generamos referencia interna a Router()
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    // init queda vacío, se completará en las clases que hereden de ésta
    init() {}

    // Lo que hacemos acá es sobreescribir el método get() original del router de Express
    // Además de enviarle un path y la lista de callbacks para ejecutar (de eso se encarga applyCallbacks),
    // le "inyectamos" 2 nuevos callbacks para poder utilizar respuestas personalizadas (generateCustomResponses)
    // y para controlar políticas (handlePolicies)
    get(path, policies, ...callbacks) { // spread, desestructuramos los callbacks
        this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    // Por supuesto, también podemos hacerlo con post() y otros métodos
    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        // Recorremos los callbacks obteniendo sus parámetros
        return callbacks.map((callback) => async(...params) => {
            try {
                // apply ejecutará cada callback apuntando a una instancia, por eso el uso de this
                await callback.apply(this, params);
            } catch(err) {
                // recordar que params es la matriz de parámetros (req, res, next)
                // por eso podemos utilizar status y send sobre params[1] que hace referencia a res
                params[1].status(500).send(err);
            }
        });
    }

    generateCustomResponses(req, res, next) {
        // Podemos generar nuevos métodos con respuestas personalizadas por ejemplo
        res.sendSuccess = (payload) => { return res.status(200).send({ status: 'SUCCESS', payload: payload }) }
        res.sendServerError = (error) => { return res.status(500).send({ status: 'SERVER_ERROR', error: error }) }
        res.sendUserError = (error) => { return res.status(400).send({ status: 'USER_ERROR', error: error }) }
        res.sendAuthError = (error) => { return res.status(401).send({ status: 'AUTH_ERROR', error: error }) }
        res.sendPolicyError = (error) => { return res.status(403).send({ status: 'POLICY_ERROR', error: error }) }
        next();
    }

    handlePolicies(policies) {
        // y así como estuvimos probando de manera manual y mediante Passport,
        // también podemos optar por colocar acá un método que se encargue de controlar las políticas de nuestro sistema
        return (req, res, next) => {
            if(policies[0] === 'PUBLIC') return next();

            const authHeaders = req.headers.authorization;
            if (!authHeaders) return res.status(401).send({ status: 'ERROR', error: 'Unauthorized' });
            
            const token = authHeaders.split(' ')[1]; // Se quita Bearer de adelante
            let user = jwt.verify(token, 'abcdefgh12345678');
            if (!policies.includes(user.role.toUpperCase())) return res.status(401).send({ status: 'ERROR', error: 'No permissions' });

            req.user = user;
            next();
        }
    }
}