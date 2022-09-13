import mongoose from 'mongoose'

export default async function connect() {
    try {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log('Connect to database successfully')
        })
    } catch (e) {
        console.log('Connect to database failure')
    }
}
