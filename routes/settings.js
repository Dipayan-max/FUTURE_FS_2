const express = require('express');
const router = express.Router();
const s = require('../controllers/settingsController');
const { ensureAuthenticated } = require('../middleware/auth');

router.use(ensureAuthenticated);

router.get('/', s.getSettings);
router.post('/profile', s.updateProfile);
router.post('/password', s.changePassword);

module.exports = router;
