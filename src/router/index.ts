import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import AccountSecurity from "../views/settings/AccountSecurity.vue";
import Dashboard from "../views/dashboard/dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("@/views/auth/signup.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/settings",
        name: "Settings",
        component: () => import("@/views/dashboard/settings/settings.vue"),
      },
    ],
  },
  {
    path: "/accountsecurity",
    name: "AccountSecurity",
    component: AccountSecurity,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
