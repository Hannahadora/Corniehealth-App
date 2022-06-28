import EHR from "@/views/dashboard/ehr/index.vue";
import { RouteRecordRaw } from "vue-router";

export const ClinicalsRoute: RouteRecordRaw = {
  path: ":id",
  component: EHR,
  name: "EHR",
  // redirect: (to) => `${to.path}/health-trend`.replace("//", "/"),
  children: [
    {
      path: "health-trend/:patientId?",
      name: "Health Trend",
      component: () => import("@/views/dashboard/ehr/healthtrend/index.vue"),
    },
    {
      path: "care-team",
      name: "Care Team",
      component: () => import("@/views/dashboard/ehr/careteam/index.vue"),
    },
    {
      path: "care-plan",
      name: "Care Plans",
      component: () => import("@/views/dashboard/ehr/careplan/index.vue"),
    },
    {
      path: "care-partners",
      name: "Care Partner",
      component: () => import("@/views/dashboard/ehr/carepartners/index.vue"),
    },
    {
      path: "visits",
      name: "EHR - Visit",
      component: () => import("@/views/dashboard/ehr/visits/index.vue"),
    },
    {
      path: "conditions",
      name: "Condition/Problem",
      alias: "condition",
      component: () => import("@/views/dashboard/ehr/conditions/index.vue"),
    },
    {
      path: "allergy",
      props: true,
      name: "Allergy & Intolerance",
      component: () => import("@/views/dashboard/ehr/allergy/index.vue"),
    },
    {
      path: "medications-request",
      props: true,
      name: "Medication",
      component: () => import("@/views/dashboard/ehr/medication/index.vue"),
    },
    {
      path: "diagnostics",
      props: true,
      name: "Diagnostics",
      component: () => import("@/views/dashboard/ehr/diagnostics/index.vue"),
    },
    {
      path: "detectedissues",
      props: true,
      name: "DetectedIssues",
      component: () => import("@/views/dashboard/ehr/detectedissues/index.vue"),
    },
    {
      path: "attachments",
      props: true,
      name: "Attachments",
      component: () => import("@/views/dashboard/ehr/attachments/index.vue"),
    },
    {
      path: "vital-signs",
      props: true,
      name: "Vital Signs",
      component: () => import("@/views/dashboard/ehr/vitals/index.vue"),
    },
    {
      path: "encounter",
      props: true,
      name: "Encounter",
      component: () => import("@/views/dashboard/ehr/encounter/index.vue"),
    },
    {
      path: "clinical-impressions",
      props: true,
      name: "Clinical Impressions",
      component: () => import("@/views/dashboard/ehr/impression/index.vue"),
    },
    {
      path: "procedure",
      props: true,
      name: "Procedures",
      component: () => import("@/views/dashboard/ehr/procedures/index.vue"),
    },
    {
      path: "history",
      props: true,
      name: "History",
      component: () => import("@/views/dashboard/ehr/history/initialindex.vue"),
    },
    {
      path: "appointments",
      props: true,
      name: "Appointments",
      component: () => import("@/views/dashboard/ehr/appointment/index.vue"),
    },
    {
      path: "hospitalization",
      props: true,
      name: "Hospitalization",
      component: () =>
        import("@/views/dashboard/ehr/hospitalization/index.vue"),
    },
    {
      path: "progress-notes-existing",
      props: true,
      name: "Progress Notes",
      component: () =>
        import("@/views/dashboard/ehr/progressnotes/existing-state.vue"),
    },
    {
      path: "progress-notes",
      props: true,
      name: "Progress Notes",
      component: () => import("@/views/dashboard/ehr/progressnotes/index.vue"),
    },
    {
      path: "risk-assessment",
      props: true,
      name: "Risk Assessment",
      component: () => import("@/views/dashboard/ehr/riskassessment/index.vue"),
    },
    {
      path: "referral",
      props: true,
      name: "Referral",
      component: () => import("@/views/dashboard/ehr/refferal/index.vue"),
    },
    {
      path: "forms-questionaires",
      props: true,
      name: "Form | Questionaires | Survey",
      component: () => import("@/views/dashboard/ehr/forms/index.vue"),
    },
  ],
};
