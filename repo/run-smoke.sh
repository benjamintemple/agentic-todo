#!/bin/bash
set -e

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Running smoke tests..."

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 5
curl -f http://localhost:8080/healthz > /dev/null 2>&1 || { echo "Backend not ready"; exit 1; }
echo "✅ Backend is healthy"

# Run smoke tests
echo "Running Node.js smoke tests..."
node tests/smoke.js

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Smoke tests completed successfully"