const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validation');

// Submit contact form
router.post('/submit', validateContactForm, ContactController.submitContactForm);

// Health check for contact routes
router.get('/health', (req, res) => {
  res.json({ message: 'Contact routes are working' });
});

module.exports = router;