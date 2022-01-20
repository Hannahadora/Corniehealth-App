<template>
  <div class="w-full overflow-auto mb-5">
    <div
      class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto"
    >
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Dashboards
        </span>
        <tabs :items="tabLinks" v-model="currentTab">
          <functions />
        </tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegistrationChart from "@/views/dashboard/patientexp/patients/registration-chart.vue";
import Tabs from "./tabs.vue";
import Functions from "./Functionsme.vue";
@Options({
  name: "DashboardHome",
  components: {
    RegistrationChart,
    Tabs,
    Functions,
  },
})
export default class DashboardHome extends Vue {
  tabLinks = ["Patient", "Capacity"];
  currentTab = 0;
}
</script>
