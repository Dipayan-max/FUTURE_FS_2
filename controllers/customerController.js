const Contact = require('../models/Contact');

// @desc    List all customers (contacts with status 'customer')
// @route   GET /customers
exports.getCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {
      createdBy: req.user.id,
      status: 'customer',
    };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Contact.find(filter).sort({ createdAt: -1 }).lean();

    // Map to include a `name` field for the view
    const mapped = customers.map(c => ({
      ...c,
      name: `${c.firstName} ${c.lastName}`,
      totalRevenue: 0,
      status: 'active',
    }));

    const summary = {
      total: mapped.length,
      activeCount: mapped.length,
      totalRevenue: 0,
    };

    res.render('customers/index', {
      title: 'Customers',
      customers: mapped,
      currentStatus: 'all',
      search: search || '',
      active: 'customers',
      summary,
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Create customer (creates a Contact with status customer)
// @route   POST /customers
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, address, notes } = req.body;

    const parts = (name || '').trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      status: 'customer',
      notes,
      createdBy: req.user.id,
    });

    req.flash('success_msg', 'Customer added successfully');
    res.redirect('/customers');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add customer');
    res.redirect('/customers');
  }
};

// @desc    Customer profile page
// @route   GET /customers/:id
exports.getProfile = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).lean();

    if (!contact) {
      req.flash('error_msg', 'Customer not found');
      return res.redirect('/customers');
    }

    // Map to customer shape expected by the view
    const customer = {
      ...contact,
      name: `${contact.firstName} ${contact.lastName}`,
      totalRevenue: 0,
      address: '',
      interactions: [],
    };

    res.render('customers/profile', {
      title: customer.name,
      customer,
      active: 'customers',
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Get customer JSON (for edit modal)
// @route   GET /customers/:id/json
exports.getCustomerJson = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).lean();

    if (!contact) return res.status(404).json({ error: 'Not found' });

    contact.name = `${contact.firstName} ${contact.lastName}`;
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update customer
// @route   POST /customers/:id
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    const parts = (name || '').trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { firstName, lastName, email, phone, company, notes }
    );

    req.flash('success_msg', 'Customer updated');
    res.redirect('/customers/' + req.params.id);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to update customer');
    res.redirect('/customers/' + req.params.id);
  }
};

// @desc    Delete customer
// @route   POST /customers/:id/delete
exports.deleteCustomer = async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    req.flash('success_msg', 'Customer deleted');
    res.redirect('/customers');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete customer');
    res.redirect('/customers');
  }
};

// @desc    Add interaction/note (stored in contact notes for now)
// @route   POST /customers/:id/interactions
exports.addInteraction = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const contact = await Contact.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (contact) {
      const entry = `[${new Date().toLocaleDateString()}] ${subject}${description ? ': ' + description : ''}`;
      contact.notes = contact.notes ? contact.notes + '\n' + entry : entry;
      await contact.save();
    }

    req.flash('success_msg', 'Note added');
    res.redirect('/customers/' + req.params.id);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add note');
    res.redirect('/customers/' + req.params.id);
  }
};

// @desc    Delete interaction (no-op since interactions are in notes now)
// @route   POST /customers/:id/interactions/:interactionId/delete
exports.deleteInteraction = async (req, res) => {
  req.flash('info_msg', 'Notes can be edited from the edit customer form');
  res.redirect('/customers/' + req.params.id);
};
