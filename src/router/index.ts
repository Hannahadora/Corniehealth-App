import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import DashboardIndex from "../views/dashboard/index.vue";
import HmoDashboard from "../views/dashboardHmo/dashboard.vue";
import Settings from "@/views/dashboard/settings/index.vue";

const subdash = (parent: string) => {
  return [
    {
      path: `${parent}settings`,
      name: "Settings",
      component: Settings,
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
          children: [
            {
              path: "add-payment-account",
              name: "New Payment Account",
              component: () =>
                import(
                  "@/views/dashboard/settings/bankaccounts/Payment/addPaymentAccount.vue"
                ),
            },
          ],
        },
        {
          path: "devices",
          name: "Devices",
          component: () =>
            import("@/views/dashboard/settings/devices/index.vue"),
        },
        {
          path: "org-info",
          name: "Organization Information",
          component: () =>
            import(
              "@/views/dashboard/settings/OrganizationInformation/OrganizationInformation.vue"
            ),
        },
        {
          path: "contact-info",
          name: "Contact Information",
          component: () =>
            import(
              "@/views/dashboard/settings/contact/contact-information.vue"
            ),
        },
        {
          path: "location",
          name: "Location & Location Hierarchy",
          component: () =>
            import("@/views/dashboard/settings/location/index.vue"),
        },
      ],
    },
  ];
};
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/dashboard",
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("@/views/auth/signup/signup.vue"),
  },
  {
    path: "/login",
    name: "Sign In",
    alias: "/signin",
    component: () => import("@/views/auth/signin/index.vue"),
  },
  //reset password
  {
    path: "/reset/password",
    name: "Reset Password",
    component: () => import("@/views/auth/reset/resetpassword.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: "provider",
        name: "Provider",
        component: Dashboard,
        children: [...subdash("/dashboard/provider/")],
      },
      {
        path: "hmo",
        name: "HMO",
        component: Dashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    return { left: 0, top: 0 };
  },
});
export default router;
