import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import * as tseslint from "typescript-eslint";

// Create a compatibility instance to load plugins and configs from eslintrc
const compat = new FlatCompat();

export default tseslint.config(
  // Include the base JS configuration
  js.configs.recommended,

  // Setup TypeScript parser and plugins
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Configure linting for Node.js environment
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...compat.env() },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Node.js specific rules
      "no-console": "warn",
      "no-process-exit": "error",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
        },
        {
          selector: "function",
          format: ["camelCase"],
        },
      ],

      // Best practices
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
    },
  },

  // Apply overrides for specific file patterns
  {
    files: ["src/*.ts"],
  },

  // Special configuration for test files (if any)
  {
    files: ["src/*.test.ts"],
    rules: {
      // Test file specific rules
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
