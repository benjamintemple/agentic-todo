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