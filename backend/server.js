import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import pool, { query } from "./config/database.js";
import testRoutes from "./routes/testRoutes.js";
import gadgetRoutes from "./routes/gadgetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// 1. Security middleware - adds security headers
app.use(helmet());

// 2. Request logging - logs all HTTP requests
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// 3. CORS - allow frontend to communicate with backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 4. Body parsing middleware
app.use(express.json({ limit: "10mb" })); // Parse JSON with 10MB limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 5. Request timestamp middleware (custom)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sticobytes API is running",
    version: "1.0.0",
    timestamp: req.requestTime,
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend server is running!",
    timestamp: req.requestTime,
    environment: process.env.NODE_ENV || "development",
  });
});

// Database connection test route
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await query(
      "SELECT NOW() as current_time, version() as pg_version",
    );
    res.json({
      success: true,
      message: "Database connected successfully!",
      data: {
        currentTime: result.rows[0].current_time,
        postgresVersion: result.rows[0].pg_version,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Get all tables in database
app.get("/api/db-tables", async (req, res) => {
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    res.json({
      success: true,
      message: "Tables retrieved successfully",
      tables: result.rows.map((row) => row.table_name),
      count: result.rowCount,
    });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tables",
      error: error.message,
    });
  }
});

// ============================================
// API ROUTES
// ============================================

// Test routes
app.use("/api/test", testRoutes);

// Future routes (uncomment as you create them)

// Auth routes
app.use("/api/auth", authRoutes);

//Service routes
app.use("/api/services", serviceRoutes);

// Team routes
app.use("/api/team", teamRoutes);

//Gadget routes
app.use("/api/gadgets", gadgetRoutes);

// app.use('/api/blog', blogRoutes);

// app.use('/api/newsletter', newsletterRoutes);
// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler - must be after all routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  await pool.end();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing server...");
  await pool.end();
  process.exit(0);
});
