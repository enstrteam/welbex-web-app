const { body } = require('express-validator');

// Валидатор для регистрации пользователя
const registerValidator = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Email must be a valid email address')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required')
];

const loginValidator = [
  body('email')
    .isEmail().withMessage('Email must be a valid email address')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required')
];

module.exports = { registerValidator, loginValidator };
