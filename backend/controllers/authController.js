import User from "../models/User.js";
import { generateToken } from "../utils/helpers.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide username, email, and password");
  }

  // Validate password strength
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  // Create user (User model will handle duplicate checking)
  const user = await User.create({
    username,
    email,
    password,
    role: role || "user", // Default to 'user' role
  });

  // Generate JWT token
  const token = generateToken(user.id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find user by email (includes password_hash)
  const user = await User.findByEmail(email);

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isPasswordCorrect = await User.comparePassword(
    password,
    user.password_hash,
  );

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(user.id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  // req.user is set by protect middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});
