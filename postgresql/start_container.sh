#!/bin/bash

SCRIPT_DIR=$(dirname "$0");

source "${SCRIPT_DIR}/../.env"

if [ ! "${POSTGRESQL_USER}" ];
then
    echo "Variables d'environnement POSTGRESQL non définie, vérifier votre fichier .env"
    exit;
fi

if [ ! "$(docker ps -q -f name=radar_api_database)" ]; 
then
    if [ "$(docker ps -aq -f status=exited -f name=radar_api_database)" ]; 
    then
        docker start radar_api_database
    else
        docker build --tag radar_api_database "${SCRIPT_DIR}/."
        docker run --name radar_api_database -e POSTGRES_USER=$POSTGRESQL_USER -e POSTGRES_PASSWORD=$POSTGRESQL_PASSWORD -e POSTGRES_DATABASE=$POSTGRESQL_DATABASE -d -p 5432:5432 radar_api_database
    fi
else
    docker stop radar_api_database
    docker start radar_api_database
fi