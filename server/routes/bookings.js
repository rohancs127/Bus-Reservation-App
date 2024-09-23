const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingsController");

// POST request to create a new booking
router.post("/", BookingController.createBooking);

// GET request to fetch all bookings
router.get("/:user_id", BookingController.getAllBookings);

// GET request to fetch a booking by ID
router.get("/:booking_id", BookingController.getBookingById);

// PUT request to update a booking
router.put("/:booking_id", BookingController.updateBooking);

// DELETE request to cancel a booking
router.delete("/:booking_id", BookingController.cancelBooking);

module.exports = router;
