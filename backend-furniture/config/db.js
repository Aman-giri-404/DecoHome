import mongoose from "mongoose";
import dns from "dns";
import CategoryModel from "../models/CategoryModel.js";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");

    // Auto-seed default categories if the collection is empty
    const count = await CategoryModel.countDocuments();
    if (count === 0) {
      const defaultCategories = ["TABLE", "CHAIR", "BEDS", "OFFICE DESK", "DINNING"];
      await CategoryModel.insertMany(
        defaultCategories.map((name) => ({ name }))
      );
      console.log("🌱 Default categories seeded successfully!");
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;