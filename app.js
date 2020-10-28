
// Apportez le serveur express et créez une application
const express = require("express");
const app = express();

// Variables environnement
require('dotenv').config({ path: '.env' })

// Prise en charge l'analyse des données JSON dans l'objet de requête
app.use(express.json());

//Routes
const radarRouter = require('./routes/radar');
app.use('/api/', radarRouter);

const indexRouter = require('./routes/index');
app.use(indexRouter);

module.exports = app;
