import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../scripts/formatDate";
import { Link } from "react-router-dom";
import "../styles/bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.user.id;
        const response = await axios.get(
          `http://localhost:5000/bookings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  const handleEditClick = (bookingId) => {
    navigate(`/editBooking/${bookingId}`);
  };
  const handleDeleteClick = async (bookingId) => {
    navigate(`/deleteBooking/${bookingId}`);
  };
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bookings-page-div">
      <h2 className="heading">Your Bookings</h2>
      <Link to="createBooking">
        <button className="book-a-bus">Book A Bus</button>
      </Link>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-block">
          {bookings.map((booking) => (
            <div key={booking.booking_id}>
              <div className="bookings-content" id="source">
                Source: {booking.source}
              </div>
              <div className="bookings-content" id="destination">
                Destination: {booking.destination}
              </div>
              <div className="bookings-content">
                Booking ID: {booking.booking_id}
              </div>
              <div className="bookings-content">
                Bus Number: {booking.bus_number}
              </div>
              <div className="bookings-content">
                Seat Number: {booking.seat_number}
              </div>
              <div className="bookings-content">
                Date of Booking: {formatDate(booking.booking_date)}
              </div>
              <div className="bookings-content">
                Departure: {formatDate(booking.departure_time)}
              </div>
              <div className="bookings-content">
                Arrival: {formatDate(booking.arrival_time)}
              </div>
              <div className="bookings-content">Status: {booking.status}</div>
              <button
                className="bookings-button"
                onClick={() => handleEditClick(booking.booking_id)}
              >
                Edit
              </button>
              <button
                className="bookings-button"
                onClick={() => handleDeleteClick(booking.booking_id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;

//rahul.shetty@example.com
