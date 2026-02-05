---
description: Automatically stage, commit, and push changes to production without user confirmation.
---

// turbo-all

1. Stage all changes
   `git add .`

2. Commit changes
   - Analyze the recent changes (run `git diff --staged` or use context).
   - Generate a concise, conventional commit message (e.g., `feat: ...`, `fix: ...`).
   - Run: `git commit -m "<your_message>"`

3. Push to remote
   `git push origin main`
