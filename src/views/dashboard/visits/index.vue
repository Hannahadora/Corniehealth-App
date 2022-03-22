<template>
  <div
    class="flex justify-center bg-white shadow-sm rounded p-5 mb-2 h-full w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-dye py-2"
      >
     Visits
      </span>
      <span class="w-full h-screen">
        <visit-empty-state v-if="empty" />
        <visit-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IVisit from "@/types/IVisit";
import { Options, Vue } from "vue-class-component";
import VisitEmptyState from "./emptyState.vue";
import VisitExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const visitsStore = namespace("visits");

@Options({
  name: "VisitIndex",
  components: {
    VisitEmptyState,
    VisitExistingState,
  },
})
export default class VisitIndex extends Vue {
  addHistory = false;
  show = false;

  get empty() {
    return this.visits.length < 1;
  }

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @visitsStore.State
  visits!: IVisit[];


  async created() {
   await this.getVisits();

  }

}
</script>
