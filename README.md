# Todo Realtime Application

A real-time To-Do application built with ASP.NET Core GraphQL backend and React frontend, demonstrating autonomous code generation capabilities.

## Quick Start Guide

### Prerequisites
- Docker and Docker Compose installed
- Ports 5173 and 8080 available

### Running the Application

1. **Start the application:**
   ```bash
   cd repo
   docker compose up -d
   ```

2. **Access the application:**
   - **Web App**: http://localhost:5173
   - **GraphQL API**: http://localhost:8080/graphql
   - **Health Check**: http://localhost:8080/healthz

3. **View live logs:**
   ```bash
   docker compose logs -f
   ```

## Testing

### Automated Tests
```bash
# Run smoke tests (API functionality)
cd repo
node tests/smoke.js

# Run E2E tests (UI functionality)
cd repo/frontend
npm run test:e2e
```

### Manual Verification
1. Open http://localhost:5173
2. Create a new task using the form
3. Toggle task status between Pending/Completed
4. Verify real-time updates work across browser tabs

## Troubleshooting

### Check Service Health
```bash
cd repo
docker compose ps
curl http://localhost:8080/healthz
```

### View Logs
```bash
# All services
docker compose logs

# Specific service
docker compose logs api
docker compose logs web
```

### Reset Application
```bash
# Complete reset (removes all data)
docker compose down -v
docker compose up --build

# Just restart services
docker compose restart
```

### Common Issues
- **Port conflicts**: Ensure ports 5173 and 8080 are free
- **Build failures**: Check Docker is running and has sufficient memory
- **Database issues**: Use `docker compose down -v` to reset

## Architecture

- **Backend**: ASP.NET Core with HotChocolate GraphQL, Entity Framework SQLite
- **Frontend**: React with Vite, Adobe React Spectrum UI, Relay GraphQL client
- **Real-time**: WebSocket subscriptions for live task updates
- **Infrastructure**: Docker Compose with health checks

## Features Demonstrated

✅ **GraphQL API** - Queries, mutations, and subscriptions
✅ **Real-time Updates** - WebSocket-based live sync
✅ **Modern UI** - Adobe React Spectrum design system
✅ **Automated Testing** - Smoke tests and E2E tests
✅ **Health Monitoring** - Service health checks
✅ **Containerization** - Docker Compose orchestration

---

*This application was generated autonomously using Claude agents with minimal human intervention.*