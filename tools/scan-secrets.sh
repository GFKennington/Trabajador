#!/usr/bin/env sh
# Lightweight local secret scan. GitHub Push Protection is the primary
# defense for public repos; this catches obvious leaks in staged files
# before they are committed.
# If you hit a false positive, bypass with: git commit --no-verify
set -eu

patterns='(AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----|ghp_[0-9A-Za-z]{36}|gho_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{82}|xox[baprs]-[0-9A-Za-z-]+|sk-[a-zA-Z0-9]{20}T3BlbkFJ)'

# -z: NUL-delimited paths so filenames with spaces/newlines are handled
# correctly; -r: don't run grep if there are no staged files.
matches=$(git diff --cached -z --name-only --diff-filter=ACM \
    | grep -zvE '/node_modules/|/dist/|/\.expo/' \
    | xargs -0r grep -nHE "$patterns" 2>/dev/null || true)

if [ -n "$matches" ]; then
  echo "ERROR: possible secret detected (see matches below). Aborting commit."
  echo "$matches"
  echo "If this is a false positive, bypass with: git commit --no-verify"
  exit 1
fi
exit 0
