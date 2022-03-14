<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <slots-empty-state v-if="empty" />
        <slots-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import SlotsEmptyState from "./emptyState.vue";
import SlotsExistingState from "./existingState.vue";
import {Slot} from '@/types/ISchedule';

const schedulesStore = namespace("schedules");
const user = namespace("user");

@Options({
  name: "SlotsIndex",
  components: {
    SlotsEmptyState,
    SlotsExistingState,
  },
})
export default class SlotsIndex extends Vue {
  addPractitioner = false;
  practitionerToUpdate = {} as IPractitioner;

  get empty() {
    return this.slots.length < 1;
  }

   
  @schedulesStore.State
  slots!: Slot[];

  @schedulesStore.Action
  singlePractitonerSlot!: (practitionerId: string) => Promise<void>;

   @user.State
   currentLocation!: string;


  async created() {
    if (this.currentLocation) await this.singlePractitonerSlot(this.currentLocation);
  }
}
</script>
