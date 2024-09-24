import React, { useState } from "react";
import axios from "axios";
import '../styles/createBooking.css'
import { useNavigate } from "react-router-dom";

const CreateBooking = ({ userId }) => {
  const [scheduleId, setScheduleId] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.user.id;
      const response = await axios.post(
        "http://localhost:5000/bookings",
        {
          user_id: userId,
          schedule_id: scheduleId,
          seat_number: seatNumber,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      console.log(response.data);
      navigate('/bookings')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-booking-page-div">
      <div className="heading">Book a Bus</div>
      <form className="create-booking-block" onSubmit={handleCreateBooking}>
        <input
          type="text"
          value={scheduleId}
          onChange={(e) => setScheduleId(e.target.value)}
          placeholder="Schedule ID"
          required
        />
        <input
          type="text"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          placeholder="Seat Number"
          required
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default CreateBooking;
