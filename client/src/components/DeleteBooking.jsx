import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/deleteBooking.css";

const DeleteBooking = () => {
  const { booking_id } = useParams(); 
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
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
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details", error);
        setError("Failed to fetch booking details");
      }
    };

    fetchBookingDetails();
  }, [booking_id, token]);

  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${booking_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Booking deleted successfully");
      navigate("/bookings"); 
    } catch (error) {
      console.error("Error deleting booking", error);
      setError("Failed to delete booking");
    }
  };
  const handleCancel = ()=>{
    navigate('/bookings')
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  return (
    <div>
      <div className="overlay"></div> 
      <div className="delete-booking-div">
        <h2 className="heading">
          Are you sure you want to delete this booking?
        </h2>
        <div className="delete-booking-content">
          <strong>Booking ID:</strong> {booking.booking_id}
        </div>
        <div className="delete-booking-content">
          <strong>Seat Number:</strong> {booking.seat_number}
        </div>
        <div className="delete-booking-content">
          <strong>Status:</strong> {booking.status}
        </div>
        <button onClick={handleDeleteBooking}>Delete Booking</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteBooking;
