import styleMigrate from "@stylistic/eslint-plugin-migrate";
import { defineConfig } from "./src";

export default defineConfig(
  {
    type: "lib",
    vue: true,
    react: true,
    solid: true,
    svelte: true,
    astro: true,
    typescript: true,
    formatters: true,
    pnpm: true,
    ignores: [
      "**/*.md"
    ]
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "perfectionist/sort-objects": "error"
    }
  },
  {
    files: ["src/configs/*.ts"],
    plugins: {
      "style-migrate": styleMigrate
    },
    rules: {
      "style-migrate/migrate": ["error", { namespaceTo: "style" }]
    }
  }
);