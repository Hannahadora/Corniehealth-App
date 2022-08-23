import { RouteRecordRaw } from "vue-router";

export const ProfileSettingsRoute: RouteRecordRaw = {
  path: "account-settings/:id?",
  props:true,
  name: "Private Profile & Settings",
  component: () => import("@/views/dashboardPatients/patients/account/index.vue"),
  children: [
    {
      path: "family-members:/id",
      name: "Family Members",
      props:true,
      component: () => import("@/views/dashboardPatients/patients/account/association/familytype/exisitngState.vue"),
    },
  ]
};
