import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import Main from "@/views/layout/main.vue";
import Home from "@/views/home/HomeView.vue";
import Automation from "@/views/automation/AutoView.vue";
import Profile from "@/views/profile/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "automation",
          name: "automation",
          component: Automation,
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/login/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/register/RegisterView.vue"),
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("@/views/auth/forgot/ForgotView.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // 匹配所有未定义的路径
      name: "not-found",
      component: () => import("@/views/error/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const publicPages = ["/login", "/register", "/forgot", "/not-found"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !userStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
