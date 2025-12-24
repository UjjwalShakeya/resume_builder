// importing mongoose module
import mongoose, { mongo } from "mongoose";


// Function to connect to MongoDB
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully')
        });

        let mongodbURI = process.env.MONGODB_URI;
        const pojectName = "resume-builder";

        if (!mongodbURI) {
            throw new Error('MONGODB_URI enviroment variable not set')
        }

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1)
        }
        
        await mongoose.connect(`${mongodbURI}/${pojectName}`)


    } catch (error) {
        console.error('Error connecting MongoDB', error)
    }
}

export default connectDB;