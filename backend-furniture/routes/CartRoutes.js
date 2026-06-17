import express from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/", addToCart);

router.get("/:userId", getCart);

router.put("/", updateCartItem);

router.delete("/", removeCartItem);

router.delete("/clear/:userId", clearCart);

export default router;