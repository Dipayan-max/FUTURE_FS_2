const express = require('express');
const router = express.Router();
const c = require('../controllers/customerController');
const { ensureAuthenticated } = require('../middleware/auth');

router.use(ensureAuthenticated);

router.get('/', c.getCustomers);
router.post('/', c.createCustomer);
router.get('/:id', c.getProfile);
router.get('/:id/json', c.getCustomerJson);
router.post('/:id', c.updateCustomer);
router.post('/:id/delete', c.deleteCustomer);
router.post('/:id/interactions', c.addInteraction);
router.post('/:id/interactions/:interactionId/delete', c.deleteInteraction);

module.exports = router;
