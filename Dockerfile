FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm i -g typescript ts-node

COPY . .
RUN tsc

ENV NODE_ENV=production

CMD [ "npm", "start" ]
