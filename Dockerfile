FROM node:latest
WORKDIR /opt/bot

COPY package*.json ./
RUN npm install && npm i -g typescript ts-node

COPY . .
RUN tsc

ENV NODE_ENV=production

CMD [ "npm", "start" ]
