import js from "@eslint/js";
import globals from "globals";
import tsPluginPkg from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

const { configs: tsConfigs } = tsPluginPkg;

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.node },
    },
    plugins: {
      "@typescript-eslint": tsPluginPkg,
    },
    rules: tsConfigs.recommended.rules,
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
]);
