import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import Settings from "@/views/dashboard/settings/index.vue";
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
    path: "/dashboard/:type",
    name: "Dashboard",
    component: Dashboard,
    redirect: (to) => `${to.path}/settings`.replace("//", "/"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "settings/",
        name: "Settings",
        component: Settings,
        redirect: (to) => `${to.path}/org-info`.replace("//", "/"),
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
            path: "add-payment-account/:id?",
            props: true,
            name: "New Payment Account",
            component: () =>
              import(
                "@/views/dashboard/settings/bankaccounts/Payment/addPaymentAccount.vue"
              ),
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
            name: "Location Hierarchy",
            component: () =>
              import("@/views/dashboard/settings/location/index.vue"),
          },
          {
            path: "add-location/:id?",
            props: true,
            name: "Create or Update Location",
            component: () =>
              import("@/views/dashboard/settings/location/addLocation.vue"),
          },
          {
            path: "domains",
            name: "Domains",
            component: () =>
              import("@/views/dashboard/settings/domain/index.vue"),
          },
          {
            path: "add-domain/:id?",
            props: true,
            name: "Create or Rename Domain",
            component: () =>
              import("@/views/dashboard/settings/domain/addDomain.vue"),
          },
          {
            path: "send-invite/:id?",
            props: true,
            name: "Send Invitation",
            component: () =>
              import("@/views/dashboard/settings/domain/sendInvite.vue"),
          },
          {
            path: "health-services",
            name: "Healthcare Services",
            component: () =>
              import("@/views/dashboard/settings/healthcare/index.vue"),
          },
          {
            path: "add-health-service/:id?",
            props: true,
            name: "Add a New Healthcare Service",
            component: () =>
              import("@/views/dashboard/settings/healthcare/addServices.vue"),
          },
          {
            path: "care-teams",
            name: "Care Teams",
            component: () =>
              import("@/views/dashboard/settings/careteam/index.vue"),
          },
          {
            path: "add-careteam/:id?",
            props: true,
            name: "Create a Care Team",
            component: () =>
              import("@/views/dashboard/settings/careteam/addCareteam.vue"),
          },
        ],
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
