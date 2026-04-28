const Contact = require('../models/Contact');

// @desc    Show all contacts
// @route   GET /contacts
exports.getContacts = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = { createdBy: req.user.id };

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();

    res.render('contacts/index', {
      title: 'Contacts',
      contacts,
      currentStatus: status || 'all',
      search: search || '',
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Show add contact form
// @route   GET /contacts/add
exports.getAddContact = (req, res) => {
  res.render('contacts/add', { title: 'Add Contact' });
};

// @desc    Create new contact
// @route   POST /contacts
exports.postContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, status, notes } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      status,
      notes,
      createdBy: req.user.id,
    });

    await contact.save();
    req.flash('success_msg', 'Contact added successfully');
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add contact');
    res.redirect('/contacts/add');
  }
};

// @desc    Show single contact
// @route   GET /contacts/:id
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).lean();

    if (!contact) {
      req.flash('error_msg', 'Contact not found');
      return res.redirect('/contacts');
    }

    res.render('contacts/show', { title: 'Contact Details', contact });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Show edit contact form
// @route   GET /contacts/:id/edit
exports.getEditContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).lean();

    if (!contact) {
      req.flash('error_msg', 'Contact not found');
      return res.redirect('/contacts');
    }

    res.render('contacts/edit', { title: 'Edit Contact', contact });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Server Error' });
  }
};

// @desc    Update contact
// @route   POST /contacts/:id
exports.updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, status, notes } = req.body;

    await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { firstName, lastName, email, phone, company, status, notes }
    );

    req.flash('success_msg', 'Contact updated successfully');
    res.redirect(`/contacts/${req.params.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to update contact');
    res.redirect('/contacts');
  }
};

// @desc    Delete contact
// @route   POST /contacts/:id/delete
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    req.flash('success_msg', 'Contact deleted successfully');
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete contact');
    res.redirect('/contacts');
  }
};
