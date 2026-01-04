const Contact = require('../models/Contact');
const EmailService = require('../services/emailService');

class ContactController {
  static async submitContactForm(req, res) {
    try {
      // Create contact instance
      const contactData = new Contact({
        ...req.body,
        services: req.body.services || []
      });

      // Send emails
      await EmailService.sendContactForm(contactData);

      // Log the submission (in future, save to database)
      console.log('New contact form submission:', {
        name: contactData.name,
        email: contactData.email,
        materialType: contactData.materialType,
        timestamp: contactData.timestamp,
        urgent: contactData.urgent
      });

      res.status(200).json({
        success: true,
        message: 'Thank you! Your quotation request has been submitted successfully. We will contact you soon.',
        data: {
          name: contactData.name,
          email: contactData.email,
          referenceId: `GNG-${Date.now()}`
        }
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit your request. Please try again or contact us directly.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = ContactController;