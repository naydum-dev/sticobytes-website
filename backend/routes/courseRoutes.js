import express from "express";
import {
  registerForCourse,
  getAllRegistrations,
  updatePaymentStatus,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerForCourse);

// Protected routes (admin only)
router.get("/registrations", protect, getAllRegistrations);
router.put("/registrations/:id", protect, updatePaymentStatus);

export default router;
