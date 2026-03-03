import { query } from "../config/database.js";

// Generate unique registration number
const generateRegistrationNumber = async () => {
  const year = new Date().getFullYear();
  const result = await query("SELECT COUNT(*) FROM course_registrations");
  const count = parseInt(result.rows[0].count) + 1;
  const padded = String(count).padStart(4, "0");
  return `SB-${year}-${padded}`;
};

// Register for a course
export const registerForCourse = async (req, res) => {
  try {
    const {
      course_name,
      full_name,
      email,
      phone,
      whatsapp_number,
      location,
      how_you_heard,
    } = req.body;

    // Validate required fields
    if (!course_name || !full_name || !email || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Generate registration number
    const registration_number = await generateRegistrationNumber();

    // Set payment deadline (72 hours from now)
    const payment_deadline = new Date();
    payment_deadline.setHours(payment_deadline.getHours() + 72);

    // Save to database
    const result = await query(
      `INSERT INTO course_registrations 
        (registration_number, course_name, full_name, email, 
         phone, whatsapp_number, location, how_you_heard, payment_deadline)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        registration_number,
        course_name,
        full_name,
        email,
        phone,
        whatsapp_number || phone,
        location,
        how_you_heard || "Not specified",
        payment_deadline,
      ],
    );

    const registration = result.rows[0];

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        registration_number: registration.registration_number,
        course_name: registration.course_name,
        full_name: registration.full_name,
        email: registration.email,
        phone: registration.phone,
        payment_deadline: registration.payment_deadline,
      },
    });
  } catch (error) {
    console.error("Course registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Get all registrations (admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM course_registrations 
       ORDER BY registered_at DESC`,
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};

// Update payment status (admin)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status } = req.body;

    const result = await query(
      `UPDATE course_registrations 
       SET payment_status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [payment_status, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
    });
  }
};
