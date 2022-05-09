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
    {
      path: "care-partners",
      name: "Care Partners",
      component: () => import("@/views/dashboard/practice/carepartners/index.vue"),
    },
    {
      path: "care-plan",
      name: "Care Plan",
      component: () => import("@/views/dashboard/practice/careplan/index.vue"),
    },
    {
      path: "care-team",
      name: "Care Teams",
      component: () => import("@/views/dashboard/practice/careteam/index.vue"),
    },
    {
      path: "newservice/:id?",
      name: "New Service",
      props: true,
      component: () =>
        import(
          "@/views/dashboard/practice/cdm/components/new-service.vue"
        ),
    },
    {
      path: "newproduct/:id?",
      name: "New Product",
      props: true,
      component: () =>
        import(
          "@/views/dashboard/practice/cdm/components/new-products.vue"
        ),
    },
    
    
  ],
};
