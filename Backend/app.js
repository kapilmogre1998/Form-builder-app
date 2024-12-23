const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');

app.use(bodyParser.json());

app.use('/api', userRoutes)

module.exports = app;