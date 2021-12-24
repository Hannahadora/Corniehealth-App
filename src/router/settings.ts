import { RouteRecordRaw } from "vue-router";
import Settings from "@/views/dashboard/settings/index.vue";

export const SettingsRoute: RouteRecordRaw = {
    path: "settings/",
    name: "Settings",
    component: Settings,
    redirect: to => `${to.path}/org-info`.replace("//", "/"),
    children: [
        {
            path: "org-hierarchy",
            name: "Organization Hierarchy",
            component: () =>
                import("@/views/dashboard/settings/OrganisationHierarchy/index.vue"),
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
                import("@/views/dashboard/settings/contact/contact-information.vue"),
        },
        {
            path: "location",
            name: "Location Hierarchy",
            component: () => import("@/views/dashboard/settings/location/index.vue"),
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
            name: "Create or Update Practitioner",
            component: () =>
                import("@/views/dashboard/settings/practitioners/addPractitioner.vue"),
        },
        {
            path: "care-teams",
            name: "Care Teams",
            component: () => import("@/views/dashboard/settings/careteam/index.vue"),
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
            path: "markup",
            props: true,
            name: "Markup",
            component: () => import("@/views/dashboard/medications/markup/index.vue"),
        },
        {
            path: "markup-settings",
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
    ],
};
