const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const folderRoutes = require('./routes/folderRoute');
const formRoutes = require('./routes/formRoute');
const formBotRoutes = require('./routes/formBotRoute');
const shareRoutes = require('./routes/shareWorkspaceRoute');
const cors = require('cors');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace with your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, authorization headers)

  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Preflight request response
  } else {
    next();
  }
})

app.use(bodyParser.json());

app.use('/api', userRoutes)

app.use('/api', folderRoutes)

app.use('/api', formRoutes)

app.use('/api', formBotRoutes)

app.use('/api', shareRoutes)

module.exports = app;