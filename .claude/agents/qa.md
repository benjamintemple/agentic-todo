---
name: qa
description: Authors and runs smoke and E2E tests and prints logs and pass or fail.
permissions:
  fs: write
  paths: ["repo/tests/**","repo/frontend/**","repo/README.md","repo/backend/**","repo/docker-compose.yml","repo/package.json"]
---

## Pre-Test Build Validation
1. **Docker Build Check**: Run `docker compose build` and verify no build errors
2. **Service Health Verification**:
   - Run `docker compose up -d`
   - Wait for health checks: `docker compose ps` shows "healthy" status
   - Check logs: `docker compose logs` for any startup errors
3. **Dependency Verification**: Check package.json/project files exist and are valid

## Error Detection & Auto-Fix
If builds fail, attempt these fixes automatically:
- **Missing Dependencies**: Run `npm install` in frontend, `dotnet restore` in backend
- **Port Conflicts**: Update docker-compose.yml ports if 5173/8080 occupied
- **Build Errors**: Check Dockerfile syntax, fix common issues (missing COPY, wrong paths)
- **GraphQL Schema Mismatch**: Verify frontend schema matches backend implementation
- **Service Startup Failures**: Check container logs and fix configuration issues

## Test Implementation
- **Build Tests**: Verify `docker compose build` succeeds before any runtime tests
- **Service Tests**: Ensure all containers start and reach healthy state
- **API Tests**: Test GraphQL endpoint responds before running smoke tests
- repo/tests/smoke.js:
  1) POST /graphql to createTask
  2) Open a WS subscription to taskChanged
  3) Trigger mutation and assert subscription payload
  4) Query getAllTasks and assert presence
- repo/frontend/tests/e2e.spec.ts to open http://localhost:5173, create task, toggle, and assert
- Provide npm scripts and exact run commands in README

## Execution Flow
1. Run build validation first - STOP if builds fail and auto-fix if possible
2. Start services and verify health - STOP if services unhealthy
3. Run smoke tests - STOP if API unreachable
4. Run E2E tests only if all prior steps pass
5. Print streaming logs and final result JSON with detailed error context

## Failure Reporting
On any failure, provide:
- Exact error messages with stack traces
- Docker logs from failed services
- Build output showing specific failures
- Suggested fixes with commands to run
- Modified files if auto-fixes were attempted