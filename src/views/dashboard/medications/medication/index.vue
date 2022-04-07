<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
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
    return this.requests.length < 1;
  }

  @request.State
  requests!: IRequest[];

  @request.Action
  fetchRequests!: () => Promise<void>;


  async created() {
    await this.fetchRequests();
  }
}
</script>
