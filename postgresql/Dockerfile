FROM postgres:13.1

ARG POSTGRESQL_USER
ARG POSTGRESQL_DATABASE

ENV POSTGRES_USER=${POSTGRESQL_USER}
ENV POSTGRES_DATABASE=${POSTGRESQL_DATABASE}

USER root

RUN apt-get update && apt-get install -y postgresql-contrib

WORKDIR /docker-entrypoint-initdb.d/
COPY createExtension.sh ./
RUN chmod 755 ./createExtension.sh
