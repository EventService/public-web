### BUILDER IMAGE ###
FROM node:12-alpine AS builder-dev

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
