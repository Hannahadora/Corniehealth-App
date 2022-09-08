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
      component: () =>
        import("@/views/dashboard/practice/inventorystock/index.vue"),
    },
    {
      path: "care-partners",
      name: "Care Partners",
      component: () =>
        import("@/views/dashboard/practice/carepartners/index.vue"),
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
        import("@/views/dashboard/practice/cdm/components/new-service.vue"),
    },
    {
      path: "newproduct/:id?",
      name: "New Product",
      props: true,
      component: () =>
        import("@/views/dashboard/practice/cdm/components/new-products.vue"),
    },
    {
      path: "locations",
      name: "Practice Locations",
      component: () => import("@/views/dashboard/settings/location/index.vue"),
    },
    {
      path: "location/:id",
      name: "Practice Locations sub module",
      component: () => import("@/views/dashboard/settings/location/sub-locations.vue"),
      children: [
        {
          path: "sub-locations",
          name: "sub-locations",
          component: () => import("@/views/dashboard/settings/location/other-location/index.vue"),
        },
        {
          path: "add-locations",
          name: "sub-locations-add-locations",
          component: () => import("@/views/dashboard/settings/location/other-location/add-location.vue"),
        },
      ]
    },
    {
      path: "add-location/:id?",
      props: true,
      name: "New Practice Location",
      component: () =>
        import("@/views/dashboard/settings/location/addLocation.vue"),
    },
    {
      path: "group",
      name: "Practice Group",
      component: () => import("@/views/dashboard/settings/group/index.vue"),
    },
  ],
};
