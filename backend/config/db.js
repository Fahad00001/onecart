import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB conected");
  } catch (error) {
    console.error("DB errror");
  }
};

export default connectDB;
