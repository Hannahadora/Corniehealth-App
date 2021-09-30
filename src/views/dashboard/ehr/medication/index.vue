<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
            py-2
        "
      >
      Medications
      </span>
      <span class="w-full h-screen">
          <medication-empty-state
                v-if="empty"
          />
          <medication-existing-state
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IRequest from "@/types/IRequest";
import { Options, Vue } from "vue-class-component";
import MedicationEmptyState from "./emptyState.vue";
import MedicationExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const request = namespace("request");

@Options({
  name: "AllergysIndex",
  components: {
    MedicationEmptyState,
    MedicationExistingState,
  },
})
export default class MedicationIndex extends Vue {
  addMedication = false;
  show=false;

  get empty() {
    return this.requests.length < 1;
  }

 @request.State
  requests!: IRequest[];

  @request.Action
  fetchRequests!: () => Promise<void>;


created() {
    if (this.requests.length < 1) this.fetchRequests();
  }
}
</script>
