import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { cartRoutes } from './routes/cart.routes.js';
import { config } from './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${config.APP_PATH}/static`));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${config.APP_PATH}/views`);

app.use('/api/cart', cartRoutes());

app.listen(config.APP_PORT, async () => {
    await mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Servidor iniciado en puerto ${config.APP_PORT}`);
});