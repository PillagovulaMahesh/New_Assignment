// backend/routes/students.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');

// 📌 Get own profile
router.get('/me', auth, async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ msg: 'Profile not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📌 Update own profile
router.put('/me', auth, async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const updated = await Student.findOneAndUpdate(
      { user: req.user.id },
      { name, email, course },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
