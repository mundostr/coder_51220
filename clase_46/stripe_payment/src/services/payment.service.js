import Stripe from 'stripe'
import { config } from '../config.js'

// Una clase muy sencilla en la cual generamos una nueva instancia de Stripe
// y le enviamos nuestra key para identificarnos y poder utilizar el servicio
export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(config.STRIPE_KEY)
    }

    // Cada vez que llamemos a este método, le pediremos a Stripe que nos genere
    // una nueva sesión de pagos. Tomará los datos que le enviemos y nos devolverá
    // una URL a la cual podremos redireccionar para que allí el cliente vea los
    // edtalles del pago y coloque los datos de su tarjeta.
    createPaymentSession = async (data) => {
        return this.stripe.checkout.sessions.create(data)
    }

    /* createPaymentIntent = async (data) => {
        return this.stripe.paymentIntents.create(data)
    } */
}