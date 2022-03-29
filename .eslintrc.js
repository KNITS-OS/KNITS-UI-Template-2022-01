module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  plugins: ["mobx"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "plugin:css-import-order/recommended",
    "plugin:mobx/recommended",
  ],
  rules: {
    "mobx/missing-observer": "off",
    "mobx/missing-make-observable": "off",
    "mobx/no-anonymous-observer": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    "react/prop-types": "off",
    "react/jsx-key": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: ".css",
            group: "external",
            position: "before",
          },
          {
            pattern: "reactstrap",
            group: "external",
            position: "after",
          },
          {
            pattern: "assets/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "routes",
            group: "internal",
            position: "before",
          },
          {
            pattern: "types/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "mobx/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "pages/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",

    "react/react-in-jsx-scope": "off",

    "jsx-a11y/anchor-is-valid": "off",

    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],

    // uses .prettierrc.js file config
    // https://github.com/prettier/eslint-plugin-prettier#options
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
