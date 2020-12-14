FROM registry.redhat.io/ubi8/nodejs-14

# Add application sources
ADD . /usr/radar-numeriqc-api

WORKDIR /usr/radar-numeriqc-api

# Install the dependencies
RUN npm install

# Expose ports
EXPOSE 3000

# Run script uses standard ways to run the application
CMD npm run -d start