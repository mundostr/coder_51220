// import mongoose from 'mongoose';
import orderModel from '../models/order.dbmodel.js';

// Importamos el modelo de datos e implementamos utilizando los métodos de Mongoose para las consultas
export default class Order {
    getOrders = async () => {
        try {
            return await orderModel.find().populate('business');
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

    getOrderById = async (id) => {
        try {
            return await orderModel.findOne({ _id: id });
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

    createOrder = async (order) => {
        try {
            return await orderModel.create(order);
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }

    resolveOrder = async (id, order) => {
        try {
            return await orderModel.updateOne({ _id: id }, { $set: order });
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }
}