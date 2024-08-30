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
    // "import/no-unresolved": [2, { caseSensitive: true }], // 대소문자 구분 오류만 에러로 처리
    // "vue/singleline-html-element-content-newline": "off", // 단일 라인 요소 내 개행 비활성화
    // "vue/attributes-order": "off", // 속성 순서 규칙 비활성화
    // "vue/html-indent": "off", // HTML 들여쓰기 규칙 비활성화
    // "vue/multiline-html-element-content-newline": "off", // 다중 라인 요소 내 개행 비활성화
    // "vue/html-closing-bracket-newline": "off", // 닫는 태그 대괄호 개행 규칙 비활성화
    // "no-unused-vars": "off", // 사용되지 않는 변수 경고 비활성화
    // "vue/no-unused-vars": "off", // Vue 사용되지 않는 변수 경고 비활성화
    // "vue/multi-word-component-names": "off", // 다중 단어 컴포넌트 이름 규칙 비활성화
    // "vue/require-default-prop": "off", // 기본 prop 요구 비활성화
    // "vue/require-prop-types": "off", // prop-types 요구 비활성화
    // "vue/html-self-closing": "off", // HTML 셀프 클로징 태그 규칙 비활성화
    // "vue/max-attributes-per-line": "off", // 한 줄에 최대 속성 개수 제한 비활성화
    // "no-console": "off", // console.log 경고 비활성화
    // "no-debugger": "off", // debugger 경고 비활성화
    // "no-undef": "off", // 정의되지 않은 변수 경고 비활성화
    // "no-mixed-spaces-and-tabs": "off", // 공백과 탭 혼용 경고 비활성화
    // "no-trailing-spaces": "off", // 행 끝 공백 경고 비활성화
    // "eol-last": "off", // 파일 마지막에 빈 줄 요구 비활성화
    // "quotes": "off", // 따옴표 사용 규칙 비활성화
    // "semi": "off", // 세미콜론 사용 규칙 비활성화
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
