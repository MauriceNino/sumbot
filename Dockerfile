FROM node:lts-alpine
WORKDIR /opt/bot

COPY . .

RUN npm i -g typescript \
    && npm i \
    && tsc \
    && npm rm -g typescript \
    && rm -r node_modules \
    && npm i --only=prod

ENV NODE_ENV=production

CMD [ "npm", "start" ]
