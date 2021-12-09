<template>
  <main class="p-6">
    <div>
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
      >
        Booking Site
      </span>
      <tabs :items="tabLinks" v-model="currentTab">
        <functions />
        <job-level />
        <designations />
        <functions2 />
        <add-location />
        <job-level2 />
        <designations2 />
        <add-locationn />
        <add-reminder />
      </tabs>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "./tabs.vue";
import Functions from "./functions/Functions.vue";
import Designations from "./designations/Designations.vue";
import JobLevel from "./joblevel/JobLevel.vue";

import Functions2 from "./appointmentrooms/Functions.vue";
import Designations2 from "./designations/Designations.vue";
import JobLevel2 from "./joblevel/JobLevel.vue";
import AddLocation from "./addLocation.vue";
import AddLocationn from "./addLocationn.vue";
import AddReminder from "./addreminder/JobLevel.vue";

@Options({
  name: "Booking Site",
  components: {
    Tabs,
    Functions,
    Designations,
    JobLevel,
    Functions2,
    Designations2,
    JobLevel2,
    AddLocation,
    AddLocationn,
    AddReminder,
  },
})
export default class BookingSite extends Vue {
  tabLinks = [
    "Practice Information",
    "Booking Site",
    "Appointment Types",
    "Appointment Rooms",
    "Reminders",
    "Calender & Preferences",
    "Notification Templates",
    "Cancellation",
    "New Reminder",
  ];
  currentTab = 0;
}
</script>

<style></style>
