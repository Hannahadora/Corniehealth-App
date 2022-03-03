<template>
  <div
    class="justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full flex">
        <div class="w-full"> 
            <span class="text-xs">Click on any calender slot to book an appointment, create availabilty or block and edit slot</span>
        </div>
     <div class="flex w-full -mt-7 space-x-4 float-right justify-end">
         <span class="text-xs">
            <span class="text-green-400 text-5xl -mt-3">.</span> Available
         </span>
         <span class="text-xs">
            <span class="text-blue-600 text-5xl -mt-3">.</span> Busy
         </span>
         <span class="text-xs">
            <span class="text-yellow-500 text-5xl -mt-3">.</span> Tentative
         </span>
     </div>

    </div>
      <div class="w-full">
      
            <!-- <div class="container-fluid" v-if="filterOptions.byPractitioners?.length === 0"> -->
            <tabs :items="tabLinks" v-model="currentTab" :dDate="start"  @filter="showFilterPane" @left="setLeft" @right="setRight">

                <div>
                    <day-section @set-oneId="setoneId" :schedules="schedules" :startDate="'3/22/2022'"/>
                </div>
                <div>
                    <week-section @set-oneId="setoneId" :schedules="schedules" :startDate="'22/3/2022'"></week-section>
                </div>
                <div>
                <month-section @set-oneId="setoneId" :schedules="schedules" :startDate="'3/22/2022'"/>
                </div>
                 <template #actions>
                    <div class="flex items-center mb-1 p-3 cursor-pointer" @click="showAvailable">
                        <span class="text-xs font-medium">Schedule</span>
                    </div>
                    <div class="flex items-center mb-1 p-3 cursor-pointer" @click="showAppointment = true">
                        <span class="text-xs font-medium">Appointment</span>
                    </div>
                    <div class="flex items-center mb-1 p-3 cursor-pointer" @click="showblocked = true">
                        <span class="text-xs font-medium">Blocked Slot</span>
                    </div>
                </template>
            </tabs>
      <advanced-filter v-model="showFilter" @applyfilter="applyFilter" />

        <availabilty-modal v-model="showAvailableModal"/>
        <appointment-modal v-model="showAppointment"/>
         <blocked-modal v-model="showblocked"/>
        
      
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/smalltab.vue";
import WeekSection from "./week.vue";
import DaySection from "./day.vue";
import MonthSection from "./month.vue"
import AvailabiltyModal from "./addScheduleModal.vue";
import AppointmentModal from "../appointments/addAppointmentModal.vue";
import BlockedModal from "../blockedslots/addBlockSlots.vue";
import AdvancedFilter from "./advanced-filter.vue";
import { namespace } from "vuex-class";
import ISchedule from "@/types/ISchedule";
import slotService from "@/views/dashboard/visits/helper/slot-service";

const visitsStore = namespace("visits");

@Options({
  name: "AvailabilityIndex",
  components: {
      Tabs,
      WeekSection,
      DaySection,
      MonthSection,
      AvailabiltyModal,
      AppointmentModal,
      BlockedModal,
      AdvancedFilter
  },
})

export default class AvailabilityIndex extends Vue {

    tabLinks = [
      "Day",
      "Week",
      "Month"
    ];

  currentTab = 0;
  showAvailableModal = false;
  showAppointment = false;
  showblocked = false;
  showFilter = false;
  filterOptions: any = {};
  filteredSlots: any = [];

  @visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<ISchedule[]>;

  showAvailable(){
      this.showAvailableModal = true;
  }
   showFilterPane() {
    this.showFilter = true;
  }
  async applyFilter(filterOpions: any) {
    this.showFilter = false;
    this.showFilter = false;
    this.filterOptions = filterOpions;
    const loadedSchedules: any = await this.schedulesByPractitioner(
      filterOpions.byPractitioners[0]
    );

    const response: any = await slotService.getPractitionersSlots(
      filterOpions.byPractitioners[0]
    );
    this.filteredSlots = response?.data;
  }


}
</script>

<style>
</style>
