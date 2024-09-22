// models/usersModel.js
const pool = require("../db");

const UserModel = {
  createUser: async (name, email, password) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return result.rows[0];
  },

  getAllUsers: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },

  getUserById: async (user_id) => {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    return result.rows[0];
  },

  updateUser: async (user_id, name, email, password) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
      [name, email, password, user_id]
    );
    return result.rows[0];
  },

  deleteUser: async (user_id) => {
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
  },
};

module.exports = UserModel;
