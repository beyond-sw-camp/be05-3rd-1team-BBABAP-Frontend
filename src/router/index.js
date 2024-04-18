import { createRouter, createWebHistory } from 'vue-router';
import FavoriteStations from '@/components/FavoriteStations.vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import BoardListJsonServer from '@/views/BoardListJsonServer.vue';
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import PostForm from '@/views/PostForm.vue';
import BoardView from '@/views/BoardView.vue';
import MyPage from '@/views/MyPage.vue';
import UserInfo from '@/components/UserInfo.vue';
import MyPosts from '@/components/MyPosts.vue';
import ChargeCredits from '@/components/ChargeCredits.vue';
import MyCoupons from '@/components/MyCoupons.vue';
import InquiriesPage from '@/components/InquiriesPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/boardlist',
    name: 'BoardList',
    component: BoardListJsonServer
  },
  {
    path: '/signup',
    name: 'SignupForm',
    component: SignupForm
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/post/new',
    name: 'PostForm',
    component: PostForm
  },
  {
    path: '/board/:id',
    name: 'BoardView',
    component: BoardView
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    children: [
      {
        path: 'userinfo',
        component: UserInfo
      },
      {
        path: 'myposts',
        component: MyPosts
      },
      {
        path: 'favoritestations',
        component: FavoriteStations
      },
      {
        path: 'chargecredits',
        component: ChargeCredits
      },
      {
        path: 'mycoupons',
        component: MyCoupons
      },
      {
        path: 'inquiriespage',
        component: InquiriesPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
