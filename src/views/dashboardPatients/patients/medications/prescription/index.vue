<template>
    <div class="pb-40">
  
      <div>
        <empty-state v-if="noprescription" @openModal="openModal"/>
        <existing-state v-else  @openModal="openModal"/>
      </div>
      </div>
  
      <prescription-modal v-model="showPrescriptionModal" @close="showPrescriptionModal = false" />
  </template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  import { namespace } from "vuex-class";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import EmptyState from './emptyState.vue';
  import ExistingState from './existingState.vue';
  import PrescriptionModal from './PrescriptionModal.vue';
import { cornieClient } from "@/plugins/http";
  
  @Options({
    name: "prescriptionPage",
    components: {
      ChevronRightIcon,
      ChevronLeftIcon,
      EmptyState,
      ExistingState,
      PrescriptionModal
    },
  })
  export default class prescriptionPage extends Vue {  
    currentTab = 0;
    prescriptions: any = [];
    showPrescriptionModal: Boolean = false;
  
    get noprescription() {
      return this.prescriptions.length === 0
    }
  
    openModal() {
      this.showPrescriptionModal = true
    }
  
    async fetchPrescription() {
    try {
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/prescription/get-all"
      );
      this.prescriptions = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }
    async created() {
      await this.fetchPrescription()
    }
  }
  </script>
  
  <style></style>
  