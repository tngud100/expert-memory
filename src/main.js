import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/assets/css/reset.css";
import "@/assets/css/font.css";
import router from "@/routes";
import axios from 'axios';
import "@/utils/axiosInstance.js";
import CKEditor from '@ckeditor/ckeditor5-vue'
import "@/assets/css/editor/content-style.css";
import "@/routes/redirect.js";

let app = createApp(App);  
let pinia = createPinia();  

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(pinia);
app.use(CKEditor);

app.mount("#app");
