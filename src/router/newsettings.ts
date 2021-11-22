import { RouteRecordRaw } from "vue-router";

export const NewSettingsRoutes: RouteRecordRaw = {
  path: "settings/practise-management",
  name: "Practise Management",
  component: () => import("@/views/dashboard/settings/indexnew.vue"),
  redirect: () => "forms-questionnaires",
  children: [
    {
        path: "forms-questionnaires",
        name: "Forms & Questionnaires",
        component: () =>
          import("@/views/dashboard/settings/forms/index.vue"),
      },
      {
        path: "add-new-form/:id?",
        props: true,
        name: "New Practice Form",
        component: () =>
          import("@/views/dashboard/settings/forms/newform.vue"),
      },
      // {
      //   path: "add-questionnaires/:id?",
      //   props: true,
      //   name: "Questionnaires",
      //   component: () =>
      //     import("@/views/dashboard/settings/forms/surveys.vue"),
      // },
  ],
};
