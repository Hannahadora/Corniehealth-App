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
      <visits-chart />
      <billings-chart />
      <medication-chart />
      <chart-card height="439px" title="Diagnostics" />
      <referral-chart />
    </div>
    <span class="w-full grid">
      <rating-chart />
    </span>
    <div class="w-full grid grid-cols-2 gap-x-4">
      <resource-chart />
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
import VisitsChart from "./visits-chart.vue";
import BillingsChart from "./billings-chart.vue";
import MedicationChart from "./medication-chart.vue";
import ReferralChart from "./referral-chart.vue";
import RatingChart from "./ratings-chart.vue";
import ResourceChart from "./resource-chart.vue";

@Options({
  name: "DashboardHome",
  components: {
    RegistrationChart,
    VisitsChart,
    ReferralChart,
    ChartCard,
    AppointmentChart,
    BillingsChart,
    MedicationChart,
    RatingChart,
    ResourceChart,
  },
})
export default class DashboardHome extends Vue {}
</script>
