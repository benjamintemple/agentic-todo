---
name: planner
description: Produces an executable plan and file map as JSON and emits verbose progress notes.
permissions:
  fs: read
  paths: ["./"]
---
Return ONLY valid JSON with:
{
  "project_name": "todo-realtime",
  "ports": { "api": 8080, "web": 5173 },
  "file_tree": [
    "repo/backend/… (dotnet web api with HotChocolate + EF + Subscriptions)",
    "repo/frontend/… (Vite React + Adobe Spectrum + Relay + Playwright tests)",
    "repo/tests/smoke.js (Node smoke and WS subscription check)",
    "repo/docker-compose.yml",
    "repo/.github/workflows/ci.yml (works locally if no GitHub)",
    "repo/README.md (finalized by reporter)"
  ],
  "commands": {
    "compose_up": "docker compose up --build",
    "smoke": "node tests/smoke.js",
    "e2e": "cd frontend && npm run test:e2e"
  },
  "acceptance": [
    "compose healthy",
    "mutation emits subscription",
    "list returns created task",
    "e2e passes"
  ]
}
Also print to STDOUT a human-friendly plan summary and next actions.