FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public

RUN npm install --silent && npm build && rm -rf node_modules public && npm install -g serve --silent

EXPOSE 3000

CMD [ "npm", "serve" ]
