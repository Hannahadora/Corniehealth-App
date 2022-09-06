<template>
  <cornie-dialog v-model="show" right class="xl:w-1/2 lg:w-10/12 w-full h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="$emit('close')">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            Confirm Booking
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="$emit('close')"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-1">
        <div class="w-full">
          <table class="border w-full">
            <tr>
              <td>Appointment With</td>
              <td>{{ practitionerName }}</td>
            </tr>
            <tr>
              <td>Date & Time</td>
              <td class="flex justify-between">
                <span>{{ selectedDate }} | {{ selectedTime }}</span>
                <div @click="showAppointmentModal = true">
                  <edit class="cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Consultation Fee</td>
              <td>₦ {{ practitioner.ConsultationFeePerHour || 0 }}</td>
            </tr>
            <tr>
              <td>Specialty</td>
              <td>{{ practitioner.designation }}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{{ practitioner.address }}</td>
            </tr>
            <tr>
              <td>Contact Info</td>
              <td>
                {{ practitionerContact }} |
                {{ practitioner.email }}
              </td>
            </tr>
            <tr>
              <td>Reason for Appointmment</td>
              <td>Consultation</td>
            </tr>
          </table>

          <div class="mt-8">
            <label class="text-left block text-xs mb-1 font-bold" for=""
              >Payment Type</label
            >
            <cornie-select
              v-model="paymentAccountId"
              placeholder="Select a payment account type"
              :readonly="false"
              :items="['nnn']"
              required
            >
            </cornie-select>
          </div>

          <p class="my-8">
            You may wish to share additional information about your condition
            and/or the reason for this appointment. Should you have any
            emergency, kindly contact your practitioner by phone.
          </p>

          <div class="flex flex-col w-full mb-20">
            <label class="text-left block text-xs mb-1 font-bold" for=""
              >Note</label
            >
            <textarea
              id=""
              placeholder="Write note for practitioner here"
              class="border p-2"
              name=""
              cols="20"
              rows="5"
              maxlength="255"
            ></textarea>
            <span class="text-right text-xs italic font-semibold">0/255</span>
          </div>

          <div
            class="w-full mx-auto mt-12 flex items-center justify-end"
          >
            <cornie-btn
              class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
              @click="$emit('close')"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
              @click="confirmBookingModal = true"
              :loading="loading"
            >
              Next
            </cornie-btn>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>

    <appointment-modal
      :id="practitioner.id"
      :practitioner="practitioner"
      :practitionerLocations="locations"
      v-model="showAppointmentModal"
      @close="showAppointmentModal = false"
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
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
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
  name: "ReviewPaymentModal",
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
    AppointmentModal,
  },
})
export default class ReviewPaymentModal extends Vue {
  search: any = {};
  loading: Boolean = false;
  show = false;
  showAppointmentModal = false;
  locations = [];
  paymentAccountId = "";

  @Prop({ type: Object, default: {} })
  practitioner!: any;

  @Prop({ type: Object, default: {} })
  appointment!: any;

  get selectedDate() {
    return this.appointment.date
  }

  get selectedTime() {
    return this.appointment.startTime
  }

  get practitionerName() {
    return this.practitioner.name || this.practitioner.firstName + ' ' + this.practitioner.lastName
  }

  get practitionerContact() {
    if(this.appointment) {
      return this.practitioner?.phone?.dialCode + ' ' + this.practitioner?.phone?.number
    } else return this.practitioner.phone
  }

  async confirmPayment() {
    // try {
    //   const res = await this.$store.dispatch("practitioners/bookPractitioner", {
    //     locationId: this.$route.query.locationId,
    //     date: this.getSelectedDate,
    //     startTime: this.getSelectedTime,
    //     endTime: undefined,
    //     billingType: "insurance",
    //     practitionerId: this.selectedPractitioner.id,
    //     patientId: this.userData.user.id,
    //   });
    //   if (res.status === true) {
    //     alert("Booking confirmed!!");
    //     this.$router.push("/");
    //   }
    // } catch (error: any) {}
  }

  created() {}
}
</script>

<style scoped>
img {
  filter: brightness(8.5);
}
.activetab {
  border-bottom: 3px solid #fe4d3c;
}
.activetab span {
  color: #14171f !important;
}
.activetab img {
  filter: brightness(1);
}

.text-grey-eth {
  color: #c2c7d6;
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
</style>
