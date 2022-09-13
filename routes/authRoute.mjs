import express from 'express'
import authController from '../controllers/authController.mjs'
import { registerValidation, loginValidation } from '../middlewares/validation.mjs'
import { verifyToken } from '../middlewares/tokenValidation.mjs'

const route = express.Router()

route.post('/register', registerValidation, authController.register)
route.post('/login', loginValidation, authController.login)
route.post('/refresh', authController.requestRefreshToken)
route.post('/logout', verifyToken, authController.logout)

export default route