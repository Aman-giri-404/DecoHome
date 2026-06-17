import express from "express";

import {
  addAddress,
  getAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/AddressController.js";

const router = express.Router();

router.post("/", addAddress);

router.get("/user/:userId", getAddresses);

router.get("/:id", getSingleAddress);

router.put("/:id", updateAddress);

router.put("/default/:id", setDefaultAddress);

router.delete("/:id", deleteAddress);

export default router;