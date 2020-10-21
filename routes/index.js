const express = require('express');
const app = express();
const pool = require("../db/db");

// GET home page

app.get("/", async(req, res) => { 
  try{
   res.send("Welecome to Radar-NumeriQc-API application");
  }catch (err){  
   console.error(err.message);   
  }
})

module.exports = app;
