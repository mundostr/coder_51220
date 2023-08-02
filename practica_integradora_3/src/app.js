import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import config from './config.js';
import { userRoutes } from './routes/user.routes.js';
import passport from './auth/passport.strategies.js';
import { __dirname } from './utils.js';
import CustomError from './services/customerror.class.js';
import errorsDict from './utils/errors.dict.js';


const app = express();
app.use(express.json());
app.use(cors({
    // revisar config.js, tomamos los orígenes permitidos desde variables de entorno
    origin: config.ALLOWED_ORIGINS,
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.urlencoded({ extended: true }));

// Habilitamos sesiones y passport, para manejar la autenticación de usuarios
app.use(session({ secret: config.SECRET, resave: true, saveUninitialized: true }) );
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes());

// Agregamos como muestra un endpoint all (catchall), aquí "caerá" cualquier solicitud
// que no coincida con ningún endpoint de userRoutes()
app.all('*', (req, res, next) => {
    // Disparamos un mensaje de error personalizado, por supuesto podríamos también
    // mostrar una plantilla por ejemplo
    throw new CustomError(errorsDict.NO_ROUTING);
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);


try {
    // Simplemente levantamos el server, observar que NO estamos instanciando
    // ninguna conexión de base de datos, ser hará en el DAO correspondiente (ver services)
    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
    });
} catch(err) {
    console.error(`No se puede iniciar el servidor (${err.message})`);
}