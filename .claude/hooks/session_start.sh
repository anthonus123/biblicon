#!/bin/sh
# SessionStart hook: surface the HANDOFF state (Status / Next / Gotchas) into context so
# work resumes informed. Everything above "## Session history" is the always-current state.
f=HANDOFF.md
[ -f "$f" ] || f="$CLAUDE_PROJECT_DIR/HANDOFF.md"
[ -f "$f" ] || exit 0
echo "===== HANDOFF (read before working) ====="
awk '/^## Session history/{exit} {print}' "$f"
exit 0
