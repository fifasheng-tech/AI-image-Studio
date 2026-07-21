# Canvas Agent Architecture

## Current Stack

- Backend: Express in `server.js`.
- Frontend: vanilla HTML/CSS/JavaScript in `public/`.
- Image API surface: existing `/api/generate`, `/api/providers`, `/api/prompt-assist`, and `/api/outputs`.
- Output storage: `~/Downloads/Image Studio`.

This is the lowest-risk path for the current MVP because provider switching, custom providers, timeout, no-retry behavior, and output saving are already implemented in this stack.

## Canvas Flow

1. User enters a request in the right Canvas Agent panel.
2. `planCanvasAgentPrompt()` creates a text node, a compact params node, and a generate node.
3. Existing local graph functions connect the nodes.
4. User explicitly clicks `生成`.
5. `runCanvasGenerate()` collects upstream prompt, reference images, and params from connected nodes.
6. The existing `/api/generate` endpoint calls the configured provider.
7. The response creates a result node and saves images to `~/Downloads/Image Studio`.

Importing recent outputs and converting a selected result into a reference node are local-only operations and do not call the paid image API.

## Migration Boundary

React Flow is still the likely long-term canvas foundation because it gives better node handles, selection, minimap, edge editing, virtualization, and layout primitives. Supabase is still the likely persistence layer for projects, auth, storage, and sharing.

Do not migrate everything yet. The boundary should be:

- Keep `server.js` APIs stable.
- Extract canvas state into a serializable project document first.
- Move only the canvas workspace to React/Vite/React Flow when node interactions become too complex for vanilla DOM.
- Keep `/api/generate`, `/api/providers`, `/api/outputs`, and provider config behavior unchanged during migration.
- Add Supabase only when project persistence, accounts, or shared storage are required.

## Safety Rules

- Generation is explicit-only.
- No automatic retry for paid upstream calls.
- Prompt planning, import, selecting images, and creating reference nodes are local-only.
- Errors should be shown in the node and Agent log with request IDs when available.
