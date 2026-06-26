import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import mongoose from "mongoose";
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
    const {
      title,
      slug,
      description,
      price,
      originalPrice,
      category,
      brand,
      image,
      images,
      stock,
      sku,
      tags,
      isFeatured,
      isActive,
    } = req.body;

    const existingSlug = await ProductModel.findOne({
      slug,
    });

    if (existingSlug) {
      return res.status(400).json({
        message: "Slug already exists.",
      });
    }

    const product = await ProductModel.create({
      title,
      slug,
      description,
      price,
      originalPrice,
      category,
      brand,
      image,
      images,
      stock,
      sku,
      tags,
      isFeatured,
      isActive,
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// GET PRODUCTS
//
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      featured,
      active,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    let filter = {};

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      } else {
        const categoryDoc = await CategoryModel.findOne({
          name: { $regex: new RegExp(`^${category}$`, "i") },
        });
        if (categoryDoc) {
          filter.category = categoryDoc._id;
        } else {
          filter.category = new mongoose.Types.ObjectId();
        }
      }
    }

    if (brand) {
      filter.brand = brand;
    }

    if (featured) {
      filter.isFeatured = featured === "true";
    }

    if (active) {
      filter.isActive = active === "true";
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const skip = (page - 1) * limit;

    const products = await ProductModel.find(filter)
      .populate("category")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const totalProducts =
      await ProductModel.countDocuments(filter);

    res.status(200).json({
      currentPage: Number(page),

      totalPages: Math.ceil(
        totalProducts / limit
      ),

      totalProducts,

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
    const product = await ProductModel.findById(
      req.params.id
    ).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// UPDATE PRODUCT
//
export const updateProduct = async (req, res) => {
  try {
    const product =
      await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product updated successfully.",

      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// DELETE PRODUCT
//
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Delete main image
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

    // Delete gallery images
    if (
      product.images &&
      Array.isArray(product.images)
    ) {
      for (const img of product.images) {
        const fileName = img.split("/").pop();

        const filePath = path.join(
          __dirname,
          "../uploads",
          fileName
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await ProductModel.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Product deleted successfully.",
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
        message: "No image uploaded.",
      });
    }

    res.status(201).json({
      message: "Image uploaded successfully.",

      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// UPDATE PRODUCT MAIN IMAGE
//
export const updateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }

    const product = await ProductModel.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Delete old image

    if (product.image) {
      const oldName =
        product.image.split("/").pop();

      const oldPath = path.join(
        __dirname,
        "../uploads",
        oldName
      );

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    product.image = `/uploads/${req.file.filename}`;

    await product.save();

    res.status(200).json({
      message: "Image updated successfully.",

      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// GET PRODUCT IMAGES
//
export const getImages = async (req, res) => {
  try {
    const images = await ProductModel.find(
      {},
      {
        title: 1,

        image: 1,

        images: 1,
      }
    ).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: images.length,

      images,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



//
// GET FEATURED PRODUCTS
//
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({
      isFeatured: true,
      isActive: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
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
// GET LATEST PRODUCTS
//
export const getLatestProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;

    const products = await ProductModel.find({
      isActive: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      })
      .limit(limit);

    res.status(200).json({
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
// GET TOP SELLING PRODUCTS
//
export const getTopSellingProducts = async (
  req,
  res
) => {
  try {
    const limit = Number(req.query.limit) || 8;

    const products = await ProductModel.find({
      isActive: true,
    })
      .populate("category")
      .sort({
        sold: -1,
      })
      .limit(limit);

    res.status(200).json({
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
// GET LOW STOCK PRODUCTS
//
export const getLowStockProducts = async (
  req,
  res
) => {
  try {
    const threshold =
      Number(req.query.stock) || 5;

    const products = await ProductModel.find({
      stock: {
        $lte: threshold,
      },
    })
      .populate("category")
      .sort({
        stock: 1,
      });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

