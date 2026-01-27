# Build stage (builder)
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy rest of the code
COPY . .

# Build Next.js app
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start"]
