const express = require('express');
const app = express();
const pool = require("../db/db");
const enonceService =  require("../services");

app.get('/enonces', (req, res) => {
  enonceService.getEnonce(req, res);
});

app.get('/enonces/:id', (req, res) => {
  enonceService.getEnonceById(req, res);
});

app.post('/enonces', (req, res) => {
  enonceService.postEnonce(req, res);
});

app.put('/enonces/:id', (req, res) => {
    enonceService.putEnonce(req, res);
});

app.put('/enonces/:id/:actif', (req, res) => {
    enonceService.desActiveEnonce(req, res);
});
    
module.exports = app;
