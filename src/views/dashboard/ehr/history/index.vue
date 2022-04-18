<template>
    <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
         <history-empty-state v-if="empty" />
        <history-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Ihistory from "@/types/Ihistory";
import { Options, Vue } from "vue-class-component";
import HistoryEmptyState from "./emptyState.vue";
import HistoryExistingState from "./existingState.vue";
import { namespace } from "vuex-class";


const history = namespace("history");

@Options({
  name: "HistoryIndex",
  components: {
    HistoryEmptyState,
    HistoryExistingState,
  },
})
export default class HistoryIndex extends Vue {
  addHistory = false;
  show = false;

  get empty() {
    return this.historys.length < 1;
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }


  @history.State
  historys!: Ihistory[];

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;

  historyAdded() {
    this.show = false;
    this.historys;
    this.fetchHistorys(this.activePatientId);
  }

  async created() {
    await this.fetchHistorys(this.activePatientId);
  }
}
</script>
