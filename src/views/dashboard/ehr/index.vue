<template>
  <div class="w-full">
    <div class="flex space-x-4 float-right col-span-full mr-4">
      <p class="text-xs cursor-pointer text-gray-500" @click="showPatientModal">
        Patient Queue ({{ patients.length }})
      </p>
      <p
        class="text-xs cursor-pointer text-gray-500"
       v-if="Object.keys(appoitments).length  > 0"
      >
        Upcoming Appointments ({{ appoitments.length || 0 }})
      </p>
      <p
        v-else
        class="text-xs cursor-pointer text-gray-500"
        @click="showAppoont = true"
      >
        Upcoming Appointments ({{ appoitments.length || 0 }})
      </p>
      <p class="text-xs cursor-pointer text-gray-500" @click="showChart = true">
        Find Patient Chart
      </p>
    </div>
    <div class="mt-10 mb-5 rounded-lg w-full">
      <div class="flex flex-col md:flex-row w-full">
        <div class="md:flex-none h-screen max-h-full">
          <clinical-sidebar class="pb-96" :patient="patient" />
        </div>
        <!-- {{ $route.name }} -->
        <div
          class="w-full md:flex-1 overflow-auto h-screen pb-72 max-h-full mb-5 p-3 border-l-none -mt-3"
        >
          <router-view />
        </div>
      </div>
    </div>

    <patient-modal v-model:visible="showPatient" />
    <appointment-modal v-model:visible="showAppoont" />
    <chart-modal v-model:visible="showChart" @patientId="getPatientId"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import IPractitioner from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";

import Modal from "@/components/modal.vue";

import PatientModal from "./dialogs/patientDialog.vue";
import AppointmentModal from "./dialogs/appointmentDialog.vue";
import ClinicalSidebar from "./clinicalSidebar.vue";
import AuthModal from "./auth-modal.vue";
import ChartModal from "./dialogs/chartDialog.vue";

const userStore = namespace("user");
const patients = namespace("patients");

@Options({
  components: {
    ClinicalSidebar,
    PatientModal,
    Modal,
    AuthModal,
    AppointmentModal,
    ChartModal,
  },
})
export default class ClinicalsSidebar extends Vue {
  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @userStore.State
  practitionerAuthenticated!: boolean;

  showPatient = false;
  showAppoont = false;
  showChart = false;
  appoitments = [] as any;
  date = new Date().toISOString();

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userStore.Getter
  authCurrentLocation!: string;

  patient = {} as IPatient;
  newpatientId = "";

  @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  get patientId() {
    return this.newpatientId || (this.$route.params.id || this.$route.params.patientId) as string;
  }

  showPatientModal() {
    this.showPatient = true;
  }
  async fetchAppontments() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/calendar/personal/day-view/${this.authCurrentLocation}/practitioner/${this.authPractitioner.id}/`,
        { date: this.date }
      );
      this.appoitments = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching appointments",
        status: "error",
      });
    }
  }
  async getPatientId(value:string){
      this.newpatientId = value;
      this.patient = await this.findPatient(this.newpatientId);
      this.$route.params.id = value;
  }

  async created() {
    this.patient = await this.findPatient(this.patientId);
    this.fetchPatients();
    this.fetchAppontments();
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
