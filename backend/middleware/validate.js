import { validationResult } from "express-validator";

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

// Common validation rules
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
