const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const AuthController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
      );

      res.status(201).json({
        success: true,
        user: { id: result.rows[0].id, name, email },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { user: { email: user.email } },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  logout: (req, res) => {
    // Logic to handle logout (if needed)
    res.status(200).json({ message: "Logged out successfully" });
  },
};

module.exports = AuthController;
