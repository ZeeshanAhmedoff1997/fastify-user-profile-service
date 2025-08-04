# ---------- Stage 1: Build ----------
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:20-slim

ENV NODE_ENV=production

WORKDIR /app

# Reinstall only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy dist folder from builder
COPY --from=builder /app/dist ./dist

# Use non-root user for security
RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 3000

CMD ["node", "dist/main.js"]
