import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    mongoose.set("strictQuery", false);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;