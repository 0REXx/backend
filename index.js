require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./app/middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/shopping-lists', shoppingListRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));