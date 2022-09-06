import Settings from "@/views/dashboard/settings/index.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/dashboard/dashboard.vue";
import PatientDashboard from "../views/dashboardPatients/dashboard.vue";
import Home from "../views/Home.vue";
import { BillingRoutes } from "./billing";
import { ClinicalsRoute } from "./clinical";
import { ExperienceRoutes } from "./experience";
import { InPatientRoutes } from "./in-patient";
import { NewSettingsRoutes } from "./newsettings";
import { PracticeRoutes } from "./practice";
import { SettingsRoute } from "./settings";
import { UserRoute } from "./user";
//Profile routes
import { ProfileSettingsRoute } from "./patientaccount";

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
  {
    path: "/payment-response",
    name: "Payment Success",
    component: () => import("@/views/dashboardPatients/patients/account/paymentaccount/components/payment-success.vue"),
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
    redirect: to => `${to.path}/home`.replace("//", "/"),
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
      PracticeRoutes,
      BillingRoutes,
      {
        path: "/settings/",
        name: "Settings",
        component: Settings,
        // redirect: to => `${to.path}/org-info`.replace("//", "/"),
        children: [
          // {
          //   path: "care-partners",
          //   name: "Care Partners",
          //   component: () =>
          //     import("@/views/dashboard/settings/CarePartners/index.vue"),
          // },
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
          // {
          //   path: "practice-information",
          //   name: "Practice Information",
          //   component: () =>
          //     import(
          //       "@/views/dashboard/settings/OrganizationInformation/OrganizationInformation.vue"
          //     ),
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
            name: "Add a Practitioner",
            component: () =>
              // import(
              //   "@/views/dashboard/settings/practitioners/addPractitioner.vue"
              // ),
              import("@/components/practitioner-view-edit.vue"),
          },
          // {
          //   path: "care-teams",
          //   name: "Care Teams",
          //   component: () =>
          //     import("@/views/dashboard/settings/careteam/index.vue"),
          // },
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
        path: "pricebook",
        name: "PriceBook",
        component: () =>
          import("@/views/dashboard/settings/pricebook/index.vue"),
      },
    ],
  },
  //Patient Routes
  {
    path: "/dashboard/patient",
    name: "Home",
    component: PatientDashboard,
    redirect: to => `${to.path}/home`.replace("//", "/"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "Patient Dashboard",
        component: () =>
          import("@/views/dashboardPatients/patients/dashboard/Index.vue"),
      },
      ProfileSettingsRoute,
      //Patient Portal Accounts
      {
        path: "/other-providers",
        props: true,
        name: "Other Providers",
        component: () => import("@/views/dashboardPatients/patients/account/providers/existingState.vue"),
      },
      {
        path: "/family-members/:id?",
        name: "Family Members",
        props:true,
        component: () => import("@/views/dashboardPatients/patients/account/association/familytype/exisitngState.vue"),
      },
      {
        path: "account-security",
        name: "Account Security",
        component: () => import("@/views/dashboardPatients/patients/account/security/account-security.vue"),
      },
      {
        path: "access-control",
        name: "Access Control & Priviledges",
        component: () => import("@/views/dashboardPatients/patients/account/security/access-control.vue"),
      },
      {
        path: "appointments",
        name: "Appointments",
        component: () => import("@/views/dashboardPatients/patients/account/appointments/index.vue"),
      },
      {
        path: "specialist-refferal",
        name: "Specialist Referrals",
        component: () => import("@/views/dashboardPatients/patients/dashboard/specialistRefferal/index.vue"),
      },
      {
        path: "visits-patients",
        name: "Visits Patients",
        component: () => import("@/views/dashboardPatients/patients/dashboard/visits/index.vue"),
      },
      {
        path: "/validate-claim",
        name: "Validate Claim",
        component: () => import("@/views/dashboardPatients/patients/dashboard/visits/validateclaim.vue"),
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
