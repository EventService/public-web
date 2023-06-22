### BUILDER IMAGE ###
FROM node:16-alpine as builder-dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn minify 

### PROD DEPENDENCIES IMAGE ###
FROM node:16-alpine as prod-deps

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production --ignore-scripts

### PRODUCTION IMAGE ###
FROM node:16-alpine

WORKDIR /app

COPY --from=prod-deps /app /app
COPY --from=builder-dev /app/public /app/public
COPY --from=builder-dev /app/server.js /app/server.js
COPY --from=builder-dev /app/src /app/src

CMD ["node", "server.js"]
