FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

ARG PORT
EXPOSE ${PORT}

CMD ["node", "server.js"]
