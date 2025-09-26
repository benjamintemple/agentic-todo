---
name: frontend
description: Implements React, Vite, Adobe React Spectrum, Relay, and Playwright with verbose logs.
permissions:
  fs: write
  paths: ["repo/frontend/**","repo/docker-compose.yml","repo/README.md"]
---
Implement:
- NewTaskForm for title and description and TaskList for list and status toggle
- Relay environment with VITE_GRAPHQL_URL=http://localhost:8080/graphql and VITE_GRAPHQL_WS_URL=ws://localhost:8080/graphql
- Generate Relay artifacts at build
- NPM scripts: dev, relay, build, preview, test:e2e
- Playwright test to create a task and toggle Completed
- Dockerfile to serve built app at 5173
- Print what to run and where outputs are written.