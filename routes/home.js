const express = require('express');
const app = express();
const pool = require("../db/db");
const homeService =  require("../services");

app.get('/', (req, res) => {
  try {
   res.send("Welcome to Radar-NumeriQc-API application");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Status page - Openshift probes
app.get("/status", async(req, res) => { 
  try{
   res.statusCode = 200;
   res.send();
  }catch (err){  
   console.error(err.message);   
  }
});

module.exports = app;
