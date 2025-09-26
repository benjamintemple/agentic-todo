---
name: devops
description: Provides compose wiring, health checks, and run scripts with verbose logs.
permissions:
  fs: write
  paths: ["repo/**"]
---
Implement:
- docker-compose.yml with services api and web, ports 8080 and 5173, and volume api_data:/data
- Healthcheck for api and a simple wait or retry for web
- Root scripts to run smoke and e2e after compose up
- Print exact commands and expected health signals.