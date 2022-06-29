import { RouteRecordRaw } from "vue-router";

export const ExperienceRoutes: RouteRecordRaw = {
  path: "experience/",
  name: "Patients Experience Management",
  component: () => import("@/views/dashboard/patientexp/index.vue"),
  redirect: () => "patients",
  children: [
    {
      path: "patients",
      name: "Patients",
      component: () =>
        import("@/views/dashboard/patientexp/patients/Index.vue"),
    },
    {
      path: "settings/:id",
      props: true,
      name: "Patient Experience Settings",
      component: () =>
        import("@/views/dashboard/patientexp/patients/settings/index.vue"),
    },
    {
      path: "new-patients",
      name: "New Patient",
      component: () =>
        import("@/views/dashboard/patientexp/patients/NewPatient.vue"),
    },
    {
      path: "view-patient/:id",
      name: "View Patient",
      props: true,
      component: () =>
        import("@/views/dashboard/patientexp/patients/ViewPatient.vue"),
      children: [
        {
          path: "transactions/appointments",
          name: "Patient Appointments",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/appointment.vue"
            ),
        },
        {
          path: "transactions/specialist",
          name: "Patient Specialist Refferals",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/specialist.vue"
            ),
        },
        {
          path: "transactions/visits",
          name: "Patient Visits",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/visits.vue"
            ),
        },
        {
          path: "transactions/medications",
          name: "Patient Medication",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/medications.vue"
            ),
        },
        {
          path: "transactions/diagnostics",
          name: "Patient Diagnostics",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/diagnostics.vue"
            ),
        },
        {
          path: "transactions/bills",
          name: "Patient Bills",
          component: () =>
            import(
              "@/views/dashboard/patientexp/patients/viewscreens/bills.vue"
            ),
        },
      ],
    },
    {
      path: "edit-patient/:id",
      name: "Edit Patient",
      props: true,
      component: () =>
        import("@/views/dashboard/patientexp/patients/NewPatient.vue"),
    },
    {
      path: "add-appointment/:id?",
      props: route => ({
        slotId: route.query.slot,
        id: route.params.id,
        practitionersId: route.query.practitioner,
      }),
      name: "Create Appointment",
      component: () =>
        import("@/views/dashboard/patientexp/appointments/addAppointment.vue"),
    },
    {
      path: "appointments",
      name: "Appointment",
      component: () =>
        import("@/views/dashboard/patientexp/appointments/index.vue"),
    },
    {
      path: "calendar/:practitionerId?",
      props: route => ({ practitionerId: route.query.practitioner }),
      name: "Calendar",
      component: () =>
        import("@/views/dashboard/patientexp/calendar/index.vue"),
    },
    {
      path: "actor-calendar/:practitionerId?",
      props: route => ({ practitionerId: route.query.practitioner }),
      component: () =>
        import("@/views/dashboard/patientexp/calendar/index.vue"),
    },
    {
      path: "responses/:id?",
      props: true,
      name: "Appointment Response",
      component: () =>
        import("@/views/dashboard/patientexp/appointments/response.vue"),
    },
    {
      path: "add-response/:id?",
      name: "Respond",
      props: true,
      component: () =>
        import("@/views/dashboard/patientexp/appointments/addResponse.vue"),
    },
    {
      path: "edit-response/:id?",
      name: "Edit Respone",
      props: true,
      component: () =>
        import("@/views/dashboard/patientexp/appointments/editResponse.vue"),
    },
    {
      path: "tasks",
      name: "Tasks",
      component: () => import("@/views/dashboard/patientexp/tasks/index.vue"),
    },
    {
      path: "add-task/:id?",
      name: "New Task",
      props: true,
      component: () => import("@/views/dashboard/patientexp/tasks/addTask.vue"),
    },
    {
      path: "requests",
      name: "Requests",
      component: () =>
        import("@/views/dashboard/patientexp/requests/index.vue"),
    },
    {
      path: "visits",
      name: "Visits",
      component: () => import("@/views/dashboard/visits/index.vue"),
    },
    {
      path: "visits/timeline",
      name: "Visits Timeline",
      component: () =>
        import("@/views/dashboard/visits/components/timeline-table.vue"),
    },
    {
      path: "schedules",
      props: true,
      name: "Schedules",
      component: () => import("@/views/dashboard/schedules/index.vue"),
    },
    {
      path: "schedules/new/:scheduleId?",
      props: true,
      name: "Patient Experience - New Schedule",
      component: () =>
        import("@/views/dashboard/schedules/create-schedule.vue"),
    },
    {
      path: "schedules/editslot/:scheduleId?",
      props: true,
      name: "Edit Slot",
      component: () => import("@/views/dashboard/schedules/edit-slot.vue"),
    },
  ],
};
