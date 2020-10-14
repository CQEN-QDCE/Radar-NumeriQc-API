const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

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

/*
app.post("/radar", async(req, res) => { 
  try{
  console.log("req.body");
  }catch (err){  
   console.error(err.message);   
  }
})
*/

app.listen(5000, () => {
    console.log("server is listiening port 5000");
});