import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/WishlistController.js";

const router = express.Router();

router.post("/", addToWishlist);

router.get("/:userId", getWishlist);

router.delete("/", removeFromWishlist);

router.delete("/clear/:userId", clearWishlist);

export default router;