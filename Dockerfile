### BUILDER IMAGE ###
FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

### PRODUCTION IMAGE ###
FROM nginx:1.19.2

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY *.html /usr/share/nginx/html/
COPY --from=builder /app/public /usr/share/nginx/html/
