<template>
  <div class="w-full pb-7 mt-5">
    <!-- <span class="flex justify-end float-right w-86">
        <date-picker class="w-full mt-3 mr-4"/>
       <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-2.5 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showAppointmentModal = true"
      >
        Create
      </button> 
    </span> -->
    <cornie-table :columns="rawHeaders" v-model="pageData" :check="false" :menu="true"
    :totalPages="fullInfo.totalPages"
        :perPage="10"
        :currentPage="fullInfo.currentPage"
        :maxVisibleButtons="fullInfo.totalPages"
        :totalItems="fullInfo.totalItems"
        :items="fullInfo.result"
        @pagechanged="onPageChange"
    >
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
        <div @click="showStatus(item.id)" class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <update-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs"> Update Status </span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckinmodal(item.id)">
          <checkin-icon class="text-green-800 fill-current" />
          <span class="ml-3 text-xs">Check-in</span>
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
                class="text-xs bg-yellow-100 text-yellow-500 p-1 rounded"
                v-if="item.status == 'Pending'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-100 text-green-500 p-1 rounded"
                v-if="item.status == 'Booked'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-100 text-purple-600 p-1 rounded"
                v-if="item.status == 'Arrived'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-100 text-green-500 p-1 rounded"
                v-if="item.status == 'Fullfiled'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-red-100 text-red-600 p-1 rounded"
                v-if="item.status == 'Cancelled'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-yellow-100 text-yellow-500 p-1 rounded"
                v-if="item.status == 'No show'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-100 text-purple-600 p-1 rounded"
                v-if="item.status == 'Entered-in-Error'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-100 text-green-500 p-1 rounded"
                v-if="item.status == 'Checked-in'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-blue-100 text-blue-600 p-1 rounded"
                v-if="item.status == 'Waitlist'"
              >
                {{ item.status }}
              </p>
            </div>
          </template>
    </cornie-table>
  </div>
  <appointment-modal
    v-model="showAppointmentModal"
    :id="appointmentId"
    @appointment-added="appointmentAdded"
  />
  <visit-checkin v-model="showcheckin" :appoitmentData="patientAppointment"  :appiontmentid="appointmentId"/>
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
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { namespace } from "vuex-class";

import { IPatient } from "@/types/IPatient";
import IAppointment from "@/types/IAppointment";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import EyeIcon from "@/components/icons/newview.vue";
import ShareIcon from "@/components/icons/share.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import DatePicker from "@/components/daterangecalendar.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import VisitCheckin from "@/views/dashboard/visits/components/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";


import ActorsSection from "./actors.vue";
import AppointmentModal from '../appointments/addAppointmentModal.vue';
import CollectModal from "./collectpayment.vue";
import ShareModal from "./sharepaylink.vue";
import PostModal from "./postclaim.vue";
import BillModal from "./sharebill.vue";
import StatusModal from "./status-update.vue";


const patients = namespace("patients");
const appointment = namespace("appointment");
const user = namespace("user");

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
    CheckinIcon,
    DatePicker,
    ActorsSection,
    PostModal,
    VisitCheckin,
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
    StatusModal,
    UpdateIcon
  },
})
export default class SchedulesExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal = false;
  showInviteModal = false;
  appointmentId = "";
  showAppointmentModal = false;
  showcheckin = false;
  patientAppointment = [] as any;
  currentPage = 1;


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
  today = new Date().toISOString().slice(0, 10);

  fullInfo = [] as any;
  pageData = [] as any;


  // @appointment.State
  // appointments!: IAppointment[];

  // @appointment.Action
  // fetchAppointments!: () => Promise<void>;

  @appointment.State
  patientappointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @user.State
  currentLocation!: string;

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
    const appointments = this.patientappointments.map((appointment) => {
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
    this.fetchByIdAppointments(this.$route.params.id.toString());
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

  async showCheckinmodal(value:string){ 
    this.showcheckin = true;
    this.appointmentId = value;

    if(this.patientAppointment.length ===0)  {
      await window.notify({ msg: "No available scheduled appoimtment", status: "error" });
    }
  }

  appointmentAdded() {
    this.fetchByIdAppointments(this.$route.params.id.toString());
  }
  get patientId() {
    return this.$route.params.id;
  }

  async showStatus(value: string) {
    this.showStatusModal = true;
    this.appointmentId = value;
  }

  async fetchPractitioners() {
    const AllPractitioners = cornieClient().get(`/api/v1/appointment/for-date`,{date: this.today});
    const response = await Promise.all([AllPractitioners]);
    this.patientAppointment = response[0].data;
    
  }
 
  async resultDataAppoitment() {
    const AllNotes = cornieClient().get(
      `/api/v1/appointment/getAllByPatient/${this.patientId}`,
    );
    const response = await Promise.all([AllNotes]);
      this.fullInfo = response[0].data;

      this.pageData = this.items;

  }
  async fetchAppoitment(page:number) {
    const AllNotes = cornieClient().get(
      `/api/v1/appointment/getAllByPatient/${this.patientId}/?page=${page}`,
    );
    const response = await Promise.all([AllNotes]);
      this.fullInfo = response[0].data;

      this.pageData = this.fullInfo.result;
      this.currentPage =  this.fullInfo.currentPage;

  }
 

    onPageChange(page: number): void {
             console.log(page, 'data.page');
             this.fetchAppoitment(page)
            this.currentPage = page;
    }

  async created(){
    await this.resultDataAppoitment();
    await this.fetchByIdAppointments(this.$route.params.id.toString());
    await this.fetchPatients();
    if(this.currentLocation) await this.fetchPractitioners();
  }
}
</script>
