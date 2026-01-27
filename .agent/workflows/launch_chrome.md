---
description: How to launch the development server and open it in Chrome
---

# Launch in Chrome

The user has explicitly requested to **always** launch the application in Google Chrome, avoiding other browsers.

## Steps

1. Start the Vite development server:
   ```powershell
   node node_modules/vite/bin/vite.js
   ```

2. Open the localhost URL in Chrome explicitly:
   ```powershell
   // turbo
   start chrome http://localhost:5173
   ```
   *(Note: Adjust the port dynamically if 5173 is in use)*
