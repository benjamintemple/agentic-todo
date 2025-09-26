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