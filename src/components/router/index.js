import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'
import MyHomeView from '@/views/MyHomeView.vue'
import TrainSearchView from '@/views/TrainSearchView.vue'
import TrainDetailView from '@/views/TrainDetailView.vue'
import TrainSeatPickerView from '@/views/TrainSeatPickerView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home', // 기본 접속시 로그인 페이지로 이동
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView,
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/my-home',
    name: 'MyHomeView',
    component: MyHomeView,
  },
  {
    path: '/train',
    name: 'TrainSearchView',
    component: TrainSearchView,
  },
  {
    path: '/train/detail/:trainno',
    name: 'TrainDetailView',
    component: TrainDetailView,
    props: true,
  },
  {
    path: '/train/seat/:trainno',
    name: 'TrainSeatPickerView',
    component: TrainSeatPickerView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
