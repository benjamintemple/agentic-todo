---
name: my-agent
description: Concisely describe what this agent does.
permissions:
  fs: write
  paths:
    - "repo/**"
---
# ROLE
Describe this agent's single responsibility.

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