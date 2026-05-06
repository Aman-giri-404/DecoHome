import express from "express";
import { registerUser, loginuser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginuser);

export default router;