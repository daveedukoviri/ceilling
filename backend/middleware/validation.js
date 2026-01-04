const { body, validationResult } = require('express-validator');

const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid Indian phone number'),
  
  body('materialType')
    .notEmpty().withMessage('Material type is required'),
  
  body('quantity')
    .notEmpty().withMessage('Quantity is required'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Project details are required')
    .isLength({ min: 10 }).withMessage('Please provide more details about your project'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = { validateContactForm };