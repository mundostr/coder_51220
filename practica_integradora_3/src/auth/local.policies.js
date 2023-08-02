import errorsDict from '../utils/errors.dict.js';

// Middleware personalizado para control de políticas
const applyPolicy = (roles) => {
    return (req, res, next) => {
        // Si hay objeto de usuario en la sesión y no está vacío, continuamos directamente la cadena con next()
        if(req.session.user && Object.keys(req.session.user).length > 0 && roles[0].toUpperCase() === 'ADMIN') return next();
        
        // Si no hay objeto de usuario o está vacío, cortamos con un no autorizado
        if (!req.session.user || Object.keys(req.session.user).length === 0) return res.status(errorsDict.UNAUTHORIZED.code).send( {status: 'ERR', result: errorsDict.UNAUTHORIZED.msg })
        
        // Si el objeto está ok pero el rol del usuario guardado en base de datos no coincide con ninguno
        // en la lista enviada, cortamos con un no permitido
        if(!roles.includes(req.session.user.role.toUpperCase())) return res.status(errorsDict.FORBIDDEN.code).send({ status: 'ERR', result: errorsDict.FORBIDDEN.msg })
        
        // Caso contraro, simplemente continuamos la cadena con next()
        next();
    }
}

export default applyPolicy;