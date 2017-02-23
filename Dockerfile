FROM node:alpine


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN apk upgrade --update && apk add --update curl && rm -rf /var/cache/apk/* &&  npm install --unsafe-perm && npm cache clean
COPY . /usr/src/app

CMD [ "npm", "start" ]