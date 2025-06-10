import { pluginAntfu } from "../plugins";
import type { OptionsStylistic, TypedFlatConfigItem } from "../types";

export async function imports(_options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: "antfu/imports/rules",
      plugins: {
        antfu: pluginAntfu
      },
      rules: {
        "antfu/import-dedupe": "error",
        "antfu/no-import-dist": "error",
        "antfu/no-import-node-modules-by-path": "error"
      }
    }
  ];
}