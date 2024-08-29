module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Vue 3에 맞는 규칙을 적용
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'vue-eslint-parser',
  },
  plugins: [
    'vue',  // Vue 플러그인 추가
    'import'
  ],
  rules: {
    'import/no-unresolved': [2, { caseSensitive: true }],
  },
};
