const express = require('express');
const app = express();
const pool = require("../db/db");
const routeEnonces = require("./enonces");

app.use('/', routeEnonces);

module.exports = app;
