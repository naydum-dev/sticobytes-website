import { asyncHandler } from "../middleware/errorHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { query } from "../config/database.js";
import {
  createSlug,
  calculateReadingTime,
  getPagination,
  getPaginationMeta,
} from "../utils/helpers.js";

// @desc    Get all blog posts with pagination
// @route   GET /api/test/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { limit: limitNum, offset } = getPagination(page, limit);

  // Get total count
  const countResult = await query("SELECT COUNT(*) FROM blog_posts");
  const totalCount = parseInt(countResult.rows[0].count);

  // Get blog posts
  const result = await query(
    `SELECT 
      bp.*,
      u.username as author_name,
      c.name as category_name
     FROM blog_posts bp
     LEFT JOIN users u ON bp.author_id = u.id
     LEFT JOIN categories c ON bp.category_id = c.id
     ORDER BY bp.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limitNum, offset],
  );

  const pagination = getPaginationMeta(totalCount, page, limit);

  res.json({
    success: true,
    count: result.rows.length,
    pagination,
    data: result.rows,
  });
});

// @desc    Create a test blog post
// @route   POST /api/test/create-blog
// @access  Public (for testing only)
export const createTestBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Please provide title and content");
  }

  const slug = createSlug(title);
  const readingTime = calculateReadingTime(content);
  const excerpt = content.substring(0, 150) + "...";

  const result = await query(
    `INSERT INTO blog_posts 
     (title, slug, content, excerpt, author_id, category_id, reading_time, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [title, slug, content, excerpt, 1, 1, readingTime, "published"],
  );

  res.status(201).json({
    success: true,
    message: "Blog post created successfully",
    data: result.rows[0],
  });
});

// @desc    Test error handling
// @route   GET /api/test/error
// @access  Public
export const testError = asyncHandler(async (req, res) => {
  throw new ApiError(400, "This is a test error!");
});

// @desc    Test database query
// @route   GET /api/test/query
// @access  Public
export const testQuery = asyncHandler(async (req, res) => {
  const result = await query("SELECT * FROM categories LIMIT 5");

  res.json({
    success: true,
    message: "Query executed successfully",
    count: result.rows.length,
    data: result.rows,
  });
});
