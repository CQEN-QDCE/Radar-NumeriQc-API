# Radar-NumeriQc-API
Api RadarNumeriQC

## Images conteneurs
Les scripts Dockerfile de ce projet utilisent des images de base disponibles sur le registre registry.redhat.io qui nécéssite un compte RedHat. Vous pouvez remplacer ces images par leurs équivalents "centos":

* registry.redhat.io/ubi8/nodejs-14 -> (à construire) https://github.com/sclorg/s2i-nodejs-container/tree/master/14
* registry.redhat.io/rhel8/postgresql-12 -> centos/postgresql-12-centos8 