<template>
  <div class="pb-40">
    <div class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full">
      <div class="w-full">
        <span
          class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Medications
        </span>
      </div>

      <span class="w-full">
        <tabs :items="tabLinks" v-model="currentTab">
          <prescription-section />
          <medication-subscription-section />
          <medication-order-section />
        </tabs>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import Tabs from "@/components/tabs.vue";

import PrescriptionSection from './prescription/index.vue'
import MediicationSubscriptionSection from './medication-subscription/index.vue'
import MedicationOrderSection from './medication-order/index.vue'

@Options({
  name: "MedicationPage",
  components: {
    Tabs,
    ChevronRightIcon,
    ChevronLeftIcon,
    PrescriptionSection,
    MediicationSubscriptionSection,
    MedicationOrderSection
  },
})
export default class MedicationPage extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;
  currentTab = 0;
   tabLinks = ["Prescription", "Medication Subscription", "Medication Orders"];

  async created() {
  }
}
</script>

<style></style>
