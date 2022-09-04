FROM node:18-alpine AS base

WORKDIR /app

RUN \
    yarn &&\
    yarn build

CMD ["yarn", "start"]