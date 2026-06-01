import ProductModel from "../models/Productmodel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
// CREATE PRODUCT
//
export const createProduct = async (req, res) => {
  try {
    const { title, price, category, image, description } = req.body;

    const product = await ProductModel.create({
      title,
      price,
      category,
      image,
      description,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// GET ALL PRODUCTS
//
export const getProducts = async (req, res) => {
  try {
    const categoryParam = req.query.category;

    let products;

    if (categoryParam) {
      products = await ProductModel.find({
        category: categoryParam,
      });
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// GET SINGLE PRODUCT
//
export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// DELETE PRODUCT + IMAGE
//
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.image) {
      const fileName = product.image.split("/").pop();

      const filePath = path.join(
        __dirname,
        "../uploads",
        fileName
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ProductModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// UPLOAD IMAGE
//
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

//
// UPDATE PRODUCT IMAGE
//
export const updateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (product.image) {
      const oldFileName = product.image.split("/").pop();

      const oldFilePath = path.join(
        __dirname,
        "../uploads",
        oldFileName
      );

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    product.image = `/uploads/${req.file.filename}`;

    await product.save();

    res.status(200).json({
      message: "Image updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// GET ALL PRODUCT IMAGES
//
export const getImages = async (req, res) => {
  try {
    const products = await ProductModel.find(
      {},
      {
        image: 1,
        title: 1,
      }
    ).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: products.length,
      images: products,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};