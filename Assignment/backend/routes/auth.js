// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');

// 📌 Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, course } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hash, role: 'student' });
    await user.save();

    const student = new Student({ user: user._id, name, email, course });
    await student.save();

    res.json({ msg: 'Signup successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📌 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// (Optional) Email verification, Forgot/Reset password can be added here

module.exports = router;
