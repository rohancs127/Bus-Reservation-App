const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/schedulesController");

// POST request to create a new schedule
router.post("/", ScheduleController.createSchedule);

// GET request to fetch all schedules
router.get("/", ScheduleController.getAllSchedules);

// GET request to fetch a schedule by ID
router.get("/:schedule_id", ScheduleController.getScheduleById);

// PUT request to update a schedule
router.put("/:schedule_id", ScheduleController.updateSchedule);

// DELETE request to delete a schedule
router.delete("/:schedule_id", ScheduleController.deleteSchedule);

module.exports = router;
