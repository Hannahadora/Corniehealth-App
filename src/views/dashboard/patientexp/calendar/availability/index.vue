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
                    <week-section @set-oneId="setoneId" :schedules="schedules" :startDate="'3/22/2022'"></week-section>
                </div>
                <div>
                <month-section @set-oneId="setoneId" :schedules="schedules" :startDate="'3/22/2022'"/>
                </div>
            </tabs>
      <advanced-filter v-model="showFilter" @applyfilter="applyFilter" />

      
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/smalltab.vue";
import WeekSection from "./week.vue";
import DaySection from "./day.vue";
import MonthSection from "./month.vue"


@Options({
  name: "AvailabilityIndex",
  components: {
      Tabs,
      WeekSection,
      DaySection,
      MonthSection
  },
})
export default class AvailabilityIndex extends Vue {
    tabLinks = [
    "Day",
    "Week",
    "Month"
  ];
  currentTab = 0;

}
</script>

<style>
</style>
