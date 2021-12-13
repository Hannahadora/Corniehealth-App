import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import { SettingsRoute } from "./settings";
import { ClinicalsRoute } from "./clinical";
import { UserRoute } from "./user";
import { ExperienceRoutes } from "./experience";
import { NewSettingsRoutes } from "./newsettings";
import Settings from "@/views/dashboard/settings/index.vue";

import { InPatientRoutes } from "./in-patient";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/reference/:id",
    props: true,
    name: "Reference Response",
    component: () =>
      import("@/views/dashboard/settings/kyc/components/email-link.vue"),
  },
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
        component: () => import("@/views/dashboard/settings/forms/newform.vue"),
      },
      {
        path: "clinical",
        props: true,
        name: "Patient",
        component: () => import("@/views/dashboard/ehr/landing.vue"),
        children: [
          {
            path: "",
            props: true,
            component: () => import("@/views/dashboard/ehr/landing/index.vue"),
          },
          ClinicalsRoute,
        ],
      },
      ExperienceRoutes,
      InPatientRoutes,
      NewSettingsRoutes,
      {
        path: "settings/",
        name: "Settings",
        component: Settings,
        redirect: (to) => `${to.path}/org-info`.replace("//", "/"),
        children: [
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
            path: "accounts",
            name: "Bank And Accounts",
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
              import("@/views/dashboard/settings/forms/index.vue"),
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
      {
        path: "kyc",
        props: true,
        name: "KYC",
        component: () => import("@/views/dashboard/settings/kyc/index.vue"),
      },
      {
        path: "kyc-link",
        props: true,
        name: "KYC Link",
        component: () =>
          import("@/views/dashboard/settings/kyc/components/email-link.vue"),
      },
      {
        path: "pricebook",
        name: "PriceBook",
        component: () =>
          import("@/views/dashboard/settings/pricebook/index.vue"),
      },
      {
        path: "catalogues",
        name: "Catalogues",
        component: () =>
          import("@/views/dashboard/settings/catalogues/index.vue"),
      },
      {
        path: "newservice/:serviceId?",
        name: "New Service",
        component: () =>
          import(
            "@/views/dashboard/settings/catalogues/components/new-service.vue"
          ),
      },
      {
        path: "newproduct",
        name: "New Product",
        component: () =>
          import(
            "@/views/dashboard/settings/catalogues/components/new-products.vue"
          ),
      },
      {
        path: "addvariant/:catalogueId",
        name: "Medication",
        component: () =>
          import(
            "@/views/dashboard/settings/catalogues/components/new-products.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});
export default router;
