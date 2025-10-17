import js from "@eslint/js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base recommended rules
  js.configs.recommended,
  // Next.js + TypeScript + Prettier compatibility + import plugin presets
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ),
  // Project-specific overrides and rules
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Enforce no semicolons
      semi: ["error", "never"],
      // Prefer single quotes (including import from specifiers), but allow escaping and template literals
      quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
      // Keep JSX attributes as double-quotes while module specifiers and code use single quotes
      'jsx-quotes': ["error", "prefer-double"],

      // Auto-sort and group imports
      'import/order': ["warn", {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        'newlines-between': "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        pathGroups: [
          { pattern: "_/**", group: "internal", position: "after" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      }],
      // Disallow duplicate imports
      'import/no-duplicates': "error",
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
