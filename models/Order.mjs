import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    price: Number
})

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: nanoid()
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    process: {
        type: String,
        required: true
    },
    payment: String,
    products: [productSchema],
    total: Number
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order