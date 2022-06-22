<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Medicatons
      </span>
      <span class="w-full h-screen">
       <medication-empty-state v-if="empty" />
        <medication-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import MedicationEmptyState from "./emptyState.vue";
import MedicationExistingState from "./existingState.vue";
import IRequest from "@/types/IRequest";

const request = namespace("request");

@Options({
  name: "MedicationIndex",
  components: {
    MedicationExistingState,
    MedicationEmptyState,
  },
})
export default class MedicationIndex extends Vue {

  get empty() {
    return this.patientrequests.length < 1;
  }

  get patientId() {
    return this.$route.params.id as string;
  }

  @request.State
  patientrequests!: IRequest[];

  @request.Action
  fetchrequestsById!: (patientId: string) => Promise<void>;

  

  async created() {
    await this.fetchrequestsById(this.patientId);
  }
}
</script>
