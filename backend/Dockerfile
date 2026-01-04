# Use official Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json first (caching layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 4000

# Command to start backend
CMD ["npm", "run", "dev"]
