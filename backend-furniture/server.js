import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";


import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import connectDB from "./confi/db.js";
import path from "path";
import { fileURLToPath } from "url";
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