import mongoose from "mongoose";

// connect to mongoDb database
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Database already connected')
            return
        }

        const uri = `${process.env.MONGODB_URI}/lms`
        
        await mongoose.connect(uri, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
        })
        
        console.log('Database connected successfully')
    } catch (err) {
        console.error('MongoDB connection error:', err.message)
        throw err
    }
}

export default connectDB
