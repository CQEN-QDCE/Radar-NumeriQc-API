const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT
});

const query = `
-- Schema radar_db --


CREATE TABLE IF NOT EXISTS Axes (
    id SERIAL NOT NULL,
    nom VARCHAR(200) NOT NULL,
    actif BOOLEAN,
    PRIMARY KEY (id)
);

-- TODO Insérer les axes

CREATE TABLE IF NOT EXISTS Pratiques (
    id SERIAL NOT NULL,
    id_axe INTEGER NOT NULL,
    nom VARCHAR(200) NOT NULL,
    actif BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (id_axe) REFERENCES Axes(id) ON DELETE CASCADE
);

-- TODO Insérer les pratiques

-- Table Enonces contient les enonces et leurs reponses --
CREATE TABLE IF NOT EXISTS Enonces (
    id SERIAL NOT NULL,
    id_pratique INTEGER NOT NULL,
    texte VARCHAR(1000) NOT NULL,
    reponse_0 VARCHAR(200) NOT NULL,
    reponse_1 VARCHAR(200) NOT NULL,
    reponse_2 VARCHAR(200) NOT NULL,
    reponse_3 VARCHAR(200) NOT NULL,
    reponse_4 VARCHAR(200) NOT NULL,
    actif BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pratique) REFERENCES Pratiques(id) ON DELETE CASCADE,
    UNIQUE (texte)
);

-- Table Organisations contient les noms des OP --
CREATE TABLE IF NOT EXISTS Organisations (
    id SERIAL NOT NULL,
    nom VARCHAR(200) NOT NULL,
    actif BOOLEAN,
    PRIMARY KEY (id),
    UNIQUE (nom)
);

CREATE TABLE IF NOT EXISTS Organisateurs (
    id SERIAL NOT NULL,
    id_organisation INTEGER NOT NULL,
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(200) NOT NULL,
    courriel VARCHAR(200) NOT NULL,
    actif BOOLEAN,
    greenlight_userid VARCHAR(200), --À ajuster
    PRIMARY KEY (id),
    FOREIGN KEY (id_organisation) REFERENCES Organisations(id) ON DELETE CASCADE,
    UNIQUE (courriel)
);

-- Table Seances contient les id des seances, id de l'organisation et si cette seance est officielle ou non (defaut False) --
CREATE TABLE IF NOT EXISTS Seances (
    id INTEGER NOT NULL,
    id_organisation INTEGER NOT NULL,
    participants TEXT[], --https://www.postgresql.org/docs/10/arrays.html
    est_officiel BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (id_organisation) REFERENCES Organisations(id) ON DELETE CASCADE
);

-- Indexs sur Table Seances sur les champs id_organisation et est_officiel pour accélérer les recherches sur ces champs --
CREATE INDEX IF NOT EXISTS SeancesIdOrganisation ON Seances(id_organisation);
CREATE INDEX IF NOT EXISTS SeancesEstOfficiel ON Seances(est_officiel);

-- Table Reponses contient les id des seances, les id des enonces et les reponses (entre 0 et 5) --

DO $$ BEGIN
CREATE TYPE type_reponse AS ENUM ('0', '1', '2', '3', '4', '5');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS Reponses (
    id SERIAL NOT NULL,
    id_seance INTEGER NOT NULL,
    id_enonce INTEGER NOT NULL,
    reponse type_reponse NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_seance) REFERENCES Seances(id) ON DELETE CASCADE,
    FOREIGN KEY (id_enonce) REFERENCES Enonces(id) ON DELETE CASCADE,
    UNIQUE (id_enonce, id_seance)
);

-- Index sur Table Reponses sur le champ id_seance pour rapidement filtrer les reponses par seance --
CREATE INDEX IF NOT EXISTS ReponsesIdSeance On Reponses(id_seance);

-- Table Lexique contient les mots et leur definition --
CREATE TABLE IF NOT EXISTS Lexique (
    id SERIAL NOT NULL,
    mot VARCHAR(50) NOT NULL,
    definition VARCHAR(400) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (mot),
    UNIQUE (definition)
);

-- Index sur Table Lexique sur le champ mot --
CREATE INDEX IF NOT EXISTS LexiqueMot On Lexique(mot);

CREATE TABLE IF NOT EXISTS test (
    id SERIAL NOT NULL,
    nom VARCHAR(200) NOT NULL
);
`;

//const query = fs.readFileSync("./data.sql").toString();

pool.connect();
module.exports = pool;

pool.query(query, (err, res) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Tables is successfully created');
});