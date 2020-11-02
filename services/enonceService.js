const express = require('express');
const app = express();
const pool = require("../db/db");


async function serviceEnonce(enonces, res, req) { 
try {
    res.status(200).json(enonces.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer POST pour insérer un nom
async function postEnonce(req, res) { 
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await pool.query( 'INSERT INTO enonces( id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif) VALUES ($1, $2, $3, $4, $5, $6, $7, true)',
                    [id_pratique, texte, reponse_0, reponse_1, reponse_2,reponse_3,reponse_4]);
    serviceEnonce(enonces, res, req);
}

// Créer GET pour renvoyer une liste de tous
async function getEnonce(req, res) { 
    const enonces = await pool.query(
      "SELECT * FROM enonces"
       );
    serviceEnonce(enonces, res, req);
}

// Créer GET pour avoir une enonce par id
async function getEnonceById(req, res) { 
    const enonces = await pool.query('SELECT * FROM enonces WHERE id = $1', [req.params.id]);
    serviceEnonce(enonces, res, req);
}

// Créer put pour modifier la table d'enonce
async function putEnonce(req, res) {
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await pool.query( 'UPDATE enonces SET id_pratique = $2, texte = $3, reponse_0 = $4, reponse_1 = $5, reponse_2 = $6, reponse_3 = $7, reponse_4 = $8   WHERE id = $1',
                            [req.params.id, id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4]);   
    serviceEnonce(enonces, res, req);
}

// Créer delete pour modifier actif pour qu'il soit false or true la table d'enonce
async function desActiveEnonce(req, res) { 
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await pool.query( 'UPDATE enonces SET id_pratique = $2, texte = $3, reponse_0 = $4, reponse_1 = $5, reponse_2 = $6, reponse_3 = $7, reponse_4 = $8, actif = $9  WHERE id = $1',
                            [req.params.id, id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, req.params.actif]); 
    serviceEnonce(enonces, res, req);
}

module.exports = { postEnonce, getEnonce, putEnonce, getEnonceById, desActiveEnonce };
