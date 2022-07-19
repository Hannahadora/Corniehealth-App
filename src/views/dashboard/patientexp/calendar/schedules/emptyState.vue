<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/practitioners.svg" />
    <h3 class="text-center mt-5">There are no schedule on record</h3>
    <button
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
      @click="showScheduleModal = true"
    >
      Create
    </button>
  </div>
   <schedule-modal
    v-model="showScheduleModal"
    @schedule-added="scheduleadded"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ScheduleModal from "../availability/addScheduleModal.vue";
import { namespace } from "vuex-class";
import ISchedule,{Break, Repeat} from "@/types/ISchedule";


const schedulesStore = namespace("schedules");
@Options({
  components: {
    ScheduleModal
  },
})
export default class SchedulesEmptyState extends Vue {

  showScheduleModal = false;

  
  @schedulesStore.Action
  getSchedules!: () => Promise<void>;

     async scheduleadded(){
      await this.getSchedules();
    }
}
</script>
