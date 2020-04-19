FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY src ./src
COPY public ./public
RUN npm build

RUN rm -rf node_modules public
RUN npm install -g serve --silent

EXPOSE 3000

CMD [ "npm", "serve" ]
