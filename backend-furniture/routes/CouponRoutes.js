import express from "express";

import {
  createCoupon,
  getCoupons,
  applyCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/CouponController.js";

const router = express.Router();

router.post("/", createCoupon);

router.get("/", getCoupons);

router.post("/apply", applyCoupon);

router.put("/:id", updateCoupon);

router.delete("/:id", deleteCoupon);

export default router;