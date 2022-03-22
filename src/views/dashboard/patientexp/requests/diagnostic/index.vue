<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <diagnostic-empty-state v-if="empty" />
        <diagnostic-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import DiagnosticEmptyState from "./emptyState.vue";
import DiagnosticExistingState from "./existingState.vue";
import ISchedule,{Break, Repeat} from "@/types/ISchedule";


const schedulesStore = namespace("schedules");

@Options({
  name: "DiagnosticIndex",
  components: {
    DiagnosticExistingState,
    DiagnosticEmptyState,
  },
})
export default class DiagnosticIndex extends Vue {

  get empty() {
    return this.schedules.length < 1;
  }

  @schedulesStore.State
  schedules!: ISchedule[];

  @schedulesStore.Action
  getSchedules!: () => Promise<void>;

  async created() {
    await this.getSchedules();
  }
}
</script>
