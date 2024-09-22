const express = require("express");
const router = express.Router();
const BusController = require("../controllers/busesController");

// POST request to create a new bus
router.post("/", BusController.createBus);

// GET request to fetch all buses
router.get("/", BusController.getAllBuses);

// GET request to fetch a bus by ID
router.get("/:bus_id", BusController.getBusById);

// PUT request to update a bus
router.put("/:bus_id", BusController.updateBus);

// DELETE request to delete a bus
router.delete("/:bus_id", BusController.deleteBus);

module.exports = router;
