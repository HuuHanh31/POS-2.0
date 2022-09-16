import express from 'express'
import orderController from '../controllers/orderController.mjs'
import { verifyToken } from '../middlewares/tokenValidation.mjs'

const route = express.Router()

route.get('/', verifyToken, orderController.getOrders)
route.post('/', verifyToken, orderController.postOrder)

export default route