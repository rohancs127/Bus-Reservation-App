// models/routesModel.js
const pool = require('../db');

const RouteModel = {
  createRoute: async (source, destination, duration, fare) => {
    const result = await pool.query(
      'INSERT INTO routes (source, destination, duration, fare) VALUES ($1, $2, $3, $4) RETURNING *',
      [source, destination, duration, fare]
    );
    return result.rows[0];
  },

  getAllRoutes: async () => {
    const result = await pool.query('SELECT * FROM routes');
    return result.rows;
  },

  getRouteById: async (route_id) => {
    const result = await pool.query('SELECT * FROM routes WHERE route_id = $1', [route_id]);
    return result.rows[0];
  },

  updateRoute: async (route_id, source, destination, duration, fare) => {
    const result = await pool.query(
      'UPDATE routes SET source = $1, destination = $2, duration = $3, fare = $4 WHERE route_id = $5 RETURNING *',
      [source, destination, duration, fare, route_id]
    );
    return result.rows[0];
  },

  deleteRoute: async (route_id) => {
    await pool.query('DELETE FROM routes WHERE route_id = $1', [route_id]);
  },
};

module.exports = RouteModel;
