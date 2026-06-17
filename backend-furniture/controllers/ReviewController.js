import ReviewModel from "../models/ReviewModel.js";
import ProductModel from "../models/Productmodel.js";

//
// Add Review
//
export const addReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;

    const exists = await ReviewModel.findOne({
      user,
      product,
    });

    if (exists) {
      return res.status(400).json({
        message: "You already reviewed this product.",
      });
    }

    const productExists = await ProductModel.findById(product);

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const review = await ReviewModel.create({
      user,
      product,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get Reviews by Product
//
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      product: req.params.productId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Update Review
//
export const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    res.status(200).json({
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Delete Review
//
export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findByIdAndDelete(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};