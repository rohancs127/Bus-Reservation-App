import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBooking = () => {
  const { booking_id } = useParams(); // Fetch the booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  // Fetch booking details (optional, for confirmation before deletion)
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bookings/booking/${booking_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details', error);
        setError('Failed to fetch booking details');
      }
    };

    fetchBookingDetails();
  }, [booking_id, token]);

  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${booking_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Booking deleted successfully');
      navigate('/bookings'); // Redirect to bookings page after deletion
    } catch (error) {
      console.error('Error deleting booking', error);
      setError('Failed to delete booking');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  return (
    <div>
      <h2>Are you sure you want to delete this booking?</h2>
      <p>Booking ID: {booking.booking_id}</p>
      <p>Seat Number: {booking.seat_number}</p>
      <p>Status: {booking.status}</p>
      <button onClick={handleDeleteBooking}>Delete Booking</button>
    </div>
  );
};

export default DeleteBooking;
