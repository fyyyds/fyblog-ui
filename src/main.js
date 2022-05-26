import { createApp } from 'vue'
import './permission.js'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import axios from 'axios'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import 'element-plus/dist/index.css'

VMdEditor.use(githubTheme);

const app = createApp(App)

axios.defaults.baseURL='http://localhost:8081/'
app.config.globalProperties.$http = axios

app.use(store).use(router).use(ElementPlus).use(VMdEditor);
app.mount('#app');
