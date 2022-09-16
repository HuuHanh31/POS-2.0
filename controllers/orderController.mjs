import Order from '../models/Order.mjs'
import { processOrder, status } from '../utils/annotation.mjs'

const orderController = {
    getOrders: async (req, res) => {
        const orders = null
        try {
            if (req.user.permission === 'clerk') {
                orders = await Order.find({ status: req.query.status })
            } else if (req.user.permission === 'chef') {
                orders = await Order.find({ process: req.query.process })
            } else {
                return res.status(403).json('Invalid token')
            }

            if (orders) {
                return res.status(200).json({
                    message: 'Get all orders sucessfully',
                    data: orders
                })
            } else {
                return res.status(404).json('Order not found')
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    postOrder: async (req, res) => {
        try {
            if (!req.body) {
                return res.json('No payment now')
            }
            const order = new Order({
                email: req.body.email,
                status: status.UNCOMFIRMED,
                process: processOrder.PENDING,
                payment: req.body.payment,
                products: req.body.products,
            })

            // calculate total price for this order
            order.total = order.products.reduce((sum, product) => {
                return product.price + sum
            }, 0)
            await order.save()
            res.status(201).json({
                message: 'Create a order successfully',
                data: order
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default orderController