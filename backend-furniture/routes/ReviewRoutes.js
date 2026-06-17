import express from "express";

import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post("/", addReview);

router.get("/product/:productId", getProductReviews);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;