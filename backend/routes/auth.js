

// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// ---------------- SIGNUP ----------------
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: 'Invalid credentials' });

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
