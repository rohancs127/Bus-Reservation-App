import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking = ({ userId }) => {
  const [scheduleId, setScheduleId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user.id;
      const response = await axios.post('http://localhost:5000/bookings', {
        user_id: userId,
        schedule_id: scheduleId,
        seat_number: seatNumber,
        status: status
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCreateBooking}>
      <input type="text" value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} placeholder="Schedule ID" required />
      <input type="text" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} placeholder="Seat Number" required />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBooking;
