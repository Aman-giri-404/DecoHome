import express from "express";

import {
  registerUser,
  loginUser,
  loginAdmin,
  getUsers,
  getSingleUser,
  updateUser,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/login/admin", loginAdmin);

router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.put("/:id", updateUser);

router.put("/block/:id", blockUser);

router.put("/unblock/:id", unblockUser);

router.delete("/:id", deleteUser);

export default router;