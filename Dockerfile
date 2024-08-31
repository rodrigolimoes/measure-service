FROM node:18.20.4-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/tmp/uploads

RUN npm run build
