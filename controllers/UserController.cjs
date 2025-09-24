const User = require('../models/User.cjs');
const express = require('express');
const router = express.Router();

router.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: { username, email } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.verifyPassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to verify password' });
      }
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
});

module.exports = router;
