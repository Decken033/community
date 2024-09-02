import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'  
import { createI18n } from 'vue-i18n';
import zh from './lang/zh';
import en from './lang/en';
import sp from './lang/sp';


//tailwindcss
import "./style.css";


// 定义语言消息
const messages = {
  zh,
  en,
  sp,
};
const app = createApp(App)

const savedLocale = localStorage.getItem('locale') || 'zh'; 
const i18n = createI18n({
    legacy: false, // 禁用 legacy 模式
    locale: 'zh', // 设置默认语言
    messages,
});

app.use(i18n);
app.use(router)
app.mount('#app')
app.use(ElementPlus)


