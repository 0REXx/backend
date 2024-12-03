require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const shoppingListRoutes = require('./routes/shoppingListRoutes');
const participantRoutes = require('./routes/participantRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/shopping-lists', shoppingListRoutes);
app.use('/api/participants', participantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
