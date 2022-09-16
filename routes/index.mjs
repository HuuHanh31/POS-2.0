import express from 'express'
import authRoute from './authRoute.mjs'
import adminRoute from './adminRoute.mjs'
import categoryRoute from './categoryRoute.mjs'
import orderRoute from './orderRoute.mjs'
import reservationRoute from './reservationRoute.mjs'

const route = express.Router()

route.use('/auth', authRoute)
route.use('/admin', adminRoute)
route.use('/categories', categoryRoute)
route.use('/orders', orderRoute)
route.use('/reservations', reservationRoute)

export default route