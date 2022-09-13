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
        } catch (e) {
            res.status(500).json({ message: e.message })
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
                total: req.body.total
            })
            await order.save()
            res.status(201).json({
                message: 'Create a order successfully',
                data: order
            })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    getOrderByEmail: async (req, res) => {
        try {
            const orders = await Order.find({ email: req.query.email })
            if (orders.length == 0) {
                return res.status(404).json('No order with this email')
            }
            res.status(200).json({
                message: 'Get all orders by email successfully',
                data: orders
            })
        } catch (e) {
            res.status(500).json({ message: e.messages })
        }
    }
}

export default orderController