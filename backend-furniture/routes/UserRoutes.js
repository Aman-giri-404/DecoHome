import express from "express";
import {
  registerUser,
  loginuser,
  loginadmin,
  userget,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginuser);
router.post("/login/admin", loginadmin);
router.get("/", userget);
export default router;
