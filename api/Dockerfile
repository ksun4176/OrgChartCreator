FROM node:20-alpine

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]