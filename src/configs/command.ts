import createCommand from "eslint-plugin-command/config";
import type { TypedFlatConfigItem } from "../types";

export async function command(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ...createCommand() as any,
      name: "antfu/command/rules"
    }
  ];
}