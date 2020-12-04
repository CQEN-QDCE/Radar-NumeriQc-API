const express = require("express");
const app = express();
const OpenApiValidator = require('express-openapi-validator');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fs = require("fs");
const YAML = require("js-yaml");
const logger = require('morgan');

// Variables environnement
require('dotenv').config({ path: '.env' })

//Logger TODO regarder comment ça marche
app.use(logger('dev'));

// Prise en charge l'analyse des données JSON dans l'objet de requête
app.use(express.json());

const isProd = (process.env.NODE_ENV === 'production');

//Récupération de la spécification OpenAPI
function loadDocumentSync(file) {
    return YAML.safeLoad(fs.readFileSync(file, 'utf8'));
}

const apiSpec = loadDocumentSync(path.join(__dirname, '/definition/radar-api-v1.yaml')); //TODO .env

//Documentation OpenAPI (Swagger-ui) disponible sur /docs
//TODO conditionner sur isProd?
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiSpec));

//
app.use(OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateFormats: 'full',
    operationHandlers: path.join(__dirname), //Routes gérée depuis la propriété 'x-eov-operation-handler' de la spec
  })
);

//Gestion des erreurs
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

module.exports = app;
