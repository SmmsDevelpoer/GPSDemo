#FROM docker.io/library/node:14.16.0-buster as build
#WORKDIR /usr/src/app
#COPY . .
#RUN npm ci --production=false
#RUN npm run build
#
### ----- multi-stage ----- #
#FROM docker.io/library/node:14.16.0-buster
#WORKDIR /code
#RUN mkdir -p ./log
##RUN mkdir -p ../files
#COPY . .
#RUN npm ci --production=true
#COPY --from=build /usr/src/app/dist ./dist
#CMD [ "node", "dist/main.js" ]
###CMD [ "tail", "-f", "/dev/null" ]

## ----- test ----- ##
FROM ubuntu:20.04 as build

ENV NODE_VERSION=14.16.0
RUN apt -y update
#RUN apt -y install build-essential libssl-dev
RUN apt -y install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

WORKDIR /usr/src/app
COPY . .
RUN npm ci --production=false
RUN npm run build

### ----- multi-stage ----- #
FROM ubuntu:20.04

ENV NODE_VERSION=14.16.0
RUN apt -y update
#RUN apt -y install build-essential libssl-dev
RUN apt -y install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN apt-get -y update
RUN apt-get --assume-yes install udev

WORKDIR /code
RUN mkdir -p ./log

COPY . .
RUN npm ci --production=true
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
#CMD [ "tail", "-f", "/dev/null" ]