import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  uploadImage,
  updateImage,
  getImages,
} from "../controllers/ProductController.js";

const Prouter = express.Router();

Prouter.post("/product", createProduct);

Prouter.get("/", getProducts);

Prouter.get("/images", getImages);

Prouter.post("/upload", upload.single("image"), uploadImage);

Prouter.put("/upload/:id", upload.single("image"), updateImage);

Prouter.get("/:id", getSingleProduct);

Prouter.delete("/:id", deleteProduct);

export default Prouter;
