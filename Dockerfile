# ---------- Stage 1: Build Stage ----------
FROM node:20-slim as Builder

# Set working directory
WORKDIR /app

# Install only production + dev dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app (assumes TypeScript compiles to dist/)
RUN npm run build


# ---------- Stage 2: Production Stage ----------
FROM node:20-slim AS production

# Use non-root user for security
RUN addgroup --system app && adduser --system --ingroup app app

# Set working directory
WORKDIR /app

# Copy only necessary output from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set ownership (optional if non-root already has access)
USER app

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
