// models/bookingsModel.js
const pool = require("../db");

const BookingModel = {
  createBooking: async (user_id, schedule_id, seat_number) => {
    const result = await pool.query(
      "INSERT INTO bookings (user_id, schedule_id, seat_number) VALUES ($1, $2, $3) RETURNING *",
      [user_id, schedule_id, seat_number]
    );
    return result.rows[0];
  },

  getAllBookings: async () => {
    const result = await pool.query("SELECT * FROM bookings");
    return result.rows;
  },

  getBookingById: async (booking_id) => {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE booking_id = $1",
      [booking_id]
    );
    return result.rows[0];
  },

  updateBooking: async (booking_id, seat_number) => {
    const result = await pool.query(
      "UPDATE bookings SET seat_number = $1 WHERE booking_id = $2 RETURNING *",
      [seat_number, booking_id]
    );
    return result.rows[0];
  },

  deleteBooking: async (booking_id) => {
    await pool.query("DELETE FROM bookings WHERE booking_id = $1", [
      booking_id,
    ]);
  },
};

module.exports = BookingModel;
