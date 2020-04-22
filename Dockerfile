FROM node:12-alpine as dependencies

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public

RUN npm ci --silent && npm run build

FROM nginx:alpine

COPY --from=dependencies /app/build /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]