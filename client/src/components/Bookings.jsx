import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../scripts/formatDate';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.user.id; // Get the user ID from the token
        const response = await axios.get(`http://localhost:5000/bookings/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data);
      } catch (error) {
        setError('Failed to fetch bookings');
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.booking_id}>
              <p>Booking ID: {booking.booking_id}</p> 
              <p>Bus Number: {booking.bus_number}</p>
              <p>Seat: {booking.seat_number}</p>
              <p>Source: {booking.source}</p>
              <p>Destination: {booking.destination}</p>
              <p>Date of Booking: {formatDate(booking.booking_date)}</p>
              <p>Departure: {formatDate(booking.departure_time)}</p>
              <p>Arrival: {formatDate(booking.arrival_time)}</p>
              <p>Seat: {booking.seat_number}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;

//rahul.shetty@example.com