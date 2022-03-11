<template>
  <div class="w-full overflow-auto mb-5">
    <div class="sect1 my-8">
      <div class="greet">Good Morning, Dr. Johnson!</div>
      <div class="flex items-center mt-4">
        <span class="">Have a lovely day</span>
        <img class="ml-6" src="@/assets/Emoji.png" alt="" />
      </div>

      <div class="s1-slider mt-8">
        <span class="px-5 py-2 rounded-lg mr-1">My Dashbord</span>
        <span class="px-5 py-2 rounded-lg bg-white font-semibold"
          >Admin Dashboard</span
        >
      </div>
    </div>

    <!-- <timeframe /> -->

    <div class="bg-white p-6 mb-8">
      <span class="font-bold text-xl">Timeframe</span>

      <div class="grid items-center gap-8 mt-4" style="grid-template-columns: 23% 23% 1% 23% 23%">
        <div class="flex items-center px-4 py-3" style="background: #F0F4FE">
          <img class="mr-4" src="" alt="">
          <span class="text-base w-10/12" style="">Preferred Period Range</span>
          <img class="ml-4" src="" alt="">
        </div>

        <div>
          <input type="date" class="w-full py-3 pr-4 pl-2 rounded-lg border border-gray-200" />
        </div>
        <span>to</span>
        <div>
          <input type="date" class="w-full py-3 pr-4 pl-2 rounded-lg border border-gray-200" />
        </div>

        <div>
          <button
            class="py-3 px-20 rounded-lg text-white font-bold text-base"
            style="background: #fe4d3c"
            type="button"
          >
            Fetch Records
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-8 rounded w-full overflow-auto"
    >
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Dashboards
        </span>
        <registration-chart class="w-full" />
      </div>
    </div>

    <div class="w-full grid grid-cols-3 gap-8">
     <div class="col-span-3"> 
        <appointment-chart  />
     </div>
     
      <referral-chart />
       <visits-chart />
    <InpatientChart />
      
      <!--
      <billings-chart />
      <medication-chart /> -->

      <!-- <diagnostics-chart /> -->
      <!-- <chart-card height="439px" title="Diagnostics" /> -->
    </div>
    <!-- <span class="w-full grid">
      <rating-chart />
    </span> -->
    <!-- <div class="w-full grid gap-x-3" style="grid-template-columns: 64% 35%">
      <resource-chart />
      <messages-chart />
    </div> -->
    <!-- <questionnaire-chart /> -->
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
import DiagnosticsChart from "./diagnostics-chart.vue";
import ReferralChart from "./referral-chart.vue";
import RatingChart from "./ratings-chart.vue";
import ResourceChart from "./resource-chart.vue";
import MessagesChart from "./messages-chart.vue";
import InpatientChart from "./inpatient-chart.vue";
import QuestionnaireChart from "./questionnaire-chart.vue";
import TimeFrame from "./timeframe.vue";

@Options({
  name: "DashboardHome",
  components: {
    RegistrationChart,
    VisitsChart,
    MessagesChart,
    ReferralChart,
    InpatientChart,
    ChartCard,
    DiagnosticsChart,
    AppointmentChart,
    BillingsChart,
    MedicationChart,
    RatingChart,
    ResourceChart,
    QuestionnaireChart,
    TimeFrame,
  },
})
export default class DashboardHome extends Vue {}
</script>

<style scoped>
.greet {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 45px;
  color: #14171f;
}

.s1-slider {
  width: fit-content;
  font-family: "Inter";
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #14171f;
  background: #f0f1f5;
  display: flex;
  flex-direction: row;
}
</style>
