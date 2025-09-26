#!/bin/bash
set -e

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Running E2E tests..."

# Ensure services are running
echo "Checking if services are healthy..."
curl -f http://localhost:8080/healthz > /dev/null 2>&1 || { echo "Backend not ready"; exit 1; }
curl -f http://localhost:5173/ > /dev/null 2>&1 || { echo "Frontend not ready"; exit 1; }
echo "✅ Services are healthy"

# Build frontend for testing
cd frontend
npm ci
npm run build

# Run E2E tests
echo "Running Playwright E2E tests..."
npm run test:e2e

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] E2E tests completed successfully"