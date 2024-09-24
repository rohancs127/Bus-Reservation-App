import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../scripts/formatDate";
import '../styles/schedules.css'

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
    <div className="schedule-page-div">
      <h1 className="heading">Schedules</h1>
      {error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div className="schedule-block-div">
          {schedules.map((schedule) => (
            <div key={schedule.schedule_id}>
              <div></div>
              <div className="schedule-content" id="source">
                Source: {schedule.route_source}
              </div>
              <div className="schedule-content" id="destination">
                Destination: {schedule.route_destination}
              </div>
              <div className="schedule-content">
                <strong>Bus Number:</strong> {schedule.bus_number}
              </div>
              <div className="schedule-content">
                <strong>Departure Time:</strong> {formatDate(schedule.departure_time)}
              </div>
              <div className="schedule-content">
                <strong>Arrival Time:</strong> {formatDate(schedule.arrival_time)}
              </div>
              <div className="schedule-content">
                <strong>Available seats:</strong> {schedule.available_seats}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedules;
