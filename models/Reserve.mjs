import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const reserveSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   reserveId: {
      type: String,
      default: nanoid()
   },
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   adultsNumber: {
      type: Number,
      required: true
   },
   kidsNumber: {
      type: Number,
      required: true
   },
   date: {
      type: Date,
      require: true
   },
   phone: {
      type: String,
      required: true
   },
}, { timestamps: true }
)

export default mongoose.model('Reserve', reserveSchema)