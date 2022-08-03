<template>
  <div class="w-full overflow-auto mb-5">
    <h2>Welcome patient</h2>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegistrationChart from "@/views/dashboard/patientexp/patients/registration-chart.vue";

import { namespace } from "vuex-class";
import { splitDate } from "@/plugins/utils";

const user = namespace("user");


@Options({
  name: "DashboardPatientHome",
  components: {


  },
})
export default class DashboardPatientHome extends Vue {

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
