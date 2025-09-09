#!/bin/bash

# Cydebe Production Deployment Script
# This script helps deploy Cydebe to various hosting platforms

set -e

echo "🚀 Cydebe Production Deployment Script"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."

    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi

    print_success "Dependencies check passed"
}

# Install dependencies for all services
install_dependencies() {
    print_status "Installing dependencies..."

    # Marketing site
    if [ -d "marketing" ]; then
        print_status "Installing marketing site dependencies..."
        cd marketing
        npm ci
        cd ..
        print_success "Marketing site dependencies installed"
    fi

    # Frontend
    if [ -d "frontend" ]; then
        print_status "Installing frontend dependencies..."
        cd frontend
        npm ci
        cd ..
        print_success "Frontend dependencies installed"
    fi

    # Backend services
    for backend in "backend-api" "backend-local-network" "backend-local-device"; do
        if [ -d "$backend" ]; then
            print_status "Installing $backend dependencies..."
            cd $backend
            npm ci
            cd ..
            print_success "$backend dependencies installed"
        fi
    done
}

# Build applications
build_applications() {
    print_status "Building applications..."

    # Marketing site
    if [ -d "marketing" ]; then
        print_status "Building marketing site..."
        cd marketing
        npm run build
        cd ..
        print_success "Marketing site built"
    fi

    # Frontend
    if [ -d "frontend" ]; then
        print_status "Building frontend..."
        cd frontend
        npm run build
        cd ..
        print_success "Frontend built"
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."

    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel
    fi

    # Deploy marketing site
    if [ -d "marketing" ]; then
        print_status "Deploying marketing site to Vercel..."
        cd marketing
        vercel --prod --yes
        cd ..
        print_success "Marketing site deployed to Vercel"
    fi

    # Deploy frontend
    if [ -d "frontend" ]; then
        print_status "Deploying frontend to Vercel..."
        cd frontend
        vercel --prod --yes
        cd ..
        print_success "Frontend deployed to Vercel"
    fi
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."

    if ! command -v netlify &> /dev/null; then
        print_status "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi

    # Deploy marketing site
    if [ -d "marketing" ]; then
        print_status "Deploying marketing site to Netlify..."
        cd marketing
        netlify deploy --prod --yes
        cd ..
        print_success "Marketing site deployed to Netlify"
    fi

    # Deploy frontend
    if [ -d "frontend" ]; then
        print_status "Deploying frontend to Netlify..."
        cd frontend
        netlify deploy --prod --yes
        cd ..
        print_success "Frontend deployed to Netlify"
    fi
}

# Deploy to Railway
deploy_railway() {
    print_status "Deploying to Railway..."

    if ! command -v railway &> /dev/null; then
        print_error "Railway CLI is not installed. Please install it first:"
        echo "curl -fsSL https://railway.app/install.sh | sh"
        exit 1
    fi

    print_status "Deploying to Railway..."
    railway up
    print_success "Application deployed to Railway"
}

# Deploy using Docker
deploy_docker() {
    print_status "Deploying with Docker..."

    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first"
        exit 1
    fi

    print_status "Building Docker image..."
    docker build -t cydebe:latest .

    print_status "Running Docker container..."
    docker run -d \
        --name cydebe \
        -p 3000:3000 \
        -p 3001:3001 \
        -p 3002:3002 \
        -p 3003:3003 \
        -p 3004:3004 \
        --env-file .env.production \
        cydebe:latest

    print_success "Application deployed with Docker"
}

# Main deployment function
main() {
    echo ""
    echo "🌐 Cydebe Global Deployment"
    echo "=========================="
    echo ""
    echo "This will deploy Cydebe globally, making it accessible at www.cydebe.com"
    echo ""

    echo "Select deployment platform:"
    echo "1) Vercel (Recommended - Free & Global CDN)"
    echo "2) Netlify (Alternative - Good performance)"
    echo "3) Railway (Full-stack with databases)"
    echo "4) Docker (Self-hosted)"
    echo "5) Manual build only"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice

    check_dependencies
    install_dependencies
    build_applications

    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_railway
            ;;
        4)
            deploy_docker
            ;;
        5)
            print_success "Build completed. You can now deploy manually."
            ;;
        6)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please select 1-6."
            main
            ;;
    esac

    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    print_status "📋 Next Steps for Global Access:"
    echo "  1. Connect www.cydebe.com domain in your hosting platform dashboard"
    echo "  2. Configure DNS records in Porkbun (see DEPLOYMENT.md for details)"
    echo "  3. Update production environment variables with real API keys"
    echo "  4. Test global accessibility including Russian users"
    echo "  5. Set up monitoring and analytics"
    echo ""
    print_status "📖 For detailed instructions, see DEPLOYMENT.md"
    echo ""
    print_status "🌍 Your Cydebe platform will be globally accessible at:"
    echo "   https://www.cydebe.com (Marketing site)"
    echo "   https://www.cydebe.com/app (Learning application)"
}

# Run main function
main "$@"
