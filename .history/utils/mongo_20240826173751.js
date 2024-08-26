import mongoose from "mongoose";

// Direct MongoDB connection string for testing
const MONGO_URL = "mongodb+srv://gauribhardwaj090903:Gauri123@cluster0.iimhqe7.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0";

// Ensure that the connection string is not empty
if (!MONGO_URL) {
  throw new Error("MongoDB connection string is missing");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    cached.promise = mongoose.connect(MONGO_URL, true)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }

  return cached.conn;
}

export default dbConnect;
