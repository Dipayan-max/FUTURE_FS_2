const passport = require('passport');
const User = require('../models/User');

// @desc    Show login page
// @route   GET /auth/login
exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

// @desc    Handle login
// @route   POST /auth/login
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
};

// @desc    Show register page
// @route   GET /auth/register
exports.getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

// @desc    Handle registration
// @route   POST /auth/register
exports.postRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  // Validation
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password && password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', {
      title: 'Register',
      errors,
      name,
      email,
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      errors.push({ msg: 'Email is already registered' });
      return res.render('auth/register', {
        title: 'Register',
        errors,
        name,
        email,
      });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    req.flash('success_msg', 'You are now registered. Please log in.');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Logout user
// @route   GET /auth/logout
exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash('success_msg', 'You have been logged out');
    res.redirect('/');
  });
};
