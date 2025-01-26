// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-option');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Подключение маршрутов
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Экспортируем приложение, чтобы оно было доступно для использования в других файлах (например, в bin/www)
module.exports = app;

