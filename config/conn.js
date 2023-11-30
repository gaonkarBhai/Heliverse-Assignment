import mongoose from "mongoose";
const connectDB = async () => {
  if (!process.env.MONGO_URI) console.error("🔴 No MONGO_URI found in env");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;