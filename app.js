
// Apportez le serveur express et créez une application
const express = require("express");
const app = express();

// Variables environnement
require('dotenv').config({ path: '.env' })

// Prise en charge l'analyse des données JSON dans l'objet de requête
app.use(express.json());

//Routes
const indexRouter = require('./routes/index');
app.use('/api/', indexRouter);

const homeRoute = require('./routes/home');
app.use(homeRoute);

module.exports = app;
