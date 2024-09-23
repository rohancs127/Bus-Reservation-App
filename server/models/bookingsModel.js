const pool = require("../db");

const BookingModel = {
  createBooking: async (user_id, schedule_id, seat_number, status) => {
    const result = await pool.query(
      "INSERT INTO bookings (user_id, schedule_id, seat_number, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, schedule_id, seat_number, status]
    );
    return result.rows[0];
  },

  getAllBookings: async (user_id) => {
    const result = await pool.query(
      "SELECT b.booking_id, b.user_id, b.seat_number, b.booking_date, b.status, s.schedule_id, s.arrival_time, s.departure_time, buses.bus_number, routes.source, routes.destination FROM bookings b JOIN schedules s ON b.schedule_id = s.schedule_id JOIN buses ON s.bus_id = buses.bus_id JOIN routes ON s.route_id = routes.route_id WHERE b.user_id = $1;",
      [user_id]
    );
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
