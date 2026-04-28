const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Settings page
// @route   GET /settings
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    res.render('settings', {
      title: 'Settings',
      active: 'settings',
      profile: user,
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Update profile
// @route   POST /settings/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if email is already used by another user
    const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existing) {
      req.flash('error_msg', 'Email is already in use by another account');
      return res.redirect('/settings');
    }

    await User.findByIdAndUpdate(req.user.id, { name, email });
    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/settings');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to update profile');
    res.redirect('/settings');
  }
};

// @desc    Change password
// @route   POST /settings/password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      req.flash('error_msg', 'New passwords do not match');
      return res.redirect('/settings');
    }

    if (newPassword.length < 6) {
      req.flash('error_msg', 'Password must be at least 6 characters');
      return res.redirect('/settings');
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      req.flash('error_msg', 'Current password is incorrect');
      return res.redirect('/settings');
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    req.flash('success_msg', 'Password changed successfully');
    res.redirect('/settings');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to change password');
    res.redirect('/settings');
  }
};
