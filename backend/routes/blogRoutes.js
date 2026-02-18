import express from "express";
import {
  getAllPosts,
  getAllPostsAdmin,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllCategories,
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin GET route first (before any /:slug routes)
router.get("/all", protect, admin, getAllPostsAdmin);
router.get("/post/:id", protect, admin, getPostById);

// Public routes
router.get("/", getAllPosts);
router.get("/categories", getAllCategories);

// Admin write routes
router.post("/", protect, admin, createPost);
router.put("/:id", protect, admin, updatePost);
router.delete("/:id", protect, admin, deletePost);

// Must be absolutely last (catches /:slug)
router.get("/:slug", getPostBySlug);

export default router;
