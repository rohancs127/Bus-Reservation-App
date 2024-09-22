const ScheduleModel = require("../models/schedulesModel");

const ScheduleController = {
  createSchedule: async (req, res) => {
    const { bus_id, route_id, departure_time, arrival_time, available_seats } =
      req.body;

    try {
      const newSchedule = await ScheduleModel.createSchedule(
        bus_id,
        route_id,
        departure_time,
        arrival_time,
        available_seats
      );
      res.status(201).json(newSchedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getAllSchedules: async (req, res) => {
    try {
      const schedules = await ScheduleModel.getAllSchedules();
      res.json(schedules);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getScheduleById: async (req, res) => {
    const { schedule_id } = req.params;

    try {
      const schedule = await ScheduleModel.getScheduleById(schedule_id);
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.json(schedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  updateSchedule: async (req, res) => {
    const { schedule_id } = req.params;
    const { bus_id, route_id, departure_time, arrival_time, available_seats } =
      req.body;

    try {
      const updatedSchedule = await ScheduleModel.updateSchedule(
        schedule_id,
        bus_id,
        route_id,
        departure_time,
        arrival_time,
        available_seats
      );
      if (!updatedSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.json(updatedSchedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  deleteSchedule: async (req, res) => {
    const { schedule_id } = req.params;

    try {
      await ScheduleModel.deleteSchedule(schedule_id);
      res.json({ message: "Schedule deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
};

module.exports = ScheduleController;
