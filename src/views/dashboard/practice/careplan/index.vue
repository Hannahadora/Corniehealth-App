<template>
  <div
    class="
      flex
      justify-center
      pb-76
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
    "
  >
    <div class="w-full p-2 pb-96">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
        Care Plan
      </span>
      <span class="w-full">
        <careplan-empty-state v-if="empty" />
        <careplan-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import ICarePlan from "@/types/ICarePlan";
import IPractitioner from "@/types/IPractitioner";

import { Options, Vue } from "vue-class-component";
import CareplanEmptyState from "./emptyState.vue";
import CareplanExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const careplan = namespace("careplan");
const userStore = namespace("user");

@Options({
  name: "CarePlanIndex",
  components: {
    CareplanEmptyState,
    CareplanExistingState,
  },
})
export default class CarePlanIndex extends Vue {
  addCareteam = false;


  @careplan.Action
  getCarePlans!: () => Promise<void>;

  @careplan.State
  careplans!: ICarePlan[];

  get empty() {
    return this.careplans?.length < 1;
  }

  async created() {
    await this.getCarePlans();
  }
}
</script>
