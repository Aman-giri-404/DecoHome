import WishlistModel from "../models/WishlistModel.js";
import ProductModel from "../models/Productmodel.js";

//
// Add Product
//
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let wishlist = await WishlistModel.findOne({
      user: userId,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: userId,
        products: [],
      });
    }

    const exists = wishlist.products.find(
      (id) => id.toString() === productId
    );

    if (exists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    res.status(200).json({
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get Wishlist
//
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({
      user: req.params.userId,
    }).populate("products");

    if (!wishlist) {
      return res.status(200).json({
        products: [],
      });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Remove Product
//
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await WishlistModel.findOne({
      user: userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      message: "Removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Clear Wishlist
//
export const clearWishlist = async (req, res) => {
  try {
    await WishlistModel.findOneAndUpdate(
      {
        user: req.params.userId,
      },
      {
        products: [],
      }
    );

    res.status(200).json({
      message: "Wishlist cleared",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};