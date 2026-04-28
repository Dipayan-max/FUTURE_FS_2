const express = require('express');
const router = express.Router();
const { ensureGuest } = require('../middleware/auth');

// @desc    Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('index', { title: 'Welcome to CRM' });
});

module.exports = router;
