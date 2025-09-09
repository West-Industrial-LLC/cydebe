#!/bin/bash

# Cydebe Marketing Site Setup Script
echo "Setting up Cydebe Marketing Site..."

# Navigate to marketing directory
cd /workspaces/cydebe/marketing

# Install dependencies
echo "Installing dependencies..."
npm install

# Start development server
echo "Starting development server..."
npm run dev
