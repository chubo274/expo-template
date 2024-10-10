const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");
const typescriptParser = require("@typescript-eslint/parser");
// const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Files ESLint should lint
    ignores: ["node_modules", ".expo/**"], // Ignore node_modules
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parser: typescriptParser,
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        AudioWorkletGlobalScope: true,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
      prettier,
      import: importPlugin,
    },
    rules: {
      // General Rules
      "prettier/prettier": "off",
      "react/display-name": "off",
      "no-console": [
        "error",
        {
          allow: ["tron", "info", "warn", "error"],
        },
      ],
      indent: ["error", 2, { SwitchCase: 1 }],
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
        },
      ],
      quotes: [
        // for JS strings
        "error",
        "double",
        {
          allowTemplateLiterals: true,
        },
      ],
      "jsx-quotes": ["error", "prefer-double"], // for JSX attributes
      "comma-dangle": "off",

      // Import Rules
      "import/default": "off",
      "import/prefer-default-export": "off",
      "import/namespace": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/extensions": "off",
      // 'import/extensions': [
      //     'error',
      //     'ignorePackages',
      //     {
      //         js: 'never',
      //         jsx: 'never',
      //         ts: 'never',
      //         tsx: 'never',
      //     },
      // ],

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/no-var-requires": "off",

      // React Rules
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react/prop-types": "off",

      // React Hooks Rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
    settings: {
      react: {
        pragma: "React",
        fragment: "Fragment",
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["./app"],
        },
      },
    },
  },
];
