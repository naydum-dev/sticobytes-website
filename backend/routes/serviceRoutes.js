import express from "express";
const router = express.Router();

import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

// Import auth middleware (we'll protect admin routes later)
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// Public routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Admin routes (uncomment when auth is ready)
// router.post('/', protect, adminOnly, createService);
// router.put('/:id', protect, adminOnly, updateService);
// router.delete('/:id', protect, adminOnly, deleteService);

// For now, leave admin routes open for testing
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
