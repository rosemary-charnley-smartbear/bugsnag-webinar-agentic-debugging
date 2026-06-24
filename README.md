# Bugsnag Webinar Agentic Debugging

This is the code repository for the SmartBear BugSnag Webinar on Agentic Debugging. 

### Getting Started

- [ ] `npm install`
- [ ] `npm start` runs clean on `http://localhost:3000`.
- [ ] BugSnag project ready
- [ ] `.env` configuration
- [ ] `npm run trigger-error` once so a real error is triggered in BugSnag.
- [ ] IDE (VS Code/Cursor) open with the SmartBear MCP server connected
      (remote `https://bugsnag.mcp.smartbear.com/mcp` or local `@smartbear/mcp`).
      Confirm the agent can list BugSnag errors.
- [ ] `src/services/pricing.js` is on the **buggy** version (`npm test` = 1 fail).
- [ ] GitHub repo open in a browser tab for the L4 PR view.

### Scenario A — L3 (IDE, human-in-the-loop)
1. Production throws `TypeError: ...percentOff` and reports to BugSnag.
2. Dev is in VS Code / Cursor with the SmartBear MCP server connected.
3. Dev asks the agent: *"What errors happened in the last hour?"* then
   *"Tell me more about <error id>"* and *"Help me fix this error."*
4. The agent reads the live stack trace + metadata via MCP, pinpoints
   `src/services/pricing.js`, and proposes the guarded-coupon fix.
5. Dev reviews the diff, runs `npm test`, commits, and deploys.
6. Dev tells the agent *"Mark this error as fixed."*

The human is **in the loop** on every step — nothing changes without them.

### Scenario B — L4 (autonomous, human-on-the-loop)
1. A high-impact error crosses a threshold in BugSnag.
2. A webhook triggers the agentic pipeline (`.github/workflows/agentic-fix.yml`).
3. The agent connects to the SmartBear MCP server, pulls the error context,
   reads the repo, applies the fix, and runs the tests — all unattended.
4. The agent opens a PR with the root cause, the change, and green tests.
5. A human reviews and approves (or requests changes). Merge ships the fix.

The human is **reviews the loop** — they supervise and approve, but the agent did the investigation and the work.

### Resources 

- SmartBear MCP Server Documentation: https://smartbear.portal.swaggerhub.com/smartbear-mcp/docs/mcp-server
- SmartBear MCP Repository: https://github.com/SmartBear/smartbear-mcp
- BugSnag Website (*click "Try Free" to start trial*): https://www.bugsnag.com/
- BugSnag Platform Guides: https://docs.bugsnag.com/platforms/

### Levels of Autonomy

![SmartBear Levels of Autonomy](Levels%20of%20Autonomy%20Diagram/smartbear-levels-of-autonomy.png)

![SmartBear Levels of Autonomy - Products](Levels%20of%20Autonomy%20Diagram/smartbear-levels-of-autonomy-products.png)

### Contact

###### North America ​
Meghan Bordieri​
e: meghan.bordieri@smartbear.com

###### Europe + Asia Pacific​
Kyle Concannon​
e: kyle.concannon@smartbear.com
