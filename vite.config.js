import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
// import { readFileSync } from 'fs';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
     ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })
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
});