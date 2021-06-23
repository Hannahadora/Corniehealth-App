import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
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
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/login",
    name: "Sign In",
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/dashboard/settings/settings.vue"),
      },
      {
        path: "organizationinformation",
        name: "OrganizationInformation",
        component: () => import("@/views/dashboard/settings/OrganizationInformation/OrganizationInformation.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
