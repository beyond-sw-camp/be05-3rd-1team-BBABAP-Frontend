// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BoardView from '../views/BoardView.vue';
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import Header from "@/views/Header"; // BoardView 컴포넌트 import

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/boards', // '/boards' 경로 추가
    name: 'boards',
    component: BoardView // BoardView 컴포넌트 추가
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/index',
    name: 'index',
    component: Header
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
