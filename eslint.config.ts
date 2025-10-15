import { defineConfig } from "./src";

export default defineConfig(
  {
    type: "lib",
    vue: {
      a11y: true
    },
    react: true,
    solid: true,
    svelte: true,
    astro: true,
    nextjs: false,
    typescript: {
      erasableOnly: true
    },
    formatters: true,
    pnpm: true,
    jsx: {
      a11y: true
    },
    ignores: [
      "**/*.md"
    ]
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "perfectionist/sort-objects": "error"
    }
  }
);