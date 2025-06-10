import { pluginAntfu } from "../plugins";
import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from "../types";
import { interopDefault } from "../utils";

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: "double",
  semi: true
};

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean;
}

export async function stylistic(
  options: StylisticOptions = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi
  } = {
    ...StylisticConfigDefaults,
    ...options
  };

  const pluginStylistic = await interopDefault(import("@stylistic/eslint-plugin"));

  const config = pluginStylistic.configs.customize({
    indent,
    jsx,
    pluginName: "style",
    quotes,
    semi
  });

  return [
    {
      name: "antfu/stylistic/rules",
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic
      },
      rules: {
        ...config.rules,

        "antfu/consistent-chaining": "error",
        "antfu/consistent-list-newline": "error",
        "antfu/if-newline": "error",
        "antfu/top-level-function": "error",

        "curly": ["error", "all"],

        "style/arrow-parens": ["error", "always"],
        "style/brace-style": ["error", "1tbs"],
        "style/comma-dangle": ["error", "never"],
        "style/eol-last": ["error", "never"],
        "style/generator-star-spacing": ["error", { after: true, before: false }],
        "style/member-delimiter-style": ["error", {
          multiline: {
            delimiter: "semi",
            requireLast: true
          },
          multilineDetection: "brackets",
          singleline: {
            delimiter: "semi",
            requireLast: false
          }
        }],
        "style/no-multiple-empty-lines": ["error", {
          max: 2,
          maxBOF: 0,
          maxEOF: 0
        }],
        "style/operator-linebreak": ["error", "before", {
          overrides: {
            "=": "after"
          }
        }],
        "style/padded-blocks": ["error", {
          blocks: "never",
          classes: "always",
          switches: "never"
        }],
        "style/padding-line-between-statements": [
          "error",
          { blankLine: "always", next: "*", prev: "import" },
          { blankLine: "any", next: "import", prev: "import" }
        ],
        "style/quote-props": "off",
        "style/yield-star-spacing": ["error", { after: true, before: false }],

        ...overrides
      }
    }
  ];
}