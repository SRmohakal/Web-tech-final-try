import mongoose from "mongoose";

//connect to the mongodb database
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI && process.env.MONGODB_URI.endsWith('/lms')
            ? process.env.MONGODB_URI
            : `${process.env.MONGODB_URI}/lms`;

        await mongoose.connect(uri);
        console.log('Database Connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        // Optionally exit process when DB connection fails
        // process.exit(1);
    }
};

export default connectDB;