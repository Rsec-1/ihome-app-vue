import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      // component: HomeView,
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/register/RegisterView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*', // 匹配所有未定义的路径
      name: 'not-found',
      component: () => import('@/views/error/NotFoundView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const publicPages = ['/login', '/register', '/not-found'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
