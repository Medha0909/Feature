const express = require("express");
const auth = require("../middleware/authMiddleware");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: [{ model: User, attributes: ["email", "first_name", "last_name"] }]
    });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
