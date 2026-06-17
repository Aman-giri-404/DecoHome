import express from "express";

import {
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/user/:userId", getUserOrders);

router.get("/:id", getSingleOrder);

router.put("/:id", updateOrderStatus);

export default router;