import mongoose from "mongoose";

export async function connect() {
  try {

    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URL!);

    console.log("MongoDB Connected");

  } catch (error) {
    console.log("MongoDB Connection Error");
    console.log(error);
    throw error;
  }
}