import express from 'express'
import orderController from '../controllers/orderController.mjs'

const route = express.Router()

route.get('/', orderController.getOrders)
route.get('/', orderController.getOrderByEmail)

export default route