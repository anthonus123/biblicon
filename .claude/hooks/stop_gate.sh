#!/bin/sh
# Stop hook: if the reader or its build sources changed this session but HANDOFF.md was NOT
# updated, block stopping until it is. Read-only sessions pass silently.
[ -f HANDOFF.md ] || cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
[ -f HANDOFF.md ] || exit 0

changed=$(git status --porcelain -- 'src' '*.html' 2>/dev/null)
[ -z "$changed" ] && exit 0

log_changed=$(git status --porcelain -- HANDOFF.md 2>/dev/null)
[ -n "$log_changed" ] && exit 0

reason="The reader or its build sources changed but HANDOFF.md was not updated. Update ## Status + ## Next and append a ## Session YYYY-MM-DD block (Did / Why / Verified / Next) before stopping."
printf '{"decision":"block","reason":"%s"}\n' "$reason"
exit 0
