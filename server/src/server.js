const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();

// Ensure models are loaded and associations applied
require("./models/User");
require("./models/Teacher");

const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || "*"}));
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/teachers", teacherRoutes);

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // for dev; in prod use migrations
    app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
  } catch (e) {
    console.error("DB connection failed:", e.message);
    process.exit(1);
  }
})();
