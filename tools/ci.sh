#!/usr/bin/env sh
# Local CI: mirror .github/workflows/ci.yml so 'mise run ci' runs exactly
# what GitHub Actions runs (minus the checkout/install steps).
#
# Gates (in workflow order, fail fast):
#   1. biome ci .        (lint + format check)
#   2. cspell lint .     (spell check)
#   3. tsc -b            (build shared + server)
#   4. tsc --noEmit      (typecheck client)
set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root"

echo "==> biome ci ."
npx @biomejs/biome ci .

echo "==> cspell lint ."
npx cspell lint .

echo "==> build all packages (tsc -b + client web export)"
npm run build

echo "==> typecheck client"
npm run typecheck

echo "==> CI passed"
