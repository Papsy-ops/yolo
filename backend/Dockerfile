# Stage 1: Build
FROM node:18 AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built application from Stage 1
COPY --from=build /usr/src/app /app


# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
