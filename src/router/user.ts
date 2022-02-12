import { RouteRecordRaw } from "vue-router";

export const UserRoute: RouteRecordRaw = {
  path: "user",
  props: true,
  name: "Settings",
  component: () => import("@/views/dashboard/usersettings/profile/index.vue"),
  children: [
    {
      path: "",
      props: true,
      name: "Settings",
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
};
