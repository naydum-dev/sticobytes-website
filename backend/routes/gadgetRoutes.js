import express from "express";
import {
  getAllGadgets,
  getGadgetById,
  createGadget,
  updateGadget,
  deleteGadget,
} from "../controllers/gadgetController.js";

const router = express.Router();

// Public routes
router.get("/", getAllGadgets);
router.get("/:id", getGadgetById);

// Admin routes (will protect with auth middleware later)
router.post("/", createGadget);
router.put("/:id", updateGadget);
router.delete("/:id", deleteGadget);

export default router;
