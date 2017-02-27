## Base docker image
FROM node:7.6-slim

## Make directory for app
RUN mkdir -p /opt/app/

## Set CWD
WORKDIR /opt/app

## This will use the cache if package.json hasn't been changed
ADD package.json /tmp/package.json

## Add build dependencies so we can build our module with node-gyp, and assume "yes" to any questions
## Then run npm install from the /tmp directory
## Then remove build dependencies and apt-get cache
RUN apt-get update && \
    apt-get install python build-essential git -y && \
    cd /tmp && npm install && \
    cp -a /tmp/node_modules /opt/app/ && \
    apt-get remove python build-essential git -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

## Add application code
ADD . /opt/app/

## Start server
CMD ["npm", "start"]
