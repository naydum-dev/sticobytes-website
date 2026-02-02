import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
  validate,
} from "../middleware/validate.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, validate, register);
router.post("/login", validateLogin, validate, login);

// Protected route (requires JWT token)
router.get("/me", protect, getMe);

export default router;
