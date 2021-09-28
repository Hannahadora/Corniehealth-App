import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import { SettingsRoute } from "./settings";
import { UserRoute } from "./user";
import { ExperienceRoutes } from "./experience";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // redirect: "/dashboard",
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("@/views/auth/signup/signup.vue"),
  },
  {
    path: "/roles",
    name: "Test",
    component: () =>
      import("@/views/dashboard/settings/rolesprivileges/role-form.vue"),
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
    redirect: (to) => `${to.path}/home`.replace("//", "/"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "Experience Dashboard",
        component: () =>
          import("@/views/dashboard/patientexp/dashboard/Index.vue"),
      },
      {
        path: "add-group/:id?",
        props: true,
        name: "Add a New Group",
        component: () =>
          import("@/views/dashboard/settings/group/addGroup.vue"),
      },
      {
        path: "view-group/:id?",
        props: true,
        name: "View Group Details",
        component: () =>
          import("@/views/dashboard/settings/group/viewGroup.vue"),
      },
      {
        path: "add-practice-form-template/:id?",
        props: true,
        name: "Blank Form",
        component: () =>
          import("@/views/dashboard/settings/practiceform/addPracticeform.vue"),
      },
      ExperienceRoutes,
      {
        path: "practitioner/patients",
        props: true,
        name: "EHR",
        component: () => import("@/views/dashboard/ehr/landing/index.vue"),
      },

      {
        path: "clinical/",
        name: "Patient EHR",
        component: () => import("@/views/dashboard/ehr/index.vue"),
        redirect: (to) => `${to.path}/health-trend`.replace("//", "/"),
        children: [
          {
            path: "health-trend/:patientId?",
            name: "Health Trend",
            component: () =>
              import("@/views/dashboard/ehr/healthtrend/index.vue"),
          },
          {
            path: "care-team",
            name: "EHR - Care Team",
            component: () => import("@/views/dashboard/ehr/careteam/index.vue"),
          },
          {
            path: "allergy",
            props: true,
            name: "Allergy & Intolerance",
            component: () => import("@/views/dashboard/ehr/allergy/index.vue"),
          },
        ],
      },
      SettingsRoute,
      UserRoute,
      {
        path: "org-heirarchy/new-designation",
        name: "New Designation",
        component: () =>
          import(
            "@/views/dashboard/settings/OrganisationHierarchy/designations/NewDesignation.vue"
          ),
      },
      // {
      //   path: "schedules",
      //   props: true,
      //   name: "Patient Experience Management.",
      //   component: () =>
      //     import("@/views/dashboard/schedules/index.vue"),
      // },
      // {
      //   path: "schedules/new/:scheduleId?",
      //   props: true,
      //   name: "Patient Experience Management",
      //   component: () =>
      //     import("@/views/dashboard/schedules/create-schedule.vue"),
      // },
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
