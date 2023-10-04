"use server";
import mongoose from 'mongoose';

let isConnected = false; // track the connection
export const connectDB = async (timeout = 30000) => {
  mongoose.set('strictQuery', true);
  if(isConnected) {
    console.log('MongoDB is already connected');
    return mongoose.connection;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: timeout,
    })
    isConnected = true;
    console.log('MongoDB connected')
    return mongoose.connection;
  } catch (error) {
    console.log(error);
  }
}