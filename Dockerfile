FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production
COPY . .

# ARG PORT
# EXPOSE ${PORT}

CMD ["node", "server.js"]
