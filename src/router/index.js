import { createRouter, createWebHistory } from 'vue-router'
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import BoardListJsonServer from '../views/BoardListJsonServer';
import PostForm from '../views/PostForm.vue';
import BoardView from '../views/BoardView.vue';
//마이페이지 관련
import MyPage from '../views/MyPage.vue';
import UserInfo from '../components/UserInfo.vue';
import MyPosts from '../components/MyPosts.vue';
import FavoriteStations from '../components/FavoriteStations.vue';
import ChargeCredits from '../components/ChargeCredits.vue';
import MyCoupons from '../components/MyCoupons.vue';
import InquiriesPage from '../components/InquiriesPage.vue';


const routes = [
  {
    path: '/mypage/favoritestations',
    component: FavoriteStations
  },  
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/boardlist',
    name: 'BoardList',
    component: BoardListJsonServer // 나중에 BoardList.vue로 바꿔주기
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
    name: 'PostBoard', 
    component: PostForm 
  },
  { 
    path: '/board/:id', 
    name:'boardView',
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
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
