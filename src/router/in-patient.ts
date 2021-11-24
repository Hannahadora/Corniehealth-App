import { RouteRecordRaw } from "vue-router";

export const InPatientRoutes: RouteRecordRaw = {
    path: "in-patient/",
    name: "In-Patient",
    component: () => import("@/views/dashboard/in-patient/Index.vue"),
};