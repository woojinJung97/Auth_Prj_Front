import './assets/main.css'

// main.js 또는 main.ts
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify 관련 import
import 'vuetify/styles'; // Vuetify 스타일 가져오기
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './components/router';

// Vuetify 인스턴스 생성
const vuetify = createVuetify({
  components,
  directives,
});

// Vue 인스턴스 생성 및 Vuetify 플러그인 적용
createApp(App)
.use(vuetify)
.use(router)
.mount('#app');

