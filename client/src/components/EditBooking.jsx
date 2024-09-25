import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editBooking.css";

const EditBooking = () => {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);
  const [seatNumber, setSeatNumber] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");

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
        setSeatNumber(data.seat_number || "");
        setStatus(data.status || "");
      } catch (error) {
        setErrorMessage("Error fetching booking details", error);
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
      navigate("/bookings");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Please enter a valid seat number");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-booking-div">
      <h2 className="heading">Edit Booking</h2>
      <form className="edit-booking-block" onSubmit={handleUpdateBooking}>
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
        <button type="submit">Update</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default EditBooking;
