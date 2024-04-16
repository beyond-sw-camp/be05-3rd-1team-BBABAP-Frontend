import { createRouter, createWebHistory } from 'vue-router';
import KakaoMap from '@/components/KakaoMap.vue';

const routes = [
  {
    path: '/',
    name: 'KakaoMap',
    component: KakaoMap
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
