# Указываем базовый образ для Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем фронтенд с помощью Vite
RUN npm run build

# Устанавливаем сервер для отдачи статичных файлов (например, serve)
RUN npm install -g serve

# Открываем порт
EXPOSE 5000

# Запускаем сервер для отдачи статических файлов
CMD ["serve", "-s", "dist", "-l", "5000"]
