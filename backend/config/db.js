import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("mongoDB connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
