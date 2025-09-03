const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");
const User = require("../models/User");
const Teacher = require("../models/Teacher");

const router = express.Router();

router.post("/register", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, first_name, last_name, password, university_name, gender, year_joined } = req.body;
    if (!email || !password) throw new Error("email and password are required");

    const exists = await User.findOne({ where: { email }, transaction: t });
    if (exists) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, first_name, last_name, password: hashed }, { transaction: t });
    await Teacher.create({ user_id: user.id, university_name, gender, year_joined }, { transaction: t });

    await t.commit();
    res.json({ message: "User and teacher created", user_id: user.id });
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
