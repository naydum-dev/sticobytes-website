import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAllCategories,
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts); // GET /api/blog
router.get("/categories", getAllCategories); // GET /api/blog/categories
router.get("/:slug", getPostBySlug); // GET /api/blog/:slug

// Admin routes (will protect with auth middleware later)
router.post("/", createPost); // POST /api/blog
router.put("/:id", updatePost); // PUT /api/blog/:id
router.delete("/:id", deletePost); // DELETE /api/blog/:id

export default router;
