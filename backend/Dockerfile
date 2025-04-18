# Stage 1: Build
FROM node:18 AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run on Alpine
FROM node:18-alpine

WORKDIR /app
COPY --from=build /usr/src/app /app

EXPOSE 5000
CMD ["node", "server.js"]
