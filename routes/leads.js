const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { ensureAuthenticated } = require('../middleware/auth');

// All routes require authentication
router.use(ensureAuthenticated);

router.get('/', leadController.getLeads);
router.post('/', leadController.createLead);
router.get('/:id/json', leadController.getLeadJson);
router.post('/:id', leadController.updateLead);
router.post('/:id/delete', leadController.deleteLead);

module.exports = router;
