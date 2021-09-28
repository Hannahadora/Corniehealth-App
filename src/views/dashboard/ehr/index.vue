<template>
  <div class="w-full">
    <div class="flex space-x-4 float-right col-span-full mr-4">
      <p class="text-xs cursor-pointer text-gray-500" @click="showPatientModal">
        Patient Queue (2)
      </p>
      <p class="text-xs cursor-pointer text-gray-500" @click="showAppoont">
        Upcoming Appointments (2)
      </p>
      <p class="text-xs cursor-pointer text-gray-500" @click="showChart">
        Find Patient Chart
      </p>
    </div>
    <div class="mt-10 mb-5 rounded-lg settings">
      <div class="w-full h-screen max-h-full">
        <clinical-sidebar class="pb-96" />
      </div>
      <div class="w-full overflow-auto h-screen pb-72 max-h-full border-l-2">
        <router-view />
      </div>
    </div>
    <patient-modal v-model:visible="showPatient" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalSidebar from "./clinicalSidebar.vue";
import PatientModal from "./dialogs/patientDialog.vue";

@Options({
  components: {
    ClinicalSidebar,
    PatientModal,
  },
})
export default class ClinicalsSidebar extends Vue {
  showPatient = false;

  showPatientModal() {
    this.showPatient = true;
  }
}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 25% 75%;
  height: 82vh;
}
</style>
