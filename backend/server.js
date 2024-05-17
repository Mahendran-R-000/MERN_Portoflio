const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();


// Enable CORS for all routes

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route for user login
//app.post('/login', authMiddleware.login);
app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
