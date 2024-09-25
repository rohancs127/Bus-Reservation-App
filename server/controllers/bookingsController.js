const pool = require("../db");
const BookingModel = require("../models/bookingsModel");
const ScheduleModel = require("../models/schedulesModel");

const BookingController = {
  createBooking: async (req, res) => {
    const { user_id, schedule_id, seat_number, status } = req.body;

    try {
      const schedule = await ScheduleModel.getScheduleById(schedule_id);
      console.log({ schedule });

      const bus = await pool.query(
        "SELECT capacity FROM buses WHERE bus_id = $1",
        [schedule.bus_id]
      );

      if (seat_number > bus.rows[0].capacity) {
        return res
          .status(400)
          .json({ message: "Seat number exceeds bus capacity." });
      }
      if (seat_number <= 0) {
        return res
          .status(400)
          .json({ message: "Please type a seat number above 0" });
      }
      if (schedule.available_seats <= 0) {
        return res
          .status(400)
          .json({ message: "No available seats on this bus." });
      }

      const existingBooking = await pool.query(
        'SELECT * FROM bookings WHERE schedule_id = $1 AND seat_number = $2',
        [schedule_id, seat_number]
      );
  
      if (existingBooking.rows.length > 0) {
        return res.status(400).json({ message: 'Seat already booked for this schedule.' });
      }

      const newBooking = await BookingModel.createBooking(
        user_id,
        schedule_id,
        seat_number,
        status
      );
      await ScheduleModel.decreaseAvailableSeats(schedule_id);

      res.status(201).json(newBooking);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getAllBookings: async (req, res) => {
    const { user_id } = req.params;
    try {
      const bookings = await BookingModel.getAllBookings(user_id);
      if (!bookings) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(bookings);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getBookingById: async (req, res) => {
    const { booking_id } = req.params;

    try {
      const booking = await BookingModel.getBookingById(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  updateBooking: async (req, res) => {
    const { booking_id } = req.params;
    const { seat_number, status, schedule_id } = req.body;

    console.log({ seat_number, status, schedule_id });

    try {
      const schedule = await ScheduleModel.getScheduleById(schedule_id);
      console.log({ schedule });

      const bus = await pool.query(
        "SELECT capacity FROM buses WHERE bus_id = $1",
        [schedule.bus_id]
      );

      if (seat_number > bus.rows[0].capacity) {
        return res
          .status(400)
          .json({ message: "Seat number exceeds bus capacity." });
      }
      if (seat_number <= 0) {
        return res
          .status(400)
          .json({ message: "Please type a seat number above 0" });
      }
      if (schedule.available_seats <= 0) {
        return res
          .status(400)
          .json({ message: "No available seats on this bus." });
      }

      const existingBooking = await pool.query(
        'SELECT * FROM bookings WHERE booking_id = $1',
        [booking_id]
      );
  
      if (existingBooking.rows.length === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      const duplicateBooking = await pool.query(
        'SELECT * FROM bookings WHERE schedule_id = $1 AND seat_number = $2 AND booking_id != $3',
        [schedule_id, seat_number, booking_id]
      );
  
      if (duplicateBooking.rows.length > 0) {
        return res.status(400).json({ message: 'Seat already booked for this schedule by another booking.' });
      }
      const updatedBooking = await BookingModel.updateBooking(
        booking_id,
        seat_number,
        status
      );
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  cancelBooking: async (req, res) => {
    const { booking_id } = req.params;

    try {
      const booking = await BookingModel.getBookingById(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      await BookingModel.deleteBooking(booking_id);
      await ScheduleModel.increaseAvailableSeats(booking.schedule_id);

      res.json({ message: "Booking canceled and seat availability updated" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
};

module.exports = BookingController;
