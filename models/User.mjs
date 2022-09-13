import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    permission: {
        type: String,
        default: 'customer'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User