#!/bin/bash

source .env

if [ ! "$(docker ps -q -f name=radar_api_database)" ]; 
then
    if [ "$(docker ps -aq -f status=exited -f name=radar_api_database)" ]; 
    then
        docker start radar_db
    else
        docker run --name radar_api_database -e POSTGRES_USER=$POSTGRESQL_USER -e POSTGRES_PASSWORD=$POSTGRESQL_PASSWORD -e POSTGRES_DATABASE=$POSTGRESQL_DATABASE -d -p 5432:5432 radar_api_database
    fi
else
    docker stop radarAPI_database
    docker start radarAPI_database
fi