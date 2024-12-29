const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const folderRoutes = require('./routes/folderRoute');
const formRoutes = require('./routes/formRoute');

app.use(bodyParser.json());

app.use('/api', userRoutes)

app.use('/api', folderRoutes)

app.use('/api', formRoutes)

module.exports = app;