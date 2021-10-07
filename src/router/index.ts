import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import { SettingsRoute } from "./settings";
import { UserRoute } from "./user";
import { ExperienceRoutes } from "./experience";
import Settings from "@/views/dashboard/settings/index.vue";

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
        path: "clinical/:patientId",
        props: true,
        name: "Patient EHR",
        component: () => import("@/views/dashboard/ehr/index.vue"),
        redirect: (to) => `${to.path}/health-trend`.replace("//", "/"),
        children: [
          {
            path: "health-trend/",
            props: true,
            name: "Health Trend",
            component: () =>
              import("@/views/dashboard/ehr/healthtrend/index.vue"),
              // import("@/views/dashboard/ehr/healthtrend/empty-state.vue"),             
          },
          {
            path: "health-trend-empty",
            props: true,
            name: "Health Trend Empty State",
            component: () =>
              import("@/views/dashboard/ehr/healthtrend/empty-state.vue"),
          },
          {
            path: "health-trend-existing",
            props: true,
            name: "Health Trend Existing State",
            component: () =>
              import("@/views/dashboard/ehr/healthtrend/existing-state.vue"),
          },
          { path: "condition",
            name: "Condition/Problem",
            component: () =>
              import("@/views/dashboard/ehr/condition/index.vue"),
          },
          {
            path: "care-team",
            name: "EHR - Care Team",
            component: () => import("@/views/dashboard/ehr/careteam/index.vue"),
          },
          {
            path: "conditions",
            name: "Condition/Problem",
            alias: "condition",
            component: () =>
              import("@/views/dashboard/ehr/conditions/index.vue"),
          },
          {
            path: "allergy",
            props: true,
            name: "Allergy & Intolerance",
            component: () => import("@/views/dashboard/ehr/allergy/index.vue"),
          },
          {
            path: "medications",
            props: true,
            name: "Medications",
            component: () =>
              import("@/views/dashboard/ehr/medication/index.vue"),
          },
          {
            path: "diagnostics",
            props: true,
            name: "Diagnostics",
            component: () =>
              import("@/views/dashboard/ehr/diagnostics/index.vue"),
          },
          {
            path: "vitals",
            props: true,
            name: "Vital Signs",
            component: () => import("@/views/dashboard/ehr/vitals/index.vue"),
          },
          {
            path: "encounters",
            props: true,
            name: "Encounter",
            component: () =>
              import("@/views/dashboard/ehr/encounter/index.vue"),
          },
        ],
      },
      {
        path: "settings/",
        name: "Settings",
        component: Settings,
        redirect: (to) => `${to.path}/org-info`.replace("//", "/"),
        children: [
          {
            path: "org-hierarchy",
            name: "Organization Hierarchy",
            component: () =>
              import(
                "@/views/dashboard/settings/OrganisationHierarchy/index.vue"
              ),
          },
          {
            path: "org-hierarchy",
            name: "Organization Hierarchy",
            component: () =>
              import(
                "@/views/dashboard/settings/OrganisationHierarchy/index.vue"
              ),
          },
          {
            path: "care-partners",
            name: "Care Partners",
            component: () =>
              import("@/views/dashboard/settings/CarePartners/index.vue"),
          },
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
          // {
          //   path: "org-hierarchy",
          //   name: "Organization Hierarchy",
          //   component: () =>
          //     import("@/views/dashboard/settings/org-hierarchy/index.vue"),
          // },
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
            props: true,
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
            path: "practitioners",
            name: "Practitioners",
            component: () =>
              import("@/views/dashboard/settings/practitioners/index.vue"),
          },
          {
            path: "add-practitioner/:id?",
            props: true,
            name: "Create or Update Practitioner",
            component: () =>
              import(
                "@/views/dashboard/settings/practitioners/addPractitioner.vue"
              ),
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
          {
            path: "roles-privileges",
            props: true,
            name: "Roles",
            component: () =>
              import("@/views/dashboard/settings/rolesprivileges/index.vue"),
          },
          {
            path: "addroles/:id?",
            props: true,
            name: "Roles Form",
            component: () =>
              import(
                "@/views/dashboard/settings/rolesprivileges/role-form.vue"
              ),
          },
          {
            path: "group",
            name: "Group",
            component: () =>
              import("@/views/dashboard/settings/group/index.vue"),
          },
          {
            path: "practice-templates",
            name: "Practice Forms/Templates",
            component: () =>
              import("@/views/dashboard/settings/practiceform/index.vue"),
          },
        ],
      },

      {
        path: "user",
        props: true,
        name: "User Settings",
        component: () =>
          import("@/views/dashboard/usersettings/profile/index.vue"),
        children: [
          {
            path: "",
            props: true,
            name: "User Setup",
            component: () =>
              import(
                "@/views/dashboard/usersettings/profile/components/empty-state.vue"
              ),
          },
          {
            path: "setup",
            props: true,
            name: "Setup",
            component: () =>
              import(
                "@/views/dashboard/usersettings/profile/components/user-setup.vue"
              ),
          },
          {
            path: "security",
            props: true,
            name: "Security",
            component: () =>
              import("@/views/dashboard/usersettings/security/index.vue"),
          },
          {
            path: "domain/add",
            props: true,
            name: "Add a New Domain",
            component: () =>
              import("@/views/dashboard/usersettings/domain/create-domain.vue"),
          },
          {
            path: "domains",
            props: true,
            name: "User Domains",
            component: () =>
              import("@/views/dashboard/usersettings/domain/index.vue"),
          },
          {
            path: "signature",
            props: true,
            name: "Signature",
            component: () =>
              import("@/views/dashboard/usersettings/signature/index.vue"),
          },
        ],
      },
      SettingsRoute,
      UserRoute,
      {
        path: "org-heirarchy/new-designation/:id?",
        props: true,
        name: "New Designation",
        component: () =>
          import(
            "@/views/dashboard/settings/OrganisationHierarchy/designations/NewDesignation.vue"
          ),
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
