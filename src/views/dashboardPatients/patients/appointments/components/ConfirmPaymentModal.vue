<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full">
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
        <div class="xl:w-2/3 w-full mx-auto">
          <h2 class="xl:text-center text-left c-indigo mb-12">
            Review Your Booking
          </h2>

          <table class="border w-full">
            <tr>
              <td>Appointment With</td>
              <td>{{ selectedPractitioner.name }}</td>
            </tr>
            <tr>
              <td>Date & Time</td>
              <td class="flex justify-between">
                <span>{{ getSelectedDate }} | {{ getSelectedTime }}</span>
                <div @click="showAppointmentModal = true">
                  <copy-red class="cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Consultation Fee</td>
              <td>₦ {{ selectedPractitioner.ConsultationFeePerHour || 0 }}</td>
            </tr>
            <tr>
              <td>Specialty</td>
              <td>{{ selectedPractitioner.designation }}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{{ selectedPractitioner.address }}</td>
            </tr>
            <tr>
              <td>Contact Info</td>
              <td>
                {{ selectedPractitioner.phone }} |
                {{ selectedPractitioner.email }}
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
            class="w-full mx-auto mt-12 mb-72 flex items-center justify-center"
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
      :id="selectedPractitioner.id"
      :practitioner="selectedPractitioner"
      :practitionerLocations="locations"
      v-model="showAppointmentModal"
      @close="showAppointmentModal = false"
    />

    <confirm-payment-modal
      v-model="confirmBookingModal"
      @close="confirmBookingModal = false"
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
import ConfirmPaymentModal from "./ConfirmPaymentModal.vue";
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
    ConfirmPaymentModal,
    AppointmentModal,
  },
})
export default class ReviewPaymentModal extends Vue {
  search: any = {};
  loading: Boolean = false;
  confirmBookingModal: Boolean = false;
  show = false;
  showAppointmentModal = false;
  locations = [];
  paymentAccountId = "",

  @Prop({ type: Object, default: {} })
  selectedPractitioner!: any;

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
</style>
