<template>
  <div
    class="flex justify-center h-65-screen bg-white shadow-md p-3 mb-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-3 text-xl text-primary py-2"
      >
        Condition
      </span>
      <span class="w-full">
        <empty-state v-if="empty"/>
        <existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";
import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");

@Options({
  name: "conditions",
  components: {
    EmptyState,
    ExistingState,
  },
})
export default class Conditions extends Vue {

  
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;
  
  @condition.State
  conditions!: ICondition[];

    get patientId() {
       return this.$route.params.id as string;
    }
   get patientConditions() {
    return this.conditions || [];
  }


  get empty() {
    return this.patientConditions.length < 1;
  }

   async created() {
      await this.fetchPatientConditions(this.patientId);

  }
}
</script>
<style scoped>
.h-65-screen {
  min-height: 80vh;
}
</style>
