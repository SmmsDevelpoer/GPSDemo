FROM docker.io/library/node:14.16.0-buster as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci --production=false
RUN npm run build

## ----- multi-stage ----- #
FROM docker.io/library/node:14.16.0-buster
WORKDIR /code
RUN mkdir -p ./log
#RUN mkdir -p ../files
COPY . .
RUN npm ci --production=true
COPY --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]
##CMD [ "tail", "-f", "/dev/null" ]