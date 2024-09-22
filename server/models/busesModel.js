// models/busesModel.js
const pool = require("../db");

const BusModel = {
  createBus: async (bus_number, capacity, type, status) => {
    const result = await pool.query(
      "INSERT INTO buses (bus_number, capacity, type, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [bus_number, capacity, type, status]
    );
    return result.rows[0];
  },

  getAllBuses: async () => {
    const result = await pool.query("SELECT * FROM buses");
    return result.rows;
  },

  getBusById: async (bus_id) => {
    const result = await pool.query("SELECT * FROM buses WHERE bus_id = $1", [
      bus_id,
    ]);
    return result.rows[0];
  },

  updateBus: async (bus_id, bus_number, capacity, type, status) => {
    const result = await pool.query(
      "UPDATE buses SET bus_number = $1, capacity = $2, type = $3, status = $4 WHERE bus_id = $5 RETURNING *",
      [bus_number, capacity, type, status, bus_id]
    );
    return result.rows[0];
  },

  deleteBus: async (bus_id) => {
    await pool.query("DELETE FROM buses WHERE bus_id = $1", [bus_id]);
  },
};

module.exports = BusModel;
