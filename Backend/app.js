const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const folderRoutes = require('./routes/folderRoute');
const formRoutes = require('./routes/formRoute');
const formBotRoutes = require('./routes/formBotRoute');

app.use(bodyParser.json());

app.use('/api', userRoutes)

app.use('/api', folderRoutes)

app.use('/api', formRoutes)

app.use('/api', formBotRoutes)

module.exports = app;