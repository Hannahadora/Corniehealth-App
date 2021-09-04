<template>
  <div class="w-full overflow-auto mb-5">
    <div
      class="
        flex-col
        justify-center
        bg-white
        shadow-md
        p-3
        mt-2
        mb-2
        rounded
        w-full
        overflow-auto
      "
    >
      <div class="w-full p-2">
        <span
          class="
            flex flex-col
            w-full
            justify-center
            border-b-2
            font-bold
            mb-5
            text-xl text-primary
            py-2
          "
        >
          Dashboard
        </span>
        <registration-chart class="w-full" />
      </div>
    </div>
    <div class="w-full grid grid-cols-3 gap-4">
      <appointment-chart />
      <chart-card height="330px" title="Active Visits" />
      <chart-card height="330px" title="Billings & Payments" />
      <chart-card height="330px" title="Medication" />
      <chart-card height="330px" title="Diagnostics" />
      <chart-card height="330px" title="Referral" />
    </div>
    <chart-card title="Ratings" height="330px" />
    <div class="w-full grid grid-cols-2 gap-x-4">
      <chart-card title="Resource Efficiency" height="330px" />
      <chart-card title="Messages" height="330px" />
    </div>
    <chart-card title="Questionnaires" height="250px" />
    <chart-card title="InPatient" class="mt-4" height="270px" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegistrationChart from "@/views/dashboard/patientexp/patients/registration-chart.vue";
import ChartCard from "./chart-card.vue";
import AppointmentChart from "./appointment-chart.vue";

@Options({
  name: "DashboardHome",
  components: {
    RegistrationChart,
    ChartCard,
    AppointmentChart,
  },
})
export default class DashboardHome extends Vue {}
</script>
