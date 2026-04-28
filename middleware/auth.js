module.exports = {
  // Ensure user is authenticated — redirect to login if not
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to access this page');
    res.redirect('/auth/login');
  },

  // Ensure user is NOT authenticated — redirect to dashboard if already logged in
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
    }
    next();
  },

  // Ensure user has a specific role
  ensureRole: (...roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        req.flash('error_msg', 'Please log in to access this page');
        return res.redirect('/auth/login');
      }
      if (roles.includes(req.user.role)) {
        return next();
      }
      req.flash('error_msg', 'You do not have permission to access this page');
      res.redirect('/dashboard');
    };
  },
};
