import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
   name: {
  type: String,
  required: true,
  trim: true,
},

    email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
},

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "UserModel",
  userSchema
);