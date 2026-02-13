import pool from "../config/database.js";

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getAllTeamMembers = async (req, res) => {
  try {
    const { active } = req.query;

    let query = "SELECT * FROM team_members";
    const params = [];

    // Filter by active status if provided
    if (active !== undefined) {
      query += " WHERE is_active = $1";
      params.push(active === "true");
    }

    query += " ORDER BY display_order ASC";

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
      error: error.message,
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM team_members WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team member",
      error: error.message,
    });
  }
};

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin (not protected yet)
export const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      role,
      bio,
      photo,
      email,
      phone,
      social_links,
      display_order,
      is_active,
    } = req.body;

    // Validation
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO team_members 
            (name, role, bio, photo, email, phone, social_links, display_order, is_active) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
      [
        name,
        role,
        bio || null,
        photo || null,
        email || null,
        phone || null,
        social_links || null,
        display_order || 0,
        is_active !== undefined ? is_active : true,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin (not protected yet)
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      bio,
      photo,
      email,
      phone,
      social_links,
      display_order,
      is_active,
    } = req.body;

    // Check if team member exists
    const checkResult = await pool.query(
      "SELECT * FROM team_members WHERE id = $1",
      [id],
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const result = await pool.query(
      `UPDATE team_members 
            SET name = $1, role = $2, bio = $3, photo = $4, email = $5, 
                phone = $6, social_links = $7, display_order = $8, is_active = $9, 
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = $10 
            RETURNING *`,
      [
        name,
        role,
        bio,
        photo,
        email,
        phone,
        social_links,
        display_order,
        is_active,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin (not protected yet)
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM team_members WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};
