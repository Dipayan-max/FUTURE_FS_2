const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { ensureAuthenticated } = require('../middleware/auth');

// All routes require authentication
router.use(ensureAuthenticated);

// List all contacts
router.get('/', contactController.getContacts);

// Show add form
router.get('/add', contactController.getAddContact);

// Create contact
router.post('/', contactController.postContact);

// Show single contact
router.get('/:id', contactController.getContact);

// Show edit form
router.get('/:id/edit', contactController.getEditContact);

// Update contact
router.post('/:id', contactController.updateContact);

// Delete contact
router.post('/:id/delete', contactController.deleteContact);

module.exports = router;
