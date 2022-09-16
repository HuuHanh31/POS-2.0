import express from 'express'
import reservationController from '../controllers/reservationController.mjs'
import { verifyToken } from '../middlewares/tokenValidation.mjs'

const route = express.Router()

route.get('/', verifyToken, reservationController.getReservation)
route.post('/', verifyToken, reservationController.verifyReservation, reservationController.postReservation)
route.put('/:id', verifyToken, reservationController.putReservation)
route.delete('/:id', verifyToken, reservationController.deleteReservation)

export default route