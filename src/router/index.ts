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
    redirect: (to) => `${to.path}/settings`.replace("//", "/"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "add-group/:id?",
        props: true,
        name: "Add a New Group",
        component: () =>
          import("@/views/dashboard/settings/group/addGroup.vue"),
      },
      {
        path: "experience/",
        props: true,
        name: "Patients Experience Management",
        component: () =>
          import("@/views/dashboard/patientexp/index.vue"),
      }, 
      {
        path: "experience/add-appointment/:id?",
        props: true,
        name: "Create Appointment",
        component: () =>
          import("@/views/dashboard/patientexp/appointments/addAppointment.vue"),
      },
      {
        path: "experience/appointments",
        name: "Appointment",
        component: () =>
          import("@/views/dashboard/patientexp/appointments/index.vue"),
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
      {
        path: "experience/",
        name: "Patients Experience Management",
        component: () => import("@/views/dashboard/patientexp/index.vue"),
        redirect: () => "dashboard",
        children: [
          {
            path: "dashboard",
            name: "Experience Dashboard",
            component: () =>
              import("@/views/dashboard/patientexp/dashboard/Index.vue"),
          },
          {
            path: "patients",
            name: "Patients",
            component: () =>
              import("@/views/dashboard/patientexp/patients/Index.vue"),
          },
          {
            path: "new-patients",
            name: "New Patient",
            component: () =>
              import("@/views/dashboard/patientexp/patients/NewPatient.vue"),
          },
          {
            path: "add-appointment/:id?",
            props: true,
            name: "Create Appointment",
            component: () =>
              import("@/views/dashboard/patientexp/appointments/addAppointment.vue"),
          },
          {
            path: "appointments",
            name: "Appointment",
            component: () =>
              import("@/views/dashboard/patientexp/appointments/index.vue"),
          },
          {
            path: "appointment-response",
            name: "Appointment Response",
            component: () =>
              import("@/views/dashboard/patientexp/appointments/response.vue"),
          },  
          {
            path: "add-response/:id?",
            name: "Respond",
            component: () =>
              import("@/views/dashboard/patientexp/appointments/addResponse.vue"),
          }, 
          {
            path: "requests",
            name: "Requests",
            component: () =>
              import("@/views/dashboard/patientexp/requests/index.vue"),
          },  
          {
            path: "add-request/:id?",
            name: "New Requests",
            component: () =>
              import("@/views/dashboard/patientexp/requests/addRequests.vue"),
          },
          {
            path: "edit-request/:id?",
            name: "View Requests",
            component: () =>
              import("@/views/dashboard/patientexp/requests/editRequests.vue"),
          },
          {
            path: "add-request-reffer/:id?",
            name: "New Reffer",
            component: () =>
              import("@/views/dashboard/patientexp/requests/addRefferRequests.vue"),
          },
          {   
            path: "visits",
            name: "Patient Visits",
            component: () =>
              import("@/views/dashboard/visits/index.vue"),
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
      {
        path: "org-heirarchy/new-designation",
        name: "New Designation",
        component: () =>
          import(
            "@/views/dashboard/settings/OrganisationHierarchy/designations/NewDesignation.vue"
          ),
      },
      {
        path: "schedules",
        props: true,
        name: "Patient Experience Management.",
        component: () =>
          import("@/views/dashboard/schedules/index.vue"),
      },
      {
        path: "schedules/new/:scheduleId?",
        props: true,
        name: "Patient Experience Management",
        component: () =>
          import("@/views/dashboard/schedules/create-schedule.vue"),
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
