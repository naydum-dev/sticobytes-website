import pool from "../config/database.js";
// Get all services
const getAllServices = async (req, res) => {
  try {
    const { category, featured } = req.query;

    let query = "SELECT * FROM services";
    const conditions = [];
    const values = [];

    // Filter by category if provided
    if (category) {
      conditions.push(`category = $${values.length + 1}`);
      values.push(category);
    }

    // Filter by featured if provided
    if (featured !== undefined) {
      conditions.push(`is_featured = $${values.length + 1}`);
      values.push(featured === "true");
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching services",
      error: error.message,
    });
  }
};

// Get single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM services WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching service",
      error: error.message,
    });
  }
};

// Create new service (Admin only)
const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      features,
      price_range,
      duration,
      is_featured,
      whatsapp_message,
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO services 
       (title, description, icon, category, features, price_range, duration, is_featured, whatsapp_message) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        title,
        description,
        icon,
        category,
        features,
        price_range,
        duration,
        is_featured || false,
        whatsapp_message,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating service",
      error: error.message,
    });
  }
};

// Update service (Admin only)
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      icon,
      category,
      features,
      price_range,
      duration,
      is_featured,
      whatsapp_message,
    } = req.body;

    const result = await pool.query(
      `UPDATE services 
       SET title = $1, description = $2, icon = $3, category = $4, 
           features = $5, price_range = $6, duration = $7, is_featured = $8, 
           whatsapp_message = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [
        title,
        description,
        icon,
        category,
        features,
        price_range,
        duration,
        is_featured,
        whatsapp_message,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating service",
      error: error.message,
    });
  }
};

// Delete service (Admin only)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting service",
      error: error.message,
    });
  }
};

export {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
