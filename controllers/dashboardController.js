const Contact = require('../models/Contact');

// @desc    Show dashboard with stats
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments({ createdBy: req.user.id });
    const leads = await Contact.countDocuments({ createdBy: req.user.id, status: 'lead' });
    const prospects = await Contact.countDocuments({ createdBy: req.user.id, status: 'prospect' });
    const customers = await Contact.countDocuments({ createdBy: req.user.id, status: 'customer' });

    const recentContacts = await Contact.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.render('dashboard', {
      title: 'Dashboard',
      user: req.user,
      stats: { totalContacts, leads, prospects, customers },
      recentContacts,
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};
