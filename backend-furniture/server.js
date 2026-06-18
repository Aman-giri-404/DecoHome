import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";


import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import CartRoutes from "./routes/CartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import AddressRoutes from "./routes/AddressRoutes.js";
import WishlistRoutes from "./routes/WishlistRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import CouponRoutes from "./routes/CouponRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", UserRoutes);
app.use("/api/admin", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/wishlist", WishlistRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/coupons", CouponRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/dashboard", DashboardRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});