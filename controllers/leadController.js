const Contact = require('../models/Contact');

// @desc    Get all leads (contacts with status lead/prospect)
// @route   GET /leads
exports.getLeads = async (req, res) => {
  try {
    // Load all leads/prospects — client-side JS handles live filtering
    const leads = await Contact.find({
      createdBy: req.user.id,
      status: { $in: ['lead', 'prospect'] },
    }).sort({ createdAt: -1 }).lean();

    // Map to include a `name` field for the view
    const mapped = leads.map(l => ({
      ...l,
      name: `${l.firstName} ${l.lastName}`,
    }));

    res.render('leads/index', {
      title: 'Leads',
      leads: mapped,
      active: 'leads',
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Create a new lead (creates a Contact with status lead)
// @route   POST /leads
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;

    // Split name into first and last
    const parts = (name || '').trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      status: status || 'lead',
      notes,
      createdBy: req.user.id,
    });

    req.flash('success_msg', 'Lead added successfully');
    res.redirect('/leads');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add lead');
    res.redirect('/leads');
  }
};

// @desc    Get single lead as JSON (for edit modal)
// @route   GET /leads/:id/json
exports.getLeadJson = async (req, res) => {
  try {
    const lead = await Contact.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).lean();

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Add combined name for the edit form
    lead.name = `${lead.firstName} ${lead.lastName}`;
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update lead
// @route   POST /leads/:id
exports.updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;

    const parts = (name || '').trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { firstName, lastName, email, phone, company, status, notes }
    );

    req.flash('success_msg', 'Lead updated successfully');
    res.redirect('/leads');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to update lead');
    res.redirect('/leads');
  }
};

// @desc    Delete lead
// @route   POST /leads/:id/delete
exports.deleteLead = async (req, res) => {
  try {
    await Contact.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    req.flash('success_msg', 'Lead deleted successfully');
    res.redirect('/leads');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete lead');
    res.redirect('/leads');
  }
};
