import mongoose from 'mongoose'
import 'dotenv/config'

const URI_MONGODB = process.env.URI_MONGODB

const connectDB = async () => {
    try {
        await mongoose.connect(URI_MONGODB)
        console.log('MongoDB connected successfully ✅')
    } catch (error) {
        console.error('MongoDB connection failed ❌')
        process.exit(1)
    }
}

export default connectDB