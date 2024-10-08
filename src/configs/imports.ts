import { pluginAntfu, pluginImport } from "../plugins";
import type { OptionsProjectType, OptionsStylistic, TypedFlatConfigItem } from "../types";

export async function imports(
  options: OptionsStylistic & OptionsProjectType = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
    type = "app"
  } = options;

  return [
    {
      name: "antfu/imports/rules",
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport
      },
      rules: {
        "antfu/import-dedupe": "error",
        "antfu/no-import-dist": "error",
        "antfu/no-import-node-modules-by-path": "error",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-webpack-loader-syntax": "error",

        ...stylistic
          ? {
              "import/newline-after-import": ["error", { count: 1 }]
            }
          : {},

        ...(type === "app"
          ? {
              "import/extensions": ["error", "ignorePackages"]
            }
          : {}
        ),

        "import/no-self-import": "off"
      }
    }
  ];
}