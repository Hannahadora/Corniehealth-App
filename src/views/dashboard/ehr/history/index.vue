<template>
    <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
         <history-empty-state v-if="empty" />
        <history-existing-state v-else :patientId="patientId"/>
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
import { Prop } from "vue-property-decorator";

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

  @Prop({ type: String, default: "" })
  patientId!: string;

  get empty() {
    return this.historys?.length < 1;
  }
 
  @history.State
  historys!: Ihistory[];

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;



  async created() {
    await this.fetchHistorys(this.patientId);
  }
}
</script>
