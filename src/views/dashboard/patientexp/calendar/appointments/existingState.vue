<template>
  <div class="w-full pb-7">
    <span class="flex justify-end float-right w-86">
        <date-picker class="w-full mt-3 mr-4"/>
      <!-- <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-2.5 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showAppointmentModal = true"
      >
        Create
      </button> -->
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false" :menu="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showAppointment(item.id)">
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showAppointment(item.id)">
          <settings-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Manage</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <plus-icon class="text-green-400 fill-current" />
          <span class="ml-3 text-xs">Add Actor</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCollectModal(item.id)">
          <plus-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">Collect Payment</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPost = true">
          <plus-icon class="text-purple-400 fill-current" />
          <span class="ml-3 text-xs">Post Claim</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPayLinkModal(item.id)">
          <plus-icon class="text-pink-400 fill-current" />
          <span class="ml-3 text-xs">Share Pay Link</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <share-icon class="text-blue-800 fill-current" />
          <span class="ml-3 text-xs">Share</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div> 
      </template>
     
        <template #participants="{ item }">
             <actors-section :items="item.Participants"/>
          </template>
          <template #status="{ item }">
            <div class="flex items-center">
              <p
                class="text-xs bg-gray-300 p-1 rounded"
                v-if="item.status == 'Proposed'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
                v-if="item.status == 'Pending'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-200 text-green-500 p-1 rounded"
                v-if="item.status == 'Booked'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
                v-if="item.status == 'Arrived'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-200 text-green-500 p-1 rounded"
                v-if="item.status == 'Fullfiled'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-red-300 text-red-600 p-1 rounded"
                v-if="item.status == 'Cancelled'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
                v-if="item.status == 'No show'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
                v-if="item.status == 'Entered-in-Error'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-200 text-green-500 p-1 rounded"
                v-if="item.status == 'Checked-in'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
                v-if="item.status == 'Waitlist'"
              >
                {{ item.status }}
              </p>
            </div>
          </template>
      <template #appt>
           <p class="text-sm">24/02/2022
          </p>
            <span class="text-xs text-gray-400">15:00</span>
      </template>
    </cornie-table>
  </div>
  <appointment-modal
    v-model="showAppointmentModal"
    :id="appointmentId"
  />
  <collect-modal v-model="showCollect" :id="appointmentId"/>
  <share-modal v-model="showShare" :id="appointmentId"/>
  <post-modal v-model="showPost" :id="appointmentId"/>
  <bill-modal v-model="showBill" :id="appointmentId"/>

  
    <status-modal
      :id="appointmentId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      @appointment-added="appointmentAdded"
      v-model="showStatusModal"
    />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import EyeIcon from "@/components/icons/newview.vue";
import ShareIcon from "@/components/icons/share.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import DatePicker from "@/components/daterangecalendar.vue";
import ActorsSection from "./actors.vue";
import AppointmentModal from '../appointments/addAppointmentModal.vue';
import IAppointment from "@/types/IAppointment";
import CollectModal from "./collectpayment.vue";
import ShareModal from "./sharepaylink.vue";
import PostModal from "./postclaim.vue";
import BillModal from "./sharebill.vue";
import StatusModal from "./status-update.vue";
import { IPatient } from "@/types/IPatient";


const patients = namespace("patients");
const appointment = namespace("appointment");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    CollectModal,
    CancelIcon,
    SettingsIcon,
    ShareModal,
    SearchIcon,
    DatePicker,
    ActorsSection,
    PostModal,
    PrintIcon,
    BillModal,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    ShareIcon,
    PlusIcon,
    AppointmentModal,
    StatusModal
  },
})
export default class SchedulesExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal = false;
  showInviteModal = false;
  appointmentId = "";
  showAppointmentModal = false;

  showCollect = false;
  showShare = false;
  showPost = false;
  showBill = false;

   showStatusModal = false;
  updatedBy = "";
  currentStatus = "";
  update = "";
  onePatientId = "";
  onePractitionerId = "";

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  rawHeaders = [
    {
      title: "request date",
      key: "createdAt",
      show: true,
      noOrder: true
    },
    {
      title: "appointment type",
      key: "appointmentType",
      show: true,
       noOrder: true
    },
       {
        title: "participants",
      key: "participants",
      show: true,
      noOrder: true
    },
    { title: "billing type", key: "billingType", show: true,  noOrder: true },
 
    { title: "description", key: "description", show: true,  noOrder: true },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const appointments = this.appointments.map((appointment) => {
       (appointment as any).createdAt = new Date(
        (appointment as any).createdAt
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

       const pateintId = appointment.Patients.map((patient: any) => {
        this.onePatientId = patient.patientId;
      });
      const practitionerId = appointment.Practitioners.map(
        (Practitioner: any) => {
          this.onePractitionerId = Practitioner.practitionerId;
        }
      );
      this.updatedBy = this.getPatientName(this.onePatientId);
      this.currentStatus = appointment.status;
      this.update = (appointment as any).updatedAt = new Date(
        (appointment as any).updatedAt
      ).toLocaleDateString("en-US");
      const patientNewId = this.onePatientId;

      return {
        ...appointment,
        action: appointment.id,
      };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

   async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this appointment",
      title: "Cancel appointment",
    });
    if (!confirmed) return;

    if (await this.deleteAppointment(id))
      window.notify({ msg: "Appointment canceled", status: "success" });
    else window.notify({ msg: "Appointment not canceled", status: "error" });
  }
  async updateLocation() {
    await this.fetchAppointments();
  }

   showAppointment(value:string){
    this.showAppointmentModal = true;
    this.appointmentId = value;
  }

  showCollectModal(value:string){
    this.showCollect = true;
     this.appointmentId = value;
  }

  showPayLinkModal(value:string){
     this.appointmentId = value;
    this.showShare = true
  }
   appointmentAdded() {
    this.fetchAppointments();
  }

  async created(){
    await this.fetchPatients();
  }
}
</script>
