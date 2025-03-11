import { pluginPerfectionist } from "../plugins";
import type { TypedFlatConfigItem } from "../types";

/**
 * Perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: "antfu/perfectionist/setup",
      plugins: {
        perfectionist: pluginPerfectionist
      },
      rules: {
        "perfectionist/sort-exports": ["error", { order: "asc", type: "natural" }],
        "perfectionist/sort-imports": ["error", {
          groups: [
            ["builtin-type", "builtin"],
            ["external-type", "external"],
            ["parent-type", "parent"],
            ["sibling-type", "sibling"],
            ["index-type", "index"],
            ["internal-type", "internal"],
            "style",
            ["side-effect", "side-effect-style"],
            "object",
            "unknown"
          ],
          internalPattern: [
            "^~~/.*",
            "^~/.*",
            "^@@/.*",
            "^@/.*"
          ],
          newlinesBetween: "never",
          order: "asc",
          type: "natural"
        }],
        "perfectionist/sort-named-exports": ["error", { order: "asc", type: "natural" }],
        "perfectionist/sort-named-imports": ["error", { order: "asc", type: "natural" }]
      }
    }
  ];
}