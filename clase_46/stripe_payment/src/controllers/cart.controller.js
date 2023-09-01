import { config } from '../config.js';
import PaymentService from '../services/payment.service.js';

export const checkout = async (req, res) => {
    try {
        const data = {
            line_items: req.body,
            mode: 'payment', // puede ser suscription también para habilitar pagos recurrentes
            success_url: `${config.APP_BASE}:${config.APP_PORT}/api/cart/success`,
            cancel_url: `${config.APP_BASE}:${config.APP_PORT}/api/cart/cancel`
        }

        const service = new PaymentService();
        const payment = await service.createPaymentSession(data)

        res.status(200).send(payment)
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}
