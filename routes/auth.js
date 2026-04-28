const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/auth');

// Login
router.get('/login', ensureGuest, authController.getLogin);
router.post('/login', authController.postLogin);

// Register
router.get('/register', ensureGuest, authController.getRegister);
router.post('/register', authController.postRegister);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
