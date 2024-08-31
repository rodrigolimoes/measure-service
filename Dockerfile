FROM node:18.20.4-alpine as build

WORKDIR /app

RUN mkdir -p /app/tmp/uploads

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
