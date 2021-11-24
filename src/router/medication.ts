import { RouteRecordRaw } from "vue-router";

export const MedicationRoutes: RouteRecordRaw = {
  path: "medication/",
  name: "Medication",
  component: () => import("@/views/dashboard/medications/Index.vue"),
  redirect: () => "locationTax",
  children: [
    {
      path: "locationTax",
      name: "Location & Tax",
      component: () =>
        import("@/views/dashboard/medications/locationtax/index.vue"),
    },
  ],
};
