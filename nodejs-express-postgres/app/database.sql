

-- Table Enonces contient les enonces et leurs reponses --
CREATE TABLE IF NOT EXISTS Enonces (
    id SERIAL NOT NULL,
    texte VARCHAR(1000) NOT NULL,
    reponse_0 VARCHAR(200) NOT NULL,
    reponse_1 VARCHAR(200) NOT NULL,
    reponse_2 VARCHAR(200) NOT NULL,
    reponse_3 VARCHAR(200) NOT NULL,
    reponse_4 VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (texte)
);

-- Table Organisations contient les noms des OP --
CREATE TABLE IF NOT EXISTS Organisations (
    id SERIAL NOT NULL,
    nom VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nom)
);

-- Table Seances contient les id des seances, id de l'organisation et si cette seance est officielle ou non (defaut False) --
CREATE TABLE IF NOT EXISTS Seances (
    id INTEGER NOT NULL,
    id_organisation INTEGER NOT NULL,
    est_officiel BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (id_organisation) REFERENCES Organisations(id) ON DELETE CASCADE
);

-- Indexs sur Table Seances sur les champs id_organisation et est_officiel pour accélérer les recherches sur ces champs --
CREATE INDEX SeancesIdOrganisation ON Seances(id_organisation);
CREATE INDEX SeancesEstOfficiel ON Seances(est_officiel);

-- Table Reponses contient les id des seances, les id des enonces et les reponses (entre 0 et 5) --
CREATE TABLE IF NOT EXISTS Reponses (
    id SERIAL NOT NULL,
    id_seance INTEGER NOT NULL,
    id_enonce INTEGER NOT NULL,
    reponse ENUM(0, 1, 2, 3, 4) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_seance) REFERENCES Seances(id) ON DELETE CASCADE,
    FOREIGN KEY (id_enonce) REFERENCES Enonces(id) ON DELETE CASCADE,
    UNIQUE (id_enonce, id_seance)
);

-- Index sur Table Reponses sur le champ id_seance pour rapidement filtrer les reponses par seance --
CREATE INDEX ReponsesIdSeance On Reponses(id_seance);

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
CREATE INDEX LexiqueMot On Lexique(mot);