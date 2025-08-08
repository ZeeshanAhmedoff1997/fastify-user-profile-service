FROM node:20-slim

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client for Linux
RUN npx prisma generate

# Default command (can be overridden in docker-compose)
CMD ["npx", "tsx", "src/main.ts"]
