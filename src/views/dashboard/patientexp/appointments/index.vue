<template>
  <div class="w-full my-2 h-screen">
      <div class="container-fluid bg-white" v-if="items && items.length === 0 && filterByStatus.length === 0 && filterByType.length === 0 && !selectedStatus">
        <EmptyState />
      </div>
      <div v-else class="container-fluid bg-white sm:p-6 h-scrren">
       <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
       Appointment
      </span>


        <div class="w-full mt-6">  
                 <span class="flex justify-end w-full mb-8">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          pr-5
          pl-5
          px-3
          mb-5
          focus:outline-none
          hover:opacity-90
        "
        @click="$router.push('/dashboard/provider/experience/add-appointment')"
      >
        Create Appointment
      </button>
    </span>


            <div class="w-full pb-7 mb-8">
                <cornie-table :columns="rawHeaders" v-model="items">
                
                <template #appointmentType-header="{  }">
                    <p class="cursor-pointer md" style="font-weight: 600" @click="() => selectType = !selectType">Appointment Type</p>
                    <div class="absolute md" v-if="selectType">
                      <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 md" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a class="md text-gray-700 block px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                            v-for="(day, index) in types" :key="index"
                        >
                            <span><input type="checkbox" class="h-4 w-4 md" name="" v-model="filterByType" id="" :value="day"></span>
                            <span class="mx-2 text-xs md">{{ day }}</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </template>
                
                <template #status-header="{  }">
                    <p class="cursor-pointer md" style="font-weight: 600" @click="() => filterStatus = !filterStatus">Participant Status</p>
                    <div class="absolute md" v-if="filterStatus">
                      <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 md" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a class="md text-gray-700 block px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                            v-for="(day, index) in statuses" :key="index"
                        >
                            <span><input type="checkbox" class="h-4 w-4 md" name="" id="" v-model="filterByStatus" :value="day"></span>
                            <span class="mx-2 text-xs md">{{ day }}</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </template>
                
                <template #Patients="{ item }">
                    <p class="cursor-pointer" @click="showPatientDetails(item.patientId)">{{ item.patient }}</p>
                </template>
                <template #days="{ item }">
                    <p>{{ item.days.map(i => i.substring(0, 3)).join(', ') }}</p>
                </template>
                <template #appointmentType="{ item }">
                    <p>{{ item.appointmentId ? getAppointment(item.id).appointmentType : '' }}</p>
                </template>
                <template #status="{ item }">
                    <div class="container">
                    <span class="rounded-full" :class="{ 'status-inactive': item.status === 'inactive', 'status-active': item.status === 'active' }">{{ item.status }}</span>
                    </div>
                </template>
                 <template #Participants="{ item }">
                    <div class="flex items-center">
                    <span class="text-xs">{{ item.Participants }}</span>
                    <eye-icon
                        class="cursor-pointer ml-3"
                        @click="displayParticipants(item.id)"
                    />
                    
                    </div>
                </template>
                <template #practitioners="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                    <span class="rounded-full">
                        <Actors :items="item.practitioners" />
                    </span>
                    </div>
                </template>
                 <template #actions="{ item }">
                        <div
                        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                        @click="
                            $router.push(`/dashboard/experience/add-appointment/${item.id}`)
                        "
                        >
                        <newview-icon class="text-yellow-500 fill-current" />
                        <span class="ml-3 text-xs">View</span>
                        </div>
                        <div
                        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                        @click="$router.push(`/dashboard/experience/add-response/${item.id}`)"
                        >
                        <update-icon class="text-yellow-300 fill-current" />
                        <span class="ml-3 text-xs">Update</span>
                        </div>
                        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                        <checkin-icon />
                        <span class="ml-3 text-xs">Check-In</span>
                        </div>
                        <div
                        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                        @click="makeNotes(item.id)"
                        >
                        <note-icon class="text-green-300 fill-current" />
                        <span class="ml-3 text-xs">Make Notes</span>
                        </div>
                        <div
                        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                        @click="deleteItem(item.id)"
                        >
                        <cancel-icon/>
                        <span class="ml-3 text-xs">Cancel</span>
                        </div>
                    </template>
                </cornie-table>
                
                <column-filter
                :columns="rawHeaders"
                v-model:preferred="preferredHeaders"
                v-model:visible="showColumnFilter"
                />
                <side-modal :visible="showViewPane" :header="'View Stot'">
                <div class="w-full my-3">
                    <ViewDetails :schedule="selectedSchedule" />
                </div>
                <div class="w-full my-3">
                    <ViewPlan :schedule="selectedSchedule" />
                </div>
                <div class="w-full my-3">
                    <ViewBreaks :schedule="selectedSchedule" />
                </div>
                </side-modal>

                <modal :visible="timeLineVissible">
                  <template #title>
                    <p class="md flex items-center justify-between px2" style="width: 440px">
                      <span class="md font-lignt text-primary p-2 text-xl">Timeline</span> 
                      <span class="md text-danger cursor-pointer">
                        <router-link class="md" :to="{ name: 'Patient Visits Timeline', query: { visit: selectedVisit.id }}">
                          See all
                        </router-link>
                      </span>
                    </p>
                  </template>
                  <ActionLog :timeline="selectedVisit.timelines" @closetimeline="() => timeLineVissible = false" />
                 

                </modal>

                <modal :visible="viewDetails">
                  <template #title>
                    <p class="flex items-center justify-between px-2" style="width: 440px">
                      <span class="font-bold text-danger p-2 text-xl">{{ getPatientName(selectedPatient.id)}}</span> 
                      <span class="bg-danger cursor-pointer" @click="() => viewDetails = false">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="white"/>
                        <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#FF0000"/>
                        </svg>
                      </span>
                    </p>
                  </template>
                  <div class="w-4/12 px-4" style="width: 440px">
                    <div class="w-full flex">
                      <div class="w-6/12">
                        <div class="w-full">
                          <div class="w-11/12">
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">MRN No:</span> 
                              <span class="ml-2">{{ selectedPatientData.mrn }}</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">D.O.B:</span> 
                              <span class="ml-2">{{ selectedPatientData.dob }}</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">Policy Expiry:</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">Policy No:</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-6/12">
                        <div class="w-full">
                          <div class="w-11/12">
                            <div class="py-2 w-full">
                              <span class="font-semibold text-primary">Gender:</span> 
                              <span class="ml-2">{{ selectedPatientData.gender }}</span> 
                            </div>
                            <div class="py-2 w-full">
                              <span class="font-semibold text-primary">Profile Type</span> 
                              <span class="ml-2">XXXX</span> 
                            </div>
                            <div class="py-2w-full">
                              <span class="font-semibold text-primary">Payor</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full pt-3 pb-6">
                      <p class="text-center font-normal text-large text-primary">View Policy Coverage</p>
                    </div>
                  </div>-->

                </modal>
                <all-participants
                    :appointmentId="appointmentId"
                    :columns="singleParticipant"
                    @update:preferred="displayParticipants"
                    v-model:visible="showPartcipants"
                    />
            </div>

            <div style="height: 400px">

            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
// import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from '@/components/icons/edit.vue'
import AddIcon from '@/components/icons/add.vue'
import DeactivateIcon from '@/components/icons/deactivate.vue'
import Button from '@/components/globals/corniebtn.vue'
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import AllParticipants from "./participants.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from '@/components/modal.vue';
//import Close from '@/components/icons/close.vue'
import ArrowRight from '@/components/icons/arrow-right.vue'
import EncounterIcon from '@/components/icons/encounter.vue'
import CheckoutIcon from '@/components/icons/checkout.vue'

import EmptyState from './emptyState.vue'


const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    //Close,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    AllParticipants,
    EyeIcon,
    ColumnFilter,
    CancelIcon,
    TableOptions,
    EditIcon,
    Button,
    NoteIcon,
    CornieTable,
    CheckinIcon,
    UpdateIcon,
    AddIcon,
    NewviewIcon,
    DeactivateIcon,
    EmptyState,
    Modal,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
  },
})
export default class AppoitmentExistingState extends Vue {
  showColumnFilter = false;
  show = false;
appointmentId = "";
showPartcipants = false;
  query = "";
  search = "";

  selectedStatus = 0;
  filterByType: any = [ ]
  filterByStatus: any = [ ]
  completedStatus: any = [  ]
  currentVisitId = '';

  activeTab = 0;
  showEditPane = false;
  showViewPane = false;
  showAllActors = false;
  showActorsPane = false;
  showAddActorsPane = false;
  showCheckin = false;
  showCheckNoapp = false;
  selectType = false;
  filterStatus = false;
  showCheckout = false;
  timeLineVissible = false;
  viewDetails = false;

  selectedSchedule: any = { };
singleParticipant = [];
  selectedVisit : any = { };
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

 @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @visitsStore.State
  visits!: any[];

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @appointment.State
  patients!: any[];

  @appointment.Action
  getPatients!: () => Promise<void>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

 

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "id", show: true },
    {
      title: "Patient",
      key: "Patients",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "Slot",
      key: "slot",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Code",
      key: "reasonCode",
      show: false,
    },
    {
      title: "Reason Reference",
      key: "reasonRef",
      show: false,
    },
    {
      title: "Period",
      key: "newperiod",
      show: false,
    },
    {
      title: "Priority",
      key: "priority",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Consultation Medium",
      kwy: "consultationMedium",
      show: false,
    },
  ];

  types = ['All', 'Emergency', 'Walk-In', 'Follow-Up', 'Routine']
  statuses = ['All', 'Completed', 'Queue', 'In-Progress']
  availableSlots: any = [ ]

  get currentVisit() {
    if (!this.currentVisitId) return { }
    return this.appointments.find((i: any) => i.id === this.currentVisitId);
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    if (!this.appointments || this.appointments.length === 0 ) return [];
    const filtered = this.appointments.filter((i: any) => {
        if (this.filterByType.length === 0 && this.filterByStatus.length === 0) {
            return i;
      } else {
          if (this.filterByStatus.includes('All') || this.filterByType.includes('All')) return true;
        const indexInTypes = this.filterByType.findIndex((j: any) => j.toLowerCase() === this.getAppointment(i.id).appointmentType.toLowerCase());
        const indexInStatuses = this.filterByStatus.findIndex((j: any) => j.toLowerCase() === i.status.toLowerCase());
          console.log("appointments");
          console.log(i.id);

        if (indexInTypes >= 0 || indexInStatuses >= 0) return true;
      }
    })

    const appointments = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completedStatus = "Completed";
      } else if (i.status === "queue") {
        i.completedStatus = "Queue";
      } else {
        i.completedStatus = "In-Progress";
      }
     const singleParticipantlength =
        i.Practitioners.length +
        i.Devices.length +
        i.Patients.length;
      return {
        ...i,
        action: i.id,
        Patients: this.getPatientName(i.patientId),
        status: i.status,
        slot: ` `,
        Participants: singleParticipantlength,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1) return appointments.filter((i: any) => i.completedStatus === "Queue");
    if (this.selectedStatus === 2) return appointments.filter((i) => i.status === "in-progress");
    if (this.selectedStatus === 3) return appointments.filter((i) => i.status !== "in-progress" && i.status !== "queue");

    return appointments;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }
async displayParticipants(value: string) {
    this.appointmentId = value;
    this.showPartcipants = true;
    try {
      const response = await cornieClient().get(`/api/v1/appointment/${value}`);
      if (response.success) {
        this.singleParticipant = response.data;
      }
    } catch (e) {
      console.log(e);
    }
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

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    
    return pt ? `${pt.firstname} ${pt.lastname}` : '';
  }

  setSelectedVisit(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
    this.selectedVisit = pt ? pt : { };
  }

  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    console.log("fkjdjf");
     console.log(pt);
    this.selectedPatient = pt ? pt : { };
  }

  getActors(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
    
    return pt ? pt.Practitioners : [ ];
  }

  getAppointment(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
      console.log("pt ptp pt");
     console.log(pt);
    return pt ? pt : { };
  }



  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return { };
    const data = this.selectedPatient;
      console.log("data");
     console.log(data);
    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${this.months[new Date(data.dateOfBirth).getMonth()]}, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn
    }
  }


 

  showPatientDetails(id: string) {
    this.setSelectedPatient(id)
    this.viewDetails = true;
  }



  async created() {
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.appointments || this.appointments.length === 0) await this.fetchAppointments();
    // if (!this.appointments || this.appointments.length === 0) await this.getVisits();
    // window.addEventListener('click', (e: any) => {
    //   if (!e.target.classList.contains('md')) {
    //     this.selectType = false;
    //     this.filterStatus = false;
    //   }
    // })

    let body = {
      "scheduleId": "f74e7d51-e022-4c2d-a9e8-891c06904f10",
      "startTime": "01:40",
      "endTime": "00:10",
      "description": "string",
      "status": "active",
      "active": true,
      "capacity": 0,
      "hasWaitList": true,
      "comments": "string",
      "repeat": {
        "year": 0,
        "month": 0,
        "week": 0,
        "everyDayOfSchedule": true
      }
    }
    let pat = {
      "mrn": "string",
      "firstname": "string1",
      "middlename": "string2",
      "lastname": "string3",
      "dateOfBirth": "2021-08-26",
      "gender": "male",
      "maritalStatus": "string",
      "multipleBirths": false,
      "multipleBirthInteger": 0,
      "guarantor": {
        firstname: "emergency-contact",
        lastname: "emergency-contact"
      },
      "accountType": "individual",
      "vip": true,
      "emergencyContacts": [
        {firstname: "emergency-contact",
        lastname: "emergency-contact"}
      ],
    }
    let req = {
      "appointmentId": "2600b457-6ee5-452b-b85a-a134be1a9ca4",
      // "orgId": "0eb0c710-665a-449c-ab27-42014d25c676",
      "patientId": "257f5ae3-df56-427f-8327-bc8f4019a4ad",
      "type": "Follow-up",
      "status": "active",
      "roomId": "d25cc910-0830-40cf-a0c8-7c303f381b29",
      // "checkInTime": "01:26",
      // "checkOutTime": "01:30",
      "notes": "true",
      "slotId": "6f72aece-ddb2-4908-aedb-cb1b961e814f",
      // practitioners: [ "87e846a3-bac0-43b9-a4db-0b2605426c42" ],
      // startTime: "00:25"
    }


  }

}
</script>

<style scoped>
    .active-tab {
        border-bottom-width: 4px;
        margin-bottom: -0.22rem;
    }

    .active-color {
        border-color: #FE4D3C;
    }

    .status-active {
      background: #F3FCF8;
      color: #35BA83;
      
    }

    .status-inactive {
      background: #FFF1F0;
      color: #FE4D3C;
    }

    .border-b-4 {
      border-bottom: 4px solid #F0F4FE;
    }

    .h-screen {
      height: 100vh;
      overflow: scroll;
      padding-bottom: 40px;
      padding-bottom: 24px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .h-screen::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .h-screen {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .file-picker {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .light-grey-bg {
      background: #F0F4FE;
    }
</style>
