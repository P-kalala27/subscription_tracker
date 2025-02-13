import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';


if(!DB_URI) {
    throw new Error('DB_URI is not defined');
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;
