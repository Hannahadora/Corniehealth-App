<template>
  <div class="h-screen">
    <div
      class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full"
    >
      <div class="w-full">
        <span
          class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Visits
        </span>
      </div>

    <div>
      <visit-empty-state  v-if="empty"/>
       <visit-exisiting-state
       v-else
        />
    </div>
    </div>

  </div>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import  IPatientvisit  from "@/types/IPatientvisit";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import VisitEmptyState from "./emptyState.vue";
import VisitExisitingState from "./existingState.vue";

const patientvisit = namespace("patientvisit");

@Options({
  name: "visitIndex",
  components: {
    VisitEmptyState,
    VisitExisitingState,
  },
})
export default class visitIndex extends Vue {
 get empty() {
    return this.patientvisits.length < 1;
  }
  @patientvisit.State
  patientvisits!: IPatientvisit[];

  @patientvisit.Action
  fetchPatientvisits!: () => Promise<void>;

  created() {
    this.fetchPatientvisits();
  }
}
</script>
