import { RouteRecordRaw } from "vue-router";
import Settings from "@/views/dashboard/settings/index.vue";

export const SettingsRoute: RouteRecordRaw = {
  path: "settings/",
  name: "Settings",
  meta: { settings: true },
  component: Settings,
  redirect: to => `${to.path}/org-info`.replace("//", "/"),
  children: [
    {
      path: "org-hierarchy",
      name: "Organization Hierarchy",
      component: () =>
        import("@/views/dashboard/settings/OrganisationHierarchy/index.vue"),
    },
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
      path: "bank-accounts",
      name: "Billing Accounts",
      component: () => import("@/views/dashboard/settings/banks/index.vue"),
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
      component: () => import("@/views/dashboard/settings/devices/index.vue"),
    },
    {
      path: "inventory",
      name: "Inventory settings",
      component: () => import("@/views/dashboard/settings/inventory/index.vue")
    },
    {
      path: "update-add-device/:id?",
      name: "Add or Update Device",
      component: () => import("@/views/dashboard/settings/devices/updatedevice.vue"),
    },
    {
      path: "practice-information",
      name: "Practice Information",
      component: () =>
        import(
          "@/views/dashboard/settings/OrganizationInformation/OrganizationInformation.vue"
        ),
    },
    {
      path: "contact-info",
      name: "Contact Information",
      component: () =>
        import("@/views/dashboard/settings/contact/contact-information.vue"),
    },
    {
      path: "specialties",
      name: "Specialties",
      component: () =>
        import("@/views/dashboard/settings/special/index.vue"),
    },
    {
      path: "locations",
      name: "Locations",
      component: () => import("@/views/dashboard/settings/location/index.vue"),
    },
    {
      path: "add-location/:id?",
      props: true,
      name: "New Location",
      component: () =>
        import("@/views/dashboard/settings/location/addLocation.vue"),
    },
    {
      path: "domains",
      name: "Domains",
      props: true,
      component: () => import("@/views/dashboard/settings/domain/index.vue"),
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
      name: "Practitioner",
      component: () =>
        import("@/views/dashboard/settings/practitioners/addPractitioner.vue"),
    },
    {
      path: "view-practitioner/:id",
      props: true,
      name: "View Practitioner",
      component: () =>
        import("@/views/dashboard/settings/practitioners/viewPractitioner.vue"),
    },
    // {
    //   path: "care-teams",
    //   name: "Care Teams",
    //   component: () => import("@/views/dashboard/settings/careteam/index.vue"),
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
        import("@/views/dashboard/settings/rolesprivileges/role-form.vue"),
    },
    {
      path: "group",
      name: "Group",
      component: () => import("@/views/dashboard/settings/group/index.vue"),
    },
    {
      path: "practice-templates",
      name: "Practice Forms/Templates",
      component: () => import("@/views/dashboard/settings/forms/index.vue"),
    },
    {
      path: "medication",
      props: true,
      name: "Medication Request",
      component: () => import("@/views/dashboard/medications/medication/index.vue"),
    },
    {
      path: "diagnostics",
      // props: true,
      name: "Diagnostics",
      component: () => import("@/views/dashboard/diagnostics/index.vue"),
    },
    {
      path: "markup",
      props: true,
      name: "Markup",
      component: () => import("@/views/dashboard/medications/markup/index.vue"),
    },
    {
      path: "markup-settings/:id?",
      props: true,
      name: "Markup Settings",
      component: () =>
        import("@/views/dashboard/medications/markup/markup-settings.vue"),
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
      path: "charge-description-master",
      name: "Charge Description Master",
      component: () =>
        import("@/views/dashboard/settings/catalogues/index.vue"),
    },
    {
      path: "addvariant/:catalogueId",
      name: "Catalogue Medication",
      component: () =>
        import(
          "@/views/dashboard/settings/catalogues/components/new-products.vue"
        ),
    },
    {
      path: "pos",
      props: true,
      name: "POS Sales",
      component: () => import("@/views/dashboard/medications/pos/index.vue"),
    },
    {
      path: "dispense",
      props: true,
      name: "Dispense",
      component: () => import("@/views/dashboard/medications/dispense/index.vue"),
    },
    {
      path: "virtual-lab-orders",
      props: true,
      name: "Virtual Lab Orders",
      component: () => import("@/views/dashboard/diagnostics/virtual-lab-orders/index.vue"),
    },
    {
      path: "diagnostics",
      name: "Diagnostic Report",
      component: () =>
        import("@/views/dashboard/diagnostics/index.vue"),
    },
    {
      path: "observations",
      name: "Observations",
      component: () => import("@/views/dashboard/diagnostics/observations/index.vue"),
    },
    {
      path: "pharmacy-orders",
      props: true,
      name: "Virtual Pharmacy Orders",
      component: () => import("@/views/dashboard/medications/virtual-pharmacy-orders/index.vue"),
    },
  ],
};
