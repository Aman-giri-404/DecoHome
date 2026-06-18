import express from "express";

import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", submitContact);

router.get("/", getContacts);

router.get("/:id", getContact);

router.put("/:id", updateContactStatus);

router.delete("/:id", deleteContact);

export default router;