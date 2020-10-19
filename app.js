
// Apportez le serveur express et créez une application
const express = require("express");
const app = express();
const radarRouter = require('./routes/radar');
const indexRouter = require('./routes/index');

// Configurer le middleware pour prendre en charge l'analyse des données JSON dans l'objet de requête
app.use(express.json());

// configurer le router pour chaque chemin
app.use(indexRouter);
app.use('/api/', radarRouter);

//  Créer un serveur pour écouter sur le port 5000
app.listen(5000, () => {
    console.log("server is listiening port 5000");
});
