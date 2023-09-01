import { config } from '../config.js';
import PaymentService from '../services/payment.service.js';

export const checkout = async (req, res) => {
    try {
        // Stripe requiere que pasemos un objeto con formato determinado:
        // line_items: array de productos para listar en el pago
        // mode: payment o suscription por ejemplo: payment pago único
        // success y cancel_url, las url de callback a las que debe volver Stripe
        // luego de procesar el pago, según haya salido todo ok o habido un error
        const data = {
            line_items: req.body,
            mode: 'payment', // puede ser suscription también para habilitar pagos recurrentes
            success_url: `${config.APP_BASE}:${config.APP_PORT}/api/cart/success`,
            cancel_url: `${config.APP_BASE}:${config.APP_PORT}/api/cart/cancel`
        }

        // Creamos una nueva instancia de pago utilizando la clase PaymentService sencilla
        // que hemos generado, aquí es donde realmente enlazamos con Stripe
        const service = new PaymentService();
        const payment = await service.createPaymentSession(data)

        // Simplemente retornamos lo generado por el sistema de Stripe
        res.status(200).send(payment)
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}
