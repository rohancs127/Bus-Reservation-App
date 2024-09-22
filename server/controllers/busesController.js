const BusModel = require("../models/busesModel");

const BusController = {
  createBus: async (req, res) => {
    const { bus_number, capacity, type, status } = req.body;

    try {
      const newBus = await BusModel.createBus(
        bus_number,
        capacity,
        type,
        status
      );
      res.status(201).json(newBus);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getAllBuses: async (req, res) => {
    try {
      const buses = await BusModel.getAllBuses();
      res.json(buses);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getBusById: async (req, res) => {
    const { bus_id } = req.params;

    try {
      const bus = await BusModel.getBusById(bus_id);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.json(bus);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  updateBus: async (req, res) => {
    const { bus_id } = req.params;
    const { bus_number, capacity, type, status } = req.body;

    try {
      const updatedBus = await BusModel.updateBus(
        bus_id,
        bus_number,
        capacity,
        type,
        status
      );
      if (!updatedBus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.json(updatedBus);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  deleteBus: async (req, res) => {
    const { bus_id } = req.params;

    try {
      await BusModel.deleteBus(bus_id);
      res.json({ message: "Bus deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
};

module.exports = BusController;
