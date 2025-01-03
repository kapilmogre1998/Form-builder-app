const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const folderRoutes = require('./routes/folderRoute');
const formRoutes = require('./routes/formRoute');
const formBotRoutes = require('./routes/formBotRoute');
const shareRoutes = require('./routes/shareWorkspaceRoute');
const cors = require('cors');

const corsOptions = {
    origin: ['https://form-builder-app-c5rp.vercel.app'], // Update with your actual frontend URL(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.options('*', cors());


app.use(bodyParser.json());

app.use('/api', userRoutes)

app.use('/api', folderRoutes)

app.use('/api', formRoutes)

app.use('/api', formBotRoutes)

app.use('/api', shareRoutes)

module.exports = app;