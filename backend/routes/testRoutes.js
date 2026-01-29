import express from "express";
import {
  getBlogs,
  createTestBlog,
  testError,
  testQuery,
} from "../controllers/testController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/blogs", getBlogs);
router.get("/query", testQuery);
router.get("/error", testError);

// Protected route example (will need token to access)
// router.get('/protected', protect, (req, res) => {
//   res.json({
//     success: true,
//     message: 'You are authenticated!',
//     user: req.user,
//   });
// });

// Admin only route example
// router.get('/admin-only', protect, admin, (req, res) => {
//   res.json({
//     success: true,
//     message: 'Welcome Admin!',
//     user: req.user,
//   });
// });

// Create blog (temporarily public for testing)
router.post("/create-blog", createTestBlog);

export default router;
