import pool from "../config/database.js";

// Get all gadgets (with optional filters)
export const getAllGadgets = async (req, res) => {
  try {
    const { category, stock_status, featured } = req.query;

    let query = "SELECT * FROM gadgets WHERE 1=1";
    const params = [];
    let paramCount = 1;

    // Filter by category
    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    // Filter by stock status
    if (stock_status) {
      query += ` AND stock_status = $${paramCount}`;
      params.push(stock_status);
      paramCount++;
    }

    // Filter by featured
    if (featured !== undefined) {
      query += ` AND is_featured = $${paramCount}`;
      params.push(featured === "true");
      paramCount++;
    }

    query += " ORDER BY is_featured DESC, id ASC";

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gadgets",
      error: error.message,
    });
  }
};

// Get single gadget by ID
export const getGadgetById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM gadgets WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching gadget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gadget",
      error: error.message,
    });
  }
};

// Create new gadget (Admin only - will protect later)
export const createGadget = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      stock_status,
      whatsapp_message,
      is_featured,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO gadgets 
       (name, description, price, image, category, stock_status, whatsapp_message, is_featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        name,
        description,
        price,
        image,
        category,
        stock_status,
        whatsapp_message,
        is_featured,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Gadget created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating gadget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create gadget",
      error: error.message,
    });
  }
};

// Update gadget (Admin only - will protect later)
export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      image,
      category,
      stock_status,
      whatsapp_message,
      is_featured,
    } = req.body;

    const result = await pool.query(
      `UPDATE gadgets 
       SET name = $1, description = $2, price = $3, image = $4, 
           category = $5, stock_status = $6, whatsapp_message = $7, 
           is_featured = $8, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $9 
       RETURNING *`,
      [
        name,
        description,
        price,
        image,
        category,
        stock_status,
        whatsapp_message,
        is_featured,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gadget updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating gadget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update gadget",
      error: error.message,
    });
  }
};

// Delete gadget (Admin only - will protect later)
export const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM gadgets WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Gadget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gadget deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete gadget",
      error: error.message,
    });
  }
};
