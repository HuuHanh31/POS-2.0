import User from '../models/User.mjs'
import Order from '../models/Order.mjs'

const adminController = {
    getAllEmployees: async (req, res) => {
        await User.find({ permission: { $in: ['clerk', 'cook'] } })
            .then(employees => { res.json({ message: 'Get all employees successfully', data: employees }) })
            .catch(err => res.send(err.message))
    },

    getUser: async (req, res) => {
        try {
            const customer = await User.findById(req.params.id)
            if (!customer) {
                return res.status(404).json({ message: 'Customer is not found' })
            }

            res.status(200).json({ message: 'Get customer successfully', data: customer })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    putUser: async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body)
            .then(user => res.status(200).json({ message: 'Put user successfully', data: user }))
            .catch(err => res.send(err.message))
    },

    getOrdersByDate: async (req, res) => {
        try {
            const orders = await Order.find({
                updatedAt: {
                    $gte: new Date(req.query.startTime),
                    $lt: new Date(req.query.endTime)
                }
            })

            res.status(200).json({
                message: `Get all orders from ${req.query.startTime} to ${req.query.endTime}`,
                data: orders
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default adminController