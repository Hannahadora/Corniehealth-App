<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full h-screen">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Care Plan
      </span>
      <span class="w-full h-screen">
        <careplan-empty-state v-if="empty" />
        <careplan-existing-state v-else />
      </span>
    </div>
  </div>

</template>
<script lang="ts">
import ICarePlan from "@/types/ICarePlan";
import { Options, Vue } from "vue-class-component";
import CareplanEmptyState from "./emptyState.vue";
import CareplanExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const careplan = namespace("careplan");


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
   getPatientCarePlans!: (patientId: string) => Promise<void>;

  @careplan.State
  patientCarePlans!: ICarePlan[];

   get empty() {
    return this.patientCarePlans?.length < 1;
  }


   get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }


  async created() {
     await this.getPatientCarePlans(this.$route.params.id.toString());
  }
}
</script>
