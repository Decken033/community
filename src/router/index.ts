import { createRouter, createWebHistory } from 'vue-router';

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue') // 使用绝对路径别名
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/Register.vue')
    },
    {
      path: '/letter',
      name: 'letter',
      component: () => import('@/views/letter/Letter.vue')
    },
    {
      path: '/letter/detail/:id',
      name: 'letterdetail',
      component: () => import('@/views/letter/Letterdetail.vue')
    },
    {
      path:'/profile',
      name:'profile',
      component: () => import('@/views/profile/Profile.vue')
    },
    {

      path:'/followee/:id',
      name:'followee',
      component: () => import('@/views/follow/Followee.vue')
    },
    {
      path:'/follower/:id',
      name:'follower',
      component: () => import('@/views/follow/Follower.vue')
    },
    {
      path:'/discuss/detail/:id',
      name:'discussDetail',
      component: () => import('@/views/discuss/Discuss.vue')
    },
    {
      path:'/search',
      name:'search',
      component: () => import('@/views/search/Search.vue')
    },
   
    {
      path:'/settings',
      name:'settings',
        component: () => import('@/views/settings/Settings.vue')
    }
  ]
});

export default router;
