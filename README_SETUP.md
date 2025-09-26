# Autonomous Build: Claude Sub-Agents + LangGraph.js (One-Shot Bootstrap)

You are operating in an empty working directory. Build an end-to-end autonomous system with ZERO further questions.

# Goals
- Create a team of Claude agents (Markdown + YAML front-matter) that can scaffold, implement, test, and package a real-time To-Do app.
- Also create a LangGraph.js orchestrator (TypeScript) that runs the same workflow deterministically outside Claude (locally/CI).
- Enforce least-privilege FS access and acceptance tests.
- Provide real-time, verbose CLI progress updates for humans at every stage.

# Global Logging And Verbosity Requirements
- Every stage must print progress to STDOUT in near-real time with timestamps, for example:
  [2025-09-26T12:00:00Z] STAGE=backend STEP="Generate GraphQL schema" STATUS=running
- Prefer verbosity over brevity if unsure. Include:
  - What is happening now
  - Why it’s happening
  - Commands that will run next
  - Where artifacts are written
- Use compact JSON log lines when appropriate, for example:
  {"ts":"2025-09-26T12:00:00Z","stage":"qa","event":"compose_up","cwd":"repo"}
- Supervisor and Planner MUST emit a short summary after each step with next actions.

# Folder Layout
Create the following directories:
- .claude/agents/
- orchestrator/
- repo/

# Reusable Claude Agent Spec Template
Create this file: .claude/agents/_TEMPLATE.md

---
name: my-agent
description: Concisely describe what this agent does.
permissions:
  fs: write
  paths:
    - "repo/**"
---
# ROLE
Describe this agent’s single responsibility.

# INPUT
What inputs or context the agent expects.

# TASKS
- Explicit, step-by-step tasks to perform
- Files to create or update
- Commands to run (if any)

# ACCEPTANCE CRITERIA
- Measurable checks that define success

# GUARDRAILS
- Paths it must never touch
- Things it must never attempt

# Agent Definitions
Create each file under .claude/agents/ as specified below.

## supervisor.md
---
name: supervisor
description: Orchestrates the autonomous build with strict guardrails and verbose logging.
permissions:
  fs: none
policy:
  retries_per_stage: 2
  stages: [planner, scaffolder, backend, frontend, devops, qa, ci, video, reporter]
  acceptance:
    - "docker compose up --build reaches healthy services"
    - "GraphQL mutation createTask emits subscription event"
    - "getAllTasks returns the created task"
    - "Playwright E2E passes: create + toggle status"
---
# ROLE
You coordinate agents. You never write files. You enforce order, retries (maximum 2 per failing stage), and acceptance. You must print real-time progress to STDOUT at each sub-step with timestamps and next actions.

# FLOW
1. Call planner with the assignment and print plan summary.
2. Call scaffolder to realize file-tree skeleton in ./repo and print created files.
3. Call backend, frontend, and devops to implement and print key files and commands.
4. Call qa to generate and run smoke plus E2E and print pass or fail with logs.
5. Call ci to add GitHub Actions and print paths.
6. Call video to create demo.mp4 or a script and print outcome.
7. Call reporter to finalize README and submission.json and print a final summary.
If a stage fails, re-invoke that agent with corrected guidance up to 2 retries, then stop with a concise failure pack that includes logs, diffs, and how to retry.

# ASSIGNMENT
Build a simple To-Do application with real-time sync.
Backend (ASP.NET Core and GraphQL):
- Define Task { id, title, description, status }
- Mutations: createTask, updateTaskStatus
- Query: getAllTasks
- Real-time: Subscription taskChanged
- Use Entity Framework Core with SQLite for persistence
Frontend (React):
- Use Adobe React Spectrum to add tasks and toggle status (Pending or Completed)
- Fetch and display via GraphQL, prefer Relay client
Dockerization:
- Dockerize backend and frontend; compose orchestrates both
Meta:
- Use agentic automation to generate everything end-to-end, then run tests
- Output a working repo, passing tests, an optional short demo video, and a final report
Immediately call the planner agent with the assignment and begin logging.

## planner.md
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

## scaffolder.md
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

## backend.md
---
name: backend
description: Implements ASP.NET Core, HotChocolate GraphQL, EF Core SQLite, and a subscription with verbose logs.
permissions:
  fs: write
  paths: ["repo/backend/**","repo/docker-compose.yml","repo/tests/**"]
---
Implement:
- TaskItem { Id:int, Title, Description, Status(enum Pending or Completed), CreatedAt }
- Query getAllTasks
- Mutations createTask(input {title,description}) and updateTaskStatus(input {id,status})
- Subscription taskChanged published on both mutations
- EF Core SQLite with Data Source=/data/todo.db; EnsureCreated on startup
- Health endpoint /healthz; Dockerfile exposing 8080; CORS for http://localhost:5173
- Seed 1 to 2 tasks on an empty database
- Export SDL consumable by Relay
- Print commands to restore, build, and run and print key files created.

## frontend.md
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

## devops.md
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

## qa.md
---
name: qa
description: Authors and runs smoke and E2E tests and prints logs and pass or fail.
permissions:
  fs: write
  paths: ["repo/tests/**","repo/frontend/**","repo/README.md"]
---
Implement:
- repo/tests/smoke.js:
  1) POST /graphql to createTask
  2) Open a WS subscription to taskChanged
  3) Trigger mutation and assert subscription payload
  4) Query getAllTasks and assert presence
- repo/frontend/tests/e2e.spec.ts to open http://localhost:5173, create task, toggle, and assert
- Provide npm scripts and exact run commands in README
- Run tests after compose up and print streaming logs and a final result JSON.

## ci.md
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

## video.md
---
name: video
description: Attempts a short automated demo recording or emits a script and prints outcome.
permissions:
  fs: write
  paths: ["repo/**"]
---
Implement:
- Try to produce repo/demo.mp4 or repo/scripts/demo_script.md for a 90 to 120 second walkthrough
- Never fail the pipeline due to video
- Print what was created and where.

## reporter.md
---
name: reporter
description: Finalizes README and emits submission.json and optionally pushes the repo and prints a final summary.
permissions:
  fs: write
  paths: [".","repo/**"]
---
Implement:
- Update repo/README.md with Architecture, How to Run, Tests, Troubleshooting, and Decision Rationale
- Write repo/submission.json with {status, acceptance, repoPath, optional gitRemote, optional video, notes}
- If env GITHUB_TOKEN and GIT_REMOTE exist, initialize git, commit, set remote, and push. Include links in submission.json.
- Print a concise final summary with next steps.

# LangGraph Orchestrator
Create orchestrator/graph.ts with the following behavior:
- TypeScript file that defines state { spec: string, repoDir: "repo", logs: string[], artifacts: {}, acceptance?: {passed:boolean,details:string[]}, error?:string|null }.
- Graph: START to planner to scaffolder to backend to frontend to devops to qa to ci to video to reporter to END.
- Use ChatAnthropic with claude-3-5-sonnet-latest to generate file content or commands where needed.
- Write only inside repo/.
- For QA, run docker compose up --build -d inside repo, execute smoke and Playwright, and then docker compose down -v.
- Retry failing nodes up to 2 times.
- Log verbose progress to STDOUT with timestamps and write orchestrator/run.log.
Also create:
- orchestrator/plans/assignment.txt containing the same assignment text used by supervisor
- package.json and tsconfig.json for the orchestrator

# Execution
1. Immediately run the supervisor agent to perform the full pipeline end-to-end and print real-time progress.
2. After agents finish, print instructions to run the orchestrator manually:
   cd orchestrator && npm install && npx ts-node graph.ts
3. Ensure everything is idempotent. Do not ask questions; make sensible defaults and proceed.
