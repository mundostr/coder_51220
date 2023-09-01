import productModel from '../models/product.model.js'

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find().limit(15).lean()
        res.render('index', { products })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}
