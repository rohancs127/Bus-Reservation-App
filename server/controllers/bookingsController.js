const BookingModel = require("../models/bookingsModel");
const ScheduleModel = require("../models/schedulesModel");

const BookingController = {
  createBooking: async (req, res) => {
    const { user_id, schedule_id, seat_number } = req.body;

    try {
      const schedule = await ScheduleModel.getScheduleById(schedule_id);

      if (seat_number > schedule.capacity) {
        return res
          .status(400)
          .json({ message: "Seat number exceeds bus capacity." });
      }
      if (schedule.available_seats <= 0) {
        return res
          .status(400)
          .json({ message: "No available seats on this bus." });
      }

      const newBooking = await BookingModel.createBooking(
        user_id,
        schedule_id,
        seat_number
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
    const { seat_number } = req.body;

    try {
      const updatedBooking = await BookingModel.updateBooking(
        booking_id,
        seat_number
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
