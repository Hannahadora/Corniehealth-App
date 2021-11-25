import { RouteRecordRaw } from "vue-router";

export const MedicationRoutes: RouteRecordRaw = {
  path: "medications/",
  name: "Medications",
  component: () => import("@/views/dashboard/medications/newindex.vue"),
  redirect: () => "locationTax",
  children: [
    {
      path: "locationTax",
      name: "Location & Tax",
      component: () =>
        import("@/views/dashboard/medications/locationtax/index.vue"),
    },
    {
      path: "add-location",
      name: "Add Location",
      component: () =>
        import("@/views/dashboard/medications/locationtax/addLocation.vue"),
    },
    {
      path: "add-tax",
      name: "Add Tax",
      component: () =>
        import("@/views/dashboard/medications/locationtax/addtax.vue"),
    },
  ],
};
