<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
        Booking Site
      </span>
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab">
          <practice-info />
          <booking-site />
          <appointment-types />
          <appointment-rooms />
          <calender-preference />
          <notification-template />
          <cancel-section />
          <rating-section />
        </tabs>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "./tabs.vue";
import PracticeInfo from "./practiceinformation/ExistingState.vue";
import AppointmentTypes from "./appointmenttypes/ExistingState.vue";
import BookingSite from "./bookingsite/ExistingState.vue";
import PhotoSection from "./photo.vue";
import PerformanceSection from "./performance.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import AppointmentRooms from "./appointmentrooms/ExistingState.vue";
import ReminderSection from "./reminder/index.vue";
import CancelSection from "./cancel/index.vue";
import AddReminder from "./addreminder/JobLevel.vue";
import CalenderPreference from "./calender/index.vue";
import NotificationTemplate from "./notificationtemplate/index.vue";
import RatingSection from "./rating.vue";

@Options({
  name: "Booking Site",
  components: {
    Tabs,
    PracticeInfo,
    AppointmentTypes,
    PhotoSection,
    BookingSite,
    PerformanceSection,
    AppointmentRooms,
    ChevronRightIcon,
    ChevronLeftIcon,
    ReminderSection,
    CalenderPreference,
    RatingSection,
    NotificationTemplate,
    CancelSection,
    AddReminder,
  },
})
export default class Bookings extends Vue {
  tabLinks = [
    "Practice Information",
    "Booking Site",
    // "Appointment Types",
    "Services",
    "Appointment Rooms",
    // "Reminders",
    "Calender",
    "Notification Templates",
    "Cancellation",
    // "Photos",
    "Rating",
  ];
  currentTab = 0;
}
</script>

<style></style>
