const express = require('express');
const app = express();
const pool = require("../db/db");
const  homeService =  require("../services");

app.get('/', (req, res) => {
  try {
   res.send("Welecome to Radar-NumeriQc-API application");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
