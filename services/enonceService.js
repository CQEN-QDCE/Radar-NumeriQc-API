const db = require("../db/db");

function mapEnonce(row)
{
    return {
        id: row.id,
        texte: row.texte,
        numero: row.numero,
        reponses : [row.reponse_0, row.reponse_1, row.reponse_2, row.reponse_3, row.reponse_4],
        pratique : {
            id : row.id_pratique,
            nom : row.nom_pratique,
            axe : {
                id: row.id_axe,
                nom: row.nom_axe
            }
        }
    };
}

/**
 * Extraire tous les énoncés
 */
async function getEnonces() { 
    const enonces = await db.query(
      `SELECT e.id, e.numero, e.texte, e.reponse_0, e.reponse_1, e.reponse_2, e.reponse_3, e.reponse_4,
              p.id as id_pratique, p.nom as nom_pratique,
              a.id as id_axe, a.nom as nom_axe 
       FROM Enonces e
       INNER JOIN Pratiques p
        ON p.id = e.id_pratique
       INNER JOIN Axes a
        ON a.id = p.id_axe
       WHERE e.est_actif = true
       ORDER BY e.numero`);

    let listeEnonce = [];
    
    for (let i = 0; i < enonces.rows.length; i++)
    {
        listeEnonce.push(mapEnonce(enonces.rows[i]));
    }

    return listeEnonce;
}

/**
 * Extrait un énoncé par identifiant
 * @param {integer} id 
 */
async function getEnonceById(id) { 
    const enonces = await db.query(
        `SELECT e.id, e.numero, e.texte, e.reponse_0, e.reponse_1, e.reponse_2, e.reponse_3, e.reponse_4,
                p.id as id_pratique, p.nom as nom_pratique,
                a.id as id_axe, a.nom as nom_axe 
         FROM Enonces e
         INNER JOIN Pratiques p
          ON p.id = e.id_pratique
         INNER JOIN Axes a
          ON a.id = p.id_axe
         WHERE e.est_actif = true
          AND e.id = $1`, [id]);

    if (enonces.rows.length)
    {
        return mapEnonce(enonces.rows[0]);
    }
    
    return null;
}

// Créer POST pour insérer un nom
async function postEnonce(req, res) { 
    /*
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await db.query( 'INSERT INTO enonces( id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, actif) VALUES ($1, $2, $3, $4, $5, $6, $7, true)',
                    [id_pratique, texte, reponse_0, reponse_1, reponse_2,reponse_3,reponse_4]);
    */

    return null;
}

// Créer put pour modifier la table d'enonce
async function putEnonce(req, res) {
    /*
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await db.query( 'UPDATE enonces SET id_pratique = $2, texte = $3, reponse_0 = $4, reponse_1 = $5, reponse_2 = $6, reponse_3 = $7, reponse_4 = $8   WHERE id = $1',
                            [req.params.id, id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4]);
    */

    return null;
}

// Créer delete pour modifier actif pour qu'il soit false or true la table d'enonce
async function desActiveEnonce(req, res) {
    /*
    const { id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4 } = req.body
    const enonces = await db.query( 'UPDATE enonces SET id_pratique = $2, texte = $3, reponse_0 = $4, reponse_1 = $5, reponse_2 = $6, reponse_3 = $7, reponse_4 = $8, actif = $9  WHERE id = $1',
                            [req.params.id, id_pratique, texte, reponse_0, reponse_1, reponse_2, reponse_3, reponse_4, req.params.actif]); 
    */

    return null;
}

module.exports = { postEnonce, getEnonces, putEnonce, getEnonceById, desActiveEnonce };
