const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware для проверки JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {
    // Проверяем и декодируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Сохраняем информацию о пользователе в объекте запроса
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
