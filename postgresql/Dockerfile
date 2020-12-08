FROM postgres:13.1

USER root

RUN apt-get update && apt-get install -y postgresql-contrib

WORKDIR /docker-entrypoint-initdb.d/
COPY createExtension.sh ./
RUN chmod 755 ./createExtension.sh

USER postgres