<template>
  <main class="p-6">
    <div>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
        Organization Hierarchy
      </span>
      <tabs :items="tabLinks" v-model="currentTab"> 
        <functions />
        <job-level />
        <designations />
      </tabs>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/tabs.vue";
import Functions from "./functions/Functions.vue";
import Designations from "./designations/Designations.vue";
import JobLevel from "./joblevel/JobLevel.vue";

@Options({
  name: "Organisation Hierarchy",
  components: {
    Tabs,
    Functions,
    Designations,
    JobLevel
  },
})
export default class OrganisationHierarchy extends Vue {
  tabLinks = ["Functions", "Job Level", "Designations", "People"];
  currentTab = 0;
}
</script>

<style>
</style>