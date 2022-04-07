<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
       History
      </span>
      <span class="w-full h-screen">
          <tabs :items="tabLinks" v-model="currentTab">
            <family-section/>
            <patient-section />
          </tabs>
        
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import Tabs from "@/components/tabs.vue";

import FamilySection from "./index.vue";
import PatientSection from "./patient/index.vue";




@Options({
  name: "HistoryIndex",
  components: {
    Tabs,
    FamilySection,
    PatientSection,

  },
})
export default class HistoryIndex extends Vue {
  @Prop({ type: String, default: "" })
  practitionerId!: string;

  tabLinks = [
    "Family Member History",
    "Patient Medical",
  ];
  currentTab = 0;
}
</script>

<style>
</style>
