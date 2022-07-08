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
          <booking-site :id="bookId"/>
          <appointment-types />
          <appointment-rooms />
          <calender-preference :calenderid="calendarsId" :prefereid="preferencesId"/>
          <notification-template />
          <cancel-section  :canceId="cancellationId"/>
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
import { namespace } from "vuex-class";
import IBookingsite from "@/types/IBookingsite";
import ICalendar from "@/types/ICalendar";
import IPrefrence from "@/types/IPrefrence";
import ICancel from "@/types/ICancel";


const prefrence = namespace("prefrence");
const bookingsite = namespace("bookingsite");
const calendar = namespace("calendar");
const cancel = namespace("cancel");

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
    "Calendar",
    "Notification Templates",
    "Cancellation",
    // "Photos",
    "Rating",
  ];
  currentTab = 0;
  bookindId = "";

  
  @bookingsite.State
  bookingsites!: IBookingsite[];

  @bookingsite.Action
  fetchBookingsite!: () => Promise<void>;

  @calendar.State
  calendars!: ICalendar[];

  @calendar.Action
  fetchCalendars!: () => ICalendar;

  @prefrence.State
  prefrences!: IPrefrence[];

  @prefrence.Action
  fetchPrefrences!: () => IPrefrence;

  @cancel.Action
  fetchCancels!: () => Promise<void>;

  @cancel.State
  cancels!: ICancel[];


  get items(){
    return this.bookingsites.find((site:IBookingsite) => site?.id) as any
  }
  get calenderitems() {
    return this.calendars.find((calendar) => calendar.id);
  }
   get items2() {
    return this.prefrences.find((prefrence) => prefrence.id as string);
  }

  get cancelitems() {
    return this.cancels.find((cancel) => cancel.id);
  }

  get preferencesId(){
      return this.items2?.id as string
  }
  get calendarsId(){
      return this.calenderitems?.id as string
  }
  get bookId(){
    return this.items?.id
  }
  get cancellationId(){
    return this.cancelitems?.id as string;
  }

  async created(){
    await this.fetchBookingsite();
    await this.fetchCalendars();
    await this.fetchPrefrences();
    await this.fetchCancels();
  }
}
</script>

<style></style>
