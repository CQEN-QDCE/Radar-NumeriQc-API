const express = require('express');
const app = express();
const pool = require("../db/db");

// Créer POST pour insérer un nom
app.post("/enonces", async(request, response, next) =>{ 
  const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = request.body
     
  pool.query( 'INSERT INTO enonces( id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif) VALUES ($1, $2, $3, $4, $5, $6, $7, true)',
        [id_pratique, texte, reponse_0, reponse_1, reponse_2,reponse_3,reponse_4], (err, res) => {
  if (err) return next(err);
console.log(res);
  response.json(res.rows);
 });
});


// Créer GET pour renvoyer une liste de tous
app.get("/enonces", async(req, res) => { 
  try{
  const {nom} = req.body;
  const allRadar = await pool.query(
      "SELECT * FROM enonces"
       );
   res.json(allRadar.rows);
  }catch (err){  
   console.error(err.message);   
  }
})


// Créer GET pour avoir une enonce par id
app.get('/enonces/:id', (request, response, next) => {
 const { id } = request.params;

 pool.query('SELECT * FROM enonces WHERE id = $1', [id], (err, res) => {
  if (err) return next(err);

  response.json(res.rows);
 });
});

// Créer put pour modifier la table d'enonce
app.put("/enonces", async(request, response, next) =>{ 
const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif } = request.body
     
  pool.query( 'UPDATE enonces SET id_pratique = $1, texte = $2, reponse_0 = $3, reponse_1 = $4, reponse_2 = $5, reponse_3 = $6, reponse_4 = $7, actif = $8   WHERE id = 11',
        [id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif], (err, res) => {
  if (err) return next(err);
console.log(res);
  response.json(res.rows);
 });
});


module.exports = app;
