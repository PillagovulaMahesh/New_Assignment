// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 📌 Get all students (with pagination)
router.get('/students', auth, roles('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.find().skip(skip).limit(limit),
      Student.countDocuments()
    ]);

    res.json({
      students,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📌 Add new student (creates both User + Student)
router.post('/students', auth, roles('admin'), async (req, res) => {
  try {
    const { name, email, course, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email & password are required' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hash, role: 'student', emailVerified: true });
    await user.save();

    const student = new Student({ user: user._id, name, email, course });
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📌 Update student
router.put('/students/:id', auth, roles('admin'), async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📌 Delete student
router.delete('/students/:id', auth, roles('admin'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    await User.findByIdAndDelete(student.user); // delete linked user
    await student.deleteOne();

    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
