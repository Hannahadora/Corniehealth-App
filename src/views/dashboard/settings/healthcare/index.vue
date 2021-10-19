<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
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
        Healthcare Services
      </span>
      <span class="w-full">
        <healthcare-empty-state v-if="empty" />
        <healthcare-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IHealthcare from "@/types/IHealthcare";
import { Options, Vue } from "vue-class-component";
import HealthcareEmptyState from "./emptyState.vue";
import HealthcareExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const healthcare = namespace("healthcare");

@Options({
  name: "HealthcareIndex ",
  components: {
    HealthcareEmptyState,
    HealthcareExistingState,
  },
})
export default class HealthcareIndex extends Vue {
   addHealthcare = false;
  HealthcareToUpdate = {} as IHealthcare;

  get empty() {
    return this.healthcares.length < 1;
  }

 @healthcare.State
  healthcares!: IHealthcare[];

  @healthcare.Action
  fetchHealthcares!: () => Promise<void>;


created() {
  this.fetchHealthcares();
    if (this.healthcares.length < 1) this.fetchHealthcares();
  }
}
</script>
