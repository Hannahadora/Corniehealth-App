<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <schedules-empty-state v-if="empty" />
        <schedules-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import SchedulesEmptyState from "./emptyState.vue";
import SchedulesExistingState from "./existingState.vue";
import ISchedule,{Break, Repeat} from "@/types/ISchedule";


const schedulesStore = namespace("schedules");

@Options({
  name: "SchedulesIndex",
  components: {
    SchedulesEmptyState,
    SchedulesExistingState,
  },
})
export default class SchedulesIndex extends Vue {

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
