const express = require('express');
const app = express();
const pool = require("../db/db");

// Créer POST pour insérer un nom
app.post("/radar", async(req, res) => { 
  try{
  const {nom} = req.body;
  const newRadar = await pool.query(
      "INSERT INTO test (nom) VALUES ($1) RETURNING *",
       [nom]
       );
   res.json(newRadar.rows);
  }catch (err){  
   console.error(err.message);   
  }
})

// Créer GET pour renvoyer une liste de tous
app.get("/radar", async(req, res) => { 
  try{
  const {nom} = req.body;
  const allRadar = await pool.query(
      "SELECT * FROM test"
       );
   res.json(allRadar.rows);
  }catch (err){  
   console.error(err.message);   
  }
})

module.exports = app;
