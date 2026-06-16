import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    fullName: String,

    phone: String,

    address: String,

    landmark: String,

    city: String,

    state: String,

    country: {
      type: String,
      default: "India",
    },

    pincode: String,

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AddressModel", addressSchema);