import express from 'express'
import categoryController from '../controllers/categoryController.mjs'
import { verifyTokenAndAdmin } from '../middlewares/tokenValidation.mjs'

const route = express.Router()

route.post('/:id', verifyTokenAndAdmin, categoryController.postProduct)
route.put('/:id/product/:productId', verifyTokenAndAdmin, categoryController.putProduct)
route.delete('/:id/product/:productId', verifyTokenAndAdmin, categoryController.deleteProduct)

route.get('/', categoryController.getAllCategories)
route.get('/:id', categoryController.getCategory)
route.post('/', verifyTokenAndAdmin, categoryController.postCategory)
route.put('/:id', verifyTokenAndAdmin, categoryController.putCategory)
route.delete('/:id', verifyTokenAndAdmin, categoryController.deleteCategory)

export default route