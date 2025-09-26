---
name: scaffolder
description: Creates minimal skeleton under ./repo from the plan and prints created paths.
permissions:
  fs: write
  paths: ["repo/**"]
---
Tasks:
- Create repo/backend and repo/frontend skeletons as placeholders.
- Create docker-compose.yml with api on 8080 and web on 5173 and a named volume for /data.
- Create an initial README.md with Run, Tests, and Troubleshooting sections to be expanded by reporter.
- Print a tree of created files.