import { validationResult, body } from "express-validator";

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

// ============================================
// AUTH VALIDATION RULES
// ============================================

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

// ============================================
// BLOG VALIDATION RULES (for future use)
// ============================================

export const validateBlogPost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters long"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt must not exceed 500 characters"),

  body("category").optional().trim(),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be either draft or published"),
];

// ============================================
// COMMON VALIDATION RULES
// ============================================

export const validationRules = {
  // Email validation
  email: {
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
    normalizeEmail: true,
  },

  // Password validation
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    trim: true,
  },

  // Required field validation
  required: (fieldName) => ({
    notEmpty: {
      errorMessage: `${fieldName} is required`,
    },
    trim: true,
  }),

  // String length validation
  stringLength: (min, max) => ({
    isLength: {
      options: { min, max },
      errorMessage: `Must be between ${min} and ${max} characters`,
    },
    trim: true,
  }),

  // Slug validation (for URLs)
  slug: {
    matches: {
      options: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/],
      errorMessage: "Slug must be lowercase with hyphens only",
    },
  },

  // URL validation
  url: {
    isURL: {
      errorMessage: "Please provide a valid URL",
    },
  },
};
