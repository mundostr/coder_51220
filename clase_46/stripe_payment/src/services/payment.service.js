import Stripe from 'stripe'
import { config } from '../config.js'

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(config.STRIPE_KEY)
    }

    createPaymentSession = async (data) => {
        return this.stripe.checkout.sessions.create(data)
    }

    /* createPaymentIntent = async (data) => {
        return this.stripe.paymentIntents.create(data)
    } */
}