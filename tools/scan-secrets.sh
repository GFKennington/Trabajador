#!/usr/bin/env sh
# Lightweight local secret scan. GitHub Push Protection is the primary
# defense for public repos; this catches obvious leaks before staging.
# If you hit a false positive, bypass with: git commit --no-verify
set -eu

patterns='(AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----|ghp_[0-9A-Za-z]{36}|gho_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{82}|xox[baprs]-[0-9A-Za-z-]+|sk-[a-zA-Z0-9]{20}T3BlbkFJ)'

staged=$(git diff --cached --name-only --diff-filter=ACM | grep -vE '/node_modules/|/dist/|/\.expo/' || true)
[ -z "$staged" ] && exit 0

if echo "$staged" | xargs grep -nHE "$patterns" 2>/dev/null; then
  echo "ERROR: possible secret detected (see matches above). Aborting commit."
  echo "If this is a false positive, bypass with: git commit --no-verify"
  exit 1
fi
exit 0
