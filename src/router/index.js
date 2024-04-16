import { createRouter, createWebHistory } from 'vue-router'
// import BoardList from '@/views/board/BoardList.vue'
// import BoardDetail from '@/views/board/BoardDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/boardlist',
    name: 'BoardList',
    component: () => import('../views/BoardListJsonServer.vue') // 나중에 BoardList.vue로 바꿔주기
  },
  // {
  //   path: '/board/list',
  //   name: 'BoardList2',
  //   component: BoardList
  // },
  // {
  //   path: '/board/detail',
  //   name: 'BoardDetail',
  //   component: BoardDetail
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
