<template>
        <functions />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "./tabs.vue";
import Functions from "./Functionsme.vue";




@Options({
  name: "Booking Site",
  components: {
    Tabs,
    Functions,
  },
})
export default class BookingSite extends Vue {
  tabLinks = ["Practice", "Booking Site", "Appointment Types", "Appointment Rooms", "Reminders", "Calender & Preferences", "Notification Templates", "Cancellation", "New Reminder"];
  currentTab = 0;
}
</script>

<style>
</style>