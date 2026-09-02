const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the whole monorepo so Metro can bundle workspace packages
// such as trabajador-shared.
config.watchFolders = [monorepoRoot];

// Resolve modules from both the client and the monorepo root node_modules
// (npm workspaces hoists trabajador-shared to the root).
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
];

module.exports = config;
