import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../scripts/formatDate";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/schedules");
        setSchedules(response.data);
        setError(""); 
      } catch (err) {
        setError("Failed to fetch Schedules");
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div>
      <h1>Schedules</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.schedule_id}>
              <p>Bus No.: {schedule.bus_number}</p>
              <p>Source: {schedule.route_source}</p>
              <p>Destination: {schedule.route_destination}</p>
              <p>Departure Time: {formatDate(schedule.departure_time)}</p>
              <p>Arrival Time: {formatDate(schedule.arrival_time)}</p>
              <p>Available seats: {schedule.available_seats}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedules;
