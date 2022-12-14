<template>
  <div class="w-full overflow-auto mb-5">
    <div class="sect1 my-8">
      <div class="greet">
        {{ `Good ${greeting}` || "Hello" }}, Dr. {{ cornieUser?.firstName }}!
      </div>
      <div class="flex items-center mt-4">
        <span class="">Have a lovely {{ greeting || "rest" }}</span>
        <!-- <img class="ml-3" src="../../../../assets/emoji.png" alt="" /> -->
      </div>

      <div class="s1-slider mt-8">
        <span
          @click="dashboardType = 'personal'"
          class="px-5 py-2 rounded-lg cursor-pointer mr-1"
          :class="{
            'bg-white font-semibold': dashboardType === 'personal',
          }"
          >My Dashboard</span
        >
        <span
          @click="dashboardType = 'admin'"
          class="px-5 py-2 rounded-lg cursor-pointer"
          :class="{
            'bg-white font-semibold': dashboardType === 'admin',
          }"
          >Admin Dashboard</span
        >
      </div>
    </div>

    <div class="bg-white p-6 mb-8">
      <span class="font-bold text-xl">Timeframe</span>

      <div
        class="grid items-center gap-8 mt-4"
        style="grid-template-columns: 23% 23% 1% 23% 23%"
      >
        <div class="flex items-center px-4 py-3" style="background: #f0f4fe">
          <img class="mr-4" src="@/assets/calendericon.svg" alt="" />
          <span class="text-base w-10/12" style="">Preferred Period Range</span>
          <img class="ml-4" src="@/assets/chevrindownprimary.svg" alt="" />
        </div>

        <div>
          <date-picker class="w-full" v-model="startDate" />
        </div>
        <span>to</span>
        <div>
          <date-picker class="w-full" v-model="endDate" />
        </div>

        <div>
          <button
            @click="fetchRecord"
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
        <registration-chart class="w-full" />
      </div>
    </div>

    <div class="w-full grid grid-cols-3 gap-8 mb-8">
      <div class="col-span-3">
        <div class="grid grid-cols-3 gap-8">
          <appointment-chart :context="chartContext" />
          <appointment-summary :locationId="authCurrentLocation" />
        </div>
      </div>

      <referral-chart :context="chartContext" />
      <visits-chart :context="chartContext" />
      <InpatientChart />
    </div>

    <div class="w-full grid grid-cols-2 gap-8 mb-8">
      <medication-chart :context="chartContext" />
      <diagnostics-chart :context="chartContext" />
    </div>

    <div class="mb-8">
      <billings-chart />
    </div>
    <div class="mb-8">
      <rating-chart />
    </div>
    <div class="mb-8">
      <resource-chart />
    </div>
    <div class="mb-11">
      <messages-chart />
    </div>
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
import { string } from "yup";
import DatePicker from "@/components/datepicker.vue";
import AppointmentSummary from "./appointment-summary.vue";
import { ChartContext } from "./types";

import { namespace } from "vuex-class";
import { splitDate } from "@/plugins/utils";

const user = namespace("user");

const today = new Date();
const todayStr = splitDate(today);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayStr = splitDate(yesterday);

@Options({
  name: "DashboardHome",
  components: {
    RegistrationChart,
    AppointmentSummary,
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
    DatePicker,
  },
})
export default class DashboardHome extends Vue {
  required = string().required();

  @user.Getter
  cornieUser!: "";

  @user.Getter
  authCurrentLocation!: string;

  dashboardType = "personal";
  startDate = yesterdayStr;
  endDate = todayStr;

  get chartContext(): ChartContext {
    return {
      locationId: this.authCurrentLocation,
      start: this.startDate,
      end: this.endDate,
      admin: this.dashboardType == "admin",
    };
  }

  get greeting() {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs >= 1 && hrs <= 11.59) return "Morning";
    else if (hrs >= 12 && hrs <= 17) return "Afternoon";
    else if (hrs >= 17 && hrs <= 24) return "Evening";
  }

  // fetchRecord() {
  //   this.chartContext()
  // }
}
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
