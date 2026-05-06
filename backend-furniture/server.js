import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";


import UserRoutes from "./routes/UserRoutes.js";
import connectDB from "./confi/db.js";

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});