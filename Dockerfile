FROM node:18-alpine AS base

WORKDIR /app

RUN \
  apk update &&\
  apk --no-cache add ffmpeg

FROM base AS dev

CMD ["yarn", "serve"]

FROM base as prod

COPY . ./

RUN \
  yarn &&\
  yarn build

CMD ["yarn", "start"]