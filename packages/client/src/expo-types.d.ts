/// <reference types="expo/types" />

// Ambient type reference so TypeScript can resolve Expo's declarations for
// `*.module.css` and `*.css` imports during typecheck on a clean checkout
// (CI), where the gitignored `expo-env.d.ts` / `.expo/types/` are absent.
