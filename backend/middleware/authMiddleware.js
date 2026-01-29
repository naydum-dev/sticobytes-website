import jwt from "jsonwebtoken";
import { ApiError } from "./errorHandler.js";
import { asyncHandler } from "./errorHandler.js";
import { query } from "../config/database.js";

// Protect routes - verify JWT token
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (format: "Bearer TOKEN")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (exclude password)
      const result = await query(
        "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
        [decoded.id],
      );

      if (result.rows.length === 0) {
        throw new ApiError(401, "User not found");
      }

      // Attach user to request object
      req.user = result.rows[0];

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      throw new ApiError(401, "Not authorized, token failed");
    }
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided");
  }
});

// Admin only middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Access denied. Admin only.");
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const result = await query(
        "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
        [decoded.id],
      );

      if (result.rows.length > 0) {
        req.user = result.rows[0];
      }
    } catch (error) {
      // Token invalid but we don't throw error
      console.log("Optional auth: Invalid token");
    }
  }

  next();
});
