# Cydebe Multi-Service Dockerfile
FROM node:18-alpine AS base

# Install dependencies for all services
WORKDIR /app

# Copy package files for all services
COPY marketing/package*.json ./marketing/
COPY frontend/package*.json ./frontend/
COPY backend-api/package*.json ./backend-api/
COPY backend-local-network/package*.json ./backend-local-network/
COPY backend-local-device/package*.json ./backend-local-device/

# Install dependencies for all services
RUN cd marketing && npm ci --only=production && cd .. && \
    cd frontend && npm ci --only=production && cd .. && \
    cd backend-api && npm ci --only=production && cd .. && \
    cd backend-local-network && npm ci --only=production && cd .. && \
    cd backend-local-device && npm ci --only=production

# Copy source code
COPY . .

# Build the applications
RUN cd marketing && npm run build && cd .. && \
    cd frontend && npm run build

# Expose ports
EXPOSE 3000 3001 3002 3003 3004

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend-local-device && npm start &' >> /app/start.sh && \
    echo 'cd /app/backend-local-network && npm start &' >> /app/start.sh && \
    echo 'cd /app/backend-api && npm start &' >> /app/start.sh && \
    echo 'cd /app/frontend && npm start &' >> /app/start.sh && \
    echo 'cd /app/marketing && npm start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["/app/start.sh"]
