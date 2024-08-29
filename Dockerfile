FROM node:18.20.4-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#RUN npm run build

#COPY . .

CMD ["npm", "run", "dev"]