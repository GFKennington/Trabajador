#!/usr/bin/env sh
# Full clean: remove generated build artifacts AND all node_modules across
# the monorepo. After this you must run `npm install` (or `mise run install`)
# before building or running anything again.
#
# To remove only build artifacts and keep dependencies, pass --keep-deps.
set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
keep_deps=0
for arg in "$@"; do
  case "$arg" in
    --keep-deps) keep_deps=1 ;;
    -h|--help)
      echo "usage: clean-repo.sh [--keep-deps]"
      exit 0
      ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

# Build artifacts
rm -rf \
  "$root"/packages/*/dist \
  "$root"/packages/client/web-build \
  "$root"/packages/client/.expo \
  "$root"/packages/client/dist

find "$root"/packages -name '*.tsbuildinfo' -type f -delete 2>/dev/null || true
echo "removed build artifacts"

# Dependencies (every node_modules dir under the repo root)
if [ "$keep_deps" -eq 0 ]; then
  find "$root" -type d -name node_modules -prune -print -exec rm -rf {} + 2>/dev/null || true
  echo "removed node_modules"
fi

echo "clean complete"
