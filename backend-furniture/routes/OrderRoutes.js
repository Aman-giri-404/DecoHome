import express from "express";

import {
  createOrder,
  getOrders,
  getSingleOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getSingleOrder);

export default router;