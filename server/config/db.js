import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, options)
      .then((mongooseInstance) => {
        console.log(
          "MongoDB Connected:",
          mongooseInstance.connection.host
        );
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;