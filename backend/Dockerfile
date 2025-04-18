# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app .

EXPOSE 5000
CMD ["node", "server.js"]
