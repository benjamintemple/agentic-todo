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