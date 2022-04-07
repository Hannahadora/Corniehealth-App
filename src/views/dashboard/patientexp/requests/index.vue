<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
       Requests
      </span>
      <span class="w-full h-screen">
          <tabs :items="tabLinks" v-model="currentTab">
            <medication-section/>
            <diagnostic-section />
            <refferal-section />
          </tabs>
        
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import Tabs from "@/components/tabs.vue";

import MedicationSection from "./medication/index.vue";
import DiagnosticSection from "./diagnostic/index.vue";
import RefferalSection from "./refferal/index.vue";



@Options({
  name: "RequestIndex",
  components: {
    Tabs,
    MedicationSection,
    DiagnosticSection,
    RefferalSection,

  },
})
export default class RequestIndex extends Vue {
  @Prop({ type: String, default: "" })
  practitionerId!: string;

  tabLinks = [
    "Medications",
    "Diagnostics",
    "Referrals",
  ];
  currentTab = 0;
}
</script>

<style>
</style>
