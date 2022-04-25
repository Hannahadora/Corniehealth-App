import { RouteRecordRaw } from "vue-router";

export const PracticeRoutes: RouteRecordRaw = {
  path: "practice/",
  name: "Practice",
  component: () => import("@/views/dashboard/practice/index.vue"),
  redirect: () => "practice",
  children: [
    {
      path: "practice",
      props: true,
      name: "Practice",
      component: () => import("@/views/dashboard/practice/cdm/index.vue"),
    },
    {
      path: "inventory",
      props: true,
      name: "Inventory",
      component: () => import("@/views/dashboard/practice/inventorystock/index.vue"),
    },
    
  ],
};
