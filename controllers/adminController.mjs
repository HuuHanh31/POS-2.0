import User from '../models/User.mjs'
import Order from '../models/Order.mjs'

const adminController = {
    getAllEmployees: async res => {
        try {
            const employees = await User.find({ permission: { $in: ['clerk', 'cook'] } })
            if (!employees) {
                return res.status(404).json({ message: 'Employee is not found' })
            }

            res.status(200).json({ message: 'Get all employees successfully', data: employees })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const customer = await User.findById(req.params.id)
            if (!customer) {
                return res.status(404).json({ message: 'Customer is not found' })
            }

            res.status(200).json({ message: 'Get customer successfully', data: customer })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    putUser: async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
            if (err)
                return res.status(500).json(err.message)
            else {
                const { password, ...others } = docs._doc
                return res.status(200).json({ message: 'Update profile user successfullly', data: others })
            }
        })
    },

    getOrdersByDate: async (req, res) => {
        try {
            const orders = await Order.find()
            const ordersFilterd = orders.filter(order => {
                return order.updateAt >= new Date(req.query.startTime).setHours(1, 0, 0, 0) &&
                    order.updateAt <= new Date(req.query.endTime).setHours(23, 0, 0, 0)
            })

            res.status(200).json({
                message: `Get all orders from ${req.query.startTime} to ${req.query.endTime}`,
                data: ordersFilterd
            })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

export default adminController