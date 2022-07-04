<template>
  <div class="w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold text-xl text-primary py-2"
      >
        {{
          type === "requests" ? "Medication Requests" : "Dispensed Medications"
        }}
      </span>
      <!-- <span class="w-full h-screen">
         <medication-empty-state v-if="empty" />
        <medication-existing-state v-else />
      </span> -->

      <div class="flex items-center space-x-8 border-b-4 border-gray-300">
        <span
          class="px-3 pt-9 pb-2 -mb-1 cursor-pointer"
          :class="{
            'border-b-4 border-red-500 font-bold': type === 'requests',
          }"
          @click="type = 'requests'"
          >Requests</span
        >
        <span
          class="px-3 pt-9 pb-2 -mb-1 cursor-pointer"
          :class="{
            'border-b-4 border-red-500 font-bold': type === 'dispense',
          }"
          @click="type = 'dispense'"
          >Dispensed</span
        >
      </div>
      <div class="w-full pb-7 mt-10">
        <request-table v-if="type === 'requests'" />
        <dispense-table v-if="type === 'dispense'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import MedicationEmptyState from "./emptyState.vue";
import MedicationExistingState from "./existingState.vue";
import IRequest from "@/types/IRequest";
import RequestTable from "./existingState.vue";
import DispenseTable from "../../medications/dispense/index.vue";

const request = namespace("request");

@Options({
  name: "MedicationIndex",
  components: {
    MedicationExistingState,
    MedicationEmptyState,
    DispenseTable,
    RequestTable,
  },
})
export default class MedicationIndex extends Vue {
  type = "requests";

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
