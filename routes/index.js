const express = require('express');
const app = express();
const pool = require("../db/db");

// GET home page

app.get("/", async(req, res) => { 
  try{
   res.send("Welcome to Radar-NumeriQc-API application");
  }catch (err){  
   console.error(err.message);   
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
