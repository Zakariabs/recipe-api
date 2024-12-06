// src/middleware/validate.js
const { body, validationResult } = require('express-validator');

exports.validateCategory = [
  body('name').notEmpty().trim(),
  body('description').notEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];