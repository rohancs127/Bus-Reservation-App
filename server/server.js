const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users");
const busRoutes = require("./routes/buses");
const routeRoutes = require("./routes/routes");
const scheduleRoutes = require("./routes/schedules");
const bookingRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/buses", busRoutes);
app.use("/routes", routeRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connection successful:", res.rows);
  }
});
