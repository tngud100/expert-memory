import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { readFileSync } from 'fs';
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "node:module";
import eslint from "vite-plugin-eslint";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    eslint({
      include: ["src/**/*.js", "src/**/*.vue"], // Linting을 적용할 파일들
    }),
  ],
  resolve: {
    alias: [
      { find: "#", replacement: path.resolve(__dirname, "src/components") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 3000,
    // https: {
    //   key: readFileSync(path.resolve(__dirname, 'key.pem')),
    //   cert: readFileSync(path.resolve(__dirname, 'cert.pem')),
    // },
  },
  define: {
    __dirname: JSON.stringify(path.dirname(new URL(import.meta.url).pathname)),
  },
});
