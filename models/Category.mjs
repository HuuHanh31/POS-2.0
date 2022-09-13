import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: nanoid()
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    }
})

const categorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    products: [productSchema]
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)

export default Category