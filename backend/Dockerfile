# Укажите базовый образ
FROM node:14

# Установите рабочую директорию
WORKDIR /usr/src/app

# Копируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте все файлы в рабочую директорию
COPY . .

# Установите переменную окружения для порта
ENV PORT 3000

# Откройте порт
EXPOSE 3000

# Запустите приложение
CMD ["npm", "start"]
