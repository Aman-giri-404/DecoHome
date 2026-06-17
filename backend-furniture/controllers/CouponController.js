import CouponModel from "../models/CouponModel.js";

//
// Create Coupon
//
export const createCoupon = async (req, res) => {
  try {
    const coupon = await CouponModel.create(req.body);

    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get All Coupons
//
export const getCoupons = async (req, res) => {
  try {
    const coupons = await CouponModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: coupons.length,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Apply Coupon
//
export const applyCoupon = async (req, res) => {
  try {
    const { code, total } = req.body;

    const coupon = await CouponModel.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon",
      });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({
        message: "Coupon expired",
      });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        message: "Coupon usage limit exceeded",
      });
    }

    if (total < coupon.minimumPurchase) {
      return res.status(400).json({
        message: `Minimum purchase should be ₹${coupon.minimumPurchase}`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (total * coupon.discountValue) / 100;

      if (
        coupon.maximumDiscount > 0 &&
        discount > coupon.maximumDiscount
      ) {
        discount = coupon.maximumDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.status(200).json({
      coupon,

      discount,

      finalAmount: total - discount,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Update Coupon
//
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Coupon updated",

      coupon,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Delete Coupon
//
export const deleteCoupon = async (req, res) => {
  try {
    await CouponModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Coupon deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};