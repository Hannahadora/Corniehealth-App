<template>
  <div class="w-full">
    <div class="flex space-x-4 float-right col-span-full mr-4">
      <span v-if="fetchSingglePatientEncounter !== undefined">
        <div class="text-danger cursor-pointer flex text-sm font-bold space-x-2"  @click="endEncounter">
          <deactivate-icon class="fill-current text-danger"/> 
         <span> End Encounter</span>
         </div>
         <!-- <CornieBtn
         :loading="loading"
          class="bg-danger  rounded-full  text-white cursor-pointer"
          @click="endEncounter"
        >
          End Encounter
        </CornieBtn> -->
      </span>
      <p class="text-xs cursor-pointer text-gray-500" @click="showPatientModal">
        Patient Queue ({{ appoitments.length }})
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
          <router-view :patientId="patientId"/>
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
import IEncounter from "@/types/IEncounter";

import Modal from "@/components/modal.vue";

import PatientModal from "./dialogs/patientDialog.vue";
import AppointmentModal from "./dialogs/appointmentDialog.vue";
import ClinicalSidebar from "./clinicalSidebar.vue";
import AuthModal from "./auth-modal.vue";
import ChartModal from "./dialogs/chartDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import DeactivateIcon from "@/components/icons/cancel.vue";

const userStore = namespace("user");
const patients = namespace("patients");
type ActiveEncounter = Record<string, IEncounter | undefined>

const currentEncounter = {} as IEncounter;
const activeEncounter = { 1: currentEncounter} as ActiveEncounter;
const patientEncounter = activeEncounter[1];
delete activeEncounter[1] 

@Options({
  components: {
    ClinicalSidebar,
    PatientModal,
    Modal,
    AuthModal,
    AppointmentModal,
    ChartModal,
    CornieBtn,
    DeactivateIcon,
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
  loading = false;
  appoitments = [] as any;
  date = new Date().toISOString();

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @patients.Action
  fetchPatientsEncounter!: (locationId:string) => Promise<void>;

  @patients.State
  encounters!: ActiveEncounter;

  @patients.Action
  deletePatientEncounter!: (data: any) => Promise<boolean>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userStore.Getter
  authCurrentLocation!: string;

  patient = {} as IPatient;
  newpatientId = "";
  encounterObject = {} as any;

  @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  get patientId() {
    return this.newpatientId || (this.$route.params.id || this.$route.params.patientId) as string;
  }



  get fetchSingglePatientEncounter() {
    const pt = this.encounters[this.patientId]; 
    return pt as any;
  }



  showPatientModal() {
    this.showPatient = true;
  }

  async endEncounter() {
      const body ={
      patientId: this.patientId,
      practitionerId: this.fetchSingglePatientEncounter.practitionerId,
      locationId: this.authCurrentLocation,
      status: 'active',
      class: 'consultation',
      serviceType: 'consultation'
    }
    const confirmed = await window.confirmAction({
      message: `Are you sure you want to end this patient encounter?`,
      title: "End Patient Encounter",
    });
    if (!confirmed) return;
    const deleted = await this.deletePatientEncounter({ id: this.fetchSingglePatientEncounter.id, data: body });
    if (deleted) {
      window.notify({ msg: "Patient Encounter Ended", status: "success" });
      this.$router.push({
        path: "/dashboard/provider/clinical/",
      });
    } else{
      window.notify({ msg: "Patient Encounter not Ended", status: "error" });
    }
  }

  async fetchAppontments() {
    const [splitDate] = this.date.split('T');
   const date = splitDate;
    try {
      const { data } = await cornieClient().get(
        `/api/v1/appointment/practitioner/get-day/${this.authCurrentLocation}`,
        { date: date }
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
    await this.fetchPatientsEncounter(this.authCurrentLocation)
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
