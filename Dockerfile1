FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm -g install serve
COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public

RUN npm ci --silent && npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
