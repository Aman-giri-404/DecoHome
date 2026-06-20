import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews by the same user for the same product
reviewSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);

export default mongoose.model(
  "ReviewModel",
  reviewSchema
);