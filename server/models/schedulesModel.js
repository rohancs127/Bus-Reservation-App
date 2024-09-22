// models/schedulesModel.js
const pool = require("../db");

const ScheduleModel = {
  createSchedule: async (
    bus_id,
    route_id,
    departure_time,
    arrival_time,
    available_seats
  ) => {
    const result = await pool.query(
      "INSERT INTO schedules (bus_id, route_id, departure_time, arrival_time, available_seats) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [bus_id, route_id, departure_time, arrival_time, available_seats]
    );
    return result.rows[0];
  },

  getAllSchedules: async () => {
    const result = await pool.query("SELECT * FROM schedules");
    return result.rows;
  },

  getScheduleById: async (schedule_id) => {
    const result = await pool.query(
      "SELECT * FROM schedules WHERE schedule_id = $1",
      [schedule_id]
    );
    return result.rows[0];
  },

  updateSchedule: async (
    schedule_id,
    bus_id,
    route_id,
    departure_time,
    arrival_time,
    available_seats
  ) => {
    const result = await pool.query(
      "UPDATE schedules SET bus_id = $1, route_id = $2, departure_time = $3, arrival_time = $4, available_seats = $5 WHERE schedule_id = $6 RETURNING *",
      [
        bus_id,
        route_id,
        departure_time,
        arrival_time,
        available_seats,
        schedule_id,
      ]
    );
    return result.rows[0];
  },

  deleteSchedule: async (schedule_id) => {
    await pool.query("DELETE FROM schedules WHERE schedule_id = $1", [
      schedule_id,
    ]);
  },

  decreaseAvailableSeats: async (schedule_id) => {
    await pool.query(
      "UPDATE schedules SET available_seats = available_seats - 1 WHERE schedule_id = $1 AND available_seats > 0",
      [schedule_id]
    );
  },

  increaseAvailableSeats: async (schedule_id) => {
    await pool.query(
      "UPDATE schedules SET available_seats = available_seats + 1 WHERE schedule_id = $1",
      [schedule_id]
    );
  },
};

module.exports = ScheduleModel;
