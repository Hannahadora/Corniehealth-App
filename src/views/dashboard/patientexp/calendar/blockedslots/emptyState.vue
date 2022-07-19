<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/practitioners.svg" />
    <h3 class="text-center mt-5">There are no blocked slots on record</h3>
    <button
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    @click="showblocked = true"
    >
      Create
    </button>
  </div>
    <blocked-modal v-model="showblocked"   @event-added="eventadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BlockedModal from "./addBlockSlots.vue";
import { namespace } from "vuex-class";
import {Slot} from '@/types/ISchedule';

const schedulesStore = namespace("schedules");
const user = namespace("user");
@Options({
  components: {
    BlockedModal
  },
})
export default class SlotsEmptyState extends Vue {
  showblocked = false;

    @user.State
   currentLocation!: string;

    @schedulesStore.Action
  singlePractitonerSlot!: (locationId: string) => Promise<void>;

  async eventadded(){
    if (this.currentLocation) await this.singlePractitonerSlot(this.currentLocation);
  }
}
</script>
