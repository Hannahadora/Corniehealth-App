<template>
  <div class="w-full pb-80">
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-3 px-6 pl-7 pr-7 font-semibold focus:outline-none hover:opacity-90"
        @click="$emit('openModal')"
      >
        Book Appointment
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="viewItem(item)"
        >
          <eye-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showCheckinPane(item.id)"
        >
          <checkin-icon />
          <span class="ml-3 text-xs">Check-In</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="rescheduleAppointment(item)"
        >
          <settings-blue class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">Reschedule</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="confirmPayment(item)"
        >
          <check-green-bg class="text-green-600 fill-current" />
          <span class="ml-3 text-xs">Confirm Payment</span>
        </div>
        <div
          @click="payBill(item)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <bill-payment class="text-danger fill-current" />
          <span class="ml-3 text-xs">Pay Bill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item)"
        >
          <cancel-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
      <template #appointmentDateTime="{ item }">
        <div class="">
          <p class="text-sm">{{ formatDate(item.date) }}</p>
          <p class="text-sm">{{ formatTime(item.startTime) }}</p>
        </div>
      </template>
      <template #Participants="{ item }">
        <actors-section
          :items="item.Participants"
          class="cursor-pointer"
          @click="displayParticipants(item.id)"
        />
      </template>
      <template #status="{ item }">
        <div class="flex items-center">
          <p
            class="text-xs bg-gray-300 p-1 rounded"
            v-if="item.status == 'No-Show' || item.status == 'Proposed'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
            v-if="item.status == 'Tentative' || item.status == 'Draft'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
            v-if="item.status == 'Needs-Action' || item.status == 'Checked-In'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-200 text-green-500 p-1 rounded"
            v-if="item.status == 'Fullfiled' || item.status == 'Confirmed'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-red-300 text-red-600 p-1 rounded"
            v-if="item.status == 'Cancelled' || item.status == 'Declined'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
            v-if="item.status == 'Rescheduled'"
          >
            {{ item.status }}
          </p>
        </div>
      </template>
    </cornie-table>

    <cancel-appointment-modal
      :id="appointmentId"
      :appointment="selectedAppointment"
      v-model="showCancelApppointment"
      @appointmentCancelled="appointmentCancelled"
    />

    <review-payment-modal
      :practitioner="selectedPractitioner"
      :appointment="selectedAppointment"
      v-model="showPaymentModal"
      @close="showPaymentModal = false"
    />
    <appointment-modal
      @appointment-added="appointmentAdded"
      v-model="showAppointmentModal"
    />
    <view-appointment-modal
      @appointment-reschedule="rescheduleAppointment(selectedAppointment)"
      v-model="showAppointmentDetail"
      :appointment="selectedAppointment"
    />
    <reschedule-appointment-modal
      @appointment-rescheduled="appointmentRescheduled"
      v-model="showRescheduleModal"
      :appointment="selectedAppointment"
    />
    <pay-bill-modal
      @bill-payed="billPayed"
      v-model="showPayBill"
      :appointment="selectedAppointment"
      @viewAppointment="
        showPayBill = false;
        showAppointmentDetail = true;
      "
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import search from "@/plugins/search";

import { IPatient } from "@/types/IPatient";
import IAppointment from "@/types/IAppointment";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye-yellow.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel-red-bg.vue";
import BillPayment from "@/components/icons/billpayment-blue.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import CheckGreenBg from "@/components/icons/check-green-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import SettingsBlue from "@/components/icons/settings-blue.vue";
import MessageIcon from "@/components/icons/message.vue";

import ViewAppointmentModal from "./components/ViewAppointmentModal.vue";
import RescheduleAppointmentModal from "./components/RescheduleAppointment.vue";
import AppointmentModal from "./components/AppointmentModal.vue";
import CancelAppointmentModal from "./components/CancelAppointment.vue";
import ReviewPaymentModal from "./components/ReviewPaymentModal.vue";
import PayBillModal from "./components/PayBill.vue";

const appointment = namespace("appointment");
const patients = namespace("patients");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    SettingsBlue,
    CheckGreenBg,
    CancelAppointmentModal,
    AppointmentModal,
    BillPayment,
    ThreeDotIcon,
    PlusIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
    ReviewPaymentModal,
    ViewAppointmentModal,
    RescheduleAppointmentModal,
    PayBillModal,
  },
})
export default class AppointmentExistingState extends Vue {
  showColumnFilter = false;
  showAppointmentModal = false;
  loading = false;
  query = "";
  appointmentId = "";
  showPaymentModal = false;
  selectedAppointment = "";
  selectedPractitioner = "";
  appointments: any = [];
  showCancelApppointment = false;
  showAppointmentDetail = false;
  showRescheduleModal = false;
  showPayBill = false;

  @patients.State
  patients!: IPatient[];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "request date", key: "requestDate", show: true },
    { title: "appointment id", key: "appointmentId", show: true },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "specialty",
      key: "specialty",
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "appt Date Time",
      key: "appointmentDateTime",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  async showAppointment(value: string) {
    this.showAppointmentModal = true;
    this.appointmentId = value;
  }

  deleteItem(item: any) {
    this.selectedAppointment = item;
    this.appointmentId = item.id;
    this.showCancelApppointment = true;
  }

  appointmentAdded() {
    this.fetchAppointments();
  }

  appointmentCancelled() {
    this.showCancelApppointment = false;
    this.fetchAppointments();
  }
  appointmentRescheduled() {
    this.showRescheduleModal = false;
    this.fetchAppointments();
  }
  billPayed() {
    this.showPayBill = false;
    this.fetchAppointments();
  }

  confirmPayment(item: any) {
    this.selectedAppointment = item;
    this.selectedPractitioner = item?.practitioner;
    this.appointmentId = item.id;
    this.showPaymentModal = true;
  }

  viewItem(item: any) {
    this.showAppointmentDetail = true;
    this.selectedAppointment = item;
  }
  rescheduleAppointment(item: any) {
    this.showRescheduleModal = true;
    this.selectedAppointment = item;
  }
  payBill(item: any) {
    this.showPayBill = true;
    this.selectedAppointment = item;
  }

  get patientId() {
    return this.$route.params.id;
  }

  get items() {
    const appointments = this.appointments.map((appointment: any) => {
      (appointment as any).createdAt = new Date(
        (appointment as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...appointment,
        action: appointment.id,
        keydisplay: appointment.id,
        requestDate: appointment.createdAt,
        appointmentId: appointment.idn,
        appointmentType: appointment.appointmentType,
        specialty: appointment.serviceCategory,
        participant: appointment.participants || "Nil",
        appointmentDateTime: appointment.date,
        status: appointment.status,
      };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  async fetchAppointments() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/appointment/get-all-user-appointment"
      );
      this.appointments = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching appointments",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  formatDate(date: any) {
    return new Date(date).toLocaleDateString("en-US");
  }

  formatTime(time: any) {
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  async created() {
    await this.fetchAppointments();
  }
}
</script>
<style scoped>
.outline-primary {
  border: 2px solid #080056;
}
</style>
