// config/db.js
import mongoose from "mongoose";

const uri = process.env.DB_URL;

export async function connectDB() {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}