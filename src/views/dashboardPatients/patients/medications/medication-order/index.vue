<template>
    <div class="pb-40">
  
      <div>
        <empty-state v-if="noMedicationOrder" @openModal="openModal"/>
        <existing-state v-else  @openModal="openModal"/>
      </div>
      </div>
  
      <!-- <book-prescription-modal v-model="medicationOrderModal" @close="prescriptionModal = false" /> -->
  </template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  import { namespace } from "vuex-class";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import EmptyState from './emptyState.vue';
  import ExistingState from './existingState.vue';
//   import BookprescriptionModal from './components/bookprescriptionModal.vue';
  
  @Options({
    name: "prescriptionPage",
    components: {
      ChevronRightIcon,
      ChevronLeftIcon,
      EmptyState,
      ExistingState,
    //   BookprescriptionModal
    },
  })
  export default class prescriptionPage extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;
  
    currentTab = 0;
    medicationOrders: any = [];
    medicationOrderModal: Boolean = false;
  
    get noMedicationOrder() {
      return this.medicationOrders.length === 0
    }
  
    openModal() {
      this.medicationOrderModal = true
    }
  
    async created() {}
  }
  </script>
  
  <style></style>
  