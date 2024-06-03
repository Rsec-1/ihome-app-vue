import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import AboutView from '../views/about/AboutView.vue';
import NotFoundView from '../views/error/NotFoundView.vue';
import { useUserStore } from '../stores/user';

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
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:pathMatch(.*)*', // 匹配所有未定义的路径
      name: 'not-found',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const publicPages = ['/login', '/register', '/not-found'];
  const authRequired = !publicPages.includes(to.path) && to.name !== 'not-found';

  if (authRequired && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
