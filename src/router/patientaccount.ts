import { RouteRecordRaw } from "vue-router";

export const ProfileSettingsRoute: RouteRecordRaw = {
  path: "account-settings",
  name: "Private Profile & Settings",
  component: () => import("@/views/dashboardPatients/patients/account/index.vue"),
};
