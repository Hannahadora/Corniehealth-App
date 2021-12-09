<template>
 <div class="flex justify-center  bg-white shadow-md p-3 mt-2 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-lg text-primary
          py-2
        "
      >
        Booking Site
      </span>
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab"> 
        <practice-info />
        <booking-site />
        <appointment-types />
        <appointment-rooms />
        <add-location />
        <job-level2 />
        <notification-template />
        <add-locationn />
        <add-reminder />
      </tabs>
      </span>
    </div>
  </div>

</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "./tabs.vue";
import PracticeInfo from "./practiceinformation/Functions.vue";
import AppointmentTypes from "./appointmenttypes/ExistingState.vue";
import BookingSite from "./bookingsite/ExistingState.vue";


import AppointmentRooms from "./appointmentrooms/Functions.vue";
//import Designations2 from "./designations/ExistingState.vue";
//import JobLevel2 from "./joblevel/JobLevel.vue";
import AddLocation from "./addLocation.vue";
import AddLocationn from "./addLocationn.vue";
import AddReminder from "./addreminder/JobLevel.vue";

import NotificationTemplate from './notificationtemplate/index.vue';




@Options({
  name: "Booking Site",
  components: {
    Tabs,
    PracticeInfo,
    AppointmentTypes,
    BookingSite,
    AppointmentRooms,
   // Designations2,
  //  JobLevel2,
    AddLocation,
    NotificationTemplate,
    AddLocationn,
    AddReminder,
  },
})
export default class Bookings extends Vue {
  tabLinks = ["Practice Information", "Booking Site", "Appointment Types", "Appointment Rooms", "Reminders", "Calender & Preferences", "Notification Templates", "Cancellation", "New Reminder"];
  currentTab = 0;
}
</script>

<style></style>
