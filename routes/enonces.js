const express = require('express');
const app = express();
const pool = require("../db/db");

// Créer POST pour insérer dans la table enonce
app.post("/enonces", async(request, response, next) =>{ 
    try{
        const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = request.body    
        const enonce = await pool.query( 'INSERT INTO enonces( id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif) VALUES ($1, $2, $3, $4, $5, $6, $7, true)',
                        [id_pratique, texte, reponse_0, reponse_1, reponse_2,reponse_3,reponse_4]);
        res.json(enonce.rows);
    }catch (err){  
        console.error(err.message);   
    }
});

// Créer GET pour renvoyer une liste de tous
app.get("/enonces", async(req, res) => { 
    try{
        const enonces = await pool.query(
            "SELECT * FROM enonces"
        );
        res.json(enonces.rows);
    }catch (err){  
        console.error(err.message);   
    }
})

// Créer GET pour avoir une enonce par id
app.get('/enonces/:id', async(request, response, next) => {
    try{
        const enonce = await pool.query('SELECT * FROM enonces WHERE id = $1', [id]);
        res.json(enonce.rows);
    }catch (err){  
        console.error(err.message);   
  }
});

// Créer put pour modifier la table d'enonce
app.put("/enonces/:id", async(request, response, next) =>{ 
    try{
        const enonce = await pool.query( 'UPDATE enonces SET id_pratique = $1, texte = $2, reponse_0 = $3, reponse_1 = $4, reponse_2 = $5, reponse_3 = $6, reponse_4 = $7, actif = $8   WHERE id = $9',
                            [id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif]);
        res.json(enonce.rows);
    }catch (err){  
        console.error(err.message);   
    } 
});

module.exports = app;
