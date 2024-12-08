const { body, validationResult } = require('express-validator');

exports.validateCategory = [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateRecipe = [
    body('title')
        .notEmpty()
        .trim()
        .withMessage('Title is required'),
    body('ingredients')
        .isArray()
        .withMessage('Ingredients must be an array'),
    body('instructions')
        .notEmpty()
        .trim()
        .withMessage('Instructions are required'),
    body('cooking_time')
        .isInt({ min: 1 })
        .withMessage('Cooking time must be a positive number'),
    body('category_id')
        .isInt({ min: 1 })
        .withMessage('Valid category ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];