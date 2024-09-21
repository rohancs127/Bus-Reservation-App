const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      "SELECT * FROM bookings WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, schedule_id, seat_number, status } = req.body;
    const newBooking = await pool.query(
      "INSERT INTO bookings (user_id, schedule_id, seat_number, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, schedule_id, seat_number, status]
    );
    res.json(newBooking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { seat_number, status } = req.body;
    await pool.query(
      "UPDATE bookings SET seat_number = $1, status = $2 WHERE booking_id = $3",
      [seat_number, status, id]
    );
    res.json({ message: "Booking updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bookings WHERE booking_id = $1", [id]);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
