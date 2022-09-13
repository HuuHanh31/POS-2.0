import express, { Router } from 'express'
import categoryController from '../controllers/categoryController.mjs'

const route = express.Router()

route.post('/:id', categoryController.postProduct)
route.put('/:id/product/:productId', categoryController.putProduct)
route.delete('/:id/product/:productId', categoryController.deleteProduct)

route.get('/', categoryController.getAllCategories)
route.get('/:id', categoryController.getCategory)
route.post('/', categoryController.postCategory)
route.put('/:id', categoryController.putCategory)
route.delete('/:id', categoryController.deleteCategory)

export default route