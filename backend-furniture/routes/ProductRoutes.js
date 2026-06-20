import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  getLatestProducts,
  getTopSellingProducts,
  getLowStockProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  updateImage,
  getImages,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/latest", getLatestProducts);

router.get(
  "/top-selling",
  getTopSellingProducts
);

router.get(
  "/low-stock",
  getLowStockProducts
);

router.get("/images", getImages);

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

router.put(
  "/upload/:id",
  upload.single("image"),
  updateImage
);

router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


export default router;
