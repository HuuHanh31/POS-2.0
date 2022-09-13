import express from 'express'
import adminController from '../controllers/adminController.mjs';
import { verifyTokenAndAdmin } from '../middlewares/tokenValidation.mjs';

const route = express.Router()

route.get('/employees', verifyTokenAndAdmin, adminController.getAllEmployees)

route.get('/users/:id', verifyTokenAndAdmin, adminController.getUser)
route.put('/users/:id', verifyTokenAndAdmin, adminController.putUser)

route.get('/orders/statistics', verifyTokenAndAdmin, adminController.getOrdersByDate)

export default route