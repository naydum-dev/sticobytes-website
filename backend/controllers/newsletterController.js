import pool from "../config/database.js";

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    const existing = await pool.query(
      "SELECT id, is_active FROM newsletter_subscribers WHERE email = $1",
      [email.toLowerCase().trim()],
    );

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_active) {
        return res
          .status(409)
          .json({ error: "This email is already subscribed" });
      } else {
        await pool.query(
          "UPDATE newsletter_subscribers SET is_active = TRUE, unsubscribed_at = NULL, subscribed_at = CURRENT_TIMESTAMP WHERE email = $1",
          [email.toLowerCase().trim()],
        );
        return res
          .status(200)
          .json({ message: "Welcome back! You have been re-subscribed." });
      }
    }

    await pool.query("INSERT INTO newsletter_subscribers (email) VALUES ($1)", [
      email.toLowerCase().trim(),
    ]);

    res
      .status(201)
      .json({ message: "Successfully subscribed! Welcome to Sticobytes." });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, subscribed_at, is_active FROM newsletter_subscribers ORDER BY subscribed_at DESC",
    );
    res.json({ subscribers: result.rows, total: result.rows.length });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
};

export { subscribe, getAllSubscribers };
