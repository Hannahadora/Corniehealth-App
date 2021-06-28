import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import Settings from "@/views/dashboard/settings/index.vue";
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
        component: Settings,
        redirect: "/dashboard/settings/org-info",
        children: [
          {
            path: "account-security",
            name: "Account Security",
            component: () =>
              import("@/views/dashboard/settings/AccountSecurity/index.vue"),
          },
          {
            path: "bank-accounts",
            name: "Bank & Accounts",
            component: () =>
              import("@/views/dashboard/settings/bankaccounts/index.vue"),
          },
          {
            path: "devices",
            name: "Devices",
            component: () =>
              import("@/views/dashboard/settings/devices/index.vue"),
          },
          {
            path: "org-info",
            name: "OrganizationInformation",
            component: () =>
              import(
                "@/views/dashboard/settings/OrganizationInformation/OrganizationInformation.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 } as any;
  },
});

export default router;
