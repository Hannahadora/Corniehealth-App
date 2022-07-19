<template>
  <div class="w-full mb-8 p-6">
    <accordion-component :opened="true" title="Calendar">
       <template v-slot:default>
          <div class="w-full mt-8">
            <div class="flex space-x-10 w-full">
              <span class="text-sm text-black mt-3"
                >Online Booking Requirements:</span
              >
              <div class="flex space-x-2">
                <cornie-select
                  placeholder="10"
                  class="w-20"
                  :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                  v-model="onlineBookingRequirements.no"
                />
                <cornie-select
                  placeholder="Days"
                  class="w-20 font-bold"
                  :items="['Days', 'Weeks', 'Months']"
                  v-model="onlineBookingRequirements.type"
                />
              </div>
              <span class="text-sm text-black mt-3">In advance</span>
            </div>
            <div class="flex space-x-10 w-full">
              <span class="text-sm text-black mt-3 pr-20"
                >Show availability:</span
              >
              <div class="flex space-x-2">
                <cornie-select
                  placeholder="10"
                  class="w-20 font-bold"
                  :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                  v-model="showAvailability.no"
                />
                <cornie-select
                  placeholder="Days"
                  class="w-20 font-bold"
                  :items="['Days', 'Weeks', 'Months']"
                  v-model="showAvailability.type"
                />
              </div>
              <span class="text-sm text-black mt-3">Ahead</span>
            </div>
          </div>
          <div class="w-full mt-8">
            <div class="flex space-x-10">
              <span class="text-sm text-black">Booking Notification:</span>
              <span class="text-sm text-danger font-semibold"
                >Send Notifications To</span
              >
            </div>
            <div class="flex space-x-10 w-full mt-8">
              <div>
                <span class="text-sm font-semibold mb-5 text-black"
                  >Practice Email:</span
                >
                <div class="flex space-x-4 w-full mt-3">
                  <cornie-radio
                    label="Yes"
                    value="Yes"
                    v-model="bookingNotification.practiceEmail"
                    checked
                    name="email"
                  />
                  <cornie-radio
                    label="No"
                    value="No"
                    v-model="bookingNotification.practiceEmail"
                    name="email"
                  />
                </div>
              </div>
              <div>
                <span class="text-sm font-semibold mb-5 text-black"
                  >All added Participants:</span
                >
                <div class="flex space-x-4 w-full mt-3">
                  <cornie-radio
                    label="Yes"
                    value="Yes"
                    v-model="bookingNotification.allAddedParticipants"
                    checked
                    name="notify"
                  />
                  <cornie-radio
                    label="No"
                    value="No"
                    v-model="bookingNotification.allAddedParticipants"
                    name="notify"
                  />
                </div>
              </div>
            </div>
          </div>
          <cornie-card>
            <cornie-card-text class="flex justify-end pb-12">
              <cornie-btn
                @click="show = false"
                class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                :loading="loading"
                @click="apply"
                class="text-white bg-danger px-6 rounded-xl"
              >
                Save
              </cornie-btn>
            </cornie-card-text>
          </cornie-card>
       </template>
    </accordion-component>

    <accordion-component :opened="true" title="Reminders">
       <template v-slot:default>
            <reminder-section class="mt-8" />
           
         </template>
    </accordion-component>

     <accordion-component :opened="true" title="Preferences">
       <template v-slot:default>
         <div class="w-1/2">
            <div class="grid grid-cols-2 gap-8 w-full mt-8">
              <date-time-picker
                label="Appointment time hold limit"
                class="w-full"
                v-model:date="data.startDate"
                v-model:time="data.startTime"
              />
              <div class="w-full">
                <span class="text-sm text-black font-semibold"
                  >Show cancelled appointment in calendar</span
                >
                <div class="flex space-x-4 mt-4">
                  <cornie-radio
                    lablel="Yes"
                    value="Yes"
                    v-model="showCancelledAppointmentInCalendar"
                    checked
                    name="cancel"
                  />
                  <cornie-radio
                    lablel="No"
                    value="No"
                    v-model="showCancelledAppointmentInCalendar"
                    name="cancel"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 w-full mt-8">
              <cornie-input
                class="w-20"
                label="Waitlist threshhold (% of Set Capacity)"
                placeholder="25"
                value="25"
                v-model="waitlistThreshhold"
              />
              <div>
                <span class="text-sm text-black font-semibold"
                  >Show waitlist in calendar</span
                >
                <div class="flex space-x-4 mt-4">
                  <cornie-radio
                    lablel="Yes"
                    value="Yes"
                    v-model="showWaitlistInCalendar"
                    checked
                    name="calendar"
                  />
                  <cornie-radio
                    lablel="No"
                    value="No"
                    v-model="showWaitlistInCalendar"
                    name="calendar"
                  />
                </div>
              </div>
            </div>
          </div>
          <cornie-card>
            <cornie-card-text class="flex justify-end pb-12">
              <cornie-btn
                @click="show = false"
                class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                :loading="loading"
                @click="submit"
                class="text-white bg-danger px-6 rounded-xl"
              >
                Save
              </cornie-btn>
            </cornie-card-text>
          </cornie-card>
       </template>
    </accordion-component>

    
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { LevelCollection, Tag } from "@/types/ILevel";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import { namespace } from "vuex-class";
import ICalendar from "@/types/ICalendar";
import IPrefrence from "@/types/IPrefrence";
import AccordionComponent from "@/components/form-accordion.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/cornieselect.vue";
import CalendarIcon from "@/components/icons/acalendar.vue";
import DateTimePicker from "@/components/datetime-picker.vue";
import PlusIcon from "@/components/icons/add.vue";
import search from "@/plugins/search";

import ReminderSection from "../reminder/index.vue";

const level = namespace("OrgLevels");
const calendar = namespace("calendar");
const prefrence = namespace("prefrence");


@Options({
  name: "CalenderPrefrence",
  components: {
    CornieTable,
    DeleteIcon,
    EditIcon,

    AccordionComponent,
    CustomCheckbox,
    CornieInput,
    CornieRadio,
    CornieSelect,
    CalendarIcon,
    DateTimePicker,
    PlusIcon,
    ReminderSection
  },
})
export default class CalenderExistingState extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  calenderid!: string;

   @Prop({ type: String, default: "" })
  prefereid!: string;

  @calendar.State
  calendars!: ICalendar[];

  @calendar.Action
  getCalendarById!: (id: string) => ICalendar;

  @calendar.Action
  fetchCalendars!: () => ICalendar;

  @prefrence.State
  prefrences!: IPrefrence[];

  @prefrence.Action
  getPrefrenceById!: (id: string) => IPrefrence;

  @prefrence.Action
  fetchPrefrences!: () => IPrefrence;

  data: any = {};
  query = "";
  CalendarId = "";
  preferenceId = "";
  loading = false;
  onlineBookingRequirements = {
    no: 0,
    type: "",
  };
  showAvailability = {
    no: 0,
    type: "",
  };
  bookingNotification = {
    practiceEmail: "Yes",
    allAddedParticipants: "Yes",
  };
  appointmentTimeHoldLimit = "";
  showCancelledAppointmentInCalendar = "";
  waitlistThreshhold = "";
  showWaitlistInCalendar = "";

  @Watch("calenderid")
  idChanged() {
    this.setCalendar();
  }

  @Watch("prefereid")
  prefChanged() {
    this.setPreference();
  }

  async setPreference() {
    const preference = await this.getPrefrenceById(this.preferencesId);
    if (!preference) return;
    this.data.startDate = preference.appointmentTimeHoldLimit;
    this.showCancelledAppointmentInCalendar = preference.showCancelledAppointmentInCalendar;
    this.waitlistThreshhold = preference.waitlistThreshhold;
    this.showWaitlistInCalendar = preference.showWaitlistInCalendar;
  }

  async setCalendar() {
    const calendar = await this.getCalendarById(this.calendarsId);
    if (!calendar) return;
    this.onlineBookingRequirements.no = calendar.onlineBookingRequirements.no;
    this.onlineBookingRequirements.type =
      calendar.onlineBookingRequirements.type;
    this.showAvailability = calendar.showAvailability;
    this.bookingNotification = calendar.bookingNotification;
  }

  get payload() {
    return {
      onlineBookingRequirements: this.onlineBookingRequirements,
      showAvailability: this.showAvailability,
      bookingNotification: this.bookingNotification,
    };
  }

  get payload2() {
    return {
      appointmentTimeHoldLimit: this.appointmentTimeHoldLimit,
      showCancelledAppointmentInCalendar:
        this.showCancelledAppointmentInCalendar,
      waitlistThreshhold: this.waitlistThreshhold,
      showWaitlistInCalendar: this.showWaitlistInCalendar,
    };
  }

  get items() {
    return this.calendars.find((calendar) => calendar.id);
  }

  get items2() {
    return this.prefrences.find((prefrence) => prefrence.id as string);
  }
  get calendarsId(){
      return this.items?.id as string
  }
    get preferencesId(){
      return this.items2?.id as string
    }

  done() {
    this.$emit("room-added");
    this.show = false;
  }
  async createCalendar() {
    try {
      const { data } = await cornieClient().post(
        "/api/v1/calendar",
        this.payload
      );
      window.notify({ msg: "Calendar saved", status: "success" });
      this.done();
    } catch (error) {
      window.notify({ msg: "Calendar not saved", status: "error" });
    }
  }
  async createPrefrence() {
    this.appointmentTimeHoldLimit = this.data.startDate;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/prefrences",
        this.payload2
      );
      window.notify({ msg: "Prefrence saved", status: "success" });
      this.done();
    } catch (error) {
      window.notify({ msg: "Prefrence not saved", status: "error" });
    }
  }
  async updateCalendar() {
    const url = `/api/v1calendar`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Calendar  updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Calendar not updated",
        status: "error",
      });
    }
  }
  async submit() {
    this.loading = true;
    await this.createPrefrence();
    this.loading = false;
  }
  async apply() {
    this.loading = true;
    await this.createCalendar();
    // if (this.calendars) await this.updateCalendar();
    // else await this.createCalendar();
    this.loading = false;
  }

  async created() {
     this.setCalendar();
     this.setPreference();
    await this.fetchCalendars();
    await this.fetchPrefrences();
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
