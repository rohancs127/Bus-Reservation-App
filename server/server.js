const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connection successful:", res.rows);
  }
  pool.end();
});
