const RouteModel = require("../models/routesModel");

const RouteController = {
  createRoute: async (req, res) => {
    const { source, destination, duration, fare } = req.body;

    try {
      const newRoute = await RouteModel.createRoute(
        source,
        destination,
        duration,
        fare
      );
      res.status(201).json(newRoute);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getAllRoutes: async (req, res) => {
    try {
      const routes = await RouteModel.getAllRoutes();
      res.json(routes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getRouteById: async (req, res) => {
    const { route_id } = req.params;

    try {
      const route = await RouteModel.getRouteById(route_id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  updateRoute: async (req, res) => {
    const { route_id } = req.params;
    const { source, destination, duration, fare } = req.body;

    try {
      const updatedRoute = await RouteModel.updateRoute(
        route_id,
        source,
        destination,
        duration,
        fare
      );
      if (!updatedRoute) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(updatedRoute);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  deleteRoute: async (req, res) => {
    const { route_id } = req.params;

    try {
      await RouteModel.deleteRoute(route_id);
      res.json({ message: "Route deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
};

module.exports = RouteController;
