import { createRouter, createWebHistory } from 'vue-router';
import AuthMgntView from '../views/AuthMgntView.vue'; // 경로에 맞게 조정
import TheWelcome from '../TheWelcome.vue'; // 기본 페이지로 사용될 컴포넌트

const routes = [
  {
    path: '/auth',
    name: 'AuthManagement',
    component: AuthMgntView, // /auth 경로에서는 AuthMgntView만 보여줍니다.
  },
  {
    path: '/',
    name: 'Home',
    component: TheWelcome, // 홈 페이지에서는 TheWelcome을 보여줍니다.
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
