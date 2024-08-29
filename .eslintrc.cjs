const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: "module",
    parser: "@babel/eslint-parser",
  },
  plugins: ["vue", "import"],
  rules: {
    "import/no-unresolved": [2, { caseSensitive: true }],
    "no-unused-vars": "off", // 이 줄을 추가하여 전체 프로젝트에서 no-unused-vars 규칙을 비활성화
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["#", path.resolve(__dirname, "src/components")],
          ["@", path.resolve(__dirname, "src")],
        ],
        extensions: [".js", ".vue", ".json"],
      },
      node: {
        extensions: [".js", ".vue", ".json"],
      },
    },
  },
};
