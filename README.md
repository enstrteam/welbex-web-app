# Welbex Web App

## Описание
Welbex Web App - это веб-приложение, включающее бэкенд и фронтенд части.
- **Бэкенд**: построен на Node.js и использует PostgreSQL для хранения данных.
- **Фронтенд**: разработан с использованием React и Vite.
- **Docker**: используется для контейнеризации всех компонентов.

## Структура проекта
```
. welbex web app
├── backend/               # Бэкенд-приложение
│  ├── Dockerfile          # Dockerfile для бэкенда
│  ├── app.js              # Точка входа для сервера
│  ├── routes/             # Роуты API
│  ├── models/             # Модели базы данных
│  ├── config/             # Конфигурации
│  ├── controllers/        # Логика API
│  ├── middleware/         # Middleware
│  ├── views/              # Представления (Jade)
│  └── package.json        # Зависимости проекта
├── welbex-frontend/       # Фронтенд-приложение
│  ├── Dockerfile          # Dockerfile для фронтенда
│  ├── src/                # Исходный код React-приложения
│  ├── public/             # Статические файлы
│  ├── package.json        # Зависимости фронтенда
│  └── vite.config.ts      # Конфигурация Vite
├── docker-compose.yml     # Docker Compose для сборки всех сервисов
└── README.md              # Данный файл
```

## Запуск проекта

### Через Docker
1. Убедитесь, что установлен Docker и Docker Compose.
2. Создайте файл `.env` в корне проекта и добавьте нужные переменные среды (например, для базы данных).
3. Запустите команду:
   ```bash
   docker-compose up --build
   ```
4. Приложение будет доступно по адресу `http://localhost:3000`.

### Локально (без Docker)

#### Бэкенд
1. Перейдите в папку `backend/`:
   ```bash
   cd backend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите сервер:
   ```bash
   npm run dev
   ```

#### Фронтенд
1. Перейдите в папку `welbex-frontend/`:
   ```bash
   cd welbex-frontend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите dev-сервер:
   ```bash
   npm run dev
   ```
4. Откройте `http://localhost:5173` в браузере.

## Переменные окружения
Создайте `.env` файлы в корневой папке проекта и заполните переменные, такие как:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
JWT_SECRET=your_secret
```

