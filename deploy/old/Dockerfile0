FROM node:12-alpine as dependencies

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public

RUN npm ci --silent && npm run build

FROM node:12-alpine AS release  
WORKDIR /app
RUN npm -g install serve

COPY --from=dependencies /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]