const express = require("express");
const router = express.Router();
const RouteController = require("../controllers/routesController");

// POST request to create a new route
router.post("/", RouteController.createRoute);

// GET request to fetch all routes
router.get("/", RouteController.getAllRoutes);

// GET request to fetch a route by ID
router.get("/:route_id", RouteController.getRouteById);

// PUT request to update a route
router.put("/:route_id", RouteController.updateRoute);

// DELETE request to delete a route
router.delete("/:route_id", RouteController.deleteRoute);

module.exports = router;
