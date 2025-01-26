const express = require('express');
const { register, login, profile } = require('../controllers/auth-controller');
const { registerValidator, loginValidator } = require('../validations/auth');
const { validationResult } = require('express-validator');
const { validate } = require('../middleware/validate');
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Регистрация нового пользователя
 *     responses:
 *       200:
 *         description: Успешная регистрация
 */
router.post('/register', registerValidator, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Логин пользователя
 *     responses:
 *       200:
 *         description: Успешный логин
 */
router.post('/login', loginValidator, validate, login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     description: Профиль пользователя
 *     responses:
 *       200:
 *         description: Профиль пользователя
 */
router.get('/profile', profile);

module.exports = router;
