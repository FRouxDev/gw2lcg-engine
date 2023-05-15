import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { gw2I18n } from '@/assets/i18n/i18n';

import App from './App.vue';
import router from './router';

import './assets/styles/index.scss';
// import "./assets/styles/element/index.scss";

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: gw2I18n,
});

const app = createApp(App);

app.use(ElementPlus);
app.use(i18n);
app.use(createPinia());
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
