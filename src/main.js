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
import { createPinia } from 'pinia';
import { useAuthStore } from './store/useAuthStore';
import api from './lib/axiosInstance';

// Vuetify 인스턴스 생성
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia()

async function bootstrap() {
  const app = createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)

  // 이제 Pinia가 설치되었으므로 안전하게 스토어를 사용할 수 있습니다.
  const auth = useAuthStore()

  // 복원: localStorage에 accessToken이 있으면 Authorization 헤더 설정
  try {
    const token = localStorage.getItem('accessToken')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    console.warn('토큰 복원 실패', e)
  }

  try {
    await auth.fetchUser()
  } catch (e) {
    // 무시하거나 로깅; 사용자가 인증되지 않은 경우 정상 동작
    console.warn('fetchUser failed:', e)
  }

  app.mount('#app')
}

bootstrap()

