# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Note**: This is a project-specific CLAUDE.md within the Air Lab monorepo. See `../CLAUDE.md` (parent directory) for monorepo-wide patterns, shared modules, and general conventions that apply across all projects.

## Development Philosophy

**Context**: Solo developer working on personal/small projects. This is NOT enterprise-level. Simple, direct solutions preferred over "best practices". Vibe coding - shipping over perfect architecture.

### Default Approach

- Always assume POC (Proof of Concept) unless explicitly told otherwise
- Keep it simple and direct - don't overthink it
- Start with the most obvious solution that works
- No frameworks unless absolutely necessary
- Prefer single files over multiple files when reasonable
- Hardcode reasonable defaults instead of building configuration systems

### What NOT to Do

- Don't add abstractions until we actually need them
- Don't build for imaginary future requirements
- Don't add complex error handling for edge cases that probably won't happen
- Don't suggest design patterns unless the problem actually requires them
- Don't optimize prematurely
- Don't add configuration for things that rarely change

### Transition to Production

If the POC works and needs to become more robust:
- Add basic error handling (try/catch, input validation)
- Improve user-facing messages
- Extract functions only for readability, not for "reusability"
- Keep the same simple approach - just make it more reliable

### Language to Use

- "Quick POC to test if this works"
- "Throwaway prototype"
- "Just make it work"
- "The dumbest thing that works"
- "Keep it simple and direct"

### When in Doubt

Ask: "Would copy-pasting this code be simpler than making it generic?" If yes, copy-paste it.

## Working with Claude Code

### Documentation Structure

Keep CLAUDE.md focused and under 40k tokens. For detailed workflows, patterns, and architecture:

- Create separate doc files in `docs/` directory
- Reference them here by category so Claude knows where to look
- These docs serve both developers AND Claude
- Good candidates for promotion to agents/skills later

**Doc Categories**:
- `docs/architecture/` - System design, data flow, component relationships
- `docs/workflows/` - Step-by-step processes (deployment, testing, etc.)
- `docs/patterns/` - Code patterns specific to this project

### Code Comments

Write verbose comments explaining:
- What individual functions do
- What the code flow is
- Why decisions were made

This gives Claude hints when reading files instead of wasting tokens figuring out logic. Helps accuracy, especially for agents.

### Session Planning

Before each work session on a fresh branch:
1. Generate a plan file in `.temp/plans/`
2. Research thoroughly using available MCP services
3. Refine the plan before starting implementation
4. Track progress in the plan file as work proceeds
5. Keep plan files around for context on what changed and why (include dates/times)

### Temp Folder for Session Context

Use `.temp/` folder (gitignored) for:
- Session context and working notes
- Temp files during implementation
- Plan files and progress tracking
- Disposable, not necessarily human-readable
- Helpful for context recovery if session crashes

Claude: feel free to use `.temp/` for your working files during sessions.

### Preferences

- **JSON**: Preferred format for structured data, configs, and inter-process communication
- **Separation of concerns**: Keep modules focused on single responsibilities
- **Single responsibility**: Each function/module does one thing well

### Debugging and Testing

**Browser Automation Performance**: Using Claude in Chrome extension (screenshots, scrolling, clicking) is slow. Prefer faster alternatives:

- **Use browser console output** instead of screenshots for debugging web apps
- **Add console.log statements** with clear prefixes (e.g., `[RAG]`, `[DB]`, `[Auth]`) for debugging
- **Read console messages** using browser dev tools or console reader tools
- Only use browser automation (screenshots, clicks) when visual inspection is absolutely necessary

**Console Logging Best Practices**:
- Prefix logs by module: `console.log('[RAG] Starting retrieval...')`
- Log important state changes, API calls, and data flow
- Include relevant data (query, result count, timing) for debugging
- Use different log levels when needed (`console.error`, `console.warn`, `console.log`)

**RAG-Specific Debugging**:
- Test page available at `/test-rag-simple.html` for isolated RAG testing
- Console logs show: model loading, embedding generation, vector search, retrieval results
- Check IndexedDB documents/chunks with "Check IndexedDB" button
- Monitor similarity scores to diagnose embedding compatibility issues

## Project Overview
