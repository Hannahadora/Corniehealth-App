import { RouteRecordRaw } from "vue-router";

export const UserRoute: RouteRecordRaw = {
  path: "user",
  name: "User Settings",
  component: () => import("@/views/dashboard/usersettings/profile/index.vue"),
  redirect: () => "practitioner-profile",
  children: [
    // {
    //   path: "",
    //   props: true,
    //   component: () =>
    //     import(
    //       "@/views/dashboard/usersettings/profile/components/empty-state.vue"
    //     ),
    // },
    {
      path: "practitioner-profile",
      props: true,
      name: "Practitioner profile",
      component: () =>
        import("@/views/dashboard/usersettings/profile/components/index.vue"),
    },
    {
      path: "edit-profile",
      props: true,
      name: "Edit profile",
      component: () =>
        import(
          "@/views/dashboard/usersettings/profile/components/user-setup.vue"
        ),
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
