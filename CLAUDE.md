# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an autonomous build system designed to create a complete To-Do application using Claude sub-agents and LangGraph.js orchestration. The project creates a self-bootstrapping system that can scaffold, implement, test, and package applications without human intervention.

## Architecture

The system consists of two main components:

### 1. Claude Agent System (.claude/agents/)
- **supervisor.md**: Orchestrates the build pipeline with 8 stages (planner → scaffolder → backend → frontend → devops → qa → ci → video → reporter)
- **planner.md**: Creates executable project plans and file maps as JSON
- **scaffolder.md**: Creates minimal project skeletons
- **backend.md**: Implements ASP.NET Core + GraphQL + Entity Framework
- **frontend.md**: Implements React + Vite + Adobe Spectrum + Relay
- **devops.md**: Handles Docker Compose orchestration and health checks
- **qa.md**: Authors and runs smoke tests and E2E tests
- **ci.md**: Creates GitHub Actions workflows
- **video.md**: Attempts automated demo recording
- **reporter.md**: Finalizes documentation and creates submission artifacts

### 2. LangGraph Orchestrator (orchestrator/)
- **graph.ts**: TypeScript implementation that mirrors the Claude agent workflow
- Deterministic execution outside of Claude environment
- Integrates with ChatAnthropic for content generation
- Handles retries and error recovery

## Development Commands

### Running the Claude Agent System
The supervisor agent coordinates the entire build process:
1. Execute the supervisor agent with the assignment from README_SETUP.md
2. The system will automatically progress through all 8 stages
3. Each stage has retry logic (max 2 retries per failing stage)

### Running the LangGraph Orchestrator
```bash
cd orchestrator
npm install
npx ts-node graph.ts
```

### Generated Application Commands
Once the system generates a To-Do app in the `repo/` directory:
```bash
# Start the application
docker compose up --build

# Run smoke tests
node tests/smoke.js

# Run E2E tests
cd frontend && npm run test:e2e
```

## Target Application Specification

The system builds a real-time To-Do application with:

**Backend (ASP.NET Core)**:
- GraphQL API with HotChocolate
- Entity Framework Core with SQLite persistence
- Real-time subscriptions for task changes
- Health endpoints and CORS configuration
- Ports: API on 8080

**Frontend (React)**:
- Vite build system
- Adobe React Spectrum UI components
- Relay GraphQL client
- Playwright E2E testing
- Ports: Web on 5173

**Infrastructure**:
- Docker Compose orchestration
- SQLite data persistence via named volumes
- Health checks and service dependencies

## Logging and Progress

The system emphasizes verbose, real-time logging:
- Timestamped progress updates: `[2025-09-26T12:00:00Z] STAGE=backend STEP="Generate GraphQL schema" STATUS=running`
- JSON log format for structured data
- Supervisor and Planner emit summaries after each step
- All output directed to STDOUT for real-time monitoring

## Acceptance Criteria

The build succeeds when:
1. `docker compose up --build` reaches healthy services
2. GraphQL `createTask` mutation emits subscription events
3. `getAllTasks` query returns created tasks
4. Playwright E2E tests pass (create + toggle status)

## File Permissions and Security

Each agent has strict file system permissions:
- Agents can only write to specified paths (e.g., `repo/**`)
- Supervisor has no file system access (coordination only)
- Least-privilege principle enforced throughout

## Retry and Error Handling

- Maximum 2 retries per failing stage
- Detailed failure logs with diffs and retry instructions
- Pipeline stops on repeated failures with comprehensive error reporting