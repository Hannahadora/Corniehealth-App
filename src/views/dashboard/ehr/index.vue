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
        <clinical-sidebar class="pb-96" :patient='patient' />
      </div>
      <div class="w-full overflow-auto h-screen pb-72 max-h-full  mb-5 p-3 border-l-none -mt-3">
        <router-view />
      </div>
    </div>
    <patient-modal v-model:visible="showPatient" />
  <!-- </div> -->
  <patient-modal v-model:visible="showPatient"/>
  <!-- <modal :visible="!practitionerAuthenticated">
    <auth-modal />
  </modal> -->
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalSidebar from "./clinicalSidebar.vue";
import PatientModal from "./dialogs/patientDialog.vue";
import Modal from "@/components/modal.vue"
import AuthModal from "./auth-modal.vue"
import { namespace } from "vuex-class";

const userStore = namespace("user");

import { Prop } from "vue-property-decorator";
import { IPatient } from "@/types/IPatient";

const patients = namespace("patients");


@Options({
  components: {
    ClinicalSidebar,
    PatientModal,
    Modal,
    AuthModal,
  },
})
export default class ClinicalsSidebar extends Vue {
  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @userStore.State
  practitionerAuthenticated!: boolean;

  showPatient = false;

patient = {} as IPatient;

 @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  @Prop({ type: String, default: "" })
  patientId!: string;

  showPatientModal(){
    this.showPatient = true;
  }

   async created (){
      console.log('id3', this.patientId);
      this.patient = await this.findPatient(this.$route.params.id.toString())
      // this.patient = await this.findPatient(this.patientId)
      console.log('fff', this.patient)
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
