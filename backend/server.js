const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');

dotenv.config();

// Подключаемся к базе данных только если приложение не работает в режиме тестирования
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/shopping-lists', shoppingListRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// Запускаем сервер только если приложение не в тестовом режиме
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Экспортируем `app` для использования в тестах

