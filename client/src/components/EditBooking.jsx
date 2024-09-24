import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBooking = () => {
  const { booking_id } = useParams(); // Fetch the booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [seatNumber, setSeatNumber] = useState(""); // Initialize with empty string
  const [status, setStatus] = useState(""); // Initialize with empty string
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bookings/booking/${booking_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setBooking(data);
        setSeatNumber(data.seat_number || ""); // Set default if undefined
        setStatus(data.status || ""); // Set default if undefined
      } catch (error) {
        console.error("Error fetching booking details", error);
      }
    };

    fetchBookingDetails();
  }, [booking_id]);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    console.log({ booking });
    try {
      const response = await axios.put(
        `http://localhost:5000/bookings/${booking_id}`,
        {
          seat_number: seatNumber,
          status: status,
          schedule_id: booking.schedule_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Booking updated:", response.data);
      navigate("/bookings"); // Redirect back to bookings page
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Booking</h2>
      <form onSubmit={handleUpdateBooking}>
        <div>
          <label>Seat Number:</label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default EditBooking;
