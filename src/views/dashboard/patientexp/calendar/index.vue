<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
       Calendar
      </span>
      <span class="w-full h-screen">

            <!-- <day-availabiblty-section v-if="practitionerId"/> -->
          <tabs :items="tabLinks" v-model="currentTab">
            <availability-section/>
            <schedules-section />
            <appointment-section />
            <slots-section />
          </tabs>
        
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import Tabs from "@/components/tabs.vue";
import AvailabilitySection from "./availability/index.vue";
import DayAvailabibltySection from "./dayavailaibilty/index.vue";
import SchedulesSection from "./schedules/index.vue";
import AppointmentSection from "./appointments/index.vue";
import SlotsSection from "./blockedslots/index.vue";

@Options({
  name: "CalendarIndex",
  components: {
    Tabs,
    AvailabilitySection,
    SchedulesSection,
    AppointmentSection,
    SlotsSection,
    DayAvailabibltySection

  },
})
export default class CalendarIndex extends Vue {
  @Prop({ type: String, default: "" })
  practitionerId!: string;

  tabLinks = [
    "Availability",
    "Schedules",
    "Appointments",
    "Event",
  ];
  currentTab = 0;
}
</script>

<style>
</style>
