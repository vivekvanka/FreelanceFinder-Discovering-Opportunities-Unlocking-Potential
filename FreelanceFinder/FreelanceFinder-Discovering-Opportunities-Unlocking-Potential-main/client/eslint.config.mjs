// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // ——————————————————————————————
      // Turn these off or warn for now:
      "react/react-in-jsx-scope": "off",      // React import not needed
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/prop-types": "warn",
      // ——————————————————————————————
      // Keep the “must-fix” rules on error:
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
      // Spread in the recommended presets last:
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
    },
  },
];
