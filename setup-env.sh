#!/bin/bash

# Cydebe Environment Setup Script
# This script helps set up production environment variables

set -e

echo "🔧 Cydebe Environment Setup"
echo "==========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Setup marketing site environment
setup_marketing_env() {
    print_status "Setting up marketing site environment..."

    if [ ! -f "marketing/.env.production" ]; then
        cat > marketing/.env.production << EOF
# Cydebe Marketing Site - Production Environment
NEXT_PUBLIC_APP_URL=https://www.cydebe.com/app
NEXT_PUBLIC_API_URL=https://api.cydebe.com
NEXT_PUBLIC_MARKETING_URL=https://www.cydebe.com
NODE_ENV=production

# Analytics (Optional - Add your Google Analytics ID)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Social Media Links (Update with your actual links)
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/olesya-cydebe
NEXT_PUBLIC_GITHUB_URL=https://github.com/West-Industrial-LLC/cydebe
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/cydebe

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=contact@cydebe.com
EOF
        print_success "Created marketing/.env.production"
    else
        print_warning "marketing/.env.production already exists"
    fi
}

# Setup frontend environment
setup_frontend_env() {
    print_status "Setting up frontend environment..."

    if [ ! -f "frontend/.env.production" ]; then
        cat > frontend/.env.production << EOF
# Cydebe Frontend - Production Environment
NEXT_PUBLIC_API_BASE_URL=https://api.cydebe.com
NEXT_PUBLIC_LOCAL_NETWORK_URL=https://network.cydebe.com
NEXT_PUBLIC_LOCAL_DEVICE_URL=https://device.cydebe.com
NODE_ENV=production

# Jitsi Configuration
NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si
NEXT_PUBLIC_JITSI_ROOM_PREFIX=cydebe-

# Language Settings
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SUPPORTED_LANGUAGES=en,ru,es,fr,de

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_VOICE_RECOGNITION=true
NEXT_PUBLIC_ENABLE_AI_TRANSLATION=true

# Analytics (Optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EOF
        print_success "Created frontend/.env.production"
    else
        print_warning "frontend/.env.production already exists"
    fi
}

# Setup backend API environment
setup_backend_api_env() {
    print_status "Setting up backend API environment..."

    if [ ! -f "backend-api/.env" ]; then
        cat > backend-api/.env << EOF
# Cydebe Backend API - Production Environment
PORT=3004
NODE_ENV=production

# OpenAI Configuration (REQUIRED - Add your actual key)
OPENAI_API_KEY=your_openai_api_key_here

# CORS Configuration
CORS_ORIGIN=https://www.cydebe.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Database (if needed in future)
# DATABASE_URL=your_database_url_here

# Redis (for caching, optional)
# REDIS_URL=redis://localhost:6379
EOF
        print_success "Created backend-api/.env"
        print_warning "⚠️  IMPORTANT: Update OPENAI_API_KEY in backend-api/.env with your actual OpenAI API key"
    else
        print_warning "backend-api/.env already exists"
    fi
}

# Setup local network backend environment
setup_backend_network_env() {
    print_status "Setting up local network backend environment..."

    if [ ! -f "backend-local-network/.env" ]; then
        cat > backend-local-network/.env << EOF
# Cydebe Local Network Backend - Production Environment
PORT=3002
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://www.cydebe.com

# Network Settings
MAX_CONNECTIONS=50
CONNECTION_TIMEOUT=30000

# Logging
LOG_LEVEL=info
EOF
        print_success "Created backend-local-network/.env"
    else
        print_warning "backend-local-network/.env already exists"
    fi
}

# Setup local device backend environment
setup_backend_device_env() {
    print_status "Setting up local device backend environment..."

    if [ ! -f "backend-local-device/.env" ]; then
        cat > backend-local-device/.env << EOF
# Cydebe Local Device Backend - Production Environment
PORT=3003
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://www.cydebe.com

# Device Settings
MAX_DEVICES=10
DEVICE_TIMEOUT=60000

# Logging
LOG_LEVEL=info
EOF
        print_success "Created backend-local-device/.env"
    else
        print_warning "backend-local-device/.env already exists"
    fi
}

# Main function
main() {
    print_status "Setting up production environment variables for Cydebe..."

    setup_marketing_env
    setup_frontend_env
    setup_backend_api_env
    setup_backend_network_env
    setup_backend_device_env

    echo ""
    print_success "🎉 Environment setup completed!"
    echo ""
    print_status "📋 Next steps:"
    echo "  1. Update OPENAI_API_KEY in backend-api/.env with your actual OpenAI API key"
    echo "  2. Update social media URLs in marketing/.env.production if needed"
    echo "  3. Add Google Analytics ID if you want analytics tracking"
    echo "  4. Deploy your application using ./deploy.sh"
    echo ""
    print_status "📖 For more details, see DEPLOYMENT.md"
}

# Run main function
main "$@"
