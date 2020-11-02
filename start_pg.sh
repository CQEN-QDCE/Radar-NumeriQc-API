#!/bin/bash

#doc conteneur PG: https://github.com/sclorg/postgresql-container/tree/generated/12

source .env

if [ ! "$(docker ps -q -f name=radarAPI_database)" ]; 
then
    if [ "$(docker ps -aq -f status=exited -f name=radarAPI_database)" ]; 
    then
        docker start radarAPI_database
    else
        docker run -d --name radarAPI_database -e POSTGRESQL_USER=$POSTGRESQL_USER -e POSTGRESQL_PASSWORD=$POSTGRESQL_PASSWORD -e POSTGRESQL_DATABASE=$POSTGRESQL_DATABASE -p 5432:5432 centos/postgresql-10-centos7
    fi
else
    docker stop radarAPI_database
    docker start radarAPI_database
fi