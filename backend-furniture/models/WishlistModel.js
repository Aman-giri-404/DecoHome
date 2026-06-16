import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productmodel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WishlistModel", wishlistSchema);