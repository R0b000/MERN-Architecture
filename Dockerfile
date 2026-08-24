# Stage 1: Build the client assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package configurations
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install all dependencies
RUN pnpm install

# Copy codebase
COPY . .

# Build the client SPA
RUN pnpm build

# Stage 2: Run the production application
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package configuration
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install ONLY production dependencies
RUN pnpm install --prod

# Copy Express backend source code and configurations
COPY index.js ./
COPY Shared ./Shared
COPY auth.server ./auth.server
COPY portfolio.server ./portfolio.server

# Copy built React client assets from the builder stage
COPY --from=builder /app/dist ./dist

# Define environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Expose monolithic port
EXPOSE 5001

# Run the monolithic server
CMD ["node", "index.js"]
