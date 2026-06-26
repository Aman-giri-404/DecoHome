import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      require: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Pricing
    price: {
  type: Number,
  required: true,
  min: 0,
},

   

    originalPrice: {
  type: Number,
  required: false,
  default: 0,
  min: 0,
},

    // Category & Brand
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    // Images
    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    // Inventory
   

    stock: {
  type: Number,
  required: true,
  min: 0,
},


    sold: {
  type: Number,
  required: false,
  default: 0,
  min: 0,
},

    sku: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Reviews
    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // Search
    tags: [
      {
        type: String,
      },
    ],

    // Home Page
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Visibility
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ProductModel",
  productSchema
);