import express from "express";

import {
  createOrder,
  getOrders,
  getSingleOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/user/:userId", getUserOrders);

router.get("/:id", getSingleOrder);

router.put("/:id", updateOrderStatus);

export default router;