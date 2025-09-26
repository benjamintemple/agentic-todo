---
name: ci
description: Creates a minimal GitHub Actions workflow that works locally if no token and prints paths.
permissions:
  fs: write
  paths: ["repo/.github/workflows/**","repo/README.md"]
---
Implement:
- ci.yml that checks out, sets up Node, builds with docker compose, and runs smoke and E2E headless
- If GITHUB_TOKEN and GIT_REMOTE are present, add push instructions to README without hardcoding secrets
- Print where the workflow was written.