# Todo Realtime Application

A real-time To-Do application demonstrating autonomous code generation with Claude agents. Built with ASP.NET Core GraphQL backend and React frontend with real-time subscriptions.

## Architecture

### Backend (ASP.NET Core + GraphQL)
- **GraphQL API**: HotChocolate with queries, mutations, and subscriptions
- **Database**: Entity Framework Core with SQLite persistence
- **Real-time**: WebSocket subscriptions for task changes
- **Health**: Health check endpoint at `/healthz`
- **CORS**: Configured for frontend communication

### Frontend (React + Vite)
- **UI Framework**: Adobe React Spectrum design system
- **GraphQL Client**: Relay with real-time subscription support
- **Build Tool**: Vite for fast development and optimized builds
- **Testing**: Playwright for end-to-end testing

### Infrastructure
- **Containerization**: Docker Compose orchestration
- **Persistence**: Named volume for SQLite database
- **Health Checks**: Automated service health monitoring
- **CI/CD**: GitHub Actions workflow with automated testing

## How to Run

### Quick Start
```bash
docker compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **GraphQL Playground**: http://localhost:8080/graphql
- **API Health**: http://localhost:8080/healthz

### Development Mode

#### Backend Development
```bash
cd backend/TodoApi
dotnet restore
dotnet run
```

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## Tests

### Smoke Tests (GraphQL + WebSocket)
```bash
cd tests
npm install
node smoke.js
```

Tests include:
- GraphQL createTask mutation
- GraphQL getAllTasks query
- WebSocket subscription for real-time updates

### E2E Tests (Playwright)
```bash
cd frontend
npm install
npm run test:e2e
```

Tests include:
- Creating new tasks through UI
- Toggling task status
- Verifying real-time updates

### CI/CD Pipeline
```bash
# Runs automatically on GitHub
# Local testing:
.github/workflows/ci.yml
```

## Troubleshooting

### Service Health
```bash
# Check all services
docker compose ps

# Check specific service health
curl http://localhost:8080/healthz
curl http://localhost:5173/health
```

### Logs and Debugging
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs api
docker compose logs web

# Follow logs in real-time
docker compose logs -f
```

### Reset and Rebuild
```bash
# Complete reset (removes data)
docker compose down -v
docker compose up --build

# Rebuild without losing data
docker compose up --build
```

### Common Issues

1. **Port conflicts**: Ensure ports 8080 and 5173 are available
2. **Database issues**: Use `docker compose down -v` to reset SQLite database
3. **Build failures**: Check Docker daemon is running and has sufficient resources
4. **WebSocket connections**: Verify no firewall blocking WebSocket connections

## Decision Rationale

### Technology Choices

**ASP.NET Core + HotChocolate**:
- Strong typing and code-first GraphQL schema
- Built-in subscription support for real-time features
- Excellent performance and scalability

**React + Adobe React Spectrum**:
- Professional UI components with accessibility built-in
- Consistent design system across the application
- Adobe's enterprise-grade component library

**Relay GraphQL Client**:
- Sophisticated caching and optimization
- Native subscription support for real-time updates
- Type-safe GraphQL operations

**SQLite + Entity Framework Core**:
- Zero-configuration database for easy deployment
- Full ORM support with migrations
- Suitable for demo and development scenarios

**Docker Compose**:
- Simple multi-service orchestration
- Consistent development and deployment environment
- Built-in health checks and service dependencies

### Autonomous Generation

This entire application was generated autonomously using:
- Claude sub-agents with defined roles and permissions
- Structured agent pipeline with retry logic
- Comprehensive testing and validation at each stage
- LangGraph orchestrator for deterministic execution

The system demonstrates:
- **Scalable Architecture**: Clean separation of concerns
- **Real-time Capabilities**: WebSocket subscriptions
- **Production Readiness**: Health checks, error handling, CI/CD
- **Developer Experience**: Hot reload, comprehensive testing
- **Autonomous Quality**: Generated with minimal human intervention