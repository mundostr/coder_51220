import Order from '../services/order.dao.js';
import Business from '../services/business.dao.js';
import User from '../services/user.dao.js';

// Importamos la clase dao correspondiente (de MongoDB en este caso),
// creamos las instancias e implementamos los métodos.
// Utilizamos nombres de métodos homologados, de esa manera podremos cambiar fácilmente
// entre un dao y otro, tan solo importando el que necesitemos o mediante un Factory,
// sin tener que tocar estos métodos.
// Utilizamos instancias de las 3 clases porque en createOrder necesitamos recuperar datos de user y de business
const orderService = new Order();
const businessService = new Business();
const userService = new User();

export const getOrders = async (req, res) => {
    const result = await orderService.getOrders();
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar la lista' });
    res.status(200).send({ status: 'OK', result: result });
}

export const getOrderById = async (req, res) => {
    const { oid } = req.params;
    const result = await orderService.getOrderById(oid);
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar la lista' });
    res.status(200).send({ status: 'OK', result: result });
}

export const createOrder = async (req, res) => {
    const { user, business, products } = req.body;
    const resultUser = await userService.getUserById(user);
    const resultBusiness = await businessService.getBusinessById(business);

    const actualOrder = resultBusiness.products.filter(product => products.includes(product.id));
    const totalPrice = actualOrder.reduce((acc, prev) => {
        acc += prev.price
        return acc;
    }, 0);
    const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

    const order = {
        number: orderNumber,
        business: business,
        user: user,
        products: actualOrder.map(product => product.id),
        totalPrice: totalPrice,
        completed: false
    };

    const orderResult = await orderService.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await userService.updateUser(user, resultUser);
    res.status(200).send({ status: 'OK', result: orderResult });
}

export const resolveOrder = async (req, res) => {
    const { oid } = req.params;
    const order = await orderService.getOrderById(oid);
    order.completed = req.query.completed;
    await orderService.resolveOrder(order._id, order);
    res.status(200).send({ status: 'OK', result: 'Order resolved' });
}