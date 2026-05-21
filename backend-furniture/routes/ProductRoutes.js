import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.delete("/:id", deleteProduct);

export default router;