import mongoose from "mongoose";
// require('dotenv').config();

const MONGO_URL = "MONGO_URL=mongodb+srv://gauribhardwaj090903:Gauri123@cluster0.iimhqe7.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local"
  );
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
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URL, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((e) => console.log(e));
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.log(error);
  }
  return cached.conn;
}

export default dbConnect;
