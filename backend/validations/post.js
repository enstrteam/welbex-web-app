const { body } = require('express-validator');

// Валидатор для создания и редактирования поста
const postValidator = [
  body('content')
    .isString().withMessage('Content must be a string')
    .notEmpty().withMessage('Content is required'),

  body('image')
    .optional()
    .isString().withMessage('Image must be a string'),

  body('video')
    .optional()
    .isString().withMessage('Video must be a string')
];

module.exports = { postValidator };
