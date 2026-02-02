import pool from "../config/database.js";
import bcrypt from "bcryptjs";

class User {
  /**
   * Create a new user with hashed password
   * @param {Object} userData - { username, email, password, role }
   * @returns {Object} - Created user without password
   */
  static async create({ username, email, password, role = "user" }) {
    try {
      // Hash password with bcrypt (10 salt rounds)
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const query = `
        INSERT INTO users (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email, role, created_at
      `;

      const result = await pool.query(query, [
        username,
        email,
        passwordHash,
        role,
      ]);
      return result.rows[0];
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === "23505") {
        if (error.constraint === "users_email_key") {
          throw new Error("Email already exists");
        }
        if (error.constraint === "users_username_key") {
          throw new Error("Username already exists");
        }
      }
      throw error;
    }
  }

  /**
   * Find user by email (includes password hash for login)
   * @param {string} email
   * @returns {Object|null} - User object with password_hash
   */
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Find user by ID (without password)
   * @param {number} id
   * @returns {Object|null} - User object without password_hash
   */
  static async findById(id) {
    const query =
      "SELECT id, username, email, role, created_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Find user by username (without password)
   * @param {string} username
   * @returns {Object|null}
   */
  static async findByUsername(username) {
    const query =
      "SELECT id, username, email, role, created_at FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
  }

  /**
   * Compare plain password with hashed password
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Get all users (without passwords)
   * @returns {Array} - Array of user objects
   */
  static async findAll() {
    const query =
      "SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Update user details
   * @param {number} id
   * @param {Object} updates - { username, email }
   * @returns {Object} - Updated user
   */
  static async update(id, updates) {
    const { username, email } = updates;
    const query = `
      UPDATE users 
      SET username = COALESCE($1, username),
          email = COALESCE($2, email)
      WHERE id = $3
      RETURNING id, username, email, role, created_at
    `;
    const result = await pool.query(query, [username, email, id]);
    return result.rows[0];
  }

  /**
   * Delete user
   * @param {number} id
   * @returns {boolean}
   */
  static async delete(id) {
    const query = "DELETE FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }
}

export default User;
