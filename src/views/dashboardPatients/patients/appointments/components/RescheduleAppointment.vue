<template>
  <cornie-dialog v-model="show" right class="xl:w-1/2 lg:w-10/12 w-full h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="show = false; appointmentHasBeenRescheduled = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            Reschedule Appointment
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false; appointmentHasBeenRescheduled = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-1">
        <div class="w-full">
          <div class="border-sect p-4 mb-6 flex justify-between">
            <p class="text-grey-blue">Appointment ID:</p>
            <p class="text-right">{{ appointment?.idn }}</p>
          </div>
          <div class="border-sect p-4 mb-6">
            <div class="flex justify-between">
              <p class="text-grey-blue">Attending Practitioner:</p>
              <p class="text-right">
                {{ appointment?.practitioner?.firstName }}
                {{ appointment?.practitioner?.lastName }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-grey-blue">Specialty:</p>
              <p class="text-right">{{ appointment?.specialty }}</p>
            </div>
          </div>
          <div class="border-sect p-4 mb-6">
            <div class="flex justify-between">
              <p class="text-grey-blue">Appointment Date:</p>
              <p class="text-right">
                {{ formatDate(appointment?.date) }},
                {{ formatTime(appointment?.startTime) }}
              </p>
            </div>
            <div v-if="appointmentHasBeenRescheduled">
              <div class="flex justify-between mt-2">
                <p class="text-grey-blue">New Appt. DateTime:</p>
                <p class="text-right">
                  {{ formatDate(newAppointmentDate) }},
                  {{ formatTime(newAppointmentTime) }}
                </p>
              </div>
            </div>
            <div
              v-else
              class="flex mt-2 cursor-pointer"
              @click="showAppointmentModal = true"
            >
              <calendar-red class="mr-2" />
              <p class="text-sm text-red-500">Select New Appt. Date/Time</p>
            </div>
          </div>
          <div class="border-sect p-4 mb-6 flex justify-between">
            <p class="text-grey-blue">Location:</p>
            <div>
              <p class="text-right">{{ appointment?.locationId }}</p>
              <p class="text-right">{{ appointment?.practitioner?.email }}</p>
              <p class="text-right">
                {{ appointment?.practitioner?.phone.dialCode }}
                {{ appointment?.practitioner?.phone.number }}
              </p>
            </div>
          </div>
          <div class="border-sect p-4 mb-6">
            <div class="flex justify-between">
              <p class="text-grey-blue">Request made by:</p>
              <p class="text-right">
                {{ appointment?.patient?.firstname }}
                {{ appointment?.patient?.lastname }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-grey-blue">Request Date:</p>
              <p class="text-right">{{ formatDate(appointment?.createdAt) }}</p>
            </div>
          </div>
          <div class="border-sect p-4 mb-6 flex justify-between">
            <p class="text-grey-blue">Status:</p>
            <p
              class="text-right"
              :class="{
                'text-green-500':
                  appointment.status === 'Confirmed' ||
                  appointment.status === 'Confirmed',
                'text-yellow-500':
                  appointment.status === 'Tentative' ||
                  appointment.status === 'Draft',
                'text-red-500':
                  appointment.status === 'Declined' ||
                  appointment.status === 'Cancelled',
                'text-purple-500':
                  appointment.status === 'Needs-Action' ||
                  appointment.status === 'Checked-In',
                'text-blue-500': appointment.status === 'Rescheduled',
              }"
            >
              {{ appointment?.status }}
            </p>
          </div>
        </div>

        <div class="absolute bottom-6 right-6">
          <div class="w-full mx-auto mt-12 flex items-center justify-end">
            <cornie-btn
              class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
              @click="show = false; appointmentHasBeenRescheduled = false"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
              @click="submit"
              :loading="loading"
            >
              Save
            </cornie-btn>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>

    <appointment-modal
      :id="appointment?.practitioner.id"
      :practitioner="appointment?.practitioner"
      :practitionerLocations="locations"
      v-model="showAppointmentModal"
      @close="showAppointmentModal = false"
      :rescheduling="true"
      @getNewDate="getNewDate"
    />
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CalendarRed from "@/components/icons/calendar-red.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";

import AppointmentModal from "./AppointmentModal.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "RescheduleAppointment",
  components: {
    ...CornieCard,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
    ArrowLeft,
    CornieCheckbox,
    ChevronRightIcon,
    ChevronLeftIcon,
    EditIcon,
    AppointmentModal,
    CalendarRed,
  },
})
export default class RescheduleAppointment extends Vue {
  search: any = {};
  loading: Boolean = false;
  locations = [];
  showAppointmentModal = true;
  newAppointmentDate = "";
  newAppointmentTime = "";
  appointmentHasBeenRescheduled = false

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: {} })
  appointment!: any;

  getNewDate(date: any, time: any) {
    this.appointmentHasBeenRescheduled = true
    this.newAppointmentDate = date;
    this.newAppointmentTime = time
  }

  formatDate(date: any) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  formatTime(time?: any) {
    return time?.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  created() {}
}
</script>

<style scoped>
.text-grey-eth {
  color: #c2c7d6;
}

.text-grey-blue {
  color: #667499;
}

tr {
  /* border-bottom: 1px solid rgb(95, 94, 94); */
  line-break: normal;
}
td {
  font-size: 16px;
  padding: 16px;
}
tr:nth-child(even) {
  background: #f0f4fe;
}

@media screen and (max-width: 768px) {
  tr {
    line-break: auto;
  }
  td {
    font-size: 14px;
  }
}
.border-sect {
  border: 1px solid #c2c7d6;
  border-radius: 4px;
}
</style>
