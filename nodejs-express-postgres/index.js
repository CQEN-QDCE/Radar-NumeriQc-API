const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.post("/radar", async(req, res) => {

  try{
  
  console.log(req.body);
  }catch (err){
   
   console.error(err.message);
   

  }

})

app.listen(5000, () => {
    console.log("server is listiening port 5000");
});